# Claude PR自動レビューのセットアップ手順

## 1. GitHub Secretsの設定

GitHubリポジトリで以下の手順を実行してください：

1. リポジトリの設定ページを開く
2. 左側メニューから「Secrets and variables」→「Actions」を選択
3. 「New repository secret」をクリック
4. 以下の情報を入力：
   - Name: `ANTHROPIC_API_KEY`
   - Secret: あなたのClaude APIキー（https://console.anthropic.com/ から取得）
5. 「Add secret」をクリック

## 2. 使用方法

### 自動レビュー

- PRを作成すると自動的にClaudeがコードレビューを実行
- レビュー結果はPRのコメントとして投稿されます

### 手動レビューのトリガー

- PR内でコメントに `@claude` を含めると、Claudeがレビューを実行します
- 例: `@claude このコードをレビューしてください`

## 3. カスタマイズ

`CLAUDE.md`ファイルの「PR Review Guidelines」セクションを編集することで、レビューの観点をカスタマイズできます。

## 4. トラブルシューティング

### ワークフローが実行されない場合

- GitHub Actionsが有効になっているか確認
- `ANTHROPIC_API_KEY`が正しく設定されているか確認
- ワークフローファイルが `.github/workflows/claude-pr-review.yml` に存在するか確認

### APIエラーが発生する場合

- APIキーが有効か確認
- APIの利用制限に達していないか確認
- Claude APIのステータスを確認: https://status.anthropic.com/

## 5. 注意事項

- レビューには料金が発生します（Claude APIの利用料金）
- 大きなPRの場合、トークン制限により完全なレビューができない可能性があります
- セキュリティ上、APIキーは必ずGitHub Secretsに保存してください
