(function () {
  "use strict";

  const client = window.supabaseClient;
  const $ = (id) => document.getElementById(id);

  const state = {
    editingTable: null,
    editingId: null,
    rows: []
  };

  const configs = {
    project: {
      label: "Project",
      table: "project",
      list: "projectsList",
      title: (r) => r.title || "Untitled project",
      meta: (r) => [r.category, r.published ? "Published" : "Draft"].filter(Boolean).join(" · "),
      fields: [
        ["title", "Title", "text", true],
        ["slug", "Slug", "text", true],
        ["category", "Category", "text", true],
        ["short_description", "Short description", "textarea", true],
        ["full_description", "Full description", "textarea", false],
        ["problem", "Problem", "textarea", false],
        ["solution", "Solution", "textarea", false],
        ["result", "Result", "textarea", false],
        ["github_url", "GitHub URL", "url", false],
        ["live_url", "Live URL", "url", false],
        ["cover_image", "Cover image", "text", false],
        ["featured", "Featured", "checkbox", false],
        ["published", "Published", "checkbox", false],
        ["sort_order", "Sort order", "number", false]
      ]
    },
    skill: {
      label: "Skill", table: "skill", list: "skillsList",
      title: (r) => r.name || r.title || "Untitled skill",
      meta: (r) => r.category || "",
      fields: [["name","Name","text",true],["category","Category","text",true],["description","Description","textarea",false],["level","Level","text",false],["featured","Featured","checkbox",false],["sort_order","Sort order","number",false]]
    },
    experience: {
      label: "Experience", table: "experience", list: "experienceList",
      title: (r) => r.role || "Experience",
      meta: (r) => [r.company, r.location].filter(Boolean).join(" · "),
      fields: [["role","Role","text",true],["company","Company","text",true],["location","Location","text",false],["start_date","Start date","date",false],["end_date","End date","date",false],["description","Description","textarea",true],["featured","Featured","checkbox",false],["sort_order","Sort order","number",false]]
    },
    certifications: {
      label: "Certification", table: "certifications", list: "certificationsList",
      title: (r) => r.title || "Certification",
      meta: (r) => r.issuer || "",
      fields: [["title","Title","text",true],["issuer","Issuer","text",false],["issue_date","Issue date","date",false],["credential_url","Credential URL","url",false],["certificate_image","Certificate image","text",false],["description","Description","textarea",false]]
    }
  };

  function setStatus(message, error) {
    $("dashboardStatus").textContent = message || "";
    $("dashboardStatus").style.color = error ? "#ff9a9a" : "#66e3b4";
  }

  function setLoginStatus(message) {
    $("loginStatus").textContent = message || "";
  }

  function showDashboard(user) {
    $("loginView").classList.add("hidden");
    $("dashboardView").classList.remove("hidden");
    $("userEmail").textContent = user?.email || "Authenticated";
    refreshAll();
  }

  function showLogin() {
    $("dashboardView").classList.add("hidden");
    $("loginView").classList.remove("hidden");
  }

  async function login(event) {
    event.preventDefault();
    if (!client) return setLoginStatus("Supabase client is unavailable.");
    setLoginStatus("Signing in…");
    const email = $("email").value.trim();
    const password = $("password").value;
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) return setLoginStatus(error.message);
    setLoginStatus("");
    showDashboard(data.user);
  }

  async function logout() {
    if (client) await client.auth.signOut();
    showLogin();
  }

  async function fetchRows(config) {
    const { data, error } = await client.from(config.table).select("*").limit(100);
    if (error) throw new Error(`${config.label}: ${error.message}`);
    state.rows = data || [];
    return data || [];
  }

  function renderList(config, rows) {
    const container = $(config.list);
    if (!rows.length) {
      container.innerHTML = '<div class="item"><span class="muted">No records yet.</span></div>';
      return;
    }
    container.innerHTML = rows.map((row) => `
      <div class="item">
        <div class="item-row">
          <div><div class="item-title">${escapeHtml(config.title(row))}</div><div class="item-meta">${escapeHtml(config.meta(row))}</div></div>
          <div class="actions">
            <button class="ghost small" data-edit="${escapeAttr(config.table)}" data-id="${escapeAttr(row.id || "")}">EDIT</button>
            ${row.id ? `<button class="ghost small danger" data-delete="${escapeAttr(config.table)}" data-id="${escapeAttr(row.id)}">DELETE</button>` : ""}
          </div>
        </div>
      </div>`).join("");
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }
  function escapeAttr(value) { return escapeHtml(value); }

  async function loadMessages() {
    const box = $("messagesList");
    const { data, error } = await client.from("contact_message").select("*").order("created_at", { ascending: false }).limit(50);
    if (error) {
      box.innerHTML = `<div class="item"><span class="muted">Messages are protected by RLS. We will add the admin-only message policy in the next database step.</span></div>`;
      $("messageCount").textContent = "—";
      return;
    }
    $("messageCount").textContent = data.length;
    box.innerHTML = data.length ? data.map(r => `<div class="item"><div class="item-title">${escapeHtml(r.subject || "No subject")}</div><div class="item-meta">${escapeHtml(r.name || "")} · ${escapeHtml(r.email || "")}</div><p>${escapeHtml(r.message || "")}</p></div>`).join("") : '<div class="item"><span class="muted">No messages.</span></div>';
  }

  async function refreshAll() {
    setStatus("Loading dashboard…");
    try {
      for (const key of ["project", "skill", "experience", "certifications"]) {
        const config = configs[key];
        const rows = await fetchRows(config);
        renderList(config, rows);
        const countId = key === "project" ? "projectCount" : key === "skill" ? "skillCount" : key === "experience" ? "experienceCount" : null;
        if (countId) $(countId).textContent = rows.length;
      }
      await loadMessages();
      setStatus("Dashboard ready.");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function openEditor(table, row) {
    const config = configs[table];
    if (!config) return;
    state.editingTable = table;
    state.editingId = row?.id || null;
    $("editorTitle").textContent = `${row ? "Edit" : "Add"} ${config.label}`;
    $("editorStatus").textContent = "";
    $("editorFields").innerHTML = config.fields.map(([name, label, type, required]) => {
      const value = row?.[name];
      const full = type === "textarea" ? " full" : "";
      if (type === "checkbox") return `<label class="${full}"><input data-field="${name}" type="checkbox" ${value ? "checked" : ""}> ${label}</label>`;
      return `<label class="${full}">${label}<${type === "textarea" ? "textarea" : "input"} data-field="${name}" type="${type === "textarea" ? "" : type}" ${required ? "required" : ""}>${type === "textarea" ? escapeHtml(value || "") : ""}</${type === "textarea" ? "textarea" : "input"}></label>`;
    }).join("");
    if (row) config.fields.forEach(([name,,type]) => { if (type !== "checkbox" && type !== "textarea") { const el = document.querySelector(`[data-field="${name}"]`); if (el) el.value = row[name] ?? ""; }});
    $("editorDialog").showModal();
  }

  async function saveEditor(event) {
    event.preventDefault();
    const config = configs[state.editingTable];
    const payload = {};
    config.fields.forEach(([name,,type]) => {
      const el = document.querySelector(`[data-field="${name}"]`);
      if (!el) return;
      if (type === "checkbox") payload[name] = el.checked;
      else if (el.value !== "") payload[name] = type === "number" ? Number(el.value) : el.value;
      else payload[name] = null;
    });
    $("editorStatus").textContent = "Saving…";
    const query = state.editingId
      ? client.from(config.table).update(payload).eq("id", state.editingId)
      : client.from(config.table).insert(payload);
    const { error } = await query;
    if (error) return $("editorStatus").textContent = error.message;
    $("editorDialog").close();
    await refreshAll();
  }

  async function deleteRow(table, id) {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    const { error } = await client.from(table).delete().eq("id", id);
    if (error) return setStatus(error.message, true);
    await refreshAll();
  }

  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-action='add']");
    if (add) return openEditor(add.dataset.table, null);
    const edit = event.target.closest("[data-edit]");
    if (edit) {
      const config = configs[edit.dataset.edit];
      const row = state.rows.find(r => String(r.id) === String(edit.dataset.id));
      return openEditor(edit.dataset.edit, row);
    }
    const del = event.target.closest("[data-delete]");
    if (del) return deleteRow(del.dataset.delete, del.dataset.id);
  });

  $("loginForm").addEventListener("submit", login);
  $("logoutButton").addEventListener("click", logout);
  $("editorForm").addEventListener("submit", saveEditor);
  $("closeEditor").addEventListener("click", () => $("editorDialog").close());
  $("cancelEditor").addEventListener("click", () => $("editorDialog").close());

  if (!client) {
    setLoginStatus("Supabase is not configured.");
    return;
  }

  client.auth.getSession().then(({ data }) => {
    if (data.session?.user) showDashboard(data.session.user);
    else showLogin();
  });

  client.auth.onAuthStateChange((_event, session) => {
    if (session?.user) showDashboard(session.user);
    else showLogin();
  });
})();
