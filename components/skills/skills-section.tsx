"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useFormContext } from "@/contexts/form-context"
import { SelectedSkillsDisplay } from "./selected-skills-display"

export function SkillsSection() {
  const { formData, updateFormData, skillsWithExperience, updateSkillsWithExperience } = useFormContext()

  const skillCategories = {
    "プログラミング言語": {
      key: "languages" as const,
      items: [
        "JavaScript", "TypeScript", "Python", "Java",
        "C#", "PHP", "Ruby", "Go",
        "Rust", "Swift", "Kotlin", "Dart",
        "C++", "C", "Scala", "R"
      ]
    },
    "フレームワーク": {
      key: "frameworks" as const,
      items: [
        "React", "Vue.js", "Angular", "Next.js",
        "Nuxt.js", "Svelte", "Express", "Fastify",
        "Django", "Flask", "FastAPI", "Spring Boot",
        "ASP.NET", ".NET Core", "Laravel", "Ruby on Rails"
      ]
    },
    "データベース": {
      key: "databases" as const,
      items: [
        "MySQL", "PostgreSQL", "Oracle", "SQL Server",
        "MongoDB", "Redis", "Elasticsearch", "DynamoDB",
        "Cassandra", "Neo4j"
      ]
    },
    "インフラ・ミドルウェア": {
      key: "infrastructure" as const,
      items: [
        "Docker", "Kubernetes", "Jenkins", "Terraform",
        "Ansible", "Nginx", "Apache", "RabbitMQ",
        "Kafka", "GitLab CI", "GitHub Actions", "CircleCI"
      ]
    },
    "開発ツール": {
      key: "tools" as const,
      items: [
        "Git", "GitHub", "GitLab", "Bitbucket",
        "JIRA", "Confluence", "Slack", "VS Code",
        "IntelliJ", "Postman", "Figma", "Teams"
      ]
    },
    "クラウドサービス": {
      key: "cloud" as const,
      items: [
        "AWS", "Azure", "GCP", "Heroku",
        "Vercel", "Netlify", "Firebase", "Supabase"
      ]
    }
  }

  const handleSkillChange = (category: keyof typeof formData.skills, skill: string) => (checked: boolean) => {
    const currentSkills = formData.skills[category]
    const updatedSkills = checked 
      ? [...currentSkills, skill]
      : currentSkills.filter(s => s !== skill)

    updateFormData({
      skills: {
        ...formData.skills,
        [category]: updatedSkills
      }
    })
  }

  const isSkillChecked = (category: keyof typeof formData.skills, skill: string): boolean => {
    return formData.skills[category].includes(skill)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">技術スキル</h3>
      {Object.entries(skillCategories).map(([categoryName, { key, items }]) => (
        <div key={categoryName} className="space-y-2">
          <h4 className="text-xs font-medium text-gray-700">{categoryName}</h4>
          <div className="grid grid-cols-4 gap-2">
            {items.map((skill) => (
              <div key={skill} className="flex items-center space-x-1">
                <Checkbox 
                  id={`${categoryName}-${skill}`}
                  checked={isSkillChecked(key, skill)}
                  onCheckedChange={handleSkillChange(key, skill)}
                />
                <Label 
                  htmlFor={`${categoryName}-${skill}`} 
                  className="text-xs cursor-pointer"
                >
                  {skill}
                </Label>
              </div>
            ))}
          </div>
          <SelectedSkillsDisplay
            skills={formData.skills[key]}
            category={categoryName}
            onUpdateSkills={(updatedSkills) => {
              updateFormData({
                skills: {
                  ...formData.skills,
                  [key]: updatedSkills
                }
              })
            }}
            skillsWithExperience={skillsWithExperience[key]}
            onUpdateSkillsWithExperience={(skills) => updateSkillsWithExperience(key, skills)}
          />
        </div>
      ))}
      
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-700">ドメイン領域</h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            "Webアプリケーション", "モバイルアプリ", "インフラ・クラウド",
            "データ分析・AI", "ゲーム開発", "IoT・組み込み",
            "ブロックチェーン", "セキュリティ"
          ].map((domain) => (
            <div key={domain} className="flex items-center space-x-1">
              <Checkbox id={`domain-${domain}`} />
              <Label htmlFor={`domain-${domain}`} className="text-xs cursor-pointer">
                {domain}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-700">工程・ポジション</h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            "要件定義", "基本設計", "詳細設計",
            "実装", "テスト", "運用・保守"
          ].map((phase) => (
            <div key={phase} className="flex items-center space-x-1">
              <Checkbox id={`phase-${phase}`} />
              <Label htmlFor={`phase-${phase}`} className="text-xs cursor-pointer">
                {phase}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-700">ポジション経験</h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            "PM", "PL", "アーキテクト",
            "リードエンジニア", "シニアエンジニア", "エンジニア"
          ].map((position) => (
            <div key={position} className="flex items-center space-x-1">
              <Checkbox id={`position-${position}`} />
              <Label htmlFor={`position-${position}`} className="text-xs cursor-pointer">
                {position}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}