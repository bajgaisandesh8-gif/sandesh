/* =========================================================
   INTERACTIVE CAPABILITY TOPOLOGY — Phase 1
   Static, accessible, no external dependencies or API calls.
========================================================= */
(function () {
  "use strict";
  const graph = document.getElementById("capabilityTopology");
  const detail = document.getElementById("topologyDetail");
  if (!graph || !detail) return;

  const nodes = {
    networking: {
      index: "01", label: "NETWORKING", title: "Networking & Infrastructure",
      description: "Exploring how devices, services and networks connect — supported by practical exposure to switching, wireless access points, structured cabling and network troubleshooting.",
      link: "#skills", linkLabel: "EXPLORE SKILLS"
    },
    cybersecurity: {
      index: "02", label: "CYBERSECURITY", title: "Cybersecurity Foundations",
      description: "Building foundational knowledge around Linux, system security, networking concepts and defensive thinking. This is an active learning area, not a claim of professional security expertise.",
      link: "#skills", linkLabel: "VIEW TOOLKIT"
    },
    development: {
      index: "03", label: "DEVELOPMENT", title: "Software & Web Development",
      description: "Building web interfaces and learning backend workflows with JavaScript, Python, APIs and databases. The focus is on shipping working projects and understanding how their parts fit together.",
      link: "#projects", linkLabel: "VIEW PROJECTS"
    },
    field: {
      index: "04", label: "FIELD EXPERIENCE", title: "Practical IT Experience",
      description: "Contract-based IT support and networking exposure, including structured cabling, access points, switching, CCTV-related infrastructure and device connectivity.",
      link: "#experience", linkLabel: "VIEW EXPERIENCE"
    },
    projects: {
      index: "05", label: "PROJECTS", title: "Building Practical Projects",
      description: "Developing portfolio and networking tools, including NETLAB and NETSCOPE. Project pages will become the evidence layer for the skills represented in this map.",
      link: "#projects", linkLabel: "EXPLORE PROJECTS"
    },
    learning: {
      index: "06", label: "LEARNING", title: "Continuous Learning",
      description: "Studying Grade 12 Science with Computer Science while independently exploring networking, cybersecurity, software development and AI-assisted workflows.",
      link: "#about", linkLabel: "ABOUT MY JOURNEY"
    }
  };

  function selectNode(key) {
    const item = nodes[key];
    if (!item) return;
    graph.querySelectorAll("[data-node]").forEach((button) => {
      const active = button.dataset.node === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    detail.innerHTML = "";
    const copy = document.createElement("div");
    copy.className = "topology-detail-copy";
    const kicker = document.createElement("span");
    kicker.className = "topology-detail-kicker";
    kicker.textContent = "NODE " + item.index + " / " + item.label;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description;
    copy.append(kicker, title, description);
    const link = document.createElement("a");
    link.className = "topology-detail-link";
    link.href = item.link;
    link.innerHTML = "";
    link.append(document.createTextNode(item.linkLabel + " "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(arrow);
    detail.append(copy, link);
  }

  graph.addEventListener("click", (event) => {
    const button = event.target.closest("[data-node]");
    if (button && graph.contains(button)) selectNode(button.dataset.node);
  });

  selectNode("networking");
})();
