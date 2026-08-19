/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   animations.js
   ---------------------------------------------------------
   Handles:
   - Scroll reveal animations
   - Hero letter animation
   - Staggered elements
   - Button hover interaction
   - Card tilt interaction
   - Cursor glow
   - Reduced-motion support
========================================================= */

(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("DOMContentLoaded", function () {
        initializeScrollReveal();
        initializeHeroName();
        initializeStaggeredElements();
        initializeButtonEffects();
        initializeCardEffects();
        initializeCursorGlow();
        initializeParallax();

        console.log("%c[ANIMATIONS]%c initialized.", "color:#64f3b0;font-weight:bold;", "color:inherit;");
    });

    function initializeScrollReveal() {
        const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
        if (!elements.length) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            elements.forEach(element => element.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver(function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

        elements.forEach(element => observer.observe(element));
    }

    function initializeHeroName() {
        const heroName = document.getElementById("heroName");
        if (!heroName) return;

        const letters = heroName.querySelectorAll(".letter");
        if (!letters.length) return;

        if (prefersReducedMotion) {
            letters.forEach(letter => letter.classList.add("letter-visible"));
            return;
        }

        letters.forEach(function (letter, index) {
            letter.style.setProperty("--letter-index", index);
            window.setTimeout(function () {
                letter.classList.add("letter-visible");
            }, 80 + index * 70);
        });

        heroName.addEventListener("pointermove", function (event) {
            if (prefersReducedMotion) return;
            const rect = heroName.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            heroName.style.setProperty("--name-x", `${x * 8}px`);
            heroName.style.setProperty("--name-y", `${y * 5}px`);
        });

        heroName.addEventListener("pointerleave", function () {
            heroName.style.setProperty("--name-x", "0px");
            heroName.style.setProperty("--name-y", "0px");
        });
    }

    function initializeStaggeredElements() {
        document.querySelectorAll(".stagger").forEach(function (group) {
            Array.from(group.children).forEach(function (child, index) {
                child.style.setProperty("--stagger-index", index);
            });
        });
    }

    function initializeButtonEffects() {
        const buttons = document.querySelectorAll(".btn");
        if (!buttons.length || prefersReducedMotion) return;

        buttons.forEach(function (button) {
            button.addEventListener("pointermove", function (event) {
                const rect = button.getBoundingClientRect();
                button.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                button.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            });

            button.addEventListener("pointerleave", function () {
                button.style.setProperty("--mouse-x", "50%");
                button.style.setProperty("--mouse-y", "50%");
            });
        });
    }

    function initializeCardEffects() {
        /*
         * Project cards intentionally excluded here.
         * projects.js owns their hover transform/modal interaction.
         * Applying a second transform here used to overwrite that state
         * and made the desktop project grid feel unstable/messy.
         */
        const cards = document.querySelectorAll(
            ".skill-card, .cert-card, .about-panel, .timeline-item"
        );

        if (!cards.length || prefersReducedMotion) return;

        cards.forEach(function (card) {
            card.addEventListener("pointermove", function (event) {
                if (window.innerWidth < 900) return;

                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 5;
                const rotateX = (0.5 - y) * 5;

                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener("pointerleave", function () {
                card.style.transform = "";
            });
        });
    }

    function initializeCursorGlow() {
        if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

        let glow = document.querySelector(".cursor-glow");
        if (!glow) {
            glow = document.createElement("div");
            glow.className = "cursor-glow";
            glow.setAttribute("aria-hidden", "true");
            document.body.appendChild(glow);
        }

        let mouseX = -100, mouseY = -100, currentX = -100, currentY = -100;

        document.addEventListener("pointermove", function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }, { passive: true });

        function animateGlow() {
            currentX += (mouseX - currentX) * 0.12;
            currentY += (mouseY - currentY) * 0.12;
            glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    function initializeParallax() {
        if (prefersReducedMotion) return;

        const hero = document.getElementById("home");
        if (!hero) return;

        const heroInner = hero.querySelector(".hero-inner");
        if (!heroInner) return;

        let ticking = false;
        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(function () {
                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight) {
                    heroInner.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
                }
                ticking = false;
            });
        }, { passive: true });
    }
})();
