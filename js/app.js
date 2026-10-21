/* ============================================================
   app.js · 应用启动与全局事件
   ============================================================ */
(function () {
  "use strict";

  const U = window.OFXUtils;
  const Store = window.OFXStore;
  const Router = window.OFXRouter;
  const I18N = window.OFXI18N;

  function initTheme() {
    Store.setTheme(Store.getTheme());
    document.getElementById("theme-toggle").addEventListener("click", () => {
      const next = Store.getTheme() === "dark" ? "light" : "dark";
      Store.setTheme(next);
      U.toast(next === "dark" ? I18N.t("toast.themeDark") : I18N.t("toast.themeLight"));
    });
  }

  function initLang() {
    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        I18N.toggle();
        U.toast(I18N.lang === "en" ? "Switched to English" : "已切换为中文");
      });
    }
    I18N.applyStatic();
  }

  function initFooter() {
    const verified =
      (window.PLUGINS_DATA && window.PLUGINS_DATA.lastVerified) || "";
    document.getElementById("footer-verified").textContent = verified || I18N.t("common.unknown");
  }

  function init() {
    initTheme();
    initLang();
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
