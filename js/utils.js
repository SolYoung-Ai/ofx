/* ============================================================
   utils.js · 通用工具函数
   ============================================================ */
window.OFXUtils = (() => {
  /** HTML 转义，防止注入 */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** 状态 → 徽章 */
  const STATUS_MAP = {
    confirmed: { label: "实测通过", cls: "badge-ok" },
    partial: { label: "部分可用", cls: "badge-warn" },
    failed: { label: "实测失败", cls: "badge-bad" },
    "official-supported": { label: "官方声明支持", cls: "badge-ok" },
    unconfirmed: { label: "官方资料未确认", cls: "badge-neutral" },
    "not-supported": { label: "官方确认不支持", cls: "badge-bad" },
    "user-report": { label: "用户反馈待复核", cls: "badge-info" },
  };
  function statusBadge(status) {
    const m = STATUS_MAP[status] || { label: status, cls: "badge-neutral" };
    return `<span class="badge ${m.cls}">${esc(m.label)}</span>`;
  }

  /** 证据等级 → 文字 */
  const EVIDENCE_MAP = {
    "official-docs": "官方文档 / 官网声明",
    "vendor-statement": "厂商发布页声明",
    "community-report": "社区实测反馈（待复核）",
    "self-tested": "本站独立实测",
    "no-official-info": "官方资料尚未确认",
  };
  function evidenceLabel(code) {
    return EVIDENCE_MAP[code] || code || "未知";
  }

  /** 复制文本：优先 Clipboard API，失败回退 execCommand，再失败提示手动复制 */
  async function copyText(text) {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* 继续尝试回退 */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      ta.setAttribute("readonly", "");
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /** Toast 提示 */
  let toastTimer = null;
  function toast(msg, isError) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle("error", !!isError);
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  /** 防抖 */
  function debounce(fn, ms) {
    let t = null;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  /** 官方链接安全渲染：新标签页 + noopener */
  function safeExternal(href, label, cls) {
    return `<a class="${cls || "btn-official"}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  }

  /** 平台名映射 */
  const PLATFORM_LABELS = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
  };
  function platformLabel(code) {
    return PLATFORM_LABELS[code] || code;
  }

  /** 授权类型映射 */
  const LICENSE_LABELS = {
    "free": "免费",
    "free-donation": "免费（捐赠制）",
    "one-time": "一次性买断",
    "subscription": "订阅制",
    "subscription-or-one-time": "订阅 / 买断",
  };
  function licenseLabel(code) {
    return LICENSE_LABELS[code] || code;
  }

  /** 分类映射（用于筛选与卡片） */
  const CATEGORY_LABELS = {
    "film-emulation": "胶片模拟",
    "color-grading": "调色",
    "noise-reduction": "降噪",
    "repair": "修复增强",
    "effects": "特效",
    "stylize": "风格化",
    "diffusion": "柔光扩散",
    "scopes": "示波监看",
    "monitoring": "监看",
    "retime": "变速",
    "free": "免费",
  };
  function categoryLabel(code) {
    return CATEGORY_LABELS[code] || code;
  }

  return {
    esc,
    statusBadge,
    evidenceLabel,
    copyText,
    toast,
    debounce,
    safeExternal,
    platformLabel,
    licenseLabel,
    categoryLabel,
  };
})();
