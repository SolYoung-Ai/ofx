/* ============================================================
   views/changelog.js · 更新日志（数据驱动）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.changelog = (() => {
  const U = window.OFXUtils;

  const TYPE_LABELS = {
    "site-launch": { label: "站点上线", cls: "badge-ok" },
    "data-added": { label: "数据新增", cls: "badge-info" },
    "data-updated": { label: "数据更新", cls: "badge-info" },
    "verification": { label: "核验结论", cls: "badge-warn" },
    "fix": { label: "修复", cls: "badge-warn" },
    "feature": { label: "功能更新", cls: "badge-ok" },
  };

  function render() {
    const data = window.CHANGELOG_DATA || { entries: [] };
    const entries = data.entries || [];
    const wrap = document.getElementById("changelog-list");

    if (!entries.length) {
      wrap.innerHTML = '<div class="empty-state"><h3>暂无更新记录</h3></div>';
      return;
    }

    wrap.innerHTML = `
      <div class="changelog-list">
        ${entries.map((e) => {
          const meta = TYPE_LABELS[e.type] || { label: e.type, cls: "badge-neutral" };
          const related = (e.relatedPluginSlugs || []).length
            ? `<div style="margin-top:8px;font-size:12.5px;color:var(--text-faint)">关联插件：${e.relatedPluginSlugs.map((s) => U.esc(s)).join("、")}</div>`
            : "";
          return `
            <article class="cl-entry">
              <div class="cl-head">
                <span class="cl-date">${U.esc(e.date)}</span>
                <span class="badge ${meta.cls}">${U.esc(meta.label)}</span>
              </div>
              <h3 class="cl-title">${U.esc(e.title)}</h3>
              <p class="cl-summary">${U.esc(e.summary)}</p>
              ${related}
            </article>`;
        }).join("")}
      </div>`;
  }

  return { render };
})();
