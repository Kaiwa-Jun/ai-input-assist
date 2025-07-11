"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { SkillWithExperience } from "@/types/api"

interface SelectedSkillsDisplayProps {
  skills: string[]
  category: string
  onUpdateSkills: (skills: string[]) => void
  skillsWithExperience: SkillWithExperience[]
  onUpdateSkillsWithExperience: (skills: SkillWithExperience[]) => void
}

export function SelectedSkillsDisplay({
  skills,
  category,
  onUpdateSkills,
  skillsWithExperience,
  onUpdateSkillsWithExperience
}: SelectedSkillsDisplayProps) {
  // スキルを経験年数付きのオブジェクトに変換
  useEffect(() => {
    const currentSkillNames = skillsWithExperience.map(s => s.name)
    const newSkills = skills.filter(skill => !currentSkillNames.includes(skill))
    
    if (newSkills.length > 0) {
      const updatedSkills = [
        ...skillsWithExperience,
        ...newSkills.map(skill => ({ name: skill, years: undefined }))
      ]
      onUpdateSkillsWithExperience(updatedSkills)
    }
    
    // 削除されたスキルを反映
    const filteredSkills = skillsWithExperience.filter(s => skills.includes(s.name))
    if (filteredSkills.length !== skillsWithExperience.length) {
      onUpdateSkillsWithExperience(filteredSkills)
    }
  }, [skills, skillsWithExperience, onUpdateSkillsWithExperience])

  const handleYearsChange = (skillName: string, years: string) => {
    const yearsNum = years === "" ? undefined : parseInt(years)
    const updatedSkills = skillsWithExperience.map(skill =>
      skill.name === skillName ? { ...skill, years: yearsNum } : skill
    )
    onUpdateSkillsWithExperience(updatedSkills)
  }

  const handleRemoveSkill = (skillName: string) => {
    const updatedSkills = skills.filter(s => s !== skillName)
    onUpdateSkills(updatedSkills)
  }

  if (skillsWithExperience.length === 0) {
    return null
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h5 className="text-sm font-medium mb-3">選択された{category}</h5>
      <div className="space-y-2">
        {skillsWithExperience.map((skill) => (
          <div key={skill.name} className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[120px]">{skill.name}</span>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                placeholder="経験年数"
                value={skill.years || ""}
                onChange={(e) => handleYearsChange(skill.name, e.target.value)}
                className="w-20 h-8 text-sm"
                min="0"
                max="50"
              />
              <span className="text-sm text-gray-600">年</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSkill(skill.name)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}