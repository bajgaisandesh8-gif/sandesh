/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   navigation.js
   ---------------------------------------------------------
   Shared navigation for single-page and multi-page views.
========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const nav = document.getElementById("nav");
        const navLinksContainer = document.getElementById("navLinks");
        const navToggle = document.getElementById("navToggle");
        const navProgress = document.getElementById("navProgress");
        const navLinks = document.querySelectorAll(".nav-link");
        const sections = document.querySelectorAll("main section[id]");

        if (!nav || !navLinksContainer || !navToggle) return;

        function openMenu() {
            navLinksContainer.classList.add("open");
            navToggle.classList.add("active");
            navToggle.setAttribute("aria-expanded", "true");
            navToggle.setAttribute("aria-label", "Close menu");
            document.body.classList.add("menu-open");
        }

        function closeMenu() {
            navLinksContainer.classList.remove("open");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open menu");
            document.body.classList.remove("menu-open");
        }

        navToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            navLinksContainer.classList.contains("open") ? closeMenu() : openMenu();
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();

                /* Compatibility layer for the original single-page links. */
                const href = link.getAttribute("href") || "";
                const pageMap = {
                    "#about": "about.html",
                    "#skills": "skills.html",
                    "#experience": "experience.html",
                    "#projects": "projects.html",
                    "#contact": "contact.html"
                };

                if (pageMap[href] && !document.querySelector(href)) {
                    window.location.href = pageMap[href];
                }
            });
        });

        document.addEventListener("click", function (event) {
            if (!nav.contains(event.target)) closeMenu();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeMenu();
        });

        function updateActiveSection() {
            if (!sections.length) return;
            let currentSection = "home";
            const marker = window.scrollY + 220;

            sections.forEach(function (section) {
                if (marker >= section.offsetTop) currentSection = section.id;
            });

            navLinks.forEach(function (link) {
                const sectionName = link.dataset.section || "";
                if (!sectionName) return;
                const active = sectionName === currentSection;
                link.classList.toggle("active", active);
                if (active) link.setAttribute("aria-current", "page");
                else link.removeAttribute("aria-current");
            });
        }

        function updateScrollProgress() {
            if (!navProgress) return;
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
            navProgress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }

        function updateNavbarState() {
            nav.classList.toggle("scrolled", window.scrollY > 40);
        }

        let ticking = false;
        function handleScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                updateActiveSection();
                updateScrollProgress();
                updateNavbarState();
                ticking = false;
            });
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) closeMenu();
            updateActiveSection();
            updateScrollProgress();
        });

        updateActiveSection();
        updateScrollProgress();
        updateNavbarState();
    });
})();
