/* Ember & Sage portfolio project integration */
(function () {
  "use strict";

  const project = {
    category: "WEB",
    title: "Ember & Sage — Restaurant Experience",
    description: "A cinematic restaurant website focused on editorial typography, responsive layouts, interactive reservation UI and a warm fire-and-sage visual identity.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Responsive UI"],
    link: "projects/ember-sage/index.html"
  };

  function addProjectCard() {
    const grid = document.getElementById("projectsGrid");
    if (!grid || grid.querySelector('[data-project="ember-sage"]')) return;

    const card = document.createElement("article");
    card.className = "project-card reveal visible";
    card.dataset.category = project.category;
    card.dataset.project = "ember-sage";
    card.innerHTML = `
      <div class="project-card-top"><span class="project-category">${project.category}</span></div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tech">${project.technologies.map(t => `<span>${t}</span>`).join("")}</div>
      <a href="${project.link}" class="project-link">View Project</a>
    `;
    grid.appendChild(card);
  }

  document.addEventListener("DOMContentLoaded", function () {
    addProjectCard();

    const filter = document.getElementById("projectsFilter");
    if (filter) {
      filter.addEventListener("click", function () {
        window.setTimeout(function () {
          const active = filter.querySelector(".filter-btn.active");
          if (active && ["ALL", "WEB"].includes(active.dataset.category)) {
            addProjectCard();
          }
        }, 0);
      });
    }
  });
})();
