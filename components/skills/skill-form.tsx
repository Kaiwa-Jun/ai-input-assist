import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfo } from "./basic-info"
import { Certifications } from "./certifications"
import { SkillsSection } from "./skills-section"

export function SkillForm() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">エンジニアを追加 - スキル・資格</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <BasicInfo />
        <div className="border-t pt-6">
          <Certifications />
        </div>
        <div className="border-t pt-6">
          <SkillsSection />
        </div>
      </CardContent>
    </Card>
  )
}