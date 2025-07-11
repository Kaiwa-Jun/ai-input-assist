import OpenAI from "openai"
import { SKILL_EXTRACTION_SYSTEM_PROMPT, SKILL_EXTRACTION_USER_PROMPT } from "@/utils/prompts"
import { OpenAIExtractedData } from "@/types/api"

class OpenAIClient {
  private client: OpenAI | null = null
  private initialized = false

  private initialize() {
    if (!this.initialized) {
      const apiKey = process.env.OPENAI_API_KEY
      
      if (!apiKey || apiKey === "sk-your-api-key-here") {
        console.warn("OpenAI API key is not configured. Please set OPENAI_API_KEY in .env.local")
        this.initialized = true
        return
      }

      try {
        this.client = new OpenAI({
          apiKey,
          timeout: parseInt(process.env.OPENAI_TIMEOUT || "30000"),
        })
        this.initialized = true
      } catch (error) {
        console.error("Failed to initialize OpenAI client:", error)
        this.initialized = true
      }
    }
  }

  async extractSkillsFromText(text: string): Promise<OpenAIExtractedData> {
    this.initialize()

    if (!this.client) {
      throw new Error("OpenAI APIが設定されていません。.env.localファイルにOPENAI_API_KEYを設定してください。")
    }

    try {
      const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo"
      const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || "1000")

      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: SKILL_EXTRACTION_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: SKILL_EXTRACTION_USER_PROMPT(text.substring(0, 3000))
          }
        ],
        temperature: 0.3,
        max_tokens: maxTokens,
        response_format: { type: "json_object" }
      })

      const content = completion.choices[0].message.content
      if (!content) {
        throw new Error("OpenAI APIからの応答が空です")
      }

      return JSON.parse(content)
    } catch (error) {
      console.error("OpenAI API error:", error)
      
      if (error instanceof Error) {
        const message = error.message.toLowerCase()
        
        if (message.includes("invalid") && message.includes("key")) {
          throw new Error("無効なAPIキーです。正しいOpenAI APIキーを設定してください。")
        } else if (message.includes("quota") || message.includes("limit")) {
          throw new Error("APIの利用制限に達しました。OpenAIアカウントの利用状況を確認してください。")
        } else if (message.includes("rate")) {
          throw new Error("レート制限に達しました。しばらく待ってから再試行してください。")
        }
      }
      
      throw new Error("テキストの解析中にエラーが発生しました")
    }
  }

  isConfigured(): boolean {
    this.initialize()
    return this.client !== null
  }
}

export const openAIClient = new OpenAIClient()