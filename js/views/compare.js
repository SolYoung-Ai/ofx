/* ============================================================
   views/compare.js · 插件对比工具（2–4 款）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.compare = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;

  function allPlugins() {
    return (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
  }
  function getList() {
    return window.OFXStore.getCompare();
  }
  function save(list) {
    window.OFXStore.setCompare(list);
    render();
    updateDrawer();
  }

  function add(slug) {
    const list = getList();
    if (list.includes(slug)) {
      U.toast(I.t("toast.compareExists"));
      return;
    }
    if (list.length >= 4) {
      U.toast(I.t("toast.compareFull"), true);
      return;
    }
    save([...list, slug]);
    U.toast(I.t("toast.compareAdded"));
  }

  function remove(slug) {
    save(getList().filter((s) => s !== slug));
  }

  function clear() {
    save([]);
  }

  function find(slug) {
    return allPlugins().find((p) => p.slug === slug) || null;
  }

  function hostName(id) {
    const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
    const h = hosts.find((x) => x.id === id);
    return h ? I.tr(h.name) : id;
  }

  function render() {
    const list = getList();
    const empty = document.getElementById("compare-empty");
    const wrap = document.getElementById("compare-table-wrap");
    const count = document.getElementById("compare-count");

    count.textContent = I.t("compare.selected").replace("{n}", list.length);

    if (list.length < 2) {
      empty.hidden = false;
      wrap.hidden = true;
      return;
    }
    empty.hidden = true;
    wrap.hidden = false;

    const plugins = list.map(find).filter(Boolean);
    if (plugins.length < 2) { wrap.hidden = true; empty.hidden = false; return; }

    const cell = (v) => (v === undefined || v === null || v === "" ? `<span class="unknown">${I.t("compare.unknown")}</span>` : U.esc(v));

    const compatCell = (p) => {
      const comps = p.compatibility || [];
      if (!comps.length) return `<span class="unknown">${I.t("compare.untested")}</span>`;
      return comps.filter((c) => c.officialSupport !== "unconfirmed").map((c) => {
        const st = c.officialSupport === "supported" ? I.t("compare.officialSupported")
          : c.officialSupport === "not-supported" ? I.t("compare.notSupported")
          : c.officialSupport;
        return `<div>${U.esc(hostName(c.host))}：${U.esc(st)}</div>`;
      }).join("");
    };

    const rows = [
      [I.t("compare.developer"), (p) => cell(I.tr(p.developer))],
      [I.t("compare.category"), (p) => cell((p.category || []).map((c) => U.categoryLabel(c)).join(" / "))],
      [I.t("compare.license"), (p) => cell(U.licenseLabel(p.license))],
      [I.t("compare.price"), (p) => cell(p.price ? I.tr(p.price) : "")],
      [I.t("compare.platforms"), (p) => cell((p.platforms || []).map((x) => U.platformLabel(x)).join(" / "))],
      [I.t("compare.compat"), compatCell],
      [I.t("compare.verified"), (p) => cell(p.lastVerified)],
      [I.t("compare.descField"), (p) => cell(I.tr(p.tagline))],
    ];

    const head = `<thead><tr><th class="label">${I.t("compare.item")}</th>${plugins.map((p) =>
      `<th><a href="#/plugin/${encodeURIComponent(p.slug)}" data-nav>${U.esc(p.name)}</a><br>
         <button type="button" class="btn-ghost btn-sm remove-compare" data-slug="${U.esc(p.slug)}" style="margin-top:6px">${I.t("compare.remove")}</button></th>`
    ).join("")}</tr></thead>`;

    const body = rows.map(([label, fn]) =>
      `<tr><td class="label">${U.esc(label)}</td>${plugins.map((p) => `<td>${fn(p)}</td>`).join("")}</tr>`
    ).join("");

    document.getElementById("compare-table").innerHTML = head + body;

    wrap.querySelectorAll(".remove-compare").forEach((btn) => {
      btn.addEventListener("click", () => remove(btn.getAttribute("data-slug")));
    });
  }

  async function copyResult() {
    const list = getList().map(find).filter(Boolean);
    if (list.length < 2) { U.toast(I.t("toast.compareMin"), true); return; }

    const lines = [I.t("compare.copyTitle"), `${I.t("compare.generatedAt")}${new Date().toLocaleString(I.lang === "en" ? "en-US" : "zh-CN")}`, ""];
    const fields = [
      [I.t("compare.developer"), (p) => I.tr(p.developer)],
      [I.t("compare.category"), (p) => (p.category || []).map((c) => U.categoryLabel(c)).join(" / ")],
      [I.t("compare.license"), (p) => `${U.licenseLabel(p.license)}（${p.price ? I.tr(p.price) : I.t("compare.unknown")}）`],
      [I.t("compare.platforms"), (p) => (p.platforms || []).map((x) => U.platformLabel(x)).join(" / ")],
      [I.t("compare.compat"), (p) => (p.compatibility || []).filter((c) => c.officialSupport !== "unconfirmed").map((c) => `${hostName(c.host)}：${c.officialSupport === "supported" ? I.t("compare.officialSupported") : c.officialSupport}`).join("；")],
      [I.t("detail.home"), (p) => p.officialHome || I.t("compare.unknown")],
    ];
    list.forEach((p) => {
      lines.push(`■ ${p.name}（${I.tr(p.developer)}）`);
      fields.forEach(([label, fn]) => lines.push(`  ${label}：${fn(p) || I.t("compare.unknown")}`));
      lines.push("");
    });
    const ok = await U.copyText(lines.join("\n"));
    U.toast(ok ? I.t("toast.compareCopied") : I.t("toast.copyFail"), !ok);
  }

  /* ---------- 底部浮动抽屉 ---------- */
  function updateDrawer() {
    const drawer = document.getElementById("compare-drawer");
    const items = document.getElementById("drawer-items");
    const count = document.getElementById("drawer-count");
    const list = getList().map(find).filter(Boolean);

    count.textContent = list.length;
    if (list.length === 0) {
      drawer.hidden = true;
      return;
    }
    drawer.hidden = false;
    items.innerHTML = list.map((p) => `
      <div class="drawer-item">
        <span>${U.esc(p.name)}</span>
        <button type="button" class="remove" data-slug="${U.esc(p.slug)}" aria-label="${I.t("compare.remove")} ${U.esc(p.name)}">✕</button>
      </div>`).join("");

    items.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", () => remove(btn.getAttribute("data-slug")));
    });
  }

  function bind() {
    document.getElementById("compare-clear").addEventListener("click", () => { clear(); U.toast(I.t("toast.compareCleared")); });
    document.getElementById("compare-copy").addEventListener("click", copyResult);
    document.getElementById("drawer-clear").addEventListener("click", () => { clear(); U.toast(I.t("toast.compareCleared")); });
  }

  return { render, add, remove, clear, bind, updateDrawer };
})();
