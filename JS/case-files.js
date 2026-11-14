/* =========================================================
   SANDESH BAJGAI — FIELD CASE FILES & PROOF OF WORK
   Phase 2: static, evidence-led content; no API dependencies.
========================================================= */
(function () {
  "use strict";
  const caseFiles = [
    {
      id: "wifi",
      type: "FIELD WORK / WIRELESS",
      title: "Wireless Access Point Deployment",
      summary: "Practical exposure to access-point deployment and hotel Wi-Fi infrastructure checks.",
      context: "Hotel environments rely on connected access points and stable wireless coverage for staff and guest-facing services.",
      contribution: "Supported access-point work and connectivity checks, and gained practical exposure to how wireless infrastructure fits into a wider network.",
      scope: ["Wireless access points", "Wi-Fi connectivity", "Infrastructure checks"]
    },
    {
      id: "cabling",
      type: "FIELD WORK / CABLING",
      title: "Structured Cabling & Switching",
      summary: "Hands-on practice with Ethernet cabling, RJ45 termination and network switching equipment.",
      context: "Reliable wired connectivity depends on correctly prepared cables, physical connections and functioning network equipment.",
      contribution: "Practised Cat6 cable preparation and RJ45 crimping, and worked around switches and connected endpoints as part of IT support tasks.",
      scope: ["Cat6", "RJ45 termination", "Ethernet", "Switches"]
    },
    {
      id: "cctv",
      type: "FIELD WORK / CCTV",
      title: "CCTV, NVR & Device Mapping",
      summary: "Exposure to network-connected cameras, NVR equipment and device identification.",
      context: "CCTV systems combine cameras, recording equipment and network connectivity that need to be identifiable and maintainable.",
      contribution: "Assisted with camera and NVR-related mapping and device identification. Private IP details, layouts and operational information are intentionally excluded.",
      scope: ["CCTV", "NVR", "IP device mapping", "Network connectivity"]
    },
    {
      id: "endpoints",
      type: "FIELD WORK / IT SUPPORT",
      title: "Connected Device Support",
      summary: "Practical IT support across devices used in a hotel environment.",
      context: "Everyday operations depend on endpoints and peripherals staying connected to the right services and networks.",
      contribution: "Gained hands-on exposure to connectivity and support tasks involving TVs, IP phones, printers, biometric devices and other IT equipment.",
      scope: ["Endpoint connectivity", "Printers", "IP phones", "Biometric devices"]
    }
  ];

  const proofItems = [
    {
      status: "LIVE / PUBLIC",
      title: "Personal Portfolio",
      description: "A live portfolio built with HTML, CSS, JavaScript and Three.js. Its content layer also uses Supabase.",
      links: [
        { label: "LIVE SITE ↗", href: "https://bajgaisandesh8-gif.github.io/sandesh/" },
        { label: "SOURCE CODE ↗", href: "https://github.com/bajgaisandesh8-gif/sandesh" }
      ]
    },
    {
      status: "IN DEVELOPMENT",
      title: "NETSCOPE",
      description: "A networking-focused application using a React frontend, Flask backend and Supabase, with network discovery capabilities being developed.",
      links: [{ label: "GITHUB REPOSITORY ↗", href: "https://github.com/bajgaisandesh8-gif/NETSCOPE" }]
    },
    {
      status: "SPECIFICATION STAGE",
      title: "NETLAB",
      description: "A planned networking learning and simulation platform for students and teachers. The architecture and feature scope have been planned; implementation is not represented as complete.",
      links: []
    },
    {
      status: "LEARNING IN PROGRESS",
      title: "Cybersecurity & Automation",
      description: "Currently exploring Linux, security fundamentals, local LLM tooling and automation workflows. These are learning areas, not completed production projects.",
      links: []
    }
  ];

  const escapeHTML = (value) => String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  function renderCaseFiles() {
    const container = document.getElementById("caseFilesGrid");
    if (!container) return;
    container.innerHTML = caseFiles.map((item, index) => `
      <article class="case-file-card reveal" id="case-${escapeHTML(item.id)}">
        <div class="case-file-top"><span class="case-file-index">CASE / ${String(index + 1).padStart(2, "0")}</span><span class="case-file-type">${escapeHTML(item.type)}</span></div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.summary)}</p>
        <div class="case-file-tags">${item.scope.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
        <details><summary>OPEN FIELD NOTES</summary><div class="case-file-notes">
          <div><h4>CONTEXT</h4><p>${escapeHTML(item.context)}</p></div>
          <div><h4>MY CONTRIBUTION</h4><p>${escapeHTML(item.contribution)}</p></div>
        </div></details>
      </article>`).join("");
    container.querySelectorAll(".reveal").forEach((element) => requestAnimationFrame(() => element.classList.add("visible")));
  }

  function renderProofWork() {
    const container = document.getElementById("proofWorkGrid");
    if (!container) return;
    container.innerHTML = proofItems.map((item) => `
      <article class="proof-work-card reveal">
        <div class="proof-work-top"><span class="proof-work-status">${escapeHTML(item.status)}</span></div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
        ${item.links.length ? `<div class="proof-links">${item.links.map(link => `<a href="${escapeHTML(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)}</a>`).join("")}</div>` : ""}
      </article>`).join("");
    container.querySelectorAll(".reveal").forEach((element) => requestAnimationFrame(() => element.classList.add("visible")));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCaseFiles();
    renderProofWork();
  }, { once: true });
})();
