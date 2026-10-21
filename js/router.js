/* ============================================================
   router.js · Hash 路由（兼容 GitHub Pages / 子路径 / file://）
   路由格式：
     #/                          → 首页（插件库）
     #/plugin/:slug              → 插件详情
     #/compare                   → 对比工具
     #/troubleshoot              → 故障排查
     #/tools                     → 快捷复制
     #/feedback                  → 反馈
     #/changelog                 → 更新日志
     #/about                     → 关于 / 版权
   ============================================================ */
window.OFXRouter = (() => {
  const ROUTE_VIEWS = {
    "": "home",
    "/": "home",
    "/plugin": "plugin",
    "/compare": "compare",
    "/troubleshoot": "troubleshoot",
    "/tools": "tools",
    "/feedback": "feedback",
    "/changelog": "changelog",
    "/about": "about",
  };

  let current = { view: "home", params: {} };

  function parseHash() {
    const raw = location.hash || "#/";
    const qIdx = raw.indexOf("?");
    const path = (qIdx >= 0 ? raw.slice(0, qIdx) : raw).replace(/^#/, "") || "/";
    const queryStr = qIdx >= 0 ? raw.slice(qIdx + 1) : "";
    const query = {};
    if (queryStr) {
      queryStr.split("&").forEach((pair) => {
        const [k, v] = pair.split("=");
        if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || "");
      });
    }
    const segs = path.split("/").filter(Boolean);
    let view = ROUTE_VIEWS["/" + (segs[0] || "")];
    if (view === undefined) view = "home";
    const params = { query };
    if (segs.length >= 2) params.slug = decodeURIComponent(segs[1]);
    return { view, params };
  }

  function navigate(view, params) {
    let hash = "#/";
    if (view === "plugin" && params && params.slug) hash = "#/plugin/" + encodeURIComponent(params.slug);
    else if (view === "compare") hash = "#/compare";
    else if (view === "troubleshoot") hash = "#/troubleshoot";
    else if (view === "tools") hash = "#/tools";
    else if (view === "feedback") hash = "#/feedback";
    else if (view === "changelog") hash = "#/changelog";
    else if (view === "about") hash = "#/about";
    if (location.hash !== hash) location.hash = hash;
    render(parseHash());
  }

  function render(route) {
    current = route;
    const pages = document.querySelectorAll(".page");
    pages.forEach((p) => { p.hidden = true; });
    const target = document.getElementById("page-" + route.view);
    if (target) target.hidden = false;

    /* 更新导航高亮 */
    document.querySelectorAll(".main-nav a").forEach((a) => {
      const href = a.getAttribute("href");
      const active =
        (route.view === "home" && (href === "#/" || href === "#")) ||
        (href === "#/plugin" && route.view === "plugin") ||
        (href === "#/" + route.view && route.view !== "home" && route.view !== "plugin");
      a.classList.toggle("active", active);
    });

    /* 滚动回顶部（避免长列表残留位置） */
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    /* 触发对应视图渲染 */
    const renderers = window.OFXViews || {};
    switch (route.view) {
      case "home": renderers.home && renderers.home.render(route.params); break;
      case "plugin": renderers.plugin && renderers.plugin.render(route.params); break;
      case "compare": renderers.compare && renderers.compare.render(route.params); break;
      case "troubleshoot": renderers.troubleshoot && renderers.troubleshoot.render(route.params); break;
      case "tools": renderers.tools && renderers.tools.render(route.params); break;
      case "feedback": renderers.feedback && renderers.feedback.render(route.params); break;
      case "changelog": renderers.changelog && renderers.changelog.render(route.params); break;
      case "about": renderers.about && renderers.about.render(route.params); break;
      default: break;
    }
  }

  function start() {
    window.addEventListener("hashchange", () => render(parseHash()));
    render(parseHash());
  }

  return { start, navigate, current: () => current, parse: parseHash, render };
})();
