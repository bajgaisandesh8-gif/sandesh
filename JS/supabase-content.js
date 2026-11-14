/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   supabase-content.js
   ---------------------------------------------------------
   Optional remote content loader.

   The static project engine owns skills filtering and project
   cards/interactions. Remote data must not replace those
   client-side views with a partial or incompatible dataset.
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

    function safeContentURL(value) {
        if (!value) return "";
        try {
            const url = new URL(value, window.location.href);
            return url.protocol === "https:" || url.origin === window.location.origin ? url.href : "";
        } catch (_) {
            return "";
        }
    }

    async function fetchRows(table, columns, orderBy = []) {
        if (!clientReady()) return null;

        try {
            let query = window.supabaseClient.from(table).select(columns);
            orderBy.forEach(({ column, ascending = true, nullsFirst }) => {
                const options = { ascending };
                if (typeof nullsFirst === "boolean") options.nullsFirst = nullsFirst;
                query = query.order(column, options);
            });

            const { data, error } = await query.limit(MAX_ROWS);
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

    function renderExperience(rows) {
        const container = document.getElementById("timeline");
        const completeRows = rows.filter((item) => item.role && item.description);
        if (!container || !completeRows.length) return;

        container.innerHTML = completeRows.map((item) => {
            const start = item.start_date || "";
            const end = item.end_date || "";
            const date = start ? (end ? `${start} — ${end}` : start) : "EXPERIENCE";
            const role = item.company && item.company.includes("Soaltee Westend") && /intern/i.test(item.role || "")
                ? "IT Support & Networking Assistant (Contract)"
                : item.role;
            return `
                <article class="timeline-item reveal">
                    <span class="date">${escapeHTML(date)}</span>
                    <h3>${escapeHTML(role)}</h3>
                    <p class="timeline-company">${escapeHTML(item.company)}${item.location ? ` · ${escapeHTML(item.location)}` : ""}</p>
                    <p>${escapeHTML(item.description)}</p>
                </article>
            `;
        }).join("");
    }

    function renderCertifications(rows) {
        const container = document.getElementById("certsGrid");
        const completeRows = rows.filter((cert) => cert.title && String(cert.title).trim());
        if (!container || !completeRows.length) return;

        container.innerHTML = completeRows.map((cert) => {
            const imageURL = safeContentURL(cert.certificate_image);
            const credentialURL = safeContentURL(cert.credential_url);
            const issueDate = cert.issue_date && /^\d{4}-\d{2}-\d{2}$/.test(cert.issue_date)
                ? `<p><time datetime="${escapeHTML(cert.issue_date)}">${escapeHTML(new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${cert.issue_date}T00:00:00Z`)))}</time></p>`
                : "";
            return `
            <article class="cert-card reveal">
                ${imageURL ? `<img src="${escapeHTML(imageURL)}" alt="${escapeHTML(cert.title)}" loading="lazy" decoding="async" width="600" height="360">` : ""}
                <h3>${escapeHTML(cert.title)}</h3>
                ${cert.issuer ? `<p>${escapeHTML(cert.issuer)}</p>` : ""}
                ${issueDate}
                ${cert.description ? `<p>${escapeHTML(cert.description)}</p>` : ""}
                ${credentialURL ? `<a class="project-link" href="${escapeHTML(credentialURL)}" target="_blank" rel="noopener noreferrer">View Credential</a>` : ""}
            </article>
        `;
        }).join("");

        container.querySelectorAll("img").forEach((image) => {
            image.addEventListener("error", () => image.remove(), { once: true });
        });
    }

    async function loadRemoteContent() {
        if (!clientReady()) return;

        const [experience, certifications] = await Promise.all([
            fetchRows(
                "experience",
                "id,role,company,location,start_date,end_date,description,featured,sort_order",
                [{ column: "sort_order" }, { column: "start_date", ascending: false, nullsFirst: false }]
            ),
            fetchRows(
                "certifications",
                "id,title,issuer,issue_date,credential_url,certificate_image,description",
                [{ column: "issue_date", ascending: false, nullsFirst: false }, { column: "title" }]
            )
        ]);

        if (experience?.length) renderExperience(experience);
        if (certifications?.length) renderCertifications(certifications);

        if (experience?.length || certifications?.length) {
            console.log("[Supabase] Ordered remote experience and learning content loaded. Static skills and project views remain active.");
        } else {
            console.info("[Supabase] No remote rows found. Static content remains active.");
        }
    }

    function boot() {
        if (clientReady()) {
            loadRemoteContent();
            return;
        }

        let attempts = 0;
        const timer = window.setInterval(() => {
            attempts += 1;
            if (clientReady()) {
                window.clearInterval(timer);
                loadRemoteContent();
            } else if (attempts >= 40) {
                window.clearInterval(timer);
            }
        }, 250);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }
})();
