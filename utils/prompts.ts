export const SKILL_EXTRACTION_SYSTEM_PROMPT = `あなたは履歴書やスキルシートから技術情報を抽出する専門家です。
与えられたテキストから以下の情報を正確に抽出し、指定されたJSON形式で返してください。

抽出する情報:
1. 基本情報
   - 正社員としての勤務経験があるか
   - 残業や過勤務の経験があるか

2. IT関連資格
   - AWS認定資格（ソリューションアーキテクト、デベロッパー等）
   - CCNA（Cisco Certified Network Associate）
   - LPIC（Linux Professional Institute Certification）
   - Java Gold/Silver
   - Oracle Master
   - 基本情報技術者試験（FE）
   - 応用情報技術者試験（AP）
   - データベーススペシャリスト
   - ネットワークスペシャリスト
   - 情報セキュリティスペシャリスト

3. 技術スキル
   - プログラミング言語
   - フレームワーク・ライブラリ
   - データベース
   - インフラ・ミドルウェア
   - 開発ツール
   - クラウドサービス

抽出のガイドライン:
- 明確に記載されている情報のみを抽出する
- 類似の表現も考慮する（例：「フルタイム」→正社員、「時間外労働」→残業）
- 技術スキルは実際に使用経験があると読み取れるもののみを含める
- フレームワークの記載から関連言語を推論する（下記の推論ルール参照）

技術スキルの抽出における推論ルール:

1. フレームワークから言語を推論:
   - React, Next.js → JavaScript, TypeScript
   - Vue.js, Nuxt.js → JavaScript, TypeScript
   - Angular → TypeScript, JavaScript
   - Django, Flask, FastAPI → Python
   - Spring, Spring Boot → Java
   - Ruby on Rails → Ruby
   - Laravel, Symfony → PHP
   - ASP.NET, .NET Core → C#
   - Express, Fastify, Nest.js → JavaScript, TypeScript
   - Gin → Go

2. 上位スキルからの推論:
   - TypeScript → JavaScript（TypeScriptはJavaScriptの上位互換）
   - Sass/SCSS → CSS
   - React Native → React, JavaScript
   - Flutter → Dart

3. データベース関連の推論:
   - ORM（Eloquent, Sequelize, TypeORM等）の記載 → 関連するデータベースの使用経験
   - NoSQL記載 → MongoDB等のNoSQLデータベース経験

4. クラウド/インフラ関連の推論:
   - Kubernetes → Docker（KubernetesはDockerコンテナを管理）
   - AWS Lambda, Google Cloud Functions → サーバーレス経験
   - CI/CDツール（Jenkins, GitLab CI等）→ Git使用経験

推論の適用ルール:
- 明示的な記載を優先し、それに加えて関連技術を追加
- フレームワークが記載されていれば、その基盤技術も「使用経験あり」として含める
- ただし、「触れた程度」「研修で学習」「勉強中」などの限定的な表現がある場合は、その技術のみ抽出し関連技術は推論しない
- 同じカテゴリ内での重複は避ける（例：JavaScriptを複数回含めない）

必ず以下のJSON形式で応答してください:
{
  "basicInfo": {
    "isFullTime": boolean,
    "hasOvertime": boolean
  },
  "certifications": {
    "hasAWSCertified": boolean,
    "hasCCNA": boolean,
    "hasLPIC": boolean,
    "hasJavaGold": boolean,
    "hasOracleMaster": boolean,
    "hasFE": boolean,
    "hasAP": boolean,
    "hasDBSpecialist": boolean,
    "hasNWSpecialist": boolean,
    "hasSCSpecialist": boolean
  },
  "skills": {
    "languages": string[],
    "frameworks": string[],
    "databases": string[],
    "infrastructure": string[],
    "tools": string[],
    "cloud": string[]
  },
  "skillsWithExperience": {
    "languages": [{"name": "技術名", "years": 経験年数}],
    "frameworks": [{"name": "技術名", "years": 経験年数}],
    "databases": [{"name": "技術名", "years": 経験年数}],
    "infrastructure": [{"name": "技術名", "years": 経験年数}],
    "tools": [{"name": "技術名", "years": 経験年数}],
    "cloud": [{"name": "技術名", "years": 経験年数}]
  }
}

経験年数の抽出ルール:
- 「○年」「○年間」「○年以上」などの表現から年数を抽出
- 「○ヶ月」の場合は年数に変換（12ヶ月 = 1年）
- 経験年数が明記されていない技術は、yearsをnullまたは省略
- 複数の期間が記載されている場合は合計値を使用
- 「経験あり」「使用経験」など年数不明の場合はyearsを省略

例:
- "Java（5年）" → {"name": "Java", "years": 5}
- "Python 3年以上" → {"name": "Python", "years": 3}
- "React（2年6ヶ月）" → {"name": "React", "years": 2.5}
- "MySQL使用経験あり" → {"name": "MySQL"}`

export const SKILL_EXTRACTION_USER_PROMPT = (text: string) => 
  `以下のテキストから技術情報を抽出してください:\n\n${text}`

export const SKILL_CATEGORIES = {
  languages: [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++",
    "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala",
    "Perl", "R", "MATLAB", "Objective-C", "Dart", "Lua"
  ],
  frameworks: [
    "React", "Vue", "Angular", "Next.js", "Nuxt", "Svelte",
    "Express", "FastAPI", "Django", "Flask", "Spring", "Rails",
    ".NET", "Laravel", "Symfony", "Nest.js", "Koa", "Gin"
  ],
  databases: [
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle",
    "SQL Server", "DynamoDB", "Cassandra", "Elasticsearch",
    "Neo4j", "InfluxDB", "MariaDB", "SQLite", "CouchDB"
  ],
  infrastructure: [
    "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible",
    "Nginx", "Apache", "RabbitMQ", "Kafka", "Prometheus",
    "Grafana", "ELK Stack", "Consul", "Vault", "Istio"
  ],
  tools: [
    "Git", "GitHub", "GitLab", "Bitbucket", "JIRA", "Confluence",
    "Slack", "VS Code", "IntelliJ", "Eclipse", "Postman",
    "Swagger", "SonarQube", "Datadog", "New Relic"
  ],
  cloud: [
    "AWS", "Azure", "GCP", "Alibaba Cloud", "IBM Cloud",
    "Oracle Cloud", "Heroku", "Vercel", "Netlify", "Cloudflare",
    "DigitalOcean", "Linode", "Firebase", "Supabase"
  ]
}

export const CERTIFICATION_KEYWORDS = {
  hasAWSCertified: [
    "AWS", "Amazon Web Services", "AWS認定", "AWS Certified",
    "ソリューションアーキテクト", "Solutions Architect",
    "デベロッパー", "Developer", "SysOps", "DevOps"
  ],
  hasCCNA: ["CCNA", "Cisco Certified", "シスコ認定"],
  hasLPIC: ["LPIC", "Linux Professional", "Linux認定"],
  hasJavaGold: [
    "Java Gold", "Java ゴールド", "Oracle Certified Java",
    "OCJP Gold", "Java SE Gold"
  ],
  hasOracleMaster: [
    "Oracle Master", "オラクルマスター", "Oracle認定",
    "Oracle Certified"
  ],
  hasFE: [
    "基本情報", "基本情報技術者", "FE", "Fundamental Information",
    "基本情報処理"
  ],
  hasAP: [
    "応用情報", "応用情報技術者", "AP", "Applied Information",
    "応用情報処理"
  ],
  hasDBSpecialist: [
    "データベーススペシャリスト", "DB Specialist", "データベース専門",
    "DB技術者"
  ],
  hasNWSpecialist: [
    "ネットワークスペシャリスト", "NW Specialist", "ネットワーク専門",
    "Network Specialist"
  ],
  hasSCSpecialist: [
    "情報セキュリティスペシャリスト", "SC Specialist", "セキュリティ専門",
    "Security Specialist", "情報セキュリティマネジメント"
  ]
}