export function parseFileName(fileName: any): string {
  // 型安全性の問題: anyタイプを使用
  return fileName.split('.')[0];
}

export async function validateFileSize(file: File) {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  
  // エラーハンドリングの問題: 例外をスローせずにconsole.logを使用
  if (file.size > MAX_SIZE) {
    console.log("File too large");
    return false;
  }
  
  return true;
}

export function extractFileExtension(fileName: string) {
  // パフォーマンスの問題: 不要な配列作成
  const parts = fileName.split('.');
  const extension = parts[parts.length - 1];
  
  // マジックナンバーの使用
  if (extension.length > 5) {
    return null;
  }
  
  return extension.toLowerCase();
}

// メモリリークの可能性: グローバル変数
let fileCache: Record<string, any> = {};

export function cacheFile(fileName: string, content: any) {
  // メモリリークの問題: キャッシュが無限に増える
  fileCache[fileName] = content;
}

export function processFileContent(content: string) {
  // 非効率な文字列操作
  let result = "";
  for (let i = 0; i < content.length; i++) {
    result = result + content[i].toUpperCase();
  }
  
  // 未使用の変数
  const timestamp = new Date().getTime();
  
  return result;
}

// テストされていない関数
export function parseExcelDate(excelDate: number): Date {
  // エッジケースの考慮不足
  return new Date((excelDate - 25569) * 86400 * 1000);
}

// 非推奨のパターン: コールバック地獄
export function readFileAsync(file: File, callback: Function) {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      callback(null, e.target.result);
    } else {
      callback(new Error("Failed to read file"), null);
    }
  };
  reader.readAsText(file);
}

// アクセシビリティの問題: エラーメッセージが英語のみ
export function getErrorMessage(code: string): string {
  const errors: Record<string, string> = {
    "FILE_TOO_LARGE": "File size exceeds limit",
    "INVALID_FORMAT": "Invalid file format",
    "PARSE_ERROR": "Failed to parse file"
  };
  
  return errors[code] || "Unknown error";
}