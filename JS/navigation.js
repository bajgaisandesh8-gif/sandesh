/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   navigation.js
   ---------------------------------------------------------
   Desktop navigation
   Mobile menu
   Active section
   Scroll progress
   Navbar state
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

        if (!nav || !navLinksContainer || !navToggle) {
            console.warn("[Navigation] Required navigation elements not found.");
            return;
        }

        let liveRegion = document.getElementById("a11yLive");
        if (!liveRegion) {
            liveRegion = document.createElement("div");
            liveRegion.id = "a11yLive";
            liveRegion.className = "a11y-live";
            liveRegion.setAttribute("aria-live", "polite");
            liveRegion.setAttribute("aria-atomic", "true");
            document.body.appendChild(liveRegion);
        }

        function announceMenuState(message) {
            liveRegion.textContent = "";
            window.requestAnimationFrame(function () {
                liveRegion.textContent = message;
            });
        }

        function setMenuOpen(open, options) {
            const shouldOpen = Boolean(open);
            const wasOpen = navLinksContainer.classList.contains("open");
            navLinksContainer.classList.toggle("open", shouldOpen);
            navToggle.classList.toggle("active", shouldOpen);
            navToggle.setAttribute("aria-expanded", String(shouldOpen));
            navToggle.setAttribute("aria-label", shouldOpen ? "Close menu" : "Open menu");
            navToggle.textContent = shouldOpen ? "×" : "☰";
            document.body.classList.toggle("menu-open", shouldOpen);

            if (wasOpen !== shouldOpen) {
                announceMenuState(shouldOpen ? "Navigation menu opened" : "Navigation menu closed");
            }

            if (shouldOpen && !wasOpen && options?.focusFirst) {
                navLinksContainer.querySelector("a")?.focus();
            } else if (!shouldOpen && wasOpen && options?.restoreFocus) {
                navToggle.focus();
            }
        }

        function closeMenu(options) {
            setMenuOpen(false, options);
        }

        navToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            setMenuOpen(!navLinksContainer.classList.contains("open"), { focusFirst: true });
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu({ restoreFocus: true });
            });
        });

        document.addEventListener("click", function (event) {
            if (!nav.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (!navLinksContainer.classList.contains("open")) return;

            if (event.key === "Escape") {
                closeMenu({ restoreFocus: true });
                return;
            }

            const links = Array.from(navLinksContainer.querySelectorAll("a[href]"));
            const currentIndex = links.indexOf(document.activeElement);
            if (!links.length || currentIndex < 0) return;

            let nextIndex;
            if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % links.length;
            else if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + links.length) % links.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = links.length - 1;
            else return;

            event.preventDefault();
            links[nextIndex].focus();
        });

        navLinksContainer.addEventListener("keydown", function (event) {
            if (event.key === "Tab" && event.shiftKey && document.activeElement === navLinksContainer.querySelector("a[href]")) {
                event.preventDefault();
                navToggle.focus();
            }
        });

        function updateActiveSection() {
            if (!sections.length) return;

            let currentSection = "home";
            const marker = window.scrollY + 220;

            sections.forEach(function (section) {
                if (marker >= section.offsetTop) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(function (link) {
                const sectionName = link.dataset.section ||
                    (link.getAttribute("href") || "").replace("#", "");

                const active = sectionName === currentSection;

                link.classList.toggle("active", active);

                if (active) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        function updateScrollProgress() {
            if (!navProgress) return;

            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (scrollableHeight <= 0) {
                navProgress.style.width = "0%";
                return;
            }

            const percentage = (window.scrollY / scrollableHeight) * 100;
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
            if (window.innerWidth > 1080) closeMenu();
            updateActiveSection();
            updateScrollProgress();
        });

        updateActiveSection();
        updateScrollProgress();
        updateNavbarState();

        document.documentElement.classList.add("js-navigation");

        console.log(
            "%c[NAVIGATION]%c initialized.",
            "color:#64f3b0;font-weight:bold;",
            "color:inherit;"
        );
    });
})();
