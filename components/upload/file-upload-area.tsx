import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FileUploadArea() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">スキル・資格</CardTitle>
        <p className="text-sm text-gray-600">技術スキル、工務・ポジション経験</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[calc(100%-120px)]">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-600 mb-2">
            ファイルをドラッグ&ドロップ
          </p>
          <p className="text-xs text-gray-500 mb-4">
            または
          </p>
          <Button variant="outline" className="mb-4">
            ファイルを選択
          </Button>
          <p className="text-xs text-gray-500">
            対応ファイル形式: Word (.docx), Excel (.xlsx)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}