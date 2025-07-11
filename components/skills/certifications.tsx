"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useFormContext } from "@/contexts/form-context"

export function Certifications() {
  const { formData, updateFormData } = useFormContext()

  const certificationMapping = {
    "基本情報技術者": "hasFE",
    "応用情報技術者": "hasAP",
    "データベーススペシャリスト": "hasDBSpecialist",
    "ネットワークスペシャリスト": "hasNWSpecialist",
    "情報セキュリティスペシャリスト": "hasSCSpecialist",
    "AWS認定": "hasAWSCertified",
    "CCNA": "hasCCNA",
    "LPIC": "hasLPIC",
    "Java Gold": "hasJavaGold",
    "Oracle Master": "hasOracleMaster"
  }

  const certifications = [
    "基本情報技術者",
    "応用情報技術者",
    "データベーススペシャリスト",
    "ネットワークスペシャリスト",
    "情報セキュリティスペシャリスト",
    "AWS認定",
    "CCNA",
    "LPIC",
    "Java Gold",
    "Oracle Master",
    "その他"
  ]

  const handleCertificationChange = (cert: string) => (checked: boolean) => {
    const certKey = certificationMapping[cert as keyof typeof certificationMapping]
    if (certKey) {
      updateFormData({
        certifications: {
          ...formData.certifications,
          [certKey]: checked
        }
      })
    }
  }

  const isChecked = (cert: string): boolean => {
    const certKey = certificationMapping[cert as keyof typeof certificationMapping]
    return certKey ? formData.certifications[certKey as keyof typeof formData.certifications] : false
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">資格</h3>
      <div className="grid grid-cols-3 gap-3">
        {certifications.map((cert) => (
          <div key={cert} className="flex items-center space-x-2">
            <Checkbox 
              id={cert} 
              checked={isChecked(cert)}
              onCheckedChange={handleCertificationChange(cert)}
              disabled={cert === "その他"}
            />
            <Label htmlFor={cert} className="text-sm">{cert}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}