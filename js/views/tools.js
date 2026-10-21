/* ============================================================
   views/tools.js · 快捷复制面板
   A. OFX 插件路径速查（标注为常见路径，非厂商指定）
   B. 环境信息模板
   C. 故障排查模板
   D. 常用核验清单
   E. 可复现的实用配置/参数（仅收录有明确来源、可复现的条目）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.tools = (() => {
  const U = window.OFXUtils;

  function render() {
    const wrap = document.getElementById("tools-panel");

    const pathWindows =
      "OFX 插件常见安装路径（Windows）\n" +
      "----------------------------------------\n" +
      "C:\\Program Files\\Common Files\\OFX\\Plugins\n" +
      "C:\\Program Files\\Common Files\\OFX\\Plugins\\<厂商名>\\<插件名>.bundle\n" +
      "\n" +
      "说明：OFX 插件通常以 .bundle 目录形式安装到 OFX 公共目录，\n" +
      "宿主启动时扫描该目录。此为常见路径，具体以插件官方安装说明为准。";

    const pathMac =
      "OFX 插件常见安装路径（macOS）\n" +
      "----------------------------------------\n" +
      "/Library/OFX/Plugins/\n" +
      "~/Library/OFX/Plugins/\n" +
      "\n" +
      "说明：系统级路径 /Library/OFX/Plugins 对所有用户生效，\n" +
      "用户级路径 ~/Library/OFX/Plugins 仅对当前用户生效。\n" +
      "具体以插件官方安装说明为准。";

    const envTemplate =
      "环境信息模板（复制后填写）\n" +
      "----------------------------------------\n" +
      "软件名称与版本：\n" +
      "插件名称与版本：\n" +
      "操作系统：\n" +
      "处理器架构（Intel / Apple Silicon / AMD）：\n" +
      "显卡型号与显存：\n" +
      "显卡驱动版本：\n" +
      "素材规格（分辨率/帧率/编码）：\n" +
      "问题现象：\n" +
      "复现步骤：\n" +
      "相关截图或日志：";

    const faultTemplate =
      "故障排查模板（提交给插件开发者/技术支持）\n" +
      "----------------------------------------\n" +
      "1. 问题描述：\n" +
      "2. 出现问题的宿主与版本：\n" +
      "3. 插件版本：\n" +
      "4. 操作系统与硬件：\n" +
      "5. 是否仅在特定素材/色彩空间下出现：\n" +
      "6. 已尝试的排查步骤：\n" +
      "7. 报错信息（原文/截图）：";

    const checklist =
      "OFX 插件核验清单（按顺序逐项检查）\n" +
      "----------------------------------------\n" +
      "□ 宿主是否支持 OFX 标准（达芬奇需 Studio 版）\n" +
      "□ 插件官方是否声明支持该宿主与系统\n" +
      "□ 安装时是否选择了对应宿主（OFX）的安装器\n" +
      "□ 插件是否安装到 OFX 公共插件目录\n" +
      "□ 宿主是否已重启 / 重新扫描插件\n" +
      "□ 操作系统与处理器架构是否符合插件要求\n" +
      "□ 显卡驱动是否满足插件与宿主要求\n" +
      "□ 显存是否满足素材规格（4K 建议 8GB+）\n" +
      "□ 是否查看过插件官方『已知问题』文档\n" +
      "□ 是否将结果反馈给插件厂商或本站";

    const practicalParams =
      "可复现的实用配置说明\n" +
      "----------------------------------------\n" +
      "■ Dehancer Pro（达芬奇）：4K 时间线建议显卡显存 ≥ 8GB；\n" +
      "  NVIDIA 驱动版本 461/516/522 已知可能崩溃，建议更新驱动。\n" +
      "  （来源：Dehancer 官方 OFX 安装指南）\n" +
      "\n" +
      "■ Neat Video（达芬奇）：时间性降噪占用显存高，\n" +
      "  4K 时间线官方建议至少 8GB GPU 显存；优先在噪点区域\n" +
      "  采样分析以获得更好效果。（来源：Neat Video 官方文档）\n" +
      "\n" +
      "■ 达芬奇 17+：偏好设置 → 系统 → 视频插件，可单独启用/禁用\n" +
      "  OFX 插件；软件会自动跳过曾导致崩溃的插件。\n" +
      "  （来源：Blackmagic 官方新功能指南）\n" +
      "\n" +
      "以上均为官方文档可查证的信息，非本站自造参数。\n" +
      "具体参数请以各插件官方最新文档为准。";

    const cards = [
      { title: "A · OFX 插件路径速查（Windows）", desc: "常见安装路径，供排查「插件没出现在列表」时核对。", text: pathWindows },
      { title: "B · OFX 插件路径速查（macOS）", desc: "常见安装路径，供排查时核对。", text: pathMac },
      { title: "C · 环境信息模板", desc: "复制后填写，用于向插件开发者或技术支持提交问题。", text: envTemplate },
      { title: "D · 故障排查模板", desc: "结构化的问题描述，方便对方快速定位。", text: faultTemplate },
      { title: "E · 常用核验清单", desc: "安装与兼容性逐项自检清单，可直接复制。", text: checklist },
      { title: "F · 可复现的实用配置说明", desc: "仅收录官方文档可查证的配置信息，标注来源。", text: practicalParams },
    ];

    wrap.innerHTML = `
      <div class="tools-grid">
        ${cards.map((c, i) => `
          <article class="tool-card">
            <h2>${U.esc(c.title)}</h2>
            <p>${U.esc(c.desc)}</p>
            <textarea id="tool-text-${i}" readonly>${U.esc(c.text)}</textarea>
            <div style="display:flex;align-items:center;gap:10px">
              <button type="button" class="btn-secondary copy-btn" data-i="${i}">复制内容</button>
              <span class="copy-note">点击复制按钮即复制到剪贴板</span>
            </div>
          </article>`).join("")}
      </div>`;

    wrap.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const i = btn.getAttribute("data-i");
        const ta = document.getElementById(`tool-text-${i}`);
        const ok = await U.copyText(ta.value);
        U.toast(ok ? "已复制到剪贴板" : "复制失败，请手动选择复制", !ok);
      });
    });
  }

  return { render };
})();
