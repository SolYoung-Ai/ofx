/* ============================================================
   store.js · 本地状态管理（主题 / 对比列表 / 反馈草稿 / 收藏）
   全部使用 localStorage，纯浏览器本地，不做跨设备同步
   ============================================================ */
window.OFXStore = (() => {
  const KEYS = {
    theme: "ofx-atlas-theme",
    compare: "ofx-atlas-compare",
    draft: "ofx-atlas-feedback-draft",
    favs: "ofx-atlas-favs",
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* 隐私模式或存储不可用时静默失败 */
    }
  }

  return {
    getTheme() {
      const saved = read(KEYS.theme, null);
      if (saved === "light" || saved === "dark") return saved;
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "dark"; /* 默认深色（影视工作站风格） */
    },
    setTheme(t) {
      write(KEYS.theme, t);
      document.documentElement.setAttribute("data-theme", t);
    },
    getCompare() {
      const list = read(KEYS.compare, []);
      return Array.isArray(list) ? list.filter((s) => typeof s === "string") : [];
    },
    setCompare(list) {
      write(KEYS.compare, list.slice(0, 4));
    },
    getDraft() {
      return read(KEYS.draft, null);
    },
    setDraft(d) {
      write(KEYS.draft, d);
    },
    clearDraft() {
      try { localStorage.removeItem(KEYS.draft); } catch (e) { /* ignore */ }
    },
    getFavs() {
      const list = read(KEYS.favs, []);
      return Array.isArray(list) ? list : [];
    },
    setFavs(list) {
      write(KEYS.favs, list);
    },
  };
})();
