"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface FileUploadStatusProps {
  fileName: string;
  fileSize: number;
  status: "uploading" | "processing" | "completed" | "error";
  progress?: number;
  errorMessage?: string;
}

export function FileUploadStatus({
  fileName,
  fileSize,
  status,
  progress = 0,
  errorMessage,
}: FileUploadStatusProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return Math.round(bytes / 1024) + " KB";
    else return Math.round(bytes / 1048576) + " MB";
  };

  const getStatusIcon = () => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "アップロード中...";
      case "processing":
        return "処理中...";
      case "completed":
        return "完了";
      case "error":
        return "エラー";
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">ファイルアップロード</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileIcon className="h-8 w-8 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>
            </div>
            {getStatusIcon()}
          </div>
          
          {(status === "uploading" || status === "processing") && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 text-center">{getStatusText()} {progress}%</p>
            </div>
          )}
          
          {status === "completed" && (
            <p className="text-sm text-green-600">{getStatusText()}</p>
          )}
          
          {status === "error" && errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}