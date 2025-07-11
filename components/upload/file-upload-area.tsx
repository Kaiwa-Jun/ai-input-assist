"use client"

import { useState, useRef, ChangeEvent, DragEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"
import { useFormContext } from "@/contexts/form-context"
import { SkillsWithExperience, SkillWithExperience } from "@/types/api"

interface FileUploadStatus {
  status: "idle" | "uploading" | "success" | "error"
  progress: number
  message?: string
  fileName?: string
}

export function FileUploadArea() {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatus>({
    status: "idle",
    progress: 0
  })
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateFormData, updateSkillsWithExperience } = useFormContext()

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]
    const validExtensions = [".docx", ".xlsx"]
    
    const hasValidType = validTypes.includes(file.type)
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    )
    
    if (!hasValidType && !hasValidExtension) {
      setUploadStatus({
        status: "error",
        progress: 0,
        message: "サポートされていないファイル形式です。Word (.docx) または Excel (.xlsx) ファイルをアップロードしてください。"
      })
      return false
    }
    
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setUploadStatus({
        status: "error",
        progress: 0,
        message: "ファイルサイズが大きすぎます。10MB以下のファイルをアップロードしてください。"
      })
      return false
    }
    
    return true
  }

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return

    setUploadStatus({
      status: "uploading",
      progress: 0,
      fileName: file.name
    })

    const formData = new FormData()
    formData.append("file", file)

    try {
      // プログレスをシミュレート（実際のアップロードではXHRを使用）
      const progressInterval = setInterval(() => {
        setUploadStatus(prev => {
          if (prev.progress >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return { ...prev, progress: prev.progress + 10 }
        })
      }, 200)

      const response = await fetch("/api/parse-document", {
        method: "POST",
        body: formData
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("アップロードに失敗しました")
      }

      const data = await response.json()

      setUploadStatus({
        status: "success",
        progress: 100,
        message: "ファイルの解析が完了しました",
        fileName: file.name
      })

      // フォームに自動入力
      if (data.success && data.data) {
        updateFormData(data.data)
        
        // skillsWithExperienceがある場合は経験年数も更新
        if (data.data.skillsWithExperience) {
          const skillsWithExp: Partial<SkillsWithExperience> = data.data.skillsWithExperience;
          (Object.entries(skillsWithExp) as [keyof SkillsWithExperience, SkillWithExperience[]][]).forEach(([category, skills]) => {
            if (skills && Array.isArray(skills)) {
              updateSkillsWithExperience(category, skills)
            }
          })
        }
      }

    } catch (error) {
      setUploadStatus({
        status: "error",
        progress: 0,
        message: error instanceof Error ? error.message : "アップロード中にエラーが発生しました",
        fileName: file.name
      })
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleReset = () => {
    setUploadStatus({ status: "idle", progress: 0 })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">スキル・資格</CardTitle>
        <p className="text-sm text-gray-600">技術スキル、工務・ポジション経験</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[calc(100%-120px)]">
        {uploadStatus.status === "idle" && (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center w-full max-w-md transition-colors ${
              isDragging 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              ファイルをドラッグ&ドロップ
            </p>
            <p className="text-xs text-gray-500 mb-4">
              または
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              ファイルを選択
            </Button>
            <p className="text-xs text-gray-500">
              対応ファイル形式: Word (.docx), Excel (.xlsx)
            </p>
          </div>
        )}

        {uploadStatus.status === "uploading" && (
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
              <p className="text-sm">アップロード中...</p>
            </div>
            <Progress value={uploadStatus.progress} />
            {uploadStatus.fileName && (
              <p className="text-xs text-gray-500 truncate">
                {uploadStatus.fileName}
              </p>
            )}
          </div>
        )}

        {uploadStatus.status === "success" && (
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-medium">{uploadStatus.message}</p>
            </div>
            {uploadStatus.fileName && (
              <p className="text-xs text-gray-500 truncate">
                {uploadStatus.fileName}
              </p>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              className="w-full"
            >
              別のファイルをアップロード
            </Button>
          </div>
        )}

        {uploadStatus.status === "error" && (
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-start space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">エラー</p>
                <p className="text-xs">{uploadStatus.message}</p>
              </div>
            </div>
            {uploadStatus.fileName && (
              <p className="text-xs text-gray-500 truncate">
                {uploadStatus.fileName}
              </p>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              className="w-full"
            >
              再度アップロード
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}