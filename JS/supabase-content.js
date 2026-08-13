/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   supabase-content.js
   ---------------------------------------------------------
   Optional remote portfolio content loader.

   The static portfolio remains the fallback. Remote data is
   used only when Supabase is available AND the corresponding
   table returns data. This prevents a broken/empty database
   from blanking the live GitHub Pages site.
========================================================= */

(function () {
    "use strict";

    const MAX_ROWS = 100;

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function clientReady() {
        return Boolean(window.supabaseClient);
    }

    async function fetchRows(table, columns = "*") {
        if (!clientReady()) return null;

        try {
            const { data, error } = await window.supabaseClient
                .from(table)
                .select(columns)
                .limit(MAX_ROWS);

            if (error) {
                console.warn(`[Supabase] ${table} unavailable:`, error.message);
                return null;
            }

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.warn(`[Supabase] ${table} request failed:`, error);
            return null;
        }
    }

    function renderSkills(rows) {
        const container = document.getElementById("skillsGrid");
        if (!container || !rows.length) return;

        container.innerHTML = rows
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((skill) => `
                <article class="skill-card reveal" data-category="${escapeHTML(skill.category)}">
                    <div class="skill-card-header">
                        <span class="skill-category">${escapeHTML(skill.category)}</span>
                    </div>
                    <h3>${escapeHTML(skill.name || skill.title)}</h3>
                    <p>${escapeHTML(skill.description)}</p>
                    <div class="skill-tags">
                        ${skill.level ? `<span>${escapeHTML(skill.level)}</span>` : ""}
                    </div>
                </article>
            `).join("");
    }

    function renderExperience(rows) {
        const container = document.getElementById("timeline");
        if (!container || !rows.length) return;

        container.innerHTML = rows
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((item) => {
                const start = item.start_date || "";
                const end = item.end_date || "Present";
                const date = start ? `${start} — ${end}` : "EXPERIENCE";
                return `
                    <article class="timeline-item reveal">
                        <span class="date">${escapeHTML(date)}</span>
                        <h3>${escapeHTML(item.role)}</h3>
                        <p class="timeline-company">${escapeHTML(item.company)}${item.location ? ` · ${escapeHTML(item.location)}` : ""}</p>
                        <p>${escapeHTML(item.description)}</p>
                    </article>
                `;
            }).join("");
    }

    function renderProjects(rows) {
        const container = document.getElementById("projectsGrid");
        if (!container || !rows.length) return;

        container.innerHTML = rows
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((project) => `
                <article class="project-card reveal" data-category="${escapeHTML(project.category)}">
                    <div class="project-card-top">
                        <span class="project-category">${escapeHTML(project.category)}</span>
                    </div>
                    ${project.cover_image ? `<img src="${escapeHTML(project.cover_image)}" alt="${escapeHTML(project.title)}" loading="lazy" decoding="async">` : ""}
                    <h3>${escapeHTML(project.title)}</h3>
                    <p>${escapeHTML(project.short_description)}</p>
                    <div class="project-tech">
                        ${project.github_url ? `<a class="project-link" href="${escapeHTML(project.github_url)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
                        ${project.live_url ? `<a class="project-link" href="${escapeHTML(project.live_url)}" target="_blank" rel="noopener noreferrer">Live Site</a>` : ""}
                    </div>
                </article>
            `).join("");
    }

    function renderCertifications(rows) {
        const container = document.getElementById("certsGrid");
        if (!container || !rows.length) return;

        container.innerHTML = rows
            .map((cert) => `
                <article class="cert-card reveal">
                    ${cert.certificate_image ? `<img src="${escapeHTML(cert.certificate_image)}" alt="${escapeHTML(cert.title)}" loading="lazy" decoding="async">` : ""}
                    <h3>${escapeHTML(cert.title)}</h3>
                    ${cert.issuer ? `<p>${escapeHTML(cert.issuer)}</p>` : ""}
                    <p>${escapeHTML(cert.description)}</p>
                    ${cert.credential_url ? `<a class="project-link" href="${escapeHTML(cert.credential_url)}" target="_blank" rel="noopener noreferrer">View Credential</a>` : ""}
                </article>
            `).join("");
    }

    async function loadRemoteContent() {
        if (!clientReady()) return;

        const [skills, experience, projects, certifications] = await Promise.all([
            fetchRows("skills", "id,name,category,description,level,featured,sort_order"),
            fetchRows("experience", "id,role,company,location,start_date,end_date,description,featured,sort_order"),
            fetchRows("projects", "id,title,slug,category,short_description,full_description,featured,published,github_url,live_url,cover_image,sort_order"),
            fetchRows("certifications", "id,title,issuer,issue_date,credential_url,certificate_image,description")
        ]);

        if (skills?.length) renderSkills(skills);
        if (experience?.length) renderExperience(experience);
        if (projects?.length) renderProjects(projects);
        if (certifications?.length) renderCertifications(certifications);

        if (skills?.length || experience?.length || projects?.length || certifications?.length) {
            console.log("[Supabase] Remote portfolio content loaded.");
        } else {
            console.info("[Supabase] No remote portfolio rows found. Static content remains active.");
        }
    }

    function boot() {
        if (clientReady()) {
            loadRemoteContent();
            return;
        }

        // supabase.js initializes on DOMContentLoaded. Give it a short window
        // to finish before falling back permanently to static content.
        let attempts = 0;
        const timer = setInterval(() => {
            attempts += 1;
            if (clientReady()) {
                clearInterval(timer);
                loadRemoteContent();
            } else if (attempts >= 40) {
                clearInterval(timer);
            }
        }, 250);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }
})();
