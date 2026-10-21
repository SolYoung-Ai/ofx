/* ============================================================
   views/home.js · 首页：统计 / 筛选 / 搜索 / 排序 / 卡片列表
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.home = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;
  const state = {
    host: "",
    category: "",
    license: "",
    platform: "",
    status: "",
    keyword: "",
    sort: "recommended",
  };

  function allPlugins() {
    return (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
  }
  function allHosts() {
    return (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
  }

  /* ---------- 宿主维度兼容性概览（实时统计） ---------- */
  function hostOverview() {
    const hosts = allHosts();
    return hosts.map((h) => {
      const plugins = allPlugins();
      const matched = plugins.filter((p) =>
        p.compatibility && p.compatibility.some((c) => c.host === h.id)
      ).length;
      const unconfirmed = plugins.filter((p) =>
        p.compatibility && p.compatibility.some(
          (c) => c.host === h.id && (c.evidenceLevel === "no-official-info" || c.officialSupport === "unconfirmed")
        )
      ).length;
      return { host: h, matched, unconfirmed };
    });
  }

  /* ---------- 筛选 chips ---------- */
  function buildChips() {
    const plugins = allPlugins();
    const hosts = allHosts();

    const hostEl = document.getElementById("filter-host");
    hostEl.innerHTML =
      `<button type="button" class="chip ${!state.host ? "active" : ""}" data-filter="host" data-value="">${I.t("filter.allHosts")}</button>` +
      hosts.map((h) =>
        `<button type="button" class="chip ${state.host === h.id ? "active" : ""}" data-filter="host" data-value="${U.esc(h.id)}">${U.esc(I.tr(h.name))}</button>`
      ).join("");

    const cats = new Set();
    plugins.forEach((p) => (p.category || []).forEach((c) => cats.add(c)));
    const catEl = document.getElementById("filter-category");
    catEl.innerHTML =
      `<button type="button" class="chip ${!state.category ? "active" : ""}" data-filter="category" data-value="">${I.t("filter.allCats")}</button>` +
      Array.from(cats).sort().map((c) =>
        `<button type="button" class="chip ${state.category === c ? "active" : ""}" data-filter="category" data-value="${U.esc(c)}">${U.esc(U.categoryLabel(c))}</button>`
      ).join("");

    const licenseEl = document.getElementById("filter-license");
    const licenseSet = ["free", "free-donation", "one-time", "subscription", "subscription-or-one-time"];
    licenseEl.innerHTML =
      `<button type="button" class="chip ${!state.license ? "active" : ""}" data-filter="license" data-value="">${I.t("filter.allLicenses")}</button>` +
      licenseSet.map((l) =>
        `<button type="button" class="chip ${state.license === l ? "active" : ""}" data-filter="license" data-value="${l}">${U.esc(U.licenseLabel(l))}</button>`
      ).join("");

    const platformEl = document.getElementById("filter-platform");
    platformEl.innerHTML =
      `<button type="button" class="chip ${!state.platform ? "active" : ""}" data-filter="platform" data-value="">${I.t("filter.allPlatforms")}</button>` +
      ["windows", "macos", "linux"].map((p) =>
        `<button type="button" class="chip ${state.platform === p ? "active" : ""}" data-filter="platform" data-value="${p}">${U.esc(U.platformLabel(p))}</button>`
      ).join("");

    /* 兼容状态：对剪映维度有意义，默认统计「官方资料未确认」等 */
    const statusEl = document.getElementById("filter-status");
    statusEl.innerHTML =
      `<button type="button" class="chip ${!state.status ? "active" : ""}" data-filter="status" data-value="">${I.t("filter.allStatus")}</button>` +
      `<button type="button" class="chip ${state.status === "official-supported" ? "active" : ""}" data-filter="status" data-value="official-supported">${I.t("filter.officialSupported")}</button>`;

    /* 事件绑定 */
    document.querySelectorAll(".chips .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const f = chip.getAttribute("data-filter");
        const v = chip.getAttribute("data-value");
        state[f] = v;
        buildChips();
        renderGrid();
      });
    });
  }

  /* ---------- 筛选与排序 ---------- */
  function filtered() {
    const plugins = allPlugins();
    let list = plugins.slice();

    if (state.host) {
      list = list.filter((p) =>
        p.compatibility && p.compatibility.some((c) => c.host === state.host)
      );
    }
    if (state.category) {
      list = list.filter((p) => (p.category || []).includes(state.category));
    }
    if (state.license) {
      list = list.filter((p) => p.license === state.license);
    }
    if (state.platform) {
      list = list.filter((p) => (p.platforms || []).includes(state.platform));
    }
    if (state.status) {
      list = list.filter((p) =>
        p.compatibility && p.compatibility.some((c) => c.officialSupport === state.status || c.evidenceLevel === "no-official-info")
      );
    }
    if (state.keyword) {
      const kw = state.keyword.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.developer, p.tagline, p.description, (p.tags || []).join(" "), (p.category || []).join(" ")]
          .join(" ").toLowerCase().includes(kw)
      );
    }

    /* 排序 */
    const key = state.sort;
    if (key === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    } else if (key === "updated") {
      list.sort((a, b) => String(b.lastVerified).localeCompare(String(a.lastVerified)));
    } else {
      /* 推荐排序：可解释规则 —— 先按「官方声明支持宿主数量多」+「免费优先」+「近核验」 */
      list.sort((a, b) => {
        const score = (p) => {
          let s = 0;
          const comps = p.compatibility || [];
          const supportedCount = comps.filter((c) => c.officialSupport === "supported").length;
          s += supportedCount * 3;
          if (p.license === "free" || p.license === "free-donation") s += 2;
          if (p.license === "one-time") s += 1;
          return s;
        };
        return score(b) - score(a);
      });
    }
    return list;
  }

  /* ---------- 卡片 ---------- */
  function cardHTML(p) {
    const U = window.OFXUtils;
    const supported = (p.compatibility || []).filter((c) => c.officialSupport === "supported");
    let statusBadge = "";
    if (supported.length) statusBadge = U.statusBadge("official-supported");

    const hostsText = (p.compatibility || [])
      .filter((c) => c.officialSupport !== "unconfirmed")
      .map((c) => (window.HOSTS_DATA ? window.HOSTS_DATA.hosts.find((h) => h.id === c.host) : null))
      .filter(Boolean)
      .map((h) => I.tr(h.name))
      .slice(0, 2)
      .join(" · ");

    const downloadBtn = p.downloadVerified && p.officialDownload
      ? U.safeExternal(p.officialDownload, I.t("card.download"), "btn-official")
      : `<span class="badge badge-neutral">${I.t("card.unverified")}</span>`;

    return `
      <article class="plugin-card">
        <div class="pc-head">
          <div>
            <h3 class="pc-name"><a href="#/plugin/${encodeURIComponent(p.slug)}" data-nav>${U.esc(p.name)}</a></h3>
            <div class="pc-developer">${U.esc(I.tr(p.developer))}</div>
          </div>
          ${statusBadge}
        </div>
        <p class="pc-tagline">${U.esc(I.tr(p.tagline))}</p>
        <div class="pc-tags">${(p.tags || []).slice(0, 4).map((t) => `<span class="pc-tag">${U.esc(I.tr(t))}</span>`).join("")}</div>
        <div class="pc-meta">
          <span class="badge badge-neutral">${U.esc(U.licenseLabel(p.license))}</span>
          ${(p.platforms || []).map((pl) => `<span class="badge badge-neutral">${U.esc(U.platformLabel(pl))}</span>`).join("")}
          ${hostsText ? `<span class="badge badge-info">${U.esc(hostsText)}</span>` : ""}
        </div>
        <div class="pc-footer">
          <span class="pc-price">${U.esc(p.price ? I.tr(p.price) : "")}</span>
          <div style="display:flex;gap:6px;align-items:center">
            <button type="button" class="btn-ghost btn-sm add-compare" data-slug="${U.esc(p.slug)}">${I.t("detail.compare")}</button>
            ${downloadBtn}
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = filtered();
    const grid = document.getElementById("plugin-grid");
    const empty = document.getElementById("plugin-empty");
    const count = document.getElementById("result-count");

    count.textContent = I.t("filter.count").replace("{n}", list.length);
    if (list.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = list.map(cardHTML).join("");
    }
  }

  /* ---------- 首页统计 ---------- */
  function renderStats() {
    const plugins = allPlugins();
    const el = document.getElementById("hero-stats");
    const hosts = allHosts();
    const unconfirmedHosts = hosts.filter((h) => h.ofxSupport === "unconfirmed").map((h) => h.id);
    const unconfirmedCount = plugins.filter((p) =>
      p.compatibility && p.compatibility.some((c) => c.evidenceLevel === "no-official-info")
    ).length;

    el.innerHTML = `
      <div class="stat-item"><b>${plugins.length}</b><span>${I.t("stat.plugins")}</span></div>
      <div class="stat-item ok"><b>${hosts.filter((h) => h.ofxSupport === "supported").length}</b><span>${I.t("stat.hosts")}</span></div>
      <div class="stat-item info"><b>${plugins.filter((p) => p.license === "free" || p.license === "free-donation").length}</b><span>${I.t("stat.free")}</span></div>`;
  }

  /* ---------- 视图入口 ---------- */
  function render(params) {
    /* 从 URL 恢复关键词（例如从详情页返回） */
    if (params && params.query && params.query.q) {
      state.keyword = params.query.q;
    }
    document.getElementById("home-search").value = state.keyword;
    document.getElementById("sort-select").value = state.sort;

    renderStats();
    buildChips();
    renderGrid();
    renderHostsOverview();
  }

  /** 宿主兼容性概览块（插入 hero-stats 下方提示由 host-warning 承担，这里渲染到统计条） */
  function renderHostsOverview() {
    /* 统计条已在 renderStats 渲染，宿主详情见 /about 与 /troubleshoot */
  }

  /* ---------- 事件绑定（由 app.js 调用一次） ---------- */
  function bind() {
    const searchInput = document.getElementById("home-search");
    const searchBtn = document.getElementById("home-search-btn");
    const sortSelect = document.getElementById("sort-select");
    const clearBtn = document.getElementById("filter-clear");
    const emptyReset = document.getElementById("empty-reset");

    const doSearch = U.debounce(() => {
      state.keyword = searchInput.value.trim();
      renderGrid();
    }, 220);

    searchInput.addEventListener("input", doSearch);
    searchBtn.addEventListener("click", () => {
      state.keyword = searchInput.value.trim();
      renderGrid();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        state.keyword = searchInput.value.trim();
        renderGrid();
      }
    });
    sortSelect.addEventListener("change", () => {
      state.sort = sortSelect.value;
      renderGrid();
    });
    clearBtn.addEventListener("click", () => {
      Object.assign(state, { host: "", category: "", license: "", platform: "", status: "", keyword: "" });
      document.getElementById("home-search").value = "";
      buildChips();
      renderGrid();
    });
    emptyReset.addEventListener("click", clearBtn.click.bind(clearBtn));

    /* 卡片上的「加入对比」（事件委托） */
    document.getElementById("plugin-grid").addEventListener("click", (e) => {
      const btn = e.target.closest(".add-compare");
      if (!btn) return;
      const slug = btn.getAttribute("data-slug");
      window.OFXViews.compare.add(slug);
    });
  }

  return { render, bind, filtered, state };
})();
