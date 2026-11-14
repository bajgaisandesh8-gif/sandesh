/* PROJECT INTELLIGENCE — Phase 4
   Curated snapshot of verified public GitHub commits.
   This is intentionally not presented as a live feed. */
(function () {
  "use strict";
  const feed = document.getElementById("projectUpdatesFeed");
  if (!feed) return;

  const updates = [
    {
      repo: "NETSCOPE",
      date: "06 SEP 2026 · 16:16 UTC",
      title: "Preserve local data directory",
      summary: "A repository maintenance commit keeps the local data directory represented in the project structure.",
      kind: "REPOSITORY COMMIT",
      url: "https://github.com/bajgaisandesh8-gif/NETSCOPE/commit/1ea88ee7776b64239165c319d902015d76a898ad"
    },
    {
      repo: "NETSCOPE",
      date: "06 SEP 2026 · 16:09 UTC",
      title: "Initialize core frontend architecture",
      summary: "The repository records its React, Vite and Tailwind CSS frontend foundation, along with initial application setup.",
      kind: "REPOSITORY COMMIT",
      url: "https://github.com/bajgaisandesh8-gif/NETSCOPE/commit/dedbd7aaa488411a4da16d62470e4dc8e1b3f8e4"
    },
    {
      repo: "DEVELOPER PORTFOLIO",
      date: "20 AUG 2026 · 06:12 UTC",
      title: "Improve the mobile Projects layout",
      summary: "A public main-branch commit addresses the Projects section layout on mobile and prevents desktop grid overrides.",
      kind: "REPOSITORY COMMIT",
      url: "https://github.com/bajgaisandesh8-gif/sandesh/commit/34b74fe0f3c2cfa65b042c1ee97795112d168f15"
    }
  ];

  const esc = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  feed.innerHTML = updates.map(item => `
    <article class="project-update-card">
      <div class="project-update-top">
        <span class="project-update-repo">${esc(item.repo)}</span>
        <time class="project-update-date">${esc(item.date)}</time>
      </div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.summary)}</p>
      <div class="project-update-bottom">
        <span class="project-update-kind">${esc(item.kind)}</span>
        <a class="project-update-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">VIEW COMMIT ↗</a>
      </div>
    </article>`).join("");
})();