/* ============================================================
   views/changelog.js · 更新日志（数据驱动，支持中英双语）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.changelog = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;

  const TYPE_LABELS = {
    "site-launch": { key: "cl.type.siteLaunch", cls: "badge-ok" },
    "data-added": { key: "cl.type.dataAdded", cls: "badge-info" },
    "data-updated": { key: "cl.type.dataUpdated", cls: "badge-info" },
    "verification": { key: "cl.type.verification", cls: "badge-warn" },
    "fix": { key: "cl.type.fix", cls: "badge-warn" },
    "feature": { key: "cl.type.feature", cls: "badge-ok" },
  };

  function render() {
    const data = window.CHANGELOG_DATA || { entries: [] };
    const entries = data.entries || [];
    const wrap = document.getElementById("changelog-list");

    if (!entries.length) {
      wrap.innerHTML = `<div class="empty-state"><h3>${I.t("cl.empty")}</h3></div>`;
      return;
    }

    wrap.innerHTML = `
      <div class="changelog-list">
        ${entries.map((e) => {
          const meta = TYPE_LABELS[e.type] || { key: null, cls: "badge-neutral" };
          const metaLabel = meta.key ? I.t(meta.key) : e.type;
          const related = (e.relatedPluginSlugs || []).length
            ? `<div style="margin-top:8px;font-size:12.5px;color:var(--text-faint)">${I.t("cl.related")}${e.relatedPluginSlugs.map((s) => U.esc(s)).join("、")}</div>`
            : "";
          return `
            <article class="cl-entry">
              <div class="cl-head">
                <span class="cl-date">${U.esc(e.date)}</span>
                <span class="badge ${meta.cls}">${U.esc(metaLabel)}</span>
              </div>
              <h3 class="cl-title">${U.esc(I.tr(e.title))}</h3>
              <p class="cl-summary">${U.esc(I.tr(e.summary))}</p>
              ${related}
            </article>`;
        }).join("")}
      </div>`;
  }

  return { render };
})();
