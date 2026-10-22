window.PLUGINS_DATA = {
  "schemaVersion": "1.1",
  "siteName": "OFX Atlas",
  "lastVerified": "2026-10-21",
  "evidenceLevels": {
    "official-docs": "官方文档 / 官网页面明确声明",
    "vendor-statement": "厂商发布页或官方公告声明",
    "community-report": "社区用户实测反馈（待复核）",
    "self-tested": "OFX Atlas 本站独立实测",
    "no-official-info": "官方资料尚未确认，暂无可复现实测"
  },
  "compatibilityStatus": {
    "confirmed": "实测通过",
    "partial": "部分可用",
    "failed": "实测失败",
    "official-supported": "官方声明支持（本站尚未独立实测）",
    "unconfirmed": "官方资料尚未确认",
    "not-supported": "官方确认不支持",
    "user-report": "用户反馈待复核"
  },
  "plugins": [
    {
      "id": "dehancer-pro",
      "slug": "dehancer-pro",
      "name": "Dehancer Pro",
      "developer": "Dehancer LLC",
      "tagline": "物理级胶片模拟与电影感调色",
      "category": [
        "film-emulation",
        "color-grading"
      ],
      "tags": [
        "胶片模拟",
        "颗粒",
        "辉光",
        "暗角",
        "色彩管理",
        "Log"
      ],
      "description": "以真实胶片光化学过程建模的调色插件，提供多款相机负片与胶片印片风格、物理准确的颗粒与辉光，适合想要电影质感、画面不脏的创作者。对静物、食品、人像类素材的高光过渡处理细腻。",
      "license": "subscription",
      "price": "订阅制，价格以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://www.dehancer.com/",
      "officialDownload": "https://www.dehancer.com/download",
      "downloadVerified": true,
      "sources": [
        "https://www.dehancer.com/",
        "https://blog.dehancer.com/beta-testing/dehancer-ofx-beta-for-davinci-resolve-macos-windows-linux/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载 DaVinci Resolve OFX 安装包（Windows/macOS/Linux 分开），安装后在 Resolve Studio 色彩页的 OpenFX 面板中调用。",
      "knownIssues": [
        "NVIDIA 部分驱动版本（461/516/522 等）可能导致插件崩溃，官方建议更换兼容驱动",
        "AMD 驱动高于 23.4.1 在达芬奇中可能出现显存泄漏",
        "对 GPU 显存要求高：4K 素材建议 8GB 显存，8K 建议 16GB+"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方提供 OFX 版，支持 DaVinci Resolve Studio（Windows/macOS/Linux）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "filmconvert-nitrate",
      "slug": "filmconvert-nitrate",
      "name": "FilmConvert Nitrate",
      "developer": "FilmConvert",
      "tagline": "基于真实胶片数据的写实胶片模拟",
      "category": [
        "film-emulation",
        "color-grading"
      ],
      "tags": [
        "胶片模拟",
        "颗粒",
        "相机匹配",
        "Log"
      ],
      "description": "基于真实胶片数据建模的调色插件，支持主流相机素材一键匹配，颗粒自然可控，逻辑简单不易翻车，适合需要快速统一多段素材色调的创作流程。一次性买断，无水印试用版可用。",
      "license": "one-time",
      "price": "$119（原价 $149），Halation 附加包 $99",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://www.filmconvert.com/",
      "officialDownload": "https://www.filmconvert.com/download",
      "downloadVerified": true,
      "sources": [
        "https://www.filmconvert.com/nitrate",
        "https://www.filmconvert.com/purchase"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网注册邮箱获取试用版，购买后通过登录或 .fkv 文件激活。DaVinci Resolve 插件版在色彩页 OpenFX 面板调用。",
      "knownIssues": [
        "FilmConvert Pro 为已停止支持的旧版，新用户应购买 Nitrate",
        "Halation 为单独附加模块，不含在基础授权内"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网提供 DaVinci Resolve 插件版，macOS（含 Apple Silicon）与 Windows"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "filmbox-looks",
      "slug": "filmbox-looks",
      "name": "Filmbox Looks",
      "developer": "Video Village",
      "tagline": "电影级胶片仿真的精简版本",
      "category": [
        "film-emulation",
        "color-grading"
      ],
      "tags": [
        "胶片模拟",
        "色彩",
        "电影感"
      ],
      "description": "与 Filmb0x Pro 同源的光化学处理引擎，主打高速高效的胶片仿真工作流，支持达芬奇、Baselight 等多宿主。Looks 为预设驱动版本，价格远低于 Pro，适合希望获得电影级色彩但预算有限的创作者。",
      "license": "subscription-or-one-time",
      "price": "$29/季度 或 $199 永久",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://videovillage.com/filmbox-looks/",
      "officialDownload": "https://videovillage.com/filmbox-looks/",
      "downloadVerified": true,
      "sources": [
        "https://videovillage.com/filmbox-looks/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Video Village Plugins 应用安装与激活，支持 DaVinci Resolve、Baselight、Livegrade、Premiere Pro、After Effects、Final Cut Pro。",
      "knownIssues": [
        "Filmbox Pro（更完整的旗舰版）价格较高，独立版约 $999 起",
        "需通过 Video Village 官方插件管理器安装，无独立安装包"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确支持 DaVinci Resolve（OFX）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "spektrafilm",
      "slug": "spektrafilm",
      "name": "Spektrafilm OFX",
      "developer": "Community / 独立开发者",
      "tagline": "免费的光谱级胶片模拟（捐赠制）",
      "category": [
        "film-emulation",
        "color-grading",
        "free"
      ],
      "tags": [
        "胶片模拟",
        "免费",
        "颗粒",
        "辉光",
        "扩散"
      ],
      "description": "免费开源倾向的 OFX 胶片模拟插件，从曝光、负片冲洗到光学印片全链路光谱建模，内置多款相机负片与印片纸，含颗粒、辉光、扩散与镜头特性。仍在持续开发中，社区反馈效果好，适合预算有限或想试水胶片感的用户。",
      "license": "free-donation",
      "price": "免费（可向开发者捐赠）",
      "platforms": [
        "macos",
        "windows"
      ],
      "officialHome": "https://spektrafilm.114c.de/",
      "officialDownload": "https://spektrafilm.114c.de/",
      "downloadVerified": true,
      "sources": [
        "https://spektrafilm.114c.de/",
        "https://github.com/andreavolpato/spektrafilm"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网或 GitHub 发布页下载对应系统版本，按说明安装到达芬奇 OFX 插件目录。",
      "knownIssues": [
        "仍处于 beta / 持续开发阶段",
        "部分平台版本需从 GitHub 手动获取构建"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方站点面向 DaVinci Resolve 分发，社区实测反馈正常"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "neat-video",
      "slug": "neat-video",
      "name": "Neat Video",
      "developer": "ABSoft",
      "tagline": "降噪天花板，保留画面细节",
      "category": [
        "noise-reduction",
        "repair"
      ],
      "tags": [
        "降噪",
        "暗光",
        "高ISO",
        "细节保留"
      ],
      "description": "业界标杆级视频降噪插件，通过噪声分布分析在去除噪点的同时保留边缘与纹理细节，适合暗光、高ISO素材与产品特写画面。支持 GPU 加速，提供 Windows / macOS / Linux 版本。",
      "license": "one-time",
      "price": "从 $99.90 起（以官网为准）",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://www.neatvideo.com/",
      "officialDownload": "https://www.neatvideo.com/download",
      "downloadVerified": true,
      "sources": [
        "https://www.neatvideo.com/purchase",
        "https://www.neatvideo.com/features/compatibility"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载对应宿主版本（Resolve/OFX），Demo 版处理结果带水印，购买 Pro 授权后解锁。",
      "knownIssues": [
        "达芬奇对时间性效果占用大量 GPU 显存，4K 时间线官方建议至少 8GB 显存",
        "显存不足时可能明显变慢"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方提供 Resolve 版本（含用户指南），支持 Windows/macOS/Linux"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "revision-effects",
      "slug": "revision-effects",
      "name": "RE:Vision Effects（Twixtor / DE:Noise 等）",
      "developer": "RE:Vision Effects, Inc.",
      "tagline": "光流变速与智能修复工具集",
      "category": [
        "retime",
        "repair",
        "color-grading"
      ],
      "tags": [
        "变速",
        "光流",
        "降噪",
        "去闪烁",
        "放大"
      ],
      "description": "奥斯卡技术奖得主，旗下 Twixtor（光流变速）、DE:Noise（降噪）、ReelSmart Motion Blur（运动模糊）、REZup（放大）等均为业界常用工具，支持 OFX 宿主。适合需要慢动作、去闪烁、画质修复的专业工作流。",
      "license": "subscription-or-one-time",
      "price": "各产品单独定价（订阅或一次性），以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://revisionfx.com/",
      "officialDownload": "https://revisionfx.com/products/",
      "downloadVerified": true,
      "sources": [
        "https://revisionfx.com/products/twixtor/resolve/",
        "https://revisionfx.com/products/effections/resolve/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载对应产品试用版（带水印），购买授权后解锁；Twixtor 支持 Resolve 15.0 及以上。",
      "knownIssues": [
        "Windows 多 NVIDIA GPU 环境下曾出现 GPU 加速崩溃（新版已修复）",
        "各产品需单独购买授权"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "Twixtor 等明确支持 Resolve 15.0+（OFX）"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官方列出 VEGAS Pro 兼容"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "支持 Nuke 5.1 及以上"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "boris-sapphire",
      "slug": "boris-sapphire",
      "name": "Boris FX Sapphire",
      "developer": "Boris FX",
      "tagline": "获奖无数的电影级特效合集",
      "category": [
        "effects",
        "stylize"
      ],
      "tags": [
        "光效",
        "辉光",
        "镜头光晕",
        "柔光",
        "转场",
        "跟踪"
      ],
      "description": "行业标杆特效套装，含数百种效果：辉光、镜头光晕、柔光扩散、纹理、转场等，自带 Mocha 跟踪，可在达芬奇、Nuke、Vegas、Flame 等 OFX 宿主使用。适合影视级光效与氛围感创作。",
      "license": "subscription",
      "price": "订阅 $545/年 或 $80/月（多宿主授权 $895/年）",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://borisfx.com/products/sapphire/",
      "officialDownload": "https://borisfx.com/products/sapphire/",
      "downloadVerified": true,
      "sources": [
        "https://borisfx.com/products/sapphire/",
        "https://borisfx.com/news/sapphire-2026-an-ode-to-physical-media/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Boris FX Hub 下载并管理安装，可选择 OFX 版本安装器；试用带水印。",
      "knownIssues": [
        "安装体积大，建议按需选择宿主安装器",
        "试用版输出带水印"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确支持 DaVinci Resolve（OFX）"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "支持 Foundry Nuke（OFX）"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "支持 VEGAS Pro（OFX）"
        },
        {
          "host": "fusion",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "支持 Fusion Studio（OFX）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "boris-continuum",
      "slug": "boris-continuum",
      "name": "Boris FX Continuum (BCC)",
      "developer": "Boris FX",
      "tagline": "AI 辅助的全能后期工具包",
      "category": [
        "effects",
        "repair",
        "stylize"
      ],
      "tags": [
        "磨皮",
        "防抖",
        "光效",
        "转场",
        "AI",
        "修复"
      ],
      "description": "包含 300+ 效果的综合性插件包：AI 磨皮美颜、光学防抖、脏点修复、光效、转场等，适合需要一站式后期辅助工具的内容团队。支持达芬奇、Nuke、Vegas 等 OFX 宿主。",
      "license": "subscription",
      "price": "订阅 $325/年 或 $48/月",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://borisfx.com/products/continuum/",
      "officialDownload": "https://borisfx.com/products/continuum/",
      "downloadVerified": true,
      "sources": [
        "https://borisfx.com/products/continuum/",
        "https://genarts.net/news/continuum-2026-5-ai-precision-more-creative-control/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Boris FX Hub 下载安装，选择 OFX 版本；试用带水印。",
      "knownIssues": [
        "完整套装安装体积较大",
        "试用版输出带水印"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "支持 DaVinci Resolve & Fusion（OFX）"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "支持 Foundry Nuke（OFX）"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "支持 VEGAS Pro（OFX）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "maxon-red-giant",
      "slug": "maxon-red-giant",
      "name": "Maxon Red Giant（Magic Bullet Suite）",
      "developer": "Maxon",
      "tagline": "好莱坞调色师常用的调色套装",
      "category": [
        "color-grading",
        "film-emulation"
      ],
      "tags": [
        "调色",
        "胶片",
        "磨皮",
        "降噪",
        "Looks"
      ],
      "description": "Red Giant 旗下 Magic Bullet Suite 包含 Looks（调色）、Mojo、Cosmo（皮肤修饰）、Denoiser（降噪）等工具，支持 OFX 宿主（DaVinci Resolve 等），是广受认可的影视调色套装。",
      "license": "subscription",
      "price": "Red Giant 订阅制，价格以官网为准",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://www.maxon.net/en/red-giant",
      "officialDownload": "https://www.maxon.net/en/red-giant",
      "downloadVerified": true,
      "sources": [
        "https://www.maxon.net/en/red-giant",
        "https://www.maxon.net/en/solutions/color-grading"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Maxon App 安装与授权，支持 DaVinci Resolve（OFX）等多个宿主。",
      "knownIssues": [
        "仅订阅制，无一次性买断",
        "需要 Maxon 账号与 Maxon App 管理"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确支持基于 OFX 的 DaVinci Resolve（Magic Bullet Looks 等）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "video-village-scatter",
      "slug": "video-village-scatter",
      "name": "Video Village Scatter",
      "developer": "Video Village",
      "tagline": "物理准确的后期光学扩散",
      "category": [
        "stylize",
        "diffusion"
      ],
      "tags": [
        "柔光",
        "扩散",
        "光学滤镜模拟",
        "高光"
      ],
      "description": "以物理光学建模的扩散/柔光插件，模拟真实光学滤镜效果，高光过渡自然，适合拍摄后为画面添加柔光氛围感，是高端影视调色的常用工具。",
      "license": "subscription-or-one-time",
      "price": "$199/年 或 $499 永久（14 天免费试用）",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://videovillage.com/scatter/",
      "officialDownload": "https://videovillage.com/scatter/buy",
      "downloadVerified": true,
      "sources": [
        "https://videovillage.com/scatter/",
        "https://videovillage.com/scatter/buy"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Video Village Plugins 应用安装与激活，支持 DaVinci Resolve、Baselight 等。",
      "knownIssues": [
        "价格相对较高",
        "参数调节范围刻意受限（为了贴近真实滤镜效果）"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确支持 DaVinci Resolve"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "nobe-omniscope",
      "slug": "nobe-omniscope",
      "name": "Nobe OmniScope",
      "developer": "Time in Pixels",
      "tagline": "专业示波器，调色师的眼睛",
      "category": [
        "scopes",
        "monitoring"
      ],
      "tags": [
        "示波器",
        "波形图",
        "矢量图",
        "HDR",
        "监看"
      ],
      "description": "专业级视频示波器 OFX 插件，提供波形、矢量、直方图、HDR 标尺等完整监看工具，支持 StreamDeck 等硬件联动，适合调色与直播监看场景。",
      "license": "one-time",
      "price": "Video 版 $99 / Pro 版 $399（支持费用另计）",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://www.timeinpixels.com/nobe-omniscope/",
      "officialDownload": "https://www.timeinpixels.com/nobe-omniscope/",
      "downloadVerified": true,
      "sources": [
        "https://www.timeinpixels.com/nobe-omniscope/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载对应平台安装包，激活后作为 OFX 在达芬奇中调用。",
      "knownIssues": [
        "Pro 版额外需要年度支持费用",
        "部分高级功能（如 HDR 标尺、StreamDeck）仅在 Pro 版提供"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确支持 DaVinci Resolve（OFX）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "mononodes-look-lab",
      "slug": "mononodes-look-lab",
      "name": "Mononodes Look Lab Print",
      "developer": "MONONODES",
      "tagline": "从 DCTL 走向 OFX 的调色工具",
      "category": [
        "color-grading",
        "film-emulation"
      ],
      "tags": [
        "调色",
        "色彩科学",
        "节点",
        "一次性买断"
      ],
      "description": "原为达芬奇 DCTL 工具，现重写为 OFX 插件，提供色彩科学驱动的调色方案，一次性买断无订阅。另有免费的 Node Toggle 工具可试用。",
      "license": "one-time",
      "price": "Look Lab Print €399（Studio 版 €799）",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://mononodes.com/look-lab-print-ofx/",
      "officialDownload": "https://mononodes.com/look-lab-print-ofx/",
      "downloadVerified": true,
      "sources": [
        "https://mononodes.com/look-lab-print-ofx/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买后下载安装，兼容 DaVinci Resolve Studio。",
      "knownIssues": [
        "兼容 DaVinci Resolve Studio",
        "旧 DCTL 版已停止销售，新用户购买 OFX 版"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确兼容 DaVinci Resolve Studio"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "digital-anarchy-flicker-free",
      "slug": "digital-anarchy-flicker-free",
      "name": "Digital Anarchy Flicker Free",
      "developer": "Digital Anarchy",
      "tagline": "去除频闪与时间码闪烁",
      "category": [
        "repair"
      ],
      "tags": [
        "去闪烁",
        "频闪",
        "修复",
        "时间码"
      ],
      "description": "专门去除 LED 屏幕拍摄频闪、时间码滚动、日光灯闪烁等问题的修复插件，支持 GPU 加速与运动补偿，适合拍摄屏幕、直播、舞台等场景的后期修复。",
      "license": "one-time",
      "price": "$149（Flicker Free 2.0）至 $199（3.0）",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://www.digitalanarchy.com/",
      "officialDownload": "https://www.digitalanarchy.com/downloads/davinci-resolve-ofx-flicker-free/",
      "downloadVerified": true,
      "sources": [
        "https://www.digitalanarchy.com/downloads/davinci-resolve-ofx-flicker-free/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买/下载试用，支持 Resolve/OFX 授权（也可购买全宿主授权）。",
      "knownIssues": [
        "其他 OFX 宿主（如 Vegas）虽可能可用，但官方未列入正式支持",
        "授权按宿主区分，跨宿主需另购"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方支持 Resolve/OFX 授权"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "vendor-statement",
          "notes": "厂商表示在 Vegas 等 OFX 应用中可能可用，但未列入官方正式支持"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "3d-lut-creator",
      "slug": "3d-lut-creator",
      "name": "3D LUT Creator（免费 OFX 版）",
      "developer": "3D LUT Creator",
      "tagline": "免费可用的 LUT 制作与加载工具",
      "category": [
        "color-grading",
        "free"
      ],
      "tags": [
        "LUT",
        "调色",
        "免费"
      ],
      "description": "3D LUT Creator 提供的免费 OFX 插件，可在达芬奇与 VEGAS Pro 中加载与应用 LUT，适合需要 LUT 管理与调色的免费方案。",
      "license": "free",
      "price": "免费",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://3dlutcreator.com/",
      "officialDownload": "https://3dlutcreator.com/3d-lut-creator---free-plugins.html",
      "downloadVerified": true,
      "sources": [
        "https://3dlutcreator.com/3d-lut-creator---free-plugins.html",
        "https://3dlutcreator.com/products/video-retouch/201"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网免费插件页下载安装，兼容 DaVinci Resolve 与 VEGAS Pro；macOS 下需使用官网渠道安装的达芬奇（App Store 版本可能无法加载）。",
      "knownIssues": [
        "macOS 下 App Store 版达芬奇可能无法加载该插件",
        "功能聚焦于 LUT 加载，不含完整调色工具"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确兼容 DaVinci Resolve（macOS 需官网版）"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官方明确兼容 VEGAS Pro"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力，暂无可复现的原生兼容实测"
        }
      ]
    },
    {
      "id": "mocha-pro",
      "slug": "mocha-pro",
      "name": "Mocha Pro",
      "developer": "Boris FX",
      "tagline": "获奖级平面跟踪与 VFX 抠像插件",
      "category": [
        "effects",
        "repair"
      ],
      "tags": [
        "平面跟踪",
        "roto",
        "抠像",
        "物体移除",
        "稳定"
      ],
      "description": "学院奖获奖的平面跟踪与 roto 工具，作为 OFX 插件可直接在 Nuke、Fusion、VEGAS、Flame 等宿主内调用。支持 PowerMesh 变形跟踪、物体移除、镜头稳定与镜头畸变估算，跟踪数据可回写宿主时间线。",
      "license": "subscription",
      "price": "订阅制，价格以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://borisfx.com/products/mocha-pro/",
      "officialDownload": "https://borisfx.com/mocha-pro-trial/",
      "downloadVerified": true,
      "sources": [
        "https://borisfx.com/products/mocha-pro/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Boris FX Hub 下载并安装，登录 Boris FX 账号后请求试用或激活订阅。OFX 版安装后在 Nuke/Fusion/VEGAS 的 OpenFX 面板中调用。",
      "knownIssues": [
        "免费试用带水印，激活后去除"
      ],
      "compatibility": [
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 Foundry Nuke (OFX) 为支持宿主"
        },
        {
          "host": "fusion",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 Blackmagic Fusion (OFX)"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 VEGAS Pro (OFX)"
        },
        {
          "host": "davinci-resolve",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "Mocha 独立版可链接 Resolve，但 OFX 插件版官网宿主列表未明确列 Resolve，待核验"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "boris-silhouette",
      "slug": "boris-silhouette",
      "name": "Silhouette",
      "developer": "Boris FX",
      "tagline": "行业标准级 rotoscoping 与节点式合成",
      "category": [
        "effects",
        "repair"
      ],
      "tags": [
        "roto",
        "paint",
        "节点合成",
        "keying",
        "morphing"
      ],
      "description": "行业标准的 roto 与 Paint 工具，400+ 节点集成平面跟踪、抠像、遮罩、变形与 morphing，内置 Sapphire、Mocha Pro 与 Particle Illusion。可作为 OFX 插件在 Nuke/Fusion/Resolve/VEGAS/Flame 内调用。",
      "license": "subscription",
      "price": "订阅制，价格以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://borisfx.com/products/silhouette",
      "officialDownload": "https://borisfx.com/products/silhouette",
      "downloadVerified": true,
      "sources": [
        "https://borisfx.com/products/silhouette"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "Boris FX Hub 下载安装，插件版随 Standalone 授权附赠，亦可单独购买 Multi-Host Plugin 选项。",
      "knownIssues": [
        "插件版功能完整，但部分高级批处理仍需 Standalone 版"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网列出 Resolve 为 OFX 插件宿主之一"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网列出 Nuke (OFX)"
        },
        {
          "host": "fusion",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网列出 Fusion (OFX)"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网列出 VEGAS Pro (OFX)"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "frischluft-lenscare",
      "slug": "frischluft-lenscare",
      "name": "Frischluft Lenscare (OFX)",
      "developer": "Frischluft",
      "tagline": "基于 Z 深度的物理景深与虚焦",
      "category": [
        "diffusion",
        "effects"
      ],
      "tags": [
        "景深",
        "虚焦",
        "镜头散景",
        "Z 深度"
      ],
      "description": "经典景深插件，使用 Z 通道或自动景深估算生成物理准确的镜头散景与离焦效果，比宿主自带模糊更接近真实光学。单开发者小工作室作品，长期维护稳定。",
      "license": "one-time",
      "price": "$239（OpenFX 版，含税另计）",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://www.frischluft.com/lenscare/",
      "officialDownload": "https://www.frischluft.com/order/index.php",
      "downloadVerified": true,
      "sources": [
        "https://www.frischluft.com/lenscare/",
        "https://www.frischluft.com/order/index.php"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网订单页通过 Toolfarm 购买后下载 OFX 安装包，支持 Nuke/Fusion 等 OFX 宿主。",
      "knownIssues": [
        "官方订单页较朴素，通过 Toolfarm 完成支付"
      ],
      "compatibility": [
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "vendor-statement",
          "notes": "官网订单页明确列出 OpenFX 版（$239）"
        },
        {
          "host": "fusion",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "OFX 兼容宿主列表含 Digital Fusion"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "frischluft-flair",
      "slug": "frischluft-flair",
      "name": "Frischluft Flair (OFX)",
      "developer": "Frischluft",
      "tagline": "高质感 Glow、光 streak 与 sparkle",
      "category": [
        "effects",
        "diffusion"
      ],
      "tags": [
        "辉光",
        "glow",
        "光效",
        "高光"
      ],
      "description": "提供 8 种高品质光效：Glow（4 种算法）、Highlight（高光 streak）、Sparkle 等。比一般 glow 插件高光衰减更自然，常用于广告 MV 的镜头光晕。",
      "license": "one-time",
      "price": "价格以官网订单页为准",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://www.frischluft.com/flair/",
      "officialDownload": "https://www.frischluft.com/order/index.php",
      "downloadVerified": true,
      "sources": [
        "https://www.frischluft.com/flair/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网订单页购买后下载 OFX 版安装包，与 Lenscare 共用同一套授权体系。",
      "knownIssues": [],
      "compatibility": [
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "vendor-statement",
          "notes": "OFX 兼容宿主含 Nuke"
        },
        {
          "host": "fusion",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "OFX 兼容宿主含 Digital Fusion"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "beauty-box-video",
      "slug": "beauty-box-video",
      "name": "Beauty Box Video",
      "developer": "Digital Anarchy",
      "tagline": "自动人脸检测磨皮与数字化妆",
      "category": [
        "repair"
      ],
      "tags": [
        "磨皮",
        "人脸",
        "皮肤",
        "美白",
        "美颜"
      ],
      "description": "自动识别人脸肤色生成遮罩，仅在皮肤区域做平滑与油光消减，保留五官与细节。OFX 版原生支持 DaVinci Resolve 与 Nuke，v6.5 新增牙齿与眼白美白。",
      "license": "subscription",
      "price": "约 $89/宿主授权（以官网为准）",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://digitalanarchy.com/beauty-box-video/",
      "officialDownload": "https://digitalanarchy.com/downloads/davinci-resolve-ofx-beauty-box-video/",
      "downloadVerified": true,
      "sources": [
        "https://digitalanarchy.com/beauty-box-video/",
        "https://digitalanarchy.com/downloads/davinci-resolve-ofx-beauty-box-video/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载 DaVinci Resolve OFX 安装包（v6.5），关闭所有宿主后运行安装，在 OpenFX 面板的 Digital Anarchy 分类下调用。",
      "knownIssues": [
        "每个宿主平台需单独授权，跨宿主需补差价"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网提供 DaVinci Resolve OFX 独立安装包，兼容 Apple Silicon"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官方 OFX 构建覆盖 DaVinci Resolve 与 Nuke"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "pixeltools-film-emulsion",
      "slug": "pixeltools-film-emulsion",
      "name": "PixelTools Film/Emulsion",
      "developer": "PixelTools",
      "tagline": "光化学级真实胶片模拟（OFX + DCTL）",
      "category": [
        "film-emulation",
        "color-grading"
      ],
      "tags": [
        "胶片模拟",
        "颗粒",
        "密度",
        "色彩管理"
      ],
      "description": "基于真实光化学过程建模的胶片模拟插件，提供 OFX 与 DCTL 双版本。与 Deheader/ FilmConvert 不同的是它不烤 LUT，节点式可调密度、颗粒与高光滚降。",
      "license": "one-time",
      "price": "一次性买断，价格以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://pixeltoolspost.com/products/film-emulsion",
      "officialDownload": "https://pixeltoolspost.com/products/film-emulsion",
      "downloadVerified": true,
      "sources": [
        "https://pixeltoolspost.com/products/film-emulsion"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买后下载 OFX Beta 版（同时支持 Resolve 免费版与 Studio），在 OpenFX 面板调用。",
      "knownIssues": [
        "OFX 版为 Beta，DCTL 版需 Resolve Studio"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "OFX Beta 版在 Resolve 免费版与 Studio 均可运行"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "pixeltools-prime-grade",
      "slug": "pixeltools-prime-grade",
      "name": "PixelTools Prime/Grade",
      "developer": "PixelTools",
      "tagline": "一级校色三节点合一",
      "category": [
        "color-grading"
      ],
      "tags": [
        "一级校色",
        "白平衡",
        "示波器",
        "皮肤色"
      ],
      "description": "把一级校色中常用的曝光、白平衡、肤色监视、矢量示波器整合到一个节点，替代传统 Resolve 三节点工作流，带 DWG 色彩空间 Rec.709 校正与皮肤色检查器。",
      "license": "one-time",
      "price": "一次性买断，价格以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://pixeltoolspost.com/",
      "officialDownload": "https://pixeltoolspost.com/",
      "downloadVerified": true,
      "sources": [
        "https://pixeltoolspost.com/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买后下载 OFX 版，在 Resolve OpenFX 面板调用。",
      "knownIssues": [
        "OFX 版为 Beta"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "OFX Beta 版在 Resolve 免费版与 Studio 均可运行"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "pixeltools-phosphor",
      "slug": "pixeltools-phosphor",
      "name": "PixelTools Phosphor",
      "developer": "PixelTools",
      "tagline": "CRT / VHS / 摄像机复古模拟",
      "category": [
        "stylize"
      ],
      "tags": [
        "CRT",
        "VHS",
        "复古",
        "扫描线",
        "老电视"
      ],
      "description": "模拟 21 种复古信号路径：广播级监视器、家用 CRT、VHS 录像机、摄像机、游戏主机信号链与退化广播状态。用于 MV、复古广告与怀旧风格短片。",
      "license": "one-time",
      "price": "一次性买断，免费更新",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://pixeltoolspost.com/products/phosphor",
      "officialDownload": "https://pixeltoolspost.com/products/phosphor",
      "downloadVerified": true,
      "sources": [
        "https://pixeltoolspost.com/products/phosphor"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买后下载 OFX 安装包，在 Resolve OpenFX 面板调用。",
      "knownIssues": [],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网明确为 DaVinci Resolve Studio OFX 插件"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "newblue-titler-pro",
      "slug": "newblue-titler-pro",
      "name": "NewBlue Titler Pro 7",
      "developer": "NewBlue",
      "tagline": "500+ 模板的 3D 动态字幕",
      "category": [
        "effects"
      ],
      "tags": [
        "字幕",
        "3D 标题",
        "下三分之一",
        "动态图形"
      ],
      "description": "行业标准的 3D 动态字幕插件，500+ 预设模板，支持 PS/AE 素材导入，标题动画可跟随剪辑点动态调整。在 Resolve 剪辑页与调色页均可调用。",
      "license": "one-time",
      "price": "一次性买断，价格以官网为准",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://newbluefx.com/products/titling/titler-pro/",
      "officialDownload": "https://newbluefx.com/resolve-plugins/",
      "downloadVerified": true,
      "sources": [
        "https://newbluefx.com/products/titling/titler-pro/",
        "https://newbluefx.com/resolve-plugins/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载 DaVinci Resolve 专用安装包，安装后在 Effects Library 的 NewBlue 分类下拖拽 Titler Pro 到时间线。",
      "knownIssues": [
        "部分高级转场仅在 TotalFX 合集中提供"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网 Resolve 插件页明确列出 Titler Pro 7"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官方支持 VEGAS Pro（64-bit OpenFX）"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "openfx-misc",
      "slug": "openfx-misc",
      "name": "openfx-misc（Natron 插件集）",
      "developer": "Frédéric Devernay / NatronGitHub",
      "tagline": "开源合成基础工具集（GPL）",
      "category": [
        "effects",
        "repair"
      ],
      "tags": [
        "开源",
        "blur",
        "sharpen",
        "transform",
        "text",
        "CImg"
      ],
      "description": "Natron 项目维护的开源 OFX 插件集，提供 Blur/Sharpen/Transform/Text/TimeOffset 等基础合成节点，全部 GPL 协议。任何 OFX 宿主理论上都可加载，商业宿主通常自带等价工具。",
      "license": "open-source",
      "price": "免费开源（GPLv2）",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "http://devernay.free.fr/hacks/openfx/",
      "officialDownload": "https://github.com/NatronGitHub/openfx-misc",
      "downloadVerified": true,
      "sources": [
        "https://github.com/NatronGitHub/openfx-misc",
        "http://devernay.free.fr/hacks/openfx/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "从 GitHub Releases 下载预编译包，或将 OFX 插件目录加入宿主的 OpenFX 插件搜索路径。",
      "knownIssues": [
        "Resolve 对第三方开源 OFX 的加载路径需手动配置；性能低于商业宿主自带节点"
      ],
      "compatibility": [
        {
          "host": "nuke",
          "officialSupport": "unconfirmed",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "官方说明设计给 Natron，理论上兼容任何 OFX 宿主"
        },
        {
          "host": "fusion",
          "officialSupport": "unconfirmed",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "理论 OFX 兼容，社区有加载报告"
        },
        {
          "host": "davinci-resolve",
          "officialSupport": "unconfirmed",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "OFX 宿主理论兼容，需手动配置插件路径，本站未独立实测"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "openfx-io",
      "slug": "openfx-io",
      "name": "openfx-io（Natron 读写器）",
      "developer": "Frédéric Devernay / NatronGitHub",
      "tagline": "开源图像/视频读写器插件",
      "category": [
        "repair"
      ],
      "tags": [
        "开源",
        "reader",
        "writer",
        "FFmpeg",
        "OpenImageIO"
      ],
      "description": "Natron 项目的开源读写器插件集，基于 OpenImageIO 与 FFmpeg，支持 EXR/DPX/PNG/TIFF/ProRes/MP4/MOV 等多种格式在 OFX 宿主内直接读写。",
      "license": "open-source",
      "price": "免费开源（GPLv2）",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "http://devernay.free.fr/hacks/openfx/",
      "officialDownload": "https://github.com/NatronGitHub/openfx-io",
      "downloadVerified": true,
      "sources": [
        "https://github.com/NatronGitHub/openfx-io",
        "http://devernay.free.fr/hacks/openfx/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "GitHub Releases 下载预编译包，配置到宿主 OFX 插件搜索路径。",
      "knownIssues": [
        "商业宿主通常自带更完善的读写器，此插件主要服务 Natron 与开源流程"
      ],
      "compatibility": [
        {
          "host": "nuke",
          "officialSupport": "unconfirmed",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "理论 OFX 兼容"
        },
        {
          "host": "fusion",
          "officialSupport": "unconfirmed",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "理论 OFX 兼容"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "openfx-arena",
      "slug": "openfx-arena",
      "name": "openfx-arena",
      "developer": "NatronGitHub",
      "tagline": "开源额外特效插件集",
      "category": [
        "effects",
        "stylize"
      ],
      "tags": [
        "开源",
        "arena",
        "GPU",
        "CImg"
      ],
      "description": "Natron 生态下的额外开源 OFX 插件集合，提供部分 GPU 加速效果与实验性节点，与 openfx-misc、openfx-io 共同构成 Natron 开源插件三件套。",
      "license": "open-source",
      "price": "免费开源（GPLv2）",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://github.com/NatronGitHub/openfx-arena",
      "officialDownload": "https://github.com/NatronGitHub/openfx-arena/releases",
      "downloadVerified": true,
      "sources": [
        "https://github.com/NatronGitHub/openfx-arena"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "GitHub Releases 下载预编译包，与 openfx-misc 同样配置 OFX 插件路径。",
      "knownIssues": [
        "项目更新频率较低，部分插件仍在实验阶段"
      ],
      "compatibility": [
        {
          "host": "nuke",
          "officialSupport": "unconfirmed",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "理论 OFX 兼容"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "particle-illusion",
      "slug": "particle-illusion",
      "name": "Particle Illusion",
      "developer": "Boris FX",
      "tagline": " legendary 粒子生成器（OFX 插件版）",
      "category": [
        "effects"
      ],
      "tags": [
        "粒子",
        "光效",
        "烟雾",
        "火花",
        "mocha 跟踪"
      ],
      "description": "经典 2D/3D 粒子生成器，预置数百种发射器（烟、火、雪、火花、魔法），可链接 Mocha 平面跟踪数据让粒子贴合运动物体。插件版含 Continuum 订阅内，另有免费 Standalone 版。",
      "license": "subscription",
      "price": "含于 Continuum 订阅，或单独购买，价格以官网为准",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://borisfx.com/products/particle-illusion-2022/",
      "officialDownload": "https://borisfx.com/products/particle-illusion-2022/",
      "downloadVerified": true,
      "sources": [
        "https://borisfx.com/products/particle-illusion-2022/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "通过 Boris FX Hub 安装，OFX 版自动挂载到 Resolve/VEGAS/Nuke 的 OpenFX 面板。",
      "knownIssues": [
        "macOS 上 3D Objects 部分功能不可用"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 DaVinci Resolve (OFX)"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 VEGAS Pro (OFX)"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 Nuke (OFX)"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "prodad-vitascene",
      "slug": "prodad-vitascene",
      "name": "proDAD VitaScene OFX",
      "developer": "proDAD",
      "tagline": "1972 种滤镜与转场效果库",
      "category": [
        "effects",
        "stylize"
      ],
      "tags": [
        "转场",
        "滤镜",
        "光晕",
        "老电影",
        "一键预设"
      ],
      "description": "德国 proDAD 出品的综合效果库，20 个包共 1972 种效果与转场，全部以 OFX 插件形式挂载，适合快速给素材加电影感、复古、光晕、边缘模糊等风格化处理。",
      "license": "one-time",
      "price": "一次性买断，价格以官网为准",
      "platforms": [
        "windows"
      ],
      "officialHome": "https://www.prodad.com/Videoeffekte-Uebergaenge/Vitascene-OFX-111089,l-de.html",
      "officialDownload": "https://www.prodad.com/Videoeffekte-Uebergaenge/Vitascene-OFX-111089,l-de.html",
      "downloadVerified": true,
      "sources": [
        "https://www.prodad.com/Videoeffekte-Uebergaenge/Vitascene-OFX-111089,l-de.html"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买后下载 OFX 专用安装包，安装后在 Resolve/VEGAS 的 OpenFX 面板调用。",
      "knownIssues": [
        "官方页面为德语，可切换英文；目前主要 Windows 版"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 DaVinci Resolve 为 OFX 宿主"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 VEGAS Pro (OFX)"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "prodad-mercalli",
      "slug": "prodad-mercalli",
      "name": "proDAD Mercalli V6 OFX",
      "developer": "proDAD",
      "tagline": "AI 视频防抖与 CMOS 校正",
      "category": [
        "repair",
        "effects"
      ],
      "tags": [
        "防抖",
        "稳定",
        "CMOS 果冻",
        "云台",
        "AI"
      ],
      "description": "4 个插件组合：Stabilizr PRO（专业防抖）、CMOS-Fixr PRO（果冻校正）、RT（实时预览）、Picture Enhanzr RT（画面增强）。AI 辅助分析手持、云台、无人机素材。",
      "license": "one-time",
      "price": "一次性买断，价格以官网为准",
      "platforms": [
        "windows"
      ],
      "officialHome": "https://www.prodad.com/Video-Stabilisierung-fuer-Profis/Mercalli-OFX-Plug-Ins--108931,l-de.html",
      "officialDownload": "https://www.prodad.com/Video-Stabilisierung-fuer-Profis/Mercalli-OFX-Plug-Ins--108931,l-de.html",
      "downloadVerified": true,
      "sources": [
        "https://www.prodad.com/Video-Stabilisierung-fuer-Profis/Mercalli-OFX-Plug-Ins--108931,l-de.html"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网购买 OFX 版，在 Resolve/VEGAS 的 OpenFX 面板第三方插件目录下调用。",
      "knownIssues": [
        "主要 Windows 版"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 DaVinci Resolve 为 OFX 宿主"
        },
        {
          "host": "vegas-pro",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 VEGAS Pro (OFX)"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "arri-film-lab",
      "slug": "arri-film-lab",
      "name": "ARRI Film Lab",
      "developer": "RE:Vision Effects（与 ARRI 合作）",
      "tagline": "ARRI 官方胶片冲印模拟",
      "category": [
        "film-emulation",
        "color-grading"
      ],
      "tags": [
        "ARRI",
        "胶片模拟",
        "冲印",
        "halation",
        "ACES"
      ],
      "description": "由 RE:Vision Effects 与 ARRI 合作开发的官方胶片实验室模拟插件，覆盖 8mm 到 65mm 多格式、变形宽银幕颗粒、halation、ACES 2.0 色彩管理。7 天无水印试用。",
      "license": "subscription",
      "price": "订阅制，价格以官网为准",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://revisionfx.com/products/arrifilmlab/",
      "officialDownload": "https://revisionfx.com/products/arrifilmlab/",
      "downloadVerified": true,
      "sources": [
        "https://revisionfx.com/products/arrifilmlab/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载 OFX 安装包，在 Resolve/Baselight/Nuke 中调用，7 天无水印试用。",
      "knownIssues": [
        "RGB 处理速度比传统流程快 4 倍，对 GPU 有要求"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官网明确支持 DaVinci Resolve OFX"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网列出 Nuke"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "reframe360",
      "slug": "reframe360",
      "name": "Reframe360",
      "developer": "Reframe360（独立开发者）",
      "tagline": "免费 360° 全景重新取景 OFX",
      "category": [
        "effects"
      ],
      "tags": [
        "360",
        "全景",
        "overcapture",
        "VR",
        "免费"
      ],
      "description": "免费 OFX 插件，在等距柱状 360° 素材上做实时 overcapture 取景，模拟手持相机摇移。Resolve 社区推荐用于 Insta360/大疆 360 素材的二次构图。",
      "license": "free",
      "price": "免费",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "http://reframe360.com/",
      "officialDownload": "http://reframe360.com/",
      "downloadVerified": true,
      "sources": [
        "http://reframe360.com/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载 OFX 插件包，安装后在 Resolve OpenFX 面板调用。",
      "knownIssues": [
        "缩放倍数有下限，太近会有伪影"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "community-report",
          "notes": "Blackmagic 官方论坛用户实测确认在 Resolve 中工作"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "opendrt",
      "slug": "opendrt",
      "name": "OpenDRT",
      "developer": "Dec. 18 Studios",
      "tagline": "开源 Display Rendering Transform",
      "category": [
        "color-grading",
        "scopes"
      ],
      "tags": [
        "开源",
        "ACES",
        "display transform",
        "示波器",
        "诊断"
      ],
      "description": "免费开源的显示转换 OFX 插件，内置 tonescale、示波器诊断，面向 Resolve/Fusion/Nuke 的场景参考工作流。无订阅无水印，开发者 ko-fi 接受捐赠。",
      "license": "open-source",
      "price": "免费开源",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://tools.dec18studios.com/color-grading-tools/opendrt/",
      "officialDownload": "https://tools.dec18studios.com/color-grading-tools/opendrt/",
      "downloadVerified": true,
      "sources": [
        "https://tools.dec18studios.com/color-grading-tools/opendrt/"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "官网下载 OFX 插件包，配置到宿主 OpenFX 插件路径。",
      "knownIssues": [
        "项目较新，仍在活跃开发"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 Resolve 为支持宿主"
        },
        {
          "host": "fusion",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 Fusion"
        },
        {
          "host": "nuke",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "official-docs",
          "notes": "官网明确列出 Nuke"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "film-juicer",
      "slug": "film-juicer",
      "name": "Film-Juicer",
      "developer": "oldandangry（社区开源）",
      "tagline": "Spektrafilm 的 GPLv3 开源移植",
      "category": [
        "film-emulation"
      ],
      "tags": [
        "开源",
        "胶片模拟",
        "GPLv3",
        "光谱",
        "免费"
      ],
      "description": "基于 Spektrafilm 的光谱胶片模拟开源移植，模拟从拍摄、冲洗、光学印片到扫描的完整胶片过程。GPLv3 协议，免费。",
      "license": "open-source",
      "price": "免费开源（GPLv3）",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://github.com/oldandangry/Film-Juicer",
      "officialDownload": "https://github.com/oldandangry/Film-Juicer/releases",
      "downloadVerified": true,
      "sources": [
        "https://github.com/oldandangry/Film-Juicer"
      ],
      "lastVerified": "2026-10-21",
      "installationGuide": "GitHub Releases 下载预编译包，配置 OFX 插件路径后在 Resolve 中调用。",
      "knownIssues": [
        "社区开源项目，无官方商业支持"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": false,
          "evidenceLevel": "community-report",
          "notes": "社区报告在 Resolve 中工作"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "colourlab-ai",
      "slug": "colourlab-ai",
      "name": "Colourlab AI（FilmLab OFX）",
      "developer": "Colourlab.ai",
      "tagline": "AI 自动调色与参考匹配",
      "category": [
        "color-grading",
        "film-emulation"
      ],
      "tags": [
        "AI",
        "自动调色",
        "参考匹配",
        "Look Designer",
        "Grainlab"
      ],
      "description": "AI 驱动的调色助手，作为 OFX 插件原生嵌入 DaVinci Resolve，自动白平衡、曝光、参考图匹配，含 Look Designer（设计电影感 LUT）与 Grainlab（胶片颗粒）。Pro 版 $400/年，14 天试用。",
      "license": "subscription",
      "price": "Pro $400/年，Studio $500/年，14 天试用",
      "platforms": [
        "windows",
        "macos",
        "linux"
      ],
      "officialHome": "https://colourlab.ai/",
      "officialDownload": "https://colourlab.ai/pricing-colourlab/",
      "downloadVerified": true,
      "sources": [
        "https://colourlab.ai/",
        "https://help.colourlab.ai/hc/en-us/articles/27946608458391"
      ],
      "lastVerified": "2026-10-22",
      "installationGuide": "官网下载 FilmLab AI OFX 安装包，安装后在 Resolve OpenFX 面板调用，需登录 Colourlab 账号激活。",
      "knownIssues": [
        "OFX 插件版不含批处理，批处理需独立桌面版"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方明确 OFX 插件版嵌入 Resolve，支持任意色彩空间"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    },
    {
      "id": "colourlab-freelab",
      "slug": "colourlab-freelab",
      "name": "Colourlab Freelab",
      "developer": "Colourlab.ai",
      "tagline": "免费自动相机 LUT 匹配插件",
      "category": [
        "color-grading"
      ],
      "tags": [
        "免费",
        "LUT",
        "相机匹配",
        "AI"
      ],
      "description": "Colourlab 出品的免费插件，自动识别相机素材并匹配对应 LUT，一键把 Log 素材转换到正确的色彩空间。无订阅无水印，用于快速粗调。",
      "license": "free",
      "price": "免费",
      "platforms": [
        "windows",
        "macos"
      ],
      "officialHome": "https://colourlab.ai/freelab/",
      "officialDownload": "https://colourlab.ai/freelab/",
      "downloadVerified": true,
      "sources": [
        "https://colourlab.ai/freelab/"
      ],
      "lastVerified": "2026-10-22",
      "installationGuide": "官网下载 Freelab 安装包，在 Resolve OpenFX 面板调用。",
      "knownIssues": [
        "免费版功能精简，完整 AI 匹配需 Colourlab AI 订阅"
      ],
      "compatibility": [
        {
          "host": "davinci-resolve",
          "officialSupport": "supported",
          "studioOnly": true,
          "evidenceLevel": "official-docs",
          "notes": "官方说明在 Resolve 中实时运行"
        },
        {
          "host": "jianying-pro",
          "officialSupport": "unconfirmed",
          "evidenceLevel": "no-official-info",
          "notes": "剪映专业版官方未公开 OFX 宿主能力"
        }
      ]
    }
  ]
};
