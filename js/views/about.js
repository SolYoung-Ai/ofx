/* ============================================================
   views/about.js · 关于 / 版权声明 + 核验记录（支持中英双语）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.about = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;

  function render() {
    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const plugins = (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
    const listEl = document.getElementById("about-verified-list");

    listEl.innerHTML = [
      `<li>${I.t("about.records.plugins1")}${plugins.length}${I.t("about.records.plugins2")}</li>`,
      ...hosts.map((h) => {
        const status =
          h.ofxSupport === "supported" ? I.t("status.officialSupported")
          : h.ofxSupport === "unconfirmed" ? I.t("status.unconfirmed")
          : h.ofxSupport === "not-supported" ? I.t("status.notSupported")
          : h.ofxSupport;
        return `<li>${U.esc(I.tr(h.name))}：${U.esc(status)}（${U.esc(h.lastVerified || I.t("common.unknown"))} ${I.t("about.records.verifiedSuffix")}）</li>`;
      }),
      `<li>${I.tr("剪映专业版：官方开放平台（open.capcut.cn）插件列表为空，官网与学习页无 OFX 说明；公开渠道暂无可靠原生 OFX 实测。全站剪映兼容性按「官方资料尚未确认」标注。")}</li>`,
    ].join("");
  }

  return { render };
})();
