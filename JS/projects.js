/* SANDESH BAJGAI PORTFOLIO — PROJECTS / CONTENT ENGINE */
(function () {
  "use strict";

  const portfolioData = {
    skills: [
      { category: "networking", title: "Networking", stage: "FOUNDATIONS + PRACTICE", description: "Practical understanding of networking, connectivity and infrastructure fundamentals.", tags: ["IPv4", "IPv6", "DHCP", "DNS", "Subnetting", "TCP/IP", "Wi-Fi"] },
      { category: "infrastructure", title: "IT Infrastructure", stage: "PRACTICAL EXPOSURE", description: "Hands-on exposure to switches, access points, servers, CCTV and IT hardware.", tags: ["Switches", "PoE", "STP", "Fiber", "CCTV", "NVR", "Printers"] },
      {
        category: "development",
        title: "Web Development",
        stage: "BUILDING PROJECTS",
        description: "Building responsive websites while exploring frontend, backend, databases, CMS platforms and modern development tooling.",
        tags: [
          "HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM APIs",
          "Python", "Node.js", "Backend Concepts", "SQL", "Supabase", "MongoDB",
          "REST APIs", "Git", "GitHub", "VS Code", "Bootstrap", "WordPress"
        ]
      },
      { category: "cybersecurity", title: "Cybersecurity", stage: "CURRENTLY LEARNING", description: "Developing knowledge in cybersecurity, networking security and defensive concepts.", tags: ["Linux", "Networking Security", "System Security", "Threat Awareness", "Security Basics"] },
      { category: "ai", title: "AI & Automation", stage: "ACTIVE USE", description: "Using modern AI tools to improve development, design and productivity workflows.", tags: ["Generative AI", "Prompt Engineering", "AI Tools", "Automation"] }
    ],

    experience: [{
      date: "CONTRACT EXPERIENCE · 2026",
      title: "IT Support & Networking Assistant (Contract)",
      company: "Soaltee Westend Itahari",
      description: "Supported day-to-day hotel IT and network operations, with practical exposure to access points, switches, structured cabling, CCTV/NVR systems, connected devices and technical troubleshooting."
    }],

    projects: [
      { category: "WEB", title: "Developer Portfolio", description: "A handcrafted personal portfolio built with HTML, CSS, Vanilla JavaScript and Three.js, with a Supabase-powered content layer.", technologies: ["HTML5", "CSS3", "JavaScript", "Three.js", "Supabase"], link: "https://bajgaisandesh8-gif.github.io/sandesh/", github: "https://github.com/bajgaisandesh8-gif/sandesh", status: "LIVE", featured: true },
      { category: "NETWORKING", title: "NETSCOPE", description: "A networking-focused project using a React frontend, Flask backend and Supabase, with network discovery capabilities under development.", technologies: ["React", "Flask", "Python", "Supabase", "Nmap"], github: "https://github.com/bajgaisandesh8-gif/NETSCOPE", status: "IN DEVELOPMENT" },
      { category: "NETWORKING", title: "NETLAB", description: "A planned networking learning and simulation platform for students and teachers. The project is currently at the specification and planning stage.", technologies: ["Next.js", "Flask", "Supabase", "Networking Labs"], status: "SPECIFICATION" }
    ],

    certifications: [
      { title: "Networking Fundamentals", description: "Ongoing study of IP addressing, subnetting, DHCP, DNS, TCP/IP and connectivity concepts. This is a learning area, not a formal certification." },
      { title: "Web Development", description: "Building with HTML, CSS and JavaScript while learning backend development, databases, APIs and development workflows." },
      { title: "IT Infrastructure", description: "Continuing to build practical knowledge of hardware, switching, wireless access points, structured cabling and technical support." }
    ]
  };

  const esc = value => String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  const projectSlug = item => item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const reveal = container => {
    if (!container) return;
    container.querySelectorAll(".reveal").forEach((element, index) => {
      element.style.setProperty("--stagger-index", index);
      requestAnimationFrame(() => element.classList.add("visible"));
    });
  };

  function renderSkills(category = "all") {
    const el = document.getElementById("skillsGrid");
    if (!el) return;
    const items = portfolioData.skills.filter(item => category === "all" || item.category === category);
    el.innerHTML = items.map((item, index) => `
      <article class="skill-card reveal" data-category="${esc(item.category)}">
        <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
        <div class="skill-card-header"><span class="skill-category">${esc(item.category)}</span><span class="skill-stage">${esc(item.stage || "CURRENT FOCUS")}</span></div>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.description)}</p>
        <div class="skill-tags">${item.tags.map(tag => `<span>${esc(tag)}</span>`).join("")}</div>
      </article>`).join("");
    reveal(el);
  }

  function renderExperience() {
    const el = document.getElementById("timeline");
    if (!el) return;
    el.innerHTML = portfolioData.experience.map(item => `
      <article class="timeline-item reveal">
        <span class="date">${esc(item.date)}</span>
        <h3>${esc(item.title)}</h3>
        <p class="timeline-company">${esc(item.company)}</p>
        <p>${esc(item.description)}</p>
      </article>`).join("");
    reveal(el);
  }

  function renderProjects(category = "ALL") {
    const el = document.getElementById("projectsGrid");
    if (!el) return;
    const items = portfolioData.projects.filter(item => category === "ALL" || item.category === category);
    el.innerHTML = items.map((item, index) => {
      const originalIndex = portfolioData.projects.indexOf(item);
      return `
        <article class="project-card project-card-pro reveal ${item.featured ? "is-featured" : ""}" data-project-index="${originalIndex}">
          <div class="project-top"><span class="project-category">${esc(item.category)}</span><span class="project-status">${esc(item.status || "PROJECT")}</span></div>
          <div class="project-number">${String(index + 1).padStart(2, "0")}</div>
          <div class="project-icon" aria-hidden="true">⌁</div>
          <h3>${esc(item.title)}</h3><p>${esc(item.description)}</p>
          <div class="project-tech">${item.technologies.map(tag => `<span>${esc(tag)}</span>`).join("")}</div>
          <div class="project-actions">
            <button type="button" class="project-details" data-project="${originalIndex}" aria-haspopup="dialog">VIEW DETAILS</button>
            ${item.link && item.link !== "#" ? `<a class="project-link" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">LIVE ↗</a>` : ""}
            ${item.github ? `<a class="project-link secondary" href="${esc(item.github)}" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>` : ""}
          </div>
        </article>`;
    }).join("");
    bindProjectCards();
    reveal(el);
  }

  function renderCertifications() {
    const el = document.getElementById("certsGrid");
    if (!el) return;
    el.innerHTML = portfolioData.certifications.map((item, index) => `
      <article class="cert-card reveal">
        <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="cert-status">LEARNING AREA</span>
        <h3>${esc(item.title)}</h3><p>${esc(item.description)}</p>
      </article>`).join("");
    reveal(el);
  }

  function openProject(index, options = {}) {
    const item = portfolioData.projects[index];
    if (!item) return;
    let modal = document.getElementById("projectModal");
    const opener = document.activeElement;
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "projectModal";
      modal.className = "project-modal";
      modal.innerHTML = `
        <div class="project-modal-backdrop" data-close-project></div>
        <div class="project-modal-panel" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle" aria-describedby="projectModalDescription" tabindex="-1">
          <button class="project-modal-close" type="button" data-close-project aria-label="Close project details">×</button>
          <span class="modal-kicker">PROJECT // CASE STUDY</span>
          <div class="modal-category" id="projectModalCategory"></div>
          <h2 id="projectModalTitle"></h2><p id="projectModalDescription"></p>
          <div class="case-study-sections" id="projectModalSections"></div>
          <h3 class="case-study-stack-title">Technology</h3><div class="modal-tech" id="projectModalTech"></div><div class="modal-actions" id="projectModalActions"></div>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener("keydown", event => {
        if (!modal.classList.contains("open")) return;
        if (event.key === "Escape") { event.preventDefault(); closeProject(); return; }
        if (event.key !== "Tab") return;
        const focusable = [...modal.querySelectorAll("button:not([disabled]),a[href]")];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
      modal.addEventListener("click", event => {
        if (event.target.matches("[data-close-project]")) closeProject();
      });
    }
    modal._opener = options.fromHistory ? (modal._opener || null) : opener;
    modal.querySelector("#projectModalCategory").textContent = `${item.category} // ${item.status || "PROJECT"}`;
    modal.querySelector("#projectModalTitle").textContent = item.title;
    modal.querySelector("#projectModalDescription").textContent = item.description;
    const documented = [
      ["Problem and goals", "Not yet documented in the portfolio."],
      ["Current status", item.status || "Not documented"],
      ["Architecture and implementation", "Not yet documented in the portfolio."],
      ["Challenges and lessons", "Not yet documented in the portfolio."]
    ];
    modal.querySelector("#projectModalSections").innerHTML = documented.map(([heading, body]) => `<section class="case-study-section"><h3>${esc(heading)}</h3><p>${esc(body)}</p></section>`).join("");
    modal.querySelector("#projectModalTech").innerHTML = item.technologies.map(tag => `<span>${esc(tag)}</span>`).join("");
    modal.querySelector("#projectModalActions").innerHTML = `${item.link && item.link !== "#" ? `<a class="btn btn-primary" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">OPEN LIVE ↗</a>` : ""}${item.github ? `<a class="btn btn-secondary" href="${esc(item.github)}" target="_blank" rel="noopener noreferrer">VIEW GITHUB ↗</a>` : ""}`;
    modal.classList.add("open");
    document.body.classList.add("project-modal-open");
    if (!options.fromHistory) {
      const url = new URL(window.location.href);
      if (url.searchParams.get("project") !== projectSlug(item)) {
        url.searchParams.set("project", projectSlug(item));
        window.history.pushState({ project: projectSlug(item) }, "", url);
      }
    }
    modal.querySelector(".project-modal-close").focus();
  }

  function closeProject(options = {}) {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    const opener = modal._opener;
    modal.classList.remove("open");
    document.body.classList.remove("project-modal-open");
    if (!options.fromHistory) {
      const url = new URL(window.location.href);
      if (url.searchParams.has("project")) {
        url.searchParams.delete("project");
        window.history.replaceState(window.history.state, "", url);
      }
    }
    if (opener && typeof opener.focus === "function") opener.focus();
  }

  function bindProjectCards() {
    document.querySelectorAll(".project-details").forEach(button => button.addEventListener("click", event => {
      openProject(Number(button.dataset.project));
    }));
  }

  function initializeFilters() {
    document.querySelectorAll("#skillsFilter .filter-btn").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll("#skillsFilter .filter-btn").forEach(btn => { btn.classList.remove("active"); btn.setAttribute("aria-selected", "false"); });
      button.classList.add("active"); button.setAttribute("aria-selected", "true");
      renderSkills(button.dataset.category || "all");
    }));
    document.querySelectorAll("#projectsFilter .filter-btn").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll("#projectsFilter .filter-btn").forEach(btn => { btn.classList.remove("active"); btn.setAttribute("aria-selected", "false"); });
      button.classList.add("active"); button.setAttribute("aria-selected", "true");
      renderProjects(button.dataset.category || "ALL");
    }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderSkills(); renderExperience(); renderProjects(); renderCertifications(); initializeFilters();
    const showLinkedProject = () => {
      const slug = new URL(window.location.href).searchParams.get("project");
      const index = portfolioData.projects.findIndex(item => projectSlug(item) === slug);
      if (index >= 0 && !document.getElementById("projectModal")?.classList.contains("open")) openProject(index, { fromHistory: true });
      else if (slug && index < 0) console.info("[Projects] The requested project detail is not available in this local dataset.");
    };
    showLinkedProject();
    window.addEventListener("popstate", () => {
      if (document.getElementById("projectModal")?.classList.contains("open")) closeProject({ fromHistory: true });
      else showLinkedProject();
    });
  }, { once: true });

  window.SandeshProjects = { data: portfolioData, openProject, closeProject, renderProjects, renderSkills };
})();
