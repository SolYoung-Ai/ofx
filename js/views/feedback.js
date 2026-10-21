/* ============================================================
   views/feedback.js · 反馈表单（纯静态替代流程）
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
    if (!f.type) errors.push("请选择反馈类型。");
    if (!f.detail) errors.push("请填写问题详情。");
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.push("邮箱格式不正确。");
    if (f.links && !/^https?:\/\//i.test(f.links)) errors.push("证据链接需以 http(s):// 开头。");
    return errors;
  }

  function markInvalid(ids) {
    ["fb-type", "fb-plugin", "fb-host", "fb-os", "fb-detail", "fb-links", "fb-email"].forEach((id) => {
      document.getElementById(id).classList.toggle("invalid", ids.includes(id));
    });
  }

  function buildText(f) {
    const lines = [
      "【OFX Atlas 反馈】",
      `反馈类型：${f.type}`,
      `插件名称：${f.plugin || "（未填写）"}`,
      `使用的软件：${f.host || "（未填写）"}`,
      `操作系统：${f.os || "（未填写）"}`,
      "",
      "问题详情：",
      f.detail,
      "",
      `证据链接：${f.links || "（无）"}`,
      `联系邮箱：${f.email || "（未填写）"}`,
      "",
      `（本反馈由 OFX Atlas 生成，${new Date().toLocaleString("zh-CN")}）`,
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
      status("已恢复本地草稿。", false);
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
      if (errors.length) { status("请修正上述错误后再提交。", false); return; }

      window.OFXStore.setDraft(f);
      const text = buildText(f);
      window.OFXStore.setDraft(null); /* 提交后清除草稿标记，内容仍可复制 */
      sessionStorage.setItem("ofx-feedback-last", text);
      status("内容已校验通过并生成本地草稿。由于本站为静态站点，未发送到服务器；请点击「复制反馈内容」或「用邮件客户端发送」。", true);
    });

    document.getElementById("fb-save-draft").addEventListener("click", () => {
      const f = collect();
      window.OFXStore.setDraft(f);
      status("草稿已保存到浏览器本地（仅本机，不同步）。", true);
    });

    document.getElementById("fb-copy").addEventListener("click", async () => {
      const f = collect();
      const errors = validate(f);
      if (errors.length) { errBox.textContent = errors.join(" "); markInvalid(["fb-type", "fb-detail", "fb-email", "fb-links"]); status("请修正错误后再复制。", false); return; }
      const ok = await U.copyText(buildText(f));
      U.toast(ok ? "反馈内容已复制" : "复制失败", !ok);
    });

    document.getElementById("fb-mailto").addEventListener("click", () => {
      const f = collect();
      const errors = validate(f);
      if (errors.length) { errBox.textContent = errors.join(" "); markInvalid(["fb-type", "fb-detail", "fb-email", "fb-links"]); status("请修正错误后再发送。", false); return; }
      const subject = encodeURIComponent("[OFX Atlas 反馈] " + (f.type || ""));
      const body = encodeURIComponent(buildText(f));
      window.location.href = `mailto:soyoang@outlook.com?subject=${subject}&body=${body}`;
      status("已尝试唤起本地邮件客户端，收件人为 soyoang@outlook.com。请确认邮件应用已配置。", false);
    });
  }

  return { render };
})();
