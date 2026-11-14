/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   three-name.js
   ---------------------------------------------------------
   Static Hero Name + Floating Nav Logo
========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        initializeHeroName();
        initializeFloatingLogo();
    });

    function initializeHeroName() {
        const heroName = document.getElementById("heroName");
        if (!heroName) return;

        const letters = heroName.querySelectorAll(".letter");
        if (!letters.length) return;
        letters.forEach(function (letter) {
            letter.classList.add("letter-visible");
        });

        console.log("%c[THREE-NAME]%c initialized.", "color:#64f3b0;font-weight:bold;", "color:inherit;");
    }

    function initializeFloatingLogo() {
        const logo = document.querySelector(".nav-logo");
        if (!logo) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;

        logo.setAttribute("data-brand", "SANDESH");
        logo.setAttribute("aria-label", "SANDESH home");

        /* Replace the compact SB mark visually without changing the link target. */
        logo.innerHTML = '<span class="floating-brand">SANDESH</span>';

        if (reducedMotion) return;

        const brand = logo.querySelector(".floating-brand");
        if (!brand) return;

        brand.animate(
            [
                { transform: "translateY(0px)" },
                { transform: "translateY(-3px)" },
                { transform: "translateY(0px)" }
            ],
            {
                duration: 2800,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

        if (!isTouch) {
            logo.addEventListener("pointermove", function (event) {
                const rect = logo.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                brand.style.transform = `translate(${x * 4}px, ${y * 3 - 3}px) scale(1.04)`;
                brand.style.textShadow = "0 0 8px rgba(100,243,176,.8), 0 0 24px rgba(100,243,176,.35)";
            });

            logo.addEventListener("pointerleave", function () {
                brand.style.transform = "";
                brand.style.textShadow = "";
            });
        }
    }

})();
