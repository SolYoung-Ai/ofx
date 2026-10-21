/* ============================================================
   utils.js · 通用工具函数（支持中英双语）
   ============================================================ */
window.OFXUtils = (() => {
  const I = window.OFXI18N;

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
    confirmed: { key: "status.confirmed", cls: "badge-ok" },
    partial: { key: "status.partial", cls: "badge-warn" },
    failed: { key: "status.failed", cls: "badge-bad" },
    "official-supported": { key: "status.officialSupported", cls: "badge-ok" },
    unconfirmed: { key: "status.unconfirmed", cls: "badge-neutral" },
    "not-supported": { key: "status.notSupported", cls: "badge-bad" },
    "user-report": { key: "status.userReport", cls: "badge-info" },
  };
  function statusBadge(status) {
    const m = STATUS_MAP[status] || { key: null, cls: "badge-neutral" };
    const label = m.key ? I.t(m.key) : status;
    return `<span class="badge ${m.cls}">${esc(label)}</span>`;
  }

  /** 证据等级 → 文字 */
  const EVIDENCE_MAP = {
    "official-docs": "evidence.officialDocs",
    "vendor-statement": "evidence.vendorStatement",
    "community-report": "evidence.communityReport",
    "self-tested": "evidence.selfTested",
    "no-official-info": "evidence.noOfficialInfo",
  };
  function evidenceLabel(code) {
    const key = EVIDENCE_MAP[code];
    return key ? I.t(key) : (code || I.t("common.unknown"));
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
    "free": "license.free",
    "free-donation": "license.freeDonation",
    "one-time": "license.oneTime",
    "subscription": "license.subscription",
    "subscription-or-one-time": "license.subOrOneTime",
  };
  function licenseLabel(code) {
    const key = LICENSE_LABELS[code];
    return key ? I.t(key) : code;
  }

  /** 分类映射（用于筛选与卡片） */
  const CATEGORY_LABELS = {
    "film-emulation": "cat.filmEmulation",
    "color-grading": "cat.colorGrading",
    "noise-reduction": "cat.noiseReduction",
    "repair": "cat.repair",
    "effects": "cat.effects",
    "stylize": "cat.stylize",
    "diffusion": "cat.diffusion",
    "scopes": "cat.scopes",
    "monitoring": "cat.monitoring",
    "retime": "cat.retime",
    "free": "cat.free",
  };
  function categoryLabel(code) {
    const key = CATEGORY_LABELS[code];
    return key ? I.t(key) : code;
  }

  /** 数据文本翻译（英文模式转换，找不到返回原文） */
  function tr(text) {
    return I.tr(text);
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
    tr,
  };
})();
