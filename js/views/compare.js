/* ============================================================
   views/compare.js · 插件对比工具（2–4 款）
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.compare = (() => {
  const U = window.OFXUtils;

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
      U.toast("该插件已在对比列表中");
      return;
    }
    if (list.length >= 4) {
      U.toast("对比列表最多 4 款，请先移除一项", true);
      return;
    }
    save([...list, slug]);
    U.toast("已加入对比列表");
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
    return h ? h.name : id;
  }

  function render() {
    const list = getList();
    const empty = document.getElementById("compare-empty");
    const wrap = document.getElementById("compare-table-wrap");
    const count = document.getElementById("compare-count");

    count.textContent = `已选 ${list.length} / 4 款`;

    if (list.length < 2) {
      empty.hidden = false;
      wrap.hidden = true;
      return;
    }
    empty.hidden = true;
    wrap.hidden = false;

    const plugins = list.map(find).filter(Boolean);
    if (plugins.length < 2) { wrap.hidden = true; empty.hidden = false; return; }

    const cell = (v) => (v === undefined || v === null || v === "" ? '<span class="unknown">未知</span>' : U.esc(v));

    const compatCell = (p) => {
      const comps = p.compatibility || [];
      if (!comps.length) return '<span class="unknown">未测试</span>';
      return comps.map((c) => {
        const st = c.officialSupport === "supported" ? "官方声明支持"
          : c.officialSupport === "unconfirmed" ? "官方资料未确认"
          : c.officialSupport === "not-supported" ? "官方确认不支持"
          : c.officialSupport;
        return `<div>${U.esc(hostName(c.host))}：${U.esc(st)}</div>`;
      }).join("");
    };

    const rows = [
      ["开发者", (p) => cell(p.developer)],
      ["分类", (p) => cell((p.category || []).map((c) => U.categoryLabel(c)).join(" / "))],
      ["授权方式", (p) => cell(U.licenseLabel(p.license))],
      ["价格", (p) => cell(p.price)],
      ["支持系统", (p) => cell((p.platforms || []).map((x) => U.platformLabel(x)).join(" / "))],
      ["兼容性", compatCell],
      ["最近核验", (p) => cell(p.lastVerified)],
      ["说明", (p) => cell(p.tagline)],
    ];

    const head = `<thead><tr><th class="label">对比项</th>${plugins.map((p) =>
      `<th><a href="#/plugin/${encodeURIComponent(p.slug)}" data-nav>${U.esc(p.name)}</a><br>
         <button type="button" class="btn-ghost btn-sm remove-compare" data-slug="${U.esc(p.slug)}" style="margin-top:6px">移除</button></th>`
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
    if (list.length < 2) { U.toast("至少选择 2 款插件才能对比", true); return; }

    const lines = ["OFX Atlas 插件对比结果", `生成时间：${new Date().toLocaleString("zh-CN")}`, ""];
    const fields = [
      ["开发者", (p) => p.developer],
      ["分类", (p) => (p.category || []).map((c) => U.categoryLabel(c)).join(" / ")],
      ["授权", (p) => `${U.licenseLabel(p.license)}（${p.price || "未知"}）`],
      ["系统", (p) => (p.platforms || []).map((x) => U.platformLabel(x)).join(" / ")],
      ["兼容性", (p) => (p.compatibility || []).map((c) => `${hostName(c.host)}：${c.officialSupport === "supported" ? "官方声明支持" : c.officialSupport === "unconfirmed" ? "官方资料未确认" : c.officialSupport}`).join("；")],
      ["官网", (p) => p.officialHome || "未知"],
    ];
    list.forEach((p) => {
      lines.push(`■ ${p.name}（${p.developer}）`);
      fields.forEach(([label, fn]) => lines.push(`  ${label}：${fn(p) || "未知"}`));
      lines.push("");
    });
    const ok = await U.copyText(lines.join("\n"));
    U.toast(ok ? "对比结果已复制" : "复制失败，请手动选择复制", !ok);
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
        <button type="button" class="remove" data-slug="${U.esc(p.slug)}" aria-label="移除 ${U.esc(p.name)}">✕</button>
      </div>`).join("");

    items.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", () => remove(btn.getAttribute("data-slug")));
    });
  }

  function bind() {
    document.getElementById("compare-clear").addEventListener("click", () => { clear(); U.toast("已清空对比列表"); });
    document.getElementById("compare-copy").addEventListener("click", copyResult);
    document.getElementById("drawer-clear").addEventListener("click", () => { clear(); U.toast("已清空对比列表"); });
  }

  return { render, add, remove, clear, bind, updateDrawer };
})();
