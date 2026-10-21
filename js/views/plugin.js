/* ============================================================
   views/plugin.js · 插件详情页（支持中英双语）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.plugin = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;

  function findPlugin(slug) {
    const plugins = (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
    return plugins.find((p) => p.slug === slug) || null;
  }

  function hostName(id) {
    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const h = hosts.find((x) => x.id === id);
    return h ? I.tr(h.name) : id;
  }

  function render(params) {
    const wrap = document.getElementById("plugin-detail");
    const slug = params && params.slug;
    const plugin = findPlugin(slug);

    if (!plugin) {
      wrap.innerHTML = `
        <div class="empty-state">
          <h3>${I.t("detail.notFound")}</h3>
          <p>${I.t("detail.notFoundDesc")}</p>
          <a href="#/" data-nav class="btn-primary" style="display:inline-block;margin-top:10px;text-decoration:none">${I.t("detail.backToLibrary")}</a>
        </div>`;
      return;
    }

    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const hostNote = (id) => {
      const h = hosts.find((x) => x.id === id);
      return h ? `（${U.esc(I.tr(h.name))}）` : "";
    };

    /* 兼容性矩阵：隐藏「官方资料未确认」的宿主行 */
    const matrixRows = (plugin.compatibility || [])
      .filter((c) => c.officialSupport !== "unconfirmed")
      .map((c) => {
      let statusTxt = "";
      if (c.officialSupport === "supported") statusTxt = U.statusBadge("official-supported");
      else if (c.officialSupport === "not-supported") statusTxt = U.statusBadge("not-supported");
      return `
        <tr>
          <td><strong>${U.esc(hostName(c.host))}</strong>${c.studioOnly ? '<br><span class="badge badge-warn">' + I.t("detail.studioOnly") + "</span>" : ""}</td>
          <td>${statusTxt}</td>
          <td>${U.esc(U.evidenceLabel(c.evidenceLevel))}</td>
          <td>${U.esc(I.tr(c.notes || ""))}</td>
        </tr>`;
    }).join("");

    /* 已知问题 */
    const issues = (plugin.knownIssues || []).map((i) => `<li>${U.esc(I.tr(i))}</li>`).join("");

    /* 官方来源 */
    const sources = (plugin.sources || []).map((s) => `<li><a href="${U.esc(s)}" target="_blank" rel="noopener noreferrer">${U.esc(s)}</a></li>`).join("");

    /* 相关插件推荐（同分类） */
    const related = ((window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [])
      .filter((p) => p.slug !== plugin.slug && (p.category || []).some((c) => (plugin.category || []).includes(c)))
      .slice(0, 3)
      .map((p) => `
        <article class="plugin-card" style="padding:14px">
          <h4 class="pc-name" style="font-size:14.5px"><a href="#/plugin/${encodeURIComponent(p.slug)}" data-nav>${U.esc(p.name)}</a></h4>
          <p class="pc-tagline" style="font-size:12.5px">${U.esc(I.tr(p.tagline))}</p>
        </article>`)
      .join("");

    const downloadBtn = plugin.downloadVerified && plugin.officialDownload
      ? U.safeExternal(plugin.officialDownload, I.t("detail.download"), "btn-official")
      : `<span class="badge badge-neutral">${I.t("detail.unverified")}</span>`;

    const evidenceLine = [U.evidenceLabel("official-docs"), U.evidenceLabel("vendor-statement"), U.evidenceLabel("community-report"), U.evidenceLabel("no-official-info")].join(" · ");

    wrap.innerHTML = `
      <div class="detail-hero">
        <div style="flex:1;min-width:260px">
          <h1 class="detail-title">${U.esc(plugin.name)}</h1>
          <div class="detail-dev">${U.esc(I.tr(plugin.developer))} · ${I.t("detail.verified")} ${U.esc(plugin.lastVerified || I.t("detail.unknown"))}</div>
          <p style="color:var(--text-dim);max-width:640px">${U.esc(I.tr(plugin.description))}</p>
          <div class="detail-actions">
            ${downloadBtn}
            <button type="button" class="btn-secondary add-compare" data-slug="${U.esc(plugin.slug)}">${I.t("detail.compare")}</button>
            <button type="button" class="btn-ghost" id="copy-plugin-info">${I.t("detail.copyInfo")}</button>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h2>${I.t("detail.basic")}</h2>
        <dl class="kv-grid">
          <div class="kv-item"><dt>${I.t("detail.license")}</dt><dd>${U.esc(U.licenseLabel(plugin.license))}</dd></div>
          <div class="kv-item"><dt>${I.t("detail.price")}</dt><dd>${U.esc(plugin.price ? I.tr(plugin.price) : I.t("detail.unknown"))}</dd></div>
          <div class="kv-item"><dt>${I.t("detail.platforms")}</dt><dd>${(plugin.platforms || []).map((p) => U.esc(U.platformLabel(p))).join(" / ") || I.t("detail.unknown")}</dd></div>
          <div class="kv-item"><dt>${I.t("detail.category")}</dt><dd>${(plugin.category || []).map((c) => U.esc(U.categoryLabel(c))).join(" / ")}</dd></div>
          <div class="kv-item"><dt>${I.t("detail.home")}</dt><dd>${plugin.officialHome ? `<a href="${U.esc(plugin.officialHome)}" target="_blank" rel="noopener noreferrer">${I.t("detail.openSite")}</a>` : I.t("detail.unknown")}</dd></div>
          <div class="kv-item"><dt>${I.t("detail.verifiedDate")}</dt><dd>${U.esc(plugin.lastVerified || I.t("detail.unknown"))}</dd></div>
        </dl>
      </div>

      <div class="detail-section">
        <h2>${I.t("detail.matrix")}</h2>
        <div style="overflow-x:auto">
          <table class="compat-matrix">
            <thead><tr><th>${I.t("matrix.host")}</th><th>${I.t("matrix.status")}</th><th>${I.t("matrix.evidence")}</th><th>${I.t("matrix.notes")}</th></tr></thead>
            <tbody>${matrixRows}</tbody>
          </table>
        </div>
        <p style="font-size:13px;color:var(--text-faint);margin-top:10px">
          ${I.t("detail.evidenceNote").replace("{levels}", evidenceLine)}
        </p>
      </div>

      <div class="detail-section">
        <h2>${I.t("detail.install")}</h2>
        <p style="color:var(--text-dim)">${U.esc(I.tr(plugin.installationGuide || I.t("detail.noInstall")))}</p>
        <h3>${I.t("detail.issues")}</h3>
        <ul class="issue-list">${issues || "<li>" + I.t("detail.noIssues") + "</li>"}</ul>
      </div>

      <div class="detail-section">
        <h2>${I.t("detail.sources")}</h2>
        <ul class="sources-list">${sources}</ul>
        <p style="font-size:13px;color:var(--text-faint);margin-top:8px">
          ${I.t("detail.sourcesNote")}
        </p>
      </div>

      ${related ? `
      <div class="detail-section">
        <h2>${I.t("detail.related")}</h2>
        <div class="related-grid">${related}</div>
      </div>` : ""}`;

    /* 事件 */
    const addBtn = wrap.querySelector(".add-compare");
    if (addBtn) addBtn.addEventListener("click", () => window.OFXViews.compare.add(plugin.slug));

    const copyBtn = document.getElementById("copy-plugin-info");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const text = [
          `${I.t("detail.copyPlugin")}${plugin.name}`,
          `${I.t("detail.copyDeveloper")}${I.tr(plugin.developer)}`,
          `${I.t("detail.copyLicense")}${U.licenseLabel(plugin.license)}（${plugin.price ? I.tr(plugin.price) : I.t("detail.unknown")}）`,
          `${I.t("detail.copyPlatforms")}${(plugin.platforms || []).map((p) => U.platformLabel(p)).join("/")}`,
          `${I.t("detail.copySite")}${plugin.officialHome || I.t("detail.unknown")}`,
          `${I.t("detail.copyVerified")}${plugin.lastVerified || I.t("detail.unknown")}`,
          ``,
          `${I.t("detail.copyCompat")}`,
          ...(plugin.compatibility || []).map((c) => `- ${hostName(c.host)}：${c.officialSupport === "supported" ? I.t("status.officialSupported") : c.officialSupport === "unconfirmed" ? I.t("status.unconfirmed") : c.officialSupport}（${U.evidenceLabel(c.evidenceLevel)}）`),
        ].join("\n");
        const ok = await U.copyText(text);
        U.toast(ok ? I.t("toast.pluginCopied") : I.t("toast.copyFail"), !ok);
      });
    }
  }

  return { render };
})();
