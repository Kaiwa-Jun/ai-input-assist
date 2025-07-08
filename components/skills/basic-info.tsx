import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function BasicInfo() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">基本情報・経歴</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="full-time" />
          <Label htmlFor="full-time" className="text-sm">正社員</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="work-history" />
          <Label htmlFor="work-history" className="text-sm">過勤務歴</Label>
        </div>
      </div>
    </div>
  )
}