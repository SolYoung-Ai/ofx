/* ============================================================
   views/plugin.js · 插件详情页
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.plugin = (() => {
  const U = window.OFXUtils;

  function findPlugin(slug) {
    const plugins = (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
    return plugins.find((p) => p.slug === slug) || null;
  }

  function hostName(id) {
    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const h = hosts.find((x) => x.id === id);
    return h ? h.name : id;
  }

  function render(params) {
    const wrap = document.getElementById("plugin-detail");
    const slug = params && params.slug;
    const plugin = findPlugin(slug);

    if (!plugin) {
      wrap.innerHTML = `
        <div class="empty-state">
          <h3>未找到该插件</h3>
          <p>插件可能已被移除，或链接有误。</p>
          <a href="#/" data-nav class="btn-primary" style="display:inline-block;margin-top:10px;text-decoration:none">返回插件库</a>
        </div>`;
      return;
    }

    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const hostNote = (id) => {
      const h = hosts.find((x) => x.id === id);
      return h ? `（${U.esc(h.name)}）` : "";
    };

    /* 兼容性矩阵 */
    const matrixRows = (plugin.compatibility || []).map((c) => {
      let statusTxt = "";
      if (c.officialSupport === "supported") statusTxt = U.statusBadge("official-supported");
      else if (c.officialSupport === "unconfirmed") statusTxt = U.statusBadge("unconfirmed");
      else if (c.officialSupport === "not-supported") statusTxt = U.statusBadge("not-supported");
      return `
        <tr>
          <td><strong>${U.esc(hostName(c.host))}</strong>${c.studioOnly ? '<br><span class="badge badge-warn">需 Studio 版</span>' : ""}</td>
          <td>${statusTxt}</td>
          <td>${U.esc(U.evidenceLabel(c.evidenceLevel))}</td>
          <td>${U.esc(c.notes || "")}</td>
        </tr>`;
    }).join("");

    /* 已知问题 */
    const issues = (plugin.knownIssues || []).map((i) => `<li>${U.esc(i)}</li>`).join("");

    /* 官方来源 */
    const sources = (plugin.sources || []).map((s) => `<li><a href="${U.esc(s)}" target="_blank" rel="noopener noreferrer">${U.esc(s)}</a></li>`).join("");

    /* 相关插件推荐（同分类） */
    const related = ((window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [])
      .filter((p) => p.slug !== plugin.slug && (p.category || []).some((c) => (plugin.category || []).includes(c)))
      .slice(0, 3)
      .map((p) => `
        <article class="plugin-card" style="padding:14px">
          <h4 class="pc-name" style="font-size:14.5px"><a href="#/plugin/${encodeURIComponent(p.slug)}" data-nav>${U.esc(p.name)}</a></h4>
          <p class="pc-tagline" style="font-size:12.5px">${U.esc(p.tagline)}</p>
        </article>`)
      .join("");

    const downloadBtn = plugin.downloadVerified && plugin.officialDownload
      ? U.safeExternal(plugin.officialDownload, "前往官方下载页", "btn-official")
      : `<span class="badge badge-neutral">官方来源待核验（暂不提供跳转）</span>`;

    wrap.innerHTML = `
      <div class="detail-hero">
        <div style="flex:1;min-width:260px">
          <h1 class="detail-title">${U.esc(plugin.name)}</h1>
          <div class="detail-dev">${U.esc(plugin.developer)} · 最近核验 ${U.esc(plugin.lastVerified || "未知")}</div>
          <p style="color:var(--text-dim);max-width:640px">${U.esc(plugin.description)}</p>
          <div class="detail-actions">
            ${downloadBtn}
            <button type="button" class="btn-secondary add-compare" data-slug="${U.esc(plugin.slug)}">加入对比</button>
            <button type="button" class="btn-ghost" id="copy-plugin-info">复制插件信息</button>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h2>基本资料</h2>
        <dl class="kv-grid">
          <div class="kv-item"><dt>授权方式</dt><dd>${U.esc(U.licenseLabel(plugin.license))}</dd></div>
          <div class="kv-item"><dt>价格</dt><dd>${U.esc(plugin.price || "未知")}</dd></div>
          <div class="kv-item"><dt>支持系统</dt><dd>${(plugin.platforms || []).map((p) => U.esc(U.platformLabel(p))).join(" / ") || "未知"}</dd></div>
          <div class="kv-item"><dt>分类</dt><dd>${(plugin.category || []).map((c) => U.esc(U.categoryLabel(c))).join(" / ")}</dd></div>
          <div class="kv-item"><dt>官方主页</dt><dd>${plugin.officialHome ? `<a href="${U.esc(plugin.officialHome)}" target="_blank" rel="noopener noreferrer">打开官网</a>` : "未知"}</dd></div>
          <div class="kv-item"><dt>数据核验日期</dt><dd>${U.esc(plugin.lastVerified || "未知")}</dd></div>
        </dl>
      </div>

      <div class="detail-section">
        <h2>兼容性矩阵</h2>
        <div style="overflow-x:auto">
          <table class="compat-matrix">
            <thead><tr><th>宿主</th><th>状态</th><th>证据等级</th><th>说明</th></tr></thead>
            <tbody>${matrixRows}</tbody>
          </table>
        </div>
        <p style="font-size:13px;color:var(--text-faint);margin-top:10px">
          证据等级说明：${U.esc(U.evidenceLabel("official-docs"))} · ${U.esc(U.evidenceLabel("vendor-statement"))} ·
          ${U.esc(U.evidenceLabel("community-report"))} · ${U.esc(U.evidenceLabel("no-official-info"))}。
          「官方声明支持」不代表本站已独立实测；「官方资料尚未确认」表示目前没有可靠资料证明兼容。
        </p>
      </div>

      <div class="detail-section">
        <h2>安装指南</h2>
        <p style="color:var(--text-dim)">${U.esc(plugin.installationGuide || "暂无安装说明。")}</p>
        <h3>已知问题 / 注意事项</h3>
        <ul class="issue-list">${issues || "<li>暂无公开的已知问题记录。</li>"}</ul>
      </div>

      <div class="detail-section">
        <h2>官方资料来源</h2>
        <ul class="sources-list">${sources}</ul>
        <p style="font-size:13px;color:var(--text-faint);margin-top:8px">
          下载入口仅跳转官方页面，本站不托管任何插件安装包。链接可能变化，如失效请通过反馈表单报告。
        </p>
      </div>

      ${related ? `
      <div class="detail-section">
        <h2>同类插件推荐</h2>
        <div class="related-grid">${related}</div>
      </div>` : ""}`;

    /* 事件 */
    const addBtn = wrap.querySelector(".add-compare");
    if (addBtn) addBtn.addEventListener("click", () => window.OFXViews.compare.add(plugin.slug));

    const copyBtn = document.getElementById("copy-plugin-info");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const text = [
          `插件：${plugin.name}`,
          `开发者：${plugin.developer}`,
          `授权：${U.licenseLabel(plugin.license)}（${plugin.price || "未知"}）`,
          `系统：${(plugin.platforms || []).map((p) => U.platformLabel(p)).join("/")}`,
          `官网：${plugin.officialHome || "未知"}`,
          `核验日期：${plugin.lastVerified || "未知"}`,
          ``,
          `兼容性：`,
          ...(plugin.compatibility || []).map((c) => `- ${hostName(c.host)}：${c.officialSupport === "supported" ? "官方声明支持" : c.officialSupport === "unconfirmed" ? "官方资料未确认" : c.officialSupport}（${U.evidenceLabel(c.evidenceLevel)}）`),
        ].join("\n");
        const ok = await U.copyText(text);
        U.toast(ok ? "插件信息已复制" : "复制失败，请手动选择复制", !ok);
      });
    }
  }

  return { render };
})();
