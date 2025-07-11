export interface BasicInfo {
  isFullTime: boolean
  hasOvertime: boolean
}

export interface Certifications {
  hasAWSCertified: boolean
  hasCCNA: boolean
  hasLPIC: boolean
  hasJavaGold: boolean
  hasOracleMaster: boolean
  hasFE: boolean
  hasAP: boolean
  hasDBSpecialist: boolean
  hasNWSpecialist: boolean
  hasSCSpecialist: boolean
}

export interface SkillWithExperience {
  name: string
  years?: number
}

export interface Skills {
  languages: string[]
  frameworks: string[]
  databases: string[]
  infrastructure: string[]
  tools: string[]
  cloud: string[]
  other: string[]
}

export interface SkillsWithExperience {
  languages: SkillWithExperience[]
  frameworks: SkillWithExperience[]
  databases: SkillWithExperience[]
  infrastructure: SkillWithExperience[]
  tools: SkillWithExperience[]
  cloud: SkillWithExperience[]
  other: SkillWithExperience[]
}

export interface ExtractedData {
  basicInfo: BasicInfo
  certifications: Certifications
  skills: Skills
}

export interface ParseDocumentResponse {
  success: boolean
  data?: ExtractedData
  metadata?: {
    fileName: string
    fileSize: number
    processedAt: string
    extractionConfidence: number
    extractionMethod: "AI" | "rule-based"
  }
  error?: {
    code: string
    message: string
  }
}

export interface OpenAIExtractedData {
  basicInfo: BasicInfo
  certifications: Certifications
  skills: Omit<Skills, "other">
  skillsWithExperience?: {
    languages?: SkillWithExperience[]
    frameworks?: SkillWithExperience[]
    databases?: SkillWithExperience[]
    infrastructure?: SkillWithExperience[]
    tools?: SkillWithExperience[]
    cloud?: SkillWithExperience[]
  }
}