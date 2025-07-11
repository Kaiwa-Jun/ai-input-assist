"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { ExtractedData, SkillsWithExperience, SkillWithExperience } from "@/types/api"

type FormData = ExtractedData

interface FormContextType {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  resetFormData: () => void
  skillsWithExperience: SkillsWithExperience
  updateSkillsWithExperience: (category: keyof SkillsWithExperience, skills: SkillWithExperience[]) => void
}

const initialFormData: FormData = {
  basicInfo: {
    isFullTime: false,
    hasOvertime: false
  },
  certifications: {
    hasAWSCertified: false,
    hasCCNA: false,
    hasLPIC: false,
    hasJavaGold: false,
    hasOracleMaster: false,
    hasFE: false,
    hasAP: false,
    hasDBSpecialist: false,
    hasNWSpecialist: false,
    hasSCSpecialist: false
  },
  skills: {
    languages: [],
    frameworks: [],
    databases: [],
    infrastructure: [],
    tools: [],
    cloud: [],
    other: []
  }
}

const initialSkillsWithExperience: SkillsWithExperience = {
  languages: [],
  frameworks: [],
  databases: [],
  infrastructure: [],
  tools: [],
  cloud: [],
  other: []
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [skillsWithExperience, setSkillsWithExperience] = useState<SkillsWithExperience>(initialSkillsWithExperience)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
      basicInfo: {
        ...prev.basicInfo,
        ...(data.basicInfo || {})
      },
      certifications: {
        ...prev.certifications,
        ...(data.certifications || {})
      },
      skills: {
        ...prev.skills,
        ...(data.skills || {})
      }
    }))
  }

  const updateSkillsWithExperience = (category: keyof SkillsWithExperience, skills: SkillWithExperience[]) => {
    setSkillsWithExperience(prev => ({
      ...prev,
      [category]: skills
    }))
  }

  const resetFormData = () => {
    setFormData(initialFormData)
    setSkillsWithExperience(initialSkillsWithExperience)
  }

  return (
    <FormContext.Provider value={{ 
      formData, 
      updateFormData, 
      resetFormData,
      skillsWithExperience,
      updateSkillsWithExperience
    }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}