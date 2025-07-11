import * as mammoth from "mammoth"
import * as XLSX from "xlsx"
import { SkillWithExperience } from "@/types/api"

export interface ParsedDocument {
  text: string
  metadata: {
    fileName: string
    fileSize: number
    fileType: "word" | "excel"
  }
}

export interface ValidationError {
  code: string
  message: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function validateFileSize(file: File): ValidationError | null {
  if (file.size > MAX_FILE_SIZE) {
    return {
      code: "FILE_TOO_LARGE",
      message: "ファイルサイズが大きすぎます。10MB以下のファイルをアップロードしてください。"
    }
  }
  return null
}

export function validateFileType(file: File): ValidationError | null {
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
    return {
      code: "INVALID_FILE_TYPE",
      message: "サポートされていないファイル形式です。Word (.docx) または Excel (.xlsx) ファイルをアップロードしてください。"
    }
  }
  
  return null
}

export async function parseWordDocument(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Node.js環境でBufferを使用
    const buffer = Buffer.from(arrayBuffer)
    
    // mammothにbufferを渡す
    const result = await mammoth.extractRawText({ buffer })
    
    if (!result || typeof result.value !== 'string') {
      throw new Error("解析結果が無効です")
    }
    
    return result.value || ""
  } catch (error) {
    console.error("Mammoth parsing error details:", {
      error,
      errorType: typeof error,
      errorMessage: error instanceof Error ? error.message : "Unknown",
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // エラーメッセージを詳細にする
    if (error instanceof Error) {
      throw new Error(`Wordファイルの解析に失敗しました: ${error.message}`)
    } else {
      throw new Error("Wordファイルの解析に失敗しました: 不明なエラー")
    }
  }
}

export function parseExcelDocument(arrayBuffer: ArrayBuffer): string {
  try {
    const workbook = XLSX.read(arrayBuffer, { type: "array" })
    const texts: string[] = []
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      
      jsonData.forEach((row: unknown) => {
        if (Array.isArray(row)) {
          const rowText = row
            .filter(cell => cell !== null && cell !== undefined)
            .map(cell => String(cell).trim())
            .join(" ")
          
          if (rowText) {
            texts.push(rowText)
          }
        }
      })
    })
    
    return texts.join("\n")
  } catch {
    throw new Error("Excelファイルの解析に失敗しました")
  }
}

export async function parseDocument(file: File): Promise<ParsedDocument> {
  const sizeError = validateFileSize(file)
  if (sizeError) {
    throw new Error(sizeError.message)
  }
  
  const typeError = validateFileType(file)
  if (typeError) {
    throw new Error(typeError.message)
  }
  
  const arrayBuffer = await file.arrayBuffer()
  const isWord = file.name.toLowerCase().endsWith(".docx")
  
  const text = isWord 
    ? await parseWordDocument(arrayBuffer)
    : parseExcelDocument(arrayBuffer)
  
  if (!text.trim()) {
    throw new Error("ファイルから内容を抽出できませんでした")
  }
  
  return {
    text,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      fileType: isWord ? "word" : "excel"
    }
  }
}

// 正規表現の特殊文字をエスケープする関数
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// フレームワークから関連言語を推論するマッピング
const frameworkToLanguages: Record<string, string[]> = {
  // JavaScript/TypeScript系
  "React": ["JavaScript", "TypeScript"],
  "Next.js": ["JavaScript", "TypeScript", "React"],
  "Vue": ["JavaScript", "TypeScript"],
  "Vue.js": ["JavaScript", "TypeScript"],
  "Nuxt": ["JavaScript", "TypeScript", "Vue"],
  "Nuxt.js": ["JavaScript", "TypeScript", "Vue"],
  "Angular": ["TypeScript", "JavaScript"],
  "Svelte": ["JavaScript", "TypeScript"],
  "Express": ["JavaScript", "TypeScript"],
  "Fastify": ["JavaScript", "TypeScript"],
  "Nest.js": ["JavaScript", "TypeScript"],
  
  // Python系
  "Django": ["Python"],
  "Flask": ["Python"],
  "FastAPI": ["Python"],
  
  // Java系
  "Spring": ["Java"],
  "Spring Boot": ["Java"],
  
  // Ruby系
  "Rails": ["Ruby"],
  "Ruby on Rails": ["Ruby"],
  
  // PHP系
  "Laravel": ["PHP"],
  "Symfony": ["PHP"],
  
  // C#系
  ".NET": ["C#"],
  "ASP.NET": ["C#"],
  ".NET Core": ["C#"],
  
  // Go系
  "Gin": ["Go"],
  "Echo": ["Go"],
  "Fiber": ["Go"]
}

// 言語の上位互換関係
const languageDependencies: Record<string, string[]> = {
  "TypeScript": ["JavaScript"],
  "Sass": ["CSS"],
  "SCSS": ["CSS"],
  "JSX": ["JavaScript"],
  "TSX": ["TypeScript", "JavaScript"]
}

// 経験年数を抽出する関数
function extractYearsOfExperience(text: string, skill: string): number | undefined {
  // スキル名の前後で年数を探す正規表現パターン
  const patterns = [
    // "JavaScript（5年）" や "JavaScript(5年)"
    new RegExp(`${escapeRegExp(skill)}[\\s\\(（]*([0-9]+(?:\\.[0-9]+)?)\\s*年`, 'i'),
    // "JavaScript 5年" や "JavaScript　5年"
    new RegExp(`${escapeRegExp(skill)}[\\s　]+([0-9]+(?:\\.[0-9]+)?)\\s*年`, 'i'),
    // "5年 JavaScript"
    new RegExp(`([0-9]+(?:\\.[0-9]+)?)\\s*年[\\s　]*${escapeRegExp(skill)}`, 'i'),
    // "JavaScript: 5年"
    new RegExp(`${escapeRegExp(skill)}[\\s　]*[:：][\\s　]*([0-9]+(?:\\.[0-9]+)?)\\s*年`, 'i'),
    // ヶ月表記 "JavaScript 18ヶ月"
    new RegExp(`${escapeRegExp(skill)}[\\s\\(（]*([0-9]+)\\s*ヶ月`, 'i'),
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const value = parseFloat(match[1])
      // ヶ月の場合は年に変換
      if (pattern.toString().includes('ヶ月')) {
        return Math.round((value / 12) * 10) / 10 // 小数点1桁まで
      }
      return value
    }
  }

  return undefined
}

export function extractSkillsFromText(text: string) {
  const skills = {
    languages: [] as string[],
    frameworks: [] as string[],
    databases: [] as string[],
    infrastructure: [] as string[],
    tools: [] as string[],
    cloud: [] as string[],
    other: [] as string[]
  }

  const skillsWithExperience = {
    languages: [] as SkillWithExperience[],
    frameworks: [] as SkillWithExperience[],
    databases: [] as SkillWithExperience[],
    infrastructure: [] as SkillWithExperience[],
    tools: [] as SkillWithExperience[],
    cloud: [] as SkillWithExperience[]
  }

  // プログラミング言語
  const languages = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", 
    "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala"
  ]
  skills.languages = languages.filter(lang => 
    new RegExp(`\\b${escapeRegExp(lang)}\\b`, "i").test(text)
  )
  
  // 言語の経験年数を抽出
  skills.languages.forEach(lang => {
    const years = extractYearsOfExperience(text, lang)
    skillsWithExperience.languages.push({ name: lang, years })
  })

  // フレームワーク
  const frameworks = [
    "React", "Next.js", "Vue", "Nuxt", "Angular", "Svelte",
    "Express", "FastAPI", "Django", "Flask", "Spring", "Rails",
    ".NET", "Laravel"
  ]
  skills.frameworks = frameworks.filter(fw => 
    new RegExp(`\\b${escapeRegExp(fw)}\\b`, "i").test(text)
  )

  // データベース
  const databases = [
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", 
    "SQL Server", "DynamoDB", "Cassandra", "Elasticsearch"
  ]
  skills.databases = databases.filter(db => 
    new RegExp(`\\b${escapeRegExp(db)}\\b`, "i").test(text)
  )

  // インフラ・ミドルウェア
  const infrastructure = [
    "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible",
    "Nginx", "Apache", "RabbitMQ", "Kafka"
  ]
  skills.infrastructure = infrastructure.filter(infra => 
    new RegExp(`\\b${escapeRegExp(infra)}\\b`, "i").test(text)
  )

  // 開発ツール
  const tools = [
    "Git", "GitHub", "GitLab", "Bitbucket", "JIRA", "Confluence",
    "Slack", "VS Code", "IntelliJ", "Postman"
  ]
  skills.tools = tools.filter(tool => 
    new RegExp(`\\b${escapeRegExp(tool)}\\b`, "i").test(text)
  )

  // クラウドサービス
  const cloud = ["AWS", "Azure", "GCP", "Heroku", "Vercel", "Netlify"]
  skills.cloud = cloud.filter(c => 
    new RegExp(`\\b${escapeRegExp(c)}\\b`, "i").test(text)
  )

  // フレームワークから関連言語を推論
  skills.frameworks.forEach(framework => {
    const relatedTechs = frameworkToLanguages[framework] || []
    relatedTechs.forEach(tech => {
      // 言語カテゴリに追加
      if (languages.includes(tech) && !skills.languages.includes(tech)) {
        skills.languages.push(tech)
      }
      // フレームワークカテゴリに追加（例: Next.js → React）
      if (frameworks.includes(tech) && !skills.frameworks.includes(tech)) {
        skills.frameworks.push(tech)
      }
    })
  })

  // 言語の依存関係を適用
  const additionalLanguages: string[] = []
  skills.languages.forEach(lang => {
    const deps = languageDependencies[lang] || []
    deps.forEach(dep => {
      if (languages.includes(dep) && !skills.languages.includes(dep) && !additionalLanguages.includes(dep)) {
        additionalLanguages.push(dep)
      }
    })
  })
  skills.languages = [...skills.languages, ...additionalLanguages]

  // インフラの依存関係を適用（例: Kubernetes → Docker）
  if (skills.infrastructure.includes("Kubernetes") && !skills.infrastructure.includes("Docker")) {
    skills.infrastructure.push("Docker")
  }

  // 各カテゴリで経験年数を抽出（言語以外）
  skills.frameworks.forEach(fw => {
    const years = extractYearsOfExperience(text, fw)
    skillsWithExperience.frameworks.push({ name: fw, years })
  })
  
  skills.databases.forEach(db => {
    const years = extractYearsOfExperience(text, db)
    skillsWithExperience.databases.push({ name: db, years })
  })
  
  skills.infrastructure.forEach(infra => {
    const years = extractYearsOfExperience(text, infra)
    skillsWithExperience.infrastructure.push({ name: infra, years })
  })
  
  skills.tools.forEach(tool => {
    const years = extractYearsOfExperience(text, tool)
    skillsWithExperience.tools.push({ name: tool, years })
  })
  
  skills.cloud.forEach(c => {
    const years = extractYearsOfExperience(text, c)
    skillsWithExperience.cloud.push({ name: c, years })
  })

  return { skills, skillsWithExperience }
}

export function extractCertificationsFromText(text: string) {
  return {
    hasAWSCertified: /AWS.*認定|AWS.*Certified/i.test(text),
    hasCCNA: /CCNA/i.test(text),
    hasLPIC: /LPIC/i.test(text),
    hasJavaGold: /Java.*Gold|Java.*ゴールド/i.test(text),
    hasOracleMaster: /Oracle.*Master/i.test(text),
    hasFE: /基本情報|FE|Fundamental.*Information/i.test(text),
    hasAP: /応用情報|AP|Applied.*Information/i.test(text),
    hasDBSpecialist: /データベース.*スペシャリスト|DB.*Specialist/i.test(text),
    hasNWSpecialist: /ネットワーク.*スペシャリスト|NW.*Specialist/i.test(text),
    hasSCSpecialist: /情報セキュリティ.*スペシャリスト|SC.*Specialist/i.test(text)
  }
}