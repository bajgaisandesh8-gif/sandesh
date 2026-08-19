/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   app.js — core utilities + profile narrative
   ========================================================= */
(function () {
    "use strict";

    const CONFIG = Object.freeze({
        email: "bajgaisandesh8@gmail.com",
        github: "https://github.com/bajgaisandesh8-gif"
    });

    function initializeYear() {
        const year = document.getElementById("year");
        if (year) year.textContent = String(new Date().getFullYear());
    }

    function initializeExternalLinks() {
        const github = document.getElementById("linkGithub");
        const email = document.getElementById("linkEmail");

        if (github) {
            github.href = CONFIG.github;
            github.target = "_blank";
            github.rel = "noopener noreferrer";
        }

        if (email) email.href = `mailto:${CONFIG.email}`;
    }

    function initializeProfileImage() {
        const image = document.getElementById("profileImg");
        if (!image) return;

        image.addEventListener("error", () => image.classList.add("image-error"), { once: true });
        image.addEventListener("load", () => image.classList.add("loaded"), { once: true });
    }

    function initializeBackToTop() {
        const button = document.querySelector(".back-top");
        if (!button) return;

        button.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function initializeSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const id = link.getAttribute("href");
                if (!id || id === "#") return;

                const target = document.querySelector(id);
                if (!target) return;

                event.preventDefault();
                const nav = document.getElementById("nav");
                const offset = nav ? nav.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            });
        });
    }

    function initializeAccessibility() {
        if (document.querySelector('script[data-sandesh-a11y="true"]')) return;
        const script = document.createElement("script");
        script.src = "JS/accessibility.js";
        script.defer = true;
        script.dataset.sandeshA11y = "true";
        document.head.appendChild(script);
    }

    function initializeAboutNarrative() {
        const aboutCopy = document.querySelector("#about .about-copy");
        if (!aboutCopy || aboutCopy.dataset.narrativeReady === "true") return;
        aboutCopy.dataset.narrativeReady = "true";

        const lead = aboutCopy.querySelector(".about-lead");
        const body = aboutCopy.querySelector(".about-body");

        if (lead) {
            lead.textContent = "I’m building across the parts of technology that interest me most — networking and IT infrastructure, cybersecurity, web development, databases, backend systems, AI-assisted development, and practical software tools.";
        }

        if (body) {
            body.textContent = "My learning has moved beyond just writing frontend pages. I’ve worked with HTML, CSS and JavaScript, explored Node.js and backend concepts, worked with Supabase and SQL-style database workflows, explored MongoDB and Python, and experimented with AI-assisted development. I’m also learning how these pieces connect: a frontend talks to a backend, the backend works with data, and the whole system has to be reliable and secure. Alongside development, I’ve explored tools such as VS Code, GitHub, Canva, Photoshop and office software while building projects and working with real IT infrastructure. I’m still developing these skills, so I prefer to describe them as areas I’m building and exploring rather than pretending I’m an expert.";
        }

        const values = aboutCopy.querySelector(".values-row");
        if (!values) return;

        const stack = document.createElement("div");
        stack.className = "about-stack";
        stack.setAttribute("aria-label", "Technology areas I am exploring");
        stack.innerHTML = `
            <div class="about-stack-label">CURRENT BUILD AREAS</div>
            <div class="about-stack-grid">
                <span>HTML / CSS / JS</span>
                <span>Node.js / Backend</span>
                <span>Supabase / SQL</span>
                <span>MongoDB</span>
                <span>Python</span>
                <span>AI-assisted Development</span>
                <span>Git / GitHub</span>
                <span>Software &amp; IT Tools</span>
            </div>
        `;
        values.insertAdjacentElement("beforebegin", stack);

        const style = document.createElement("style");
        style.textContent = `
            #about .about-stack{margin:26px 0 22px;padding:15px;border:1px solid rgba(100,243,176,.13);background:linear-gradient(135deg,rgba(100,243,176,.035),rgba(84,168,255,.025));border-radius:10px}
            #about .about-stack-label{font:600 9px/1.2 "JetBrains Mono",monospace;letter-spacing:.16em;color:#64f3b0;margin-bottom:12px}
            #about .about-stack-grid{display:flex;flex-wrap:wrap;gap:7px}
            #about .about-stack-grid span{padding:7px 9px;border:1px solid rgba(255,255,255,.07);border-radius:5px;background:rgba(2,8,10,.55);color:#a8bab7;font:500 10px/1.2 "JetBrains Mono",monospace}
            #about .about-stack-grid span:hover{border-color:rgba(100,243,176,.28);color:#d9fff0}
            @media(max-width:700px){#about .about-stack{margin-top:20px;padding:13px}#about .about-stack-grid span{font-size:9px}}
            @media(prefers-reduced-motion:reduce){#about .about-stack-grid span{transition:none!important}}
        `;
        document.head.appendChild(style);
    }

    function initializePageReady() {
        document.documentElement.classList.add("js-ready");
    }

    document.addEventListener("DOMContentLoaded", () => {
        initializeYear();
        initializeExternalLinks();
        initializeBackToTop();
        initializeProfileImage();
        initializeSmoothAnchors();
        initializeAccessibility();
        initializeAboutNarrative();
        initializePageReady();
    }, { once: true });
})();
