/* ============================================================
   views/feedback.js · 反馈表单（纯静态替代流程，支持中英双语）
   能力边界：
   - 必填项校验 + 错误提示
   - 生成结构化反馈内容（可复制）
   - mailto: 唤起本地邮件客户端
   - localStorage 保存草稿
   不提供假的后端提交，不显示「已发送给管理员」。
   ============================================================ */
window.OFXViews = window.OFXViews || {};
window.OFXViews.feedback = (() => {
  const U = window.OFXUtils;
  const I = window.OFXI18N;

  const TYPE_LABEL_KEYS = {
    "correct": "fb.type.correct",
    "broken-link": "fb.type.broken",
    "add-record": "fb.type.addRecord",
    "new-plugin": "fb.type.newPlugin",
    "bug": "fb.type.bug",
  };

  function collect() {
    return {
      type: document.getElementById("fb-type").value,
      plugin: document.getElementById("fb-plugin").value.trim(),
      host: document.getElementById("fb-host").value.trim(),
      os: document.getElementById("fb-os").value.trim(),
      detail: document.getElementById("fb-detail").value.trim(),
      links: document.getElementById("fb-links").value.trim(),
      email: document.getElementById("fb-email").value.trim(),
    };
  }

  function validate(f) {
    const errors = [];
    if (!f.type) errors.push(I.t("fb.err.type"));
    if (!f.detail) errors.push(I.t("fb.err.detail"));
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.push(I.t("fb.err.email"));
    if (f.links && !/^https?:\/\//i.test(f.links)) errors.push(I.t("fb.err.link"));
    return errors;
  }

  function markInvalid(ids) {
    ["fb-type", "fb-plugin", "fb-host", "fb-os", "fb-detail", "fb-links", "fb-email"].forEach((id) => {
      document.getElementById(id).classList.toggle("invalid", ids.includes(id));
    });
  }

  function buildText(f) {
    const typeLabel = TYPE_LABEL_KEYS[f.type] ? I.t(TYPE_LABEL_KEYS[f.type]) : f.type;
    const lines = [
      I.t("fb.reportTitle"),
      `${I.t("fb.fieldType")}${typeLabel}`,
      `${I.t("fb.fieldPlugin")}${f.plugin || I.t("fb.unfilled")}`,
      `${I.t("fb.fieldHost")}${f.host || I.t("fb.unfilled")}`,
      `${I.t("fb.fieldOs")}${f.os || I.t("fb.unfilled")}`,
      "",
      I.t("fb.fieldDetail"),
      f.detail,
      "",
      `${I.t("fb.fieldLinks")}${f.links || I.t("fb.none")}`,
      `${I.t("fb.fieldEmail")}${f.email || I.t("fb.unfilled")}`,
      "",
      `${I.t("fb.generated")}${new Date().toLocaleString(I.lang === "en" ? "en-US" : "zh-CN")}${I.t("fb.generatedEnd")}`,
    ];
    return lines.join("\n");
  }

  function status(msg, isOk) {
    const el = document.getElementById("fb-status");
    el.textContent = msg;
    el.className = "form-status" + (isOk ? " ok" : "");
  }

  function render() {
    const draft = window.OFXStore.getDraft();
    if (draft && typeof draft === "object") {
      document.getElementById("fb-type").value = draft.type || "";
      document.getElementById("fb-plugin").value = draft.plugin || "";
      document.getElementById("fb-host").value = draft.host || "";
      document.getElementById("fb-os").value = draft.os || "";
      document.getElementById("fb-detail").value = draft.detail || "";
      document.getElementById("fb-links").value = draft.links || "";
      document.getElementById("fb-email").value = draft.email || "";
      status(I.t("fb.status.draftRestored"), false);
    }

    /* 填充插件 datalist */
    const plugins = (window.PLUGINS_DATA && window.PLUGINS_DATA.plugins) || [];
    document.getElementById("plugin-list").innerHTML = plugins
      .map((p) => `<option value="${U.esc(p.name)}"></option>`)
      .join("");

    const errBox = document.getElementById("fb-errors");
    const form = document.getElementById("feedback-form");

    /* 提交 = 校验 + 生成内容 + 保存草稿 + 提示（不假装发送） */
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = collect();
      const errors = validate(f);
      markInvalid(errors.length ? ["fb-type", "fb-detail", "fb-email", "fb-links"] : []);
      errBox.textContent = errors.join(" ");
      if (errors.length) { status(I.t("fb.err.fix"), false); return; }

      window.OFXStore.setDraft(f);
      const text = buildText(f);
      window.OFXStore.setDraft(null); /* 提交后清除草稿标记，内容仍可复制 */
      sessionStorage.setItem("ofx-feedback-last", text);
      status(I.t("fb.status.submitted"), true);
    });

    document.getElementById("fb-save-draft").addEventListener("click", () => {
      const f = collect();
      window.OFXStore.setDraft(f);
      status(I.t("fb.status.draftSaved"), true);
    });

    document.getElementById("fb-copy").addEventListener("click", async () => {
      const f = collect();
      const errors = validate(f);
      if (errors.length) { errBox.textContent = errors.join(" "); markInvalid(["fb-type", "fb-detail", "fb-email", "fb-links"]); status(I.t("fb.err.copy"), false); return; }
      const ok = await U.copyText(buildText(f));
      U.toast(ok ? I.t("toast.feedbackCopied") : I.t("toast.copyFail"), !ok);
    });

    document.getElementById("fb-mailto").addEventListener("click", () => {
      const f = collect();
      const errors = validate(f);
      if (errors.length) { errBox.textContent = errors.join(" "); markInvalid(["fb-type", "fb-detail", "fb-email", "fb-links"]); status(I.t("fb.err.send"), false); return; }
      const subject = encodeURIComponent("[OFX Atlas Feedback] " + (TYPE_LABEL_KEYS[f.type] ? I.t(TYPE_LABEL_KEYS[f.type]) : f.type || ""));
      const body = encodeURIComponent(buildText(f));
      window.location.href = `mailto:soyoang@outlook.com?subject=${subject}&body=${body}`;
      status(I.t("fb.status.mailto"), false);
    });
  }

  return { render };
})();
