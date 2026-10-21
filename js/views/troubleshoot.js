/* ============================================================
   views/troubleshoot.js · 交互式故障排查向导（分支逻辑）
   数据驱动：步骤/结果均来自 data/troubleshooting.json
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.troubleshoot = (() => {
  const U = window.OFXUtils;

  const data = () => window.TROUBLESHOOT_DATA || { steps: [], results: {} };

  let answers = [];          // 已选答案数组
  let currentStepId = "q1";  // 当前步骤或结果 id

  function stepById(id) {
    return (data().steps || []).find((s) => s.id === id) || null;
  }

  function render(params) {
    answers = [];
    currentStepId = "q1";
    document.getElementById("ts-desc").textContent = (data().intro || "");
    renderStep("q1");
  }

  function renderStep(id) {
    const step = stepById(id);
    const wrap = document.getElementById("ts-wizard");
    if (!step) return;

    /* 进度点 */
    const totalSteps = (data().steps || []).length;
    const progress = (data().steps || []).map((s, i) => {
      const done = answers.includes(s.id);
      const current = s.id === id;
      return `<span class="ts-dot ${done ? "done" : ""} ${current ? "current" : ""}"></span>`;
    }).join("");

    wrap.innerHTML = `
      <div class="ts-progress">${progress}</div>
      <div class="ts-step">
        <h2 class="ts-question">${U.esc(step.question)}</h2>
        <div class="ts-choices">
          ${(step.choices || []).map((c) =>
            `<button type="button" class="ts-choice" data-value="${U.esc(c.value)}" data-next="${U.esc(c.next)}">${U.esc(c.label)}</button>`
          ).join("")}
        </div>
        ${answers.length ? `<div class="ts-actions"><button type="button" class="btn-ghost" id="ts-back">← 上一步</button></div>` : ""}
      </div>`;

    wrap.querySelectorAll(".ts-choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        answers.push(currentStepId);
        const next = btn.getAttribute("data-next");
        if (next && next.startsWith("result-")) {
          currentStepId = next;
          renderResult(next);
        } else {
          currentStepId = next;
          renderStep(next);
        }
      });
    });

    const back = document.getElementById("ts-back");
    if (back) {
      back.addEventListener("click", () => {
        const prev = answers.pop();
        if (prev) { currentStepId = prev; renderStep(prev); }
        else { currentStepId = "q1"; renderStep("q1"); }
      });
    }
  }

  function renderResult(id) {
    const result = (data().results || {})[id];
    const wrap = document.getElementById("ts-wizard");
    if (!result) { renderStep("q1"); return; }

    const causes = (result.causes || []).map((c) => `
      <div class="cause-item">
        <div>${U.esc(c.reason)}</div>
        <div class="conf">可信度：${U.esc(c.confidence || "未知")}</div>
      </div>`).join("");

    const steps = (result.steps || []).map((s, i) => `<li>${U.esc(s)}</li>`).join("");

    wrap.innerHTML = `
      <div class="ts-result">
        <h2>${U.esc(result.title)}</h2>
        <p class="ts-summary">${U.esc(result.summary)}</p>

        <h3>可能原因</h3>
        ${causes || "<p>暂无足够信息，请补充环境信息后重试。</p>"}

        <h3>建议排查步骤</h3>
        <ol class="steps-list">${steps || "<li>暂无建议步骤。</li>"}</ol>

        <div class="ts-actions">
          <button type="button" class="btn-secondary" id="ts-copy-report">复制故障报告</button>
          <button type="button" class="btn-ghost" id="ts-restart">重新开始</button>
        </div>
      </div>`;

    document.getElementById("ts-copy-report").addEventListener("click", async () => {
      const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
      const lines = [
        "【OFX 故障报告】",
        `问题：${result.title}`,
        `摘要：${result.summary}`,
        `可能原因：${(result.causes || []).map((c) => c.reason).join("；")}`,
        `建议步骤：${(result.steps || []).map((s, i) => `${i + 1}. ${s}`).join(" ") }`,
        "",
        "环境信息：软件版本 / 插件版本 / 操作系统 / 处理器架构 / 显卡 / 问题现象",
      ];
      const ok = await U.copyText(lines.join("\n"));
      U.toast(ok ? "故障报告已复制" : "复制失败，请手动选择复制", !ok);
    });

    document.getElementById("ts-restart").addEventListener("click", () => render({}));
  }

  return { render };
})();
