"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useFormContext } from "@/contexts/form-context"

export function BasicInfo() {
  const { formData, updateFormData } = useFormContext()

  const handleCheckboxChange = (field: keyof typeof formData.basicInfo) => (checked: boolean) => {
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        [field]: checked
      }
    })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">基本情報・経歴</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="full-time" 
            checked={formData.basicInfo.isFullTime}
            onCheckedChange={handleCheckboxChange("isFullTime")}
          />
          <Label htmlFor="full-time" className="text-sm">正社員</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="work-history" 
            checked={formData.basicInfo.hasOvertime}
            onCheckedChange={handleCheckboxChange("hasOvertime")}
          />
          <Label htmlFor="work-history" className="text-sm">過勤務歴</Label>
        </div>
      </div>
    </div>
  )
}