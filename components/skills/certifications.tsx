import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function Certifications() {
  const certifications = [
    "基本情報技術者",
    "応用情報技術者",
    "情報処理安全確保支援士",
    "AWS認定ソリューションアーキテクト",
    "AWS認定デベロッパー",
    "AWS認定SysOps/アドミニストレータ",
    "Google Cloud Professional",
    "Microsoft Azure認定",
    "Oracle認定Javaプログラマー",
    "CISSP",
    "CISA",
    "PMP",
    "その他"
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">資格</h3>
      <div className="grid grid-cols-3 gap-3">
        {certifications.map((cert) => (
          <div key={cert} className="flex items-center space-x-2">
            <Checkbox id={cert} />
            <Label htmlFor={cert} className="text-sm">{cert}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}