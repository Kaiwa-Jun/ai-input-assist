# AI Input Assist

AI Input Assistは、Word/Excelファイルから情報を抽出し、フォームフィールドに自動入力するアプリケーションです。

## 機能

- 📄 Word (.docx) およびExcel (.xlsx) ファイルのアップロード
- 🤖 AIによる文書内容の解析
- ✨ フォームフィールドへの自動入力
- 📊 アップロード進捗の表示
- 🔒 セキュアなファイル処理（サーバーに保存されません）

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **File Parsing**: mammoth.js (Word), xlsx (Excel)
- **AI Integration**: External AI API

## Getting Started

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/ai-input-assist.git
cd ai-input-assist

# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションにアクセスできます。

## 使い方

1. ファイルアップロードエリアにWord/Excelファイルをドラッグ＆ドロップ
2. ファイルが自動的に解析されます
3. 抽出された情報がフォームフィールドに自動入力されます
4. 必要に応じて内容を編集して送信

## API ドキュメント

詳細なAPIドキュメントは [docs/API.md](./docs/API.md) を参照してください。

## 開発ガイドライン

詳細な開発ガイドラインは [CLAUDE.md](./CLAUDE.md) を参照してください。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
