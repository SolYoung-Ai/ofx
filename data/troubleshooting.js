window.TROUBLESHOOT_DATA = {
  "schemaVersion": "1.0",
  "lastVerified": "2026-10-21",
  "intro": "按照你的实际情况逐步选择，系统会根据答案给出针对性排查建议。所有建议均为通用排查步骤，不包含删除系统文件、修改注册表等高风险操作。",
  "steps": [
    {
      "id": "q1",
      "question": "你在哪个软件中使用 OFX 插件？",
      "choices": [
        {
          "label": "DaVinci Resolve",
          "value": "resolve",
          "next": "q2"
        },
        {
          "label": "剪映专业版",
          "value": "jianying",
          "next": "q2"
        },
        {
          "label": "VEGAS Pro / Nuke / Fusion 等其他 OFX 宿主",
          "value": "other",
          "next": "q2"
        }
      ]
    },
    {
      "id": "q2",
      "question": "你的操作系统是？",
      "choices": [
        {
          "label": "Windows",
          "value": "windows",
          "next": "q3"
        },
        {
          "label": "macOS",
          "value": "macos",
          "next": "q3"
        },
        {
          "label": "Linux",
          "value": "linux",
          "next": "q3"
        }
      ]
    },
    {
      "id": "q3",
      "question": "你遇到的具体问题是什么？",
      "choices": [
        {
          "label": "插件没有出现在效果列表中",
          "value": "not-listed",
          "next": "result-not-listed"
        },
        {
          "label": "插件无法加载或提示错误",
          "value": "load-error",
          "next": "result-load-error"
        },
        {
          "label": "软件启动时崩溃",
          "value": "crash",
          "next": "result-crash"
        },
        {
          "label": "插件能打开，但画面显示异常",
          "value": "display-glitch",
          "next": "result-display"
        },
        {
          "label": "渲染结果异常或黑屏",
          "value": "render-black",
          "next": "result-render"
        },
        {
          "label": "插件可以用，但运行缓慢",
          "value": "slow",
          "next": "result-slow"
        },
        {
          "label": "授权或激活出现问题",
          "value": "license",
          "next": "result-license"
        }
      ]
    }
  ],
  "results": {
    "result-not-listed": {
      "title": "插件没有出现在列表中",
      "summary": "最常见原因是宿主不加载该 OFX 插件、安装路径不对，或没有重新扫描插件。",
      "causes": [
        {
          "reason": "使用的是 DaVinci Resolve 免费版：第三方 OFX 插件不被加载，需 Studio 版本",
          "confidence": "高（官方限制）"
        },
        {
          "reason": "使用的是剪映专业版：官方资料尚未确认其原生 OFX 宿主能力，插件不被识别属正常现象",
          "confidence": "高（官方资料缺失）"
        },
        {
          "reason": "插件未安装到正确的 OFX 插件目录",
          "confidence": "中"
        },
        {
          "reason": "宿主未重新扫描/重启，插件列表未刷新",
          "confidence": "中"
        },
        {
          "reason": "插件版本与宿主版本不兼容",
          "confidence": "中"
        }
      ],
      "steps": [
        "确认你使用的宿主版本：达芬奇请检查是否为 Studio 版（免费版不支持第三方 OFX）",
        "剪映专业版请先查阅官方资料确认 OFX 能力，勿默认支持",
        "确认插件安装时选择了对应宿主（OFX）的安装器",
        "重启宿主软件，必要时重启电脑后再次打开",
        "在达芬奇 17+ 的 偏好设置 → 系统 → 视频插件 中检查插件是否被禁用",
        "查看插件官网的系统要求与支持宿主列表，确认版本匹配"
      ],
      "relatedHosts": [
        "davinci-resolve",
        "jianying-pro"
      ]
    },
    "result-load-error": {
      "title": "插件无法加载或提示错误",
      "summary": "加载失败通常与宿主版本、插件位数/架构、或缺少依赖有关。",
      "causes": [
        {
          "reason": "宿主为免费版达芬奇：第三方 OFX 不加载",
          "confidence": "高（官方限制）"
        },
        {
          "reason": "插件架构与系统不匹配（如 Apple Silicon 下运行 Intel 版插件）",
          "confidence": "中"
        },
        {
          "reason": "插件安装不完整或损坏",
          "confidence": "中"
        },
        {
          "reason": "与已安装的其他插件冲突",
          "confidence": "低"
        }
      ],
      "steps": [
        "确认宿主版本满足插件官方要求",
        "重新运行插件官方安装程序，选择正确宿主",
        "Apple Silicon 用户检查是否安装了对应原生/通用版本",
        "查看插件官方『已知问题』与『系统要求』文档",
        "将具体报错信息（截图）提供给插件厂商技术支持"
      ],
      "relatedHosts": [
        "davinci-resolve",
        "jianying-pro"
      ]
    },
    "result-crash": {
      "title": "软件启动时崩溃",
      "summary": "插件加载导致的启动崩溃，建议先定位是否为 OFX 插件引起，再逐项排查。",
      "causes": [
        {
          "reason": "某个 OFX 插件与宿主版本不兼容",
          "confidence": "中"
        },
        {
          "reason": "显卡驱动版本过旧或过新",
          "confidence": "中"
        },
        {
          "reason": "显存不足或存在多 GPU 配置问题",
          "confidence": "中"
        }
      ],
      "steps": [
        "达芬奇 17+：在偏好设置的视频插件面板中禁用可疑插件后重启，逐个排查",
        "更新显卡驱动到官方推荐版本",
        "确认显存满足插件与 4K/8K 素材要求",
        "如无法进入软件，先卸载最近安装的 OFX 插件再尝试",
        "切勿随意删除系统文件或修改注册表；必要时联系官方支持"
      ],
      "relatedHosts": [
        "davinci-resolve"
      ]
    },
    "result-display": {
      "title": "画面显示异常",
      "summary": "画面异常（偏色、花屏、闪烁等）多与 GPU 加速或插件设置有关。",
      "causes": [
        {
          "reason": "GPU 驱动或 GPU 加速模式与插件不兼容",
          "confidence": "中"
        },
        {
          "reason": "插件参数设置超出合理范围",
          "confidence": "中"
        },
        {
          "reason": "显卡驱动过旧",
          "confidence": "低"
        }
      ],
      "steps": [
        "尝试关闭该插件的 GPU 加速选项（如 Dehancer 的 CUDA/OpenCL 切换）",
        "重置插件参数为默认值",
        "更新显卡驱动",
        "确认是否只在特定素材/色彩空间下出现，并记录复现条件"
      ],
      "relatedHosts": [
        "davinci-resolve"
      ]
    },
    "result-render": {
      "title": "渲染结果异常或黑屏",
      "summary": "渲染异常常与显存不足、GPU 加速或代理素材有关。",
      "causes": [
        {
          "reason": "显存不足（4K/8K 时间线对显存要求高）",
          "confidence": "中"
        },
        {
          "reason": "GPU 加速与插件冲突",
          "confidence": "中"
        },
        {
          "reason": "渲染设置与插件色彩空间冲突",
          "confidence": "低"
        }
      ],
      "steps": [
        "降低预览分辨率或关闭插件的 GPU 加速后重试渲染",
        "确认渲染设置（色彩空间、位深）与插件要求一致",
        "分片段渲染定位具体出问题的片段",
        "向插件厂商提交带环境信息的故障报告（可用本站『复制面板』生成模板）"
      ],
      "relatedHosts": [
        "davinci-resolve"
      ]
    },
    "result-slow": {
      "title": "插件运行缓慢",
      "summary": "OFX 插件普遍对显卡与内存敏感，性能问题多为硬件瓶颈。",
      "causes": [
        {
          "reason": "显存/内存不满足 4K 及以上素材需求",
          "confidence": "高"
        },
        {
          "reason": "CPU 渲染（未启用 GPU 加速）",
          "confidence": "中"
        },
        {
          "reason": "时间线中同时叠加了多个重型插件",
          "confidence": "中"
        }
      ],
      "steps": [
        "核对插件官方对 4K/8K 素材的显存要求（如 Dehancer：4K 建议 8GB+）",
        "在插件设置中启用 GPU 加速（NVIDIA CUDA / AMD OpenCL）",
        "预览时使用代理或降低分辨率，最终渲染时再开启全精度",
        "避免在同一节点链上堆叠多个重型插件"
      ],
      "relatedHosts": [
        "davinci-resolve"
      ]
    },
    "result-license": {
      "title": "授权或激活出现问题",
      "summary": "授权问题通常与账号、激活方式或跨宿主授权范围有关。",
      "causes": [
        {
          "reason": "授权与宿主不匹配（如购买了 Adobe 版却用于 OFX 宿主）",
          "confidence": "中"
        },
        {
          "reason": "激活码/账号输入错误或超过设备数限制",
          "confidence": "中"
        },
        {
          "reason": "试用版过期",
          "confidence": "中"
        }
      ],
      "steps": [
        "确认购买的是对应宿主的授权（OFX/Resolve 版）",
        "检查设备激活数量限制（如 Nobe 支持 3 台设备）",
        "查看插件官网的激活与授权说明",
        "联系厂商客服获取授权支持"
      ],
      "relatedHosts": []
    }
  }
};
