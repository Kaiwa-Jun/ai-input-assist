import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function SkillsSection() {
  const skills = {
    "プログラミング言語": [
      "JavaScript", "TypeScript", "Python", "Java",
      "C#", "PHP", "Ruby", "Go",
      "Rust", "Swift", "Kotlin", "Dart",
      "C++", "C", "Scala", "R"
    ],
    "フレームワーク": [
      "React", "Vue.js", "Angular", "Next.js",
      "Nuxt.js", "Svelte", "Express", "Fastify",
      "Django", "Flask", "FastAPI", "Spring Boot",
      "ASP.NET", ".NET Core", "Laravel", "Ruby on Rails"
    ],
    "データベース": [
      "MySQL", "PostgreSQL", "Oracle", "SQL Server",
      "MongoDB", "Redis", "Elasticsearch", "DynamoDB",
      "Cassandra", "Neo4j"
    ],
    "インフラ": [
      "AWS", "GCP", "Azure", "Docker",
      "Kubernetes", "Terraform", "Ansible", "Jenkins",
      "GitLab CI", "GitHub Actions", "CircleCI"
    ],
    "ツール": [
      "Git", "GitHub", "GitLab", "Jira",
      "Confluence", "Slack", "Teams", "Figma",
      "Postman", "VS Code"
    ],
    "その他": [
      "GraphQL", "REST API", "gRPC", "WebSocket",
      "OAuth", "JWT", "Microservices", "Serverless",
      "Machine Learning", "Blockchain"
    ],
    "ドメイン領域": [
      "Webアプリケーション", "モバイルアプリ", "インフラ・クラウド",
      "データ分析・AI", "ゲーム開発", "IoT・組み込み",
      "ブロックチェーン", "セキュリティ"
    ],
    "工程・ポジション": [
      "要件定義", "基本設計", "詳細設計",
      "実装", "テスト", "運用・保守"
    ],
    "ポジション経験": [
      "PM", "PL", "アーキテクト",
      "リードエンジニア", "シニアエンジニア", "エンジニア",
      "ジュニアエンジニア"
    ]
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">スキル選択</h3>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-xs font-medium text-gray-600">{category}</h4>
          <div className="grid grid-cols-3 gap-2">
            {items.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox id={`${category}-${skill}`} />
                <Label htmlFor={`${category}-${skill}`} className="text-sm">{skill}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}