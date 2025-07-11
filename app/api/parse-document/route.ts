import { NextRequest, NextResponse } from "next/server"
import { 
  parseDocument, 
  extractSkillsFromText, 
  extractCertificationsFromText 
} from "@/utils/fileParser"
import { openAIClient } from "@/lib/openai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NO_FILE",
            message: "ファイルがアップロードされていません。"
          }
        },
        { status: 400 }
      )
    }

    // デバッグ情報を出力
    console.log("Received file:", {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // ファイルの解析
    const parsedDoc = await parseDocument(file)
    const extractedText = parsedDoc.text

    let parsedData
    let usedAI = false

    // OpenAI APIが設定されている場合は使用、そうでない場合はルールベース
    if (openAIClient.isConfigured()) {
      try {
        const aiResult = await openAIClient.extractSkillsFromText(extractedText)
        parsedData = aiResult
        usedAI = true
      } catch (aiError) {
        console.error("OpenAI API error, falling back to rule-based extraction:", aiError)
        // AIが失敗した場合はルールベースにフォールバック
        const extractedSkills = extractSkillsFromText(extractedText)
        parsedData = {
          basicInfo: {
            isFullTime: /正社員|full.?time/i.test(extractedText),
            hasOvertime: /残業|過勤務|overtime/i.test(extractedText)
          },
          certifications: extractCertificationsFromText(extractedText),
          skills: extractedSkills.skills,
          skillsWithExperience: extractedSkills.skillsWithExperience
        }
      }
    } else {
      // OpenAI APIが設定されていない場合はルールベース
      const extractedSkills = extractSkillsFromText(extractedText)
      parsedData = {
        basicInfo: {
          isFullTime: /正社員|full.?time/i.test(extractedText),
          hasOvertime: /残業|過勤務|overtime/i.test(extractedText)
        },
        certifications: extractCertificationsFromText(extractedText),
        skills: extractedSkills.skills,
        skillsWithExperience: extractedSkills.skillsWithExperience
      }
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
      metadata: {
        fileName: parsedDoc.metadata.fileName,
        fileSize: parsedDoc.metadata.fileSize,
        processedAt: new Date().toISOString(),
        extractionConfidence: usedAI ? 0.95 : 0.75,
        extractionMethod: usedAI ? "AI" : "rule-based"
      }
    })

  } catch (error) {
    console.error("Error processing file:", error)
    
    const errorMessage = error instanceof Error ? error.message : "ファイルの処理中にエラーが発生しました。"
    let errorCode = "PROCESSING_ERROR"
    
    if (errorMessage.includes("ファイルサイズが大きすぎます")) {
      errorCode = "FILE_TOO_LARGE"
    } else if (errorMessage.includes("サポートされていないファイル形式")) {
      errorCode = "INVALID_FILE_TYPE"
    } else if (errorMessage.includes("内容を抽出できませんでした")) {
      errorCode = "EMPTY_FILE"
    }
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: errorCode,
          message: errorMessage
        }
      },
      { status: errorCode === "PROCESSING_ERROR" ? 500 : 400 }
    )
  }
}