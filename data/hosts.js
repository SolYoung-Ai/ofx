window.HOSTS_DATA = {
  "schemaVersion": "1.0",
  "lastVerified": "2026-10-21",
  "hosts": [
    {
      "id": "jianying-pro",
      "name": "剪映专业版",
      "vendor": "剪映（字节跳动）",
      "ofxSupport": "unconfirmed",
      "statusLabel": "官方资料尚未确认",
      "summary": "截至 2026-10-21 核验：剪映官方公开资料中未找到对第三方 OFX 插件原生加载能力的正式说明；剪映开放平台（open.capcut.cn）插件列表为空；公开渠道暂无可靠的可复现原生 OFX 实测记录。部分用户界面可见 OFX 相关入口，但官方未文档化，本站在此状态解除前一律按『官方资料尚未确认』标注。",
      "notes": [
        "官方官网与学习页未提及 OFX 插件",
        "open.capcut.cn 插件列表页显示『暂无数据』",
        "第三方软件站 FAQ 曾描述『官方未开放第三方插件』",
        "如你已在实际安装的剪映版本中看到 OFX 入口，欢迎通过反馈表单提交你的版本号与实测记录"
      ],
      "sources": [
        "https://www.capcut.cn/readme",
        "https://open.capcut.cn/",
        "https://www.capcut.cn/pc_download"
      ],
      "lastVerified": "2026-10-21"
    },
    {
      "id": "davinci-resolve",
      "name": "DaVinci Resolve（Studio）",
      "vendor": "Blackmagic Design",
      "ofxSupport": "supported",
      "statusLabel": "官方确认支持（本站尚未独立实测）",
      "summary": "Blackmagic Design 官方文档明确说明 DaVinci Resolve 支持 OpenFX（OFX）标准，可在调色页与 Fusion 页面加载第三方 OFX 插件。注意：第三方 OFX 插件需要 Studio 版本，免费版不加载第三方 OFX 插件。",
      "notes": [
        "官方参考手册明确列出第三方 OpenFX 插件加载能力",
        "免费版不支持第三方 OFX 插件（Blackmagic 官方限制）",
        "Resolve 17+ 可在启动时选择性启用/禁用 OFX 插件，自动跳过曾导致崩溃的插件"
      ],
      "sources": [
        "https://documents.blackmagicdesign.com/UserManuals/DaVinciResolveReferenceManual.pdf",
        "https://www.alestemple.net/store/ofx-plugins/rgburst-rgb-split-chromatic-aberration-ofx-plugin.html"
      ],
      "lastVerified": "2026-10-21"
    },
    {
      "id": "vegas-pro",
      "name": "VEGAS Pro",
      "vendor": "MAGIX",
      "ofxSupport": "supported",
      "statusLabel": "官方确认支持",
      "summary": "MAGIX VEGAS Pro 支持 OpenFX 标准，可作为 OFX 宿主加载第三方插件。OpenFX 官网亦将 VEGAS Pro 列为支持宿主。",
      "notes": [
        "OpenFX 官网列出 VEGAS Pro 为支持宿主",
        "多个插件厂商（Boris FX、RE:Vision 等）明确提供 Vegas 版本"
      ],
      "sources": [
        "https://openeffects.org/"
      ],
      "lastVerified": "2026-10-21"
    },
    {
      "id": "nuke",
      "name": "The Foundry Nuke",
      "vendor": "The Foundry",
      "ofxSupport": "supported",
      "statusLabel": "官方确认支持",
      "summary": "Nuke 是 OpenFX 标准的创始支持者之一，原生支持 OFX 插件加载，插件生态丰富。",
      "notes": [
        "OpenFX 官网将 Nuke 列为支持宿主"
      ],
      "sources": [
        "https://openeffects.org/"
      ],
      "lastVerified": "2026-10-21"
    },
    {
      "id": "fusion",
      "name": "Blackmagic Fusion（Studio）",
      "vendor": "Blackmagic Design",
      "ofxSupport": "supported",
      "statusLabel": "官方确认支持",
      "summary": "Fusion Studio 支持 OFX 插件加载（如 Boris FX 等），与达芬奇同一生态。",
      "notes": [
        "OpenFX 官网与插件厂商文档均将 Fusion 列为支持宿主"
      ],
      "sources": [
        "https://openeffects.org/"
      ],
      "lastVerified": "2026-10-21"
    }
  ]
};
