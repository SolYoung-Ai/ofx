/* ============================================================
   app.js · 应用启动与全局事件
   ============================================================ */
(function () {
  "use strict";

  const U = window.OFXUtils;
  const Store = window.OFXStore;
  const Router = window.OFXRouter;

  function initTheme() {
    Store.setTheme(Store.getTheme());
    document.getElementById("theme-toggle").addEventListener("click", () => {
      const next = Store.getTheme() === "dark" ? "light" : "dark";
      Store.setTheme(next);
      U.toast(next === "dark" ? "已切换为深色主题" : "已切换为浅色主题");
    });
  }

  function initFooter() {
    const verified =
      (window.PLUGINS_DATA && window.PLUGINS_DATA.lastVerified) || "";
    document.getElementById("footer-verified").textContent = verified || "未知";
  }

  function init() {
    initTheme();
    initFooter();

    /* 视图注册 */
    window.OFXViews.home.bind();
    window.OFXViews.compare.bind();
    window.OFXViews.compare.updateDrawer();

    /* 启动路由 */
    Router.start();

    /* 全局：data-nav 链接交给 hash 路由（不拦截普通外链） */
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-nav]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        /* 交给 hashchange 处理；无需阻止默认 */
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
