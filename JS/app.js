/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   app.js — core utilities only
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

    function initializePageReady() {
        document.documentElement.classList.add("js-ready");
    }

    document.addEventListener("DOMContentLoaded", () => {
        initializeYear();
        initializeExternalLinks();
        initializeBackToTop();
        initializeProfileImage();
        initializeSmoothAnchors();
        initializePageReady();
    }, { once: true });
})();
