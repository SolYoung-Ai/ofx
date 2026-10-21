/* ============================================================
   views/about.js · 关于 / 版权声明 + 核验记录
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.about = (() => {
  const U = window.OFXUtils;

  function render() {
    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const plugins = (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
    const listEl = document.getElementById("about-verified-list");

    listEl.innerHTML = [
      `<li>本数据库收录插件 ${plugins.length} 款，全部官方来源可核验；最近核验日期见各插件详情页。</li>`,
      ...hosts.map((h) => {
        const status =
          h.ofxSupport === "supported" ? "官方确认支持 OFX"
          : h.ofxSupport === "unconfirmed" ? "官方资料尚未确认"
          : h.ofxSupport === "not-supported" ? "官方确认不支持"
          : h.ofxSupport;
        return `<li>${U.esc(h.name)}：${U.esc(status)}（${U.esc(h.lastVerified || "未知")} 核验）</li>`;
      }),
      `<li>剪映专业版：官方开放平台（open.capcut.cn）插件列表为空，官网与学习页无 OFX 说明；公开渠道暂无可靠原生 OFX 实测。全站剪映兼容性按「官方资料尚未确认」标注。</li>`,
    ].join("");
  }

  return { render };
})();
