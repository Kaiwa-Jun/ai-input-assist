# API Documentation

## Overview

AI Input Assistアプリケーションは、Word/Excelファイルをアップロードして、その内容をAIで解析し、フォームフィールドに自動入力するためのAPIを提供します。

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### POST /parse-document

ドキュメントファイルをアップロードして解析します。

#### Request

- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body Parameters**:
  - `file` (required): アップロードするファイル（.docx または .xlsx）
  - `fields` (optional): 抽出したいフィールドのリスト（JSON配列）

#### Request Example

```bash
curl -X POST http://localhost:3000/api/parse-document \
  -H "Content-Type: multipart/form-data" \
  -F "file=@document.docx" \
  -F 'fields=["name", "email", "phone", "address"]'
```

#### Response

##### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "name": "山田太郎",
    "email": "yamada@example.com",
    "phone": "03-1234-5678",
    "address": "東京都千代田区1-1-1"
  },
  "metadata": {
    "fileName": "document.docx",
    "fileSize": 245632,
    "processedAt": "2024-01-20T10:30:00Z",
    "extractionConfidence": 0.95
  }
}
```

##### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "サポートされていないファイル形式です。.docxまたは.xlsxファイルをアップロードしてください。"
  }
}
```

##### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "error": {
    "code": "PROCESSING_ERROR",
    "message": "ファイルの処理中にエラーが発生しました。"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| INVALID_FILE_TYPE | サポートされていないファイル形式 |
| FILE_TOO_LARGE | ファイルサイズが上限を超過（最大10MB） |
| PROCESSING_ERROR | ファイル処理中のエラー |
| AI_API_ERROR | AI APIの呼び出しエラー |
| RATE_LIMIT_EXCEEDED | レート制限超過 |

## Rate Limiting

- 1分間あたり10リクエストまで
- IPアドレスベースで制限

## File Size Limits

- 最大ファイルサイズ: 10MB
- 推奨ファイルサイズ: 5MB以下

## Supported File Types

- Microsoft Word (.docx)
- Microsoft Excel (.xlsx)

## Notes

- ファイルはメモリ内で処理され、サーバーには保存されません
- AIによる解析精度は文書の構造と内容に依存します
- 個人情報を含むファイルをアップロードする際は注意してください