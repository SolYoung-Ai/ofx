/* ============================================================
   views/troubleshoot.js · 交互式故障排查向导（分支逻辑）
   数据驱动：步骤/结果均来自 data/troubleshooting.json
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.troubleshoot = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;

  const data = () => window.TROUBLESHOOT_DATA || { steps: [], results: {} };

  let answers = [];          // 已选答案数组
  let currentStepId = "q1";  // 当前步骤或结果 id

  function stepById(id) {
    return (data().steps || []).find((s) => s.id === id) || null;
  }

  function render(params) {
    answers = [];
    currentStepId = "q1";
    document.getElementById("ts-desc").textContent = I.tr(data().intro || "");
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
        <h2 class="ts-question">${U.esc(I.tr(step.question))}</h2>
        <div class="ts-choices">
          ${(step.choices || []).map((c) =>
            `<button type="button" class="ts-choice" data-value="${U.esc(c.value)}" data-next="${U.esc(c.next)}">${U.esc(I.tr(c.label))}</button>`
          ).join("")}
        </div>
        ${answers.length ? `<div class="ts-actions"><button type="button" class="btn-ghost" id="ts-back">${I.t("ts.back")}</button></div>` : ""}
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
        <div>${U.esc(I.tr(c.reason))}</div>
        <div class="conf">${I.t("ts.confidence")}${U.esc(I.tr(c.confidence || I.t("common.unknown")))}</div>
      </div>`).join("");

    const steps = (result.steps || []).map((s, i) => `<li>${U.esc(I.tr(s))}</li>`).join("");

    wrap.innerHTML = `
      <div class="ts-result">
        <h2>${U.esc(I.tr(result.title))}</h2>
        <p class="ts-summary">${U.esc(I.tr(result.summary))}</p>

        <h3>${I.t("ts.causes")}</h3>
        ${causes || "<p>" + I.t("ts.noCauses") + "</p>"}

        <h3>${I.t("ts.stepsTitle")}</h3>
        <ol class="steps-list">${steps || "<li>" + I.t("ts.noSteps") + "</li>"}</ol>

        <div class="ts-actions">
          <button type="button" class="btn-secondary" id="ts-copy-report">${I.t("ts.copyReport")}</button>
          <button type="button" class="btn-ghost" id="ts-restart">${I.t("ts.restart")}</button>
        </div>
      </div>`;

    document.getElementById("ts-copy-report").addEventListener("click", async () => {
      const hosts = (window.HOSTS_DATA && window.HOSTS_DATA.hosts) || [];
      const lines = [
        I.t("ts.reportTitle"),
        `${I.t("ts.reportIssue")}${I.tr(result.title)}`,
        `${I.t("ts.reportSummary")}${I.tr(result.summary)}`,
        `${I.t("ts.reportCauses")}${(result.causes || []).map((c) => I.tr(c.reason)).join("；")}`,
        `${I.t("ts.reportSteps")}${(result.steps || []).map((s, i) => `${i + 1}. ${I.tr(s)}`).join(" ")}`,
        "",
        I.t("ts.reportEnv"),
      ];
      const ok = await U.copyText(lines.join("\n"));
      U.toast(ok ? I.t("toast.reportCopied") : I.t("toast.copyFail"), !ok);
    });

    document.getElementById("ts-restart").addEventListener("click", () => render({}));
  }

  return { render };
})();
