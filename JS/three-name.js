/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   three-name.js
   ---------------------------------------------------------
   Interactive Hero Name Animation + Floating Nav Logo
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

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isMobile = window.innerWidth < 768;

        letters.forEach(function (letter, index) {
            letter.style.setProperty("--letter-index", index);
            if (reducedMotion) {
                letter.classList.add("letter-visible");
                return;
            }
            setTimeout(function () {
                letter.classList.add("letter-visible");
            }, 100 + index * 70);
        });

        if (!reducedMotion) {
            letters.forEach(function (letter, index) {
                letter.animate(
                    [
                        { transform: "translateY(0px)" },
                        { transform: "translateY(-6px)" },
                        { transform: "translateY(0px)" }
                    ],
                    {
                        duration: 2500 + index * 120,
                        iterations: Infinity,
                        easing: "ease-in-out"
                    }
                );
            });
        }

        if (!reducedMotion && !isMobile) {
            heroName.addEventListener("pointermove", function (event) {
                const rect = heroName.getBoundingClientRect();

                letters.forEach(function (letter) {
                    const letterRect = letter.getBoundingClientRect();
                    const centerX = letterRect.left + letterRect.width / 2;
                    const centerY = letterRect.top + letterRect.height / 2;
                    const dx = event.clientX - centerX;
                    const dy = event.clientY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const force = 1 - distance / 120;
                        const moveX = dx * force * 0.08;
                        const moveY = dy * force * 0.08;

                        letter.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.2})`;
                        letter.style.textShadow = `0 0 ${10 + force * 20}px rgba(100,243,176,0.9)`;
                    }
                });
            });

            heroName.addEventListener("pointerleave", function () {
                letters.forEach(function (letter) {
                    letter.style.transform = "";
                    letter.style.textShadow = "";
                });
            });
        }

        if (!reducedMotion) {
            setInterval(function () {
                const randomIndex = Math.floor(Math.random() * letters.length);
                const letter = letters[randomIndex];
                letter.classList.add("letter-pulse");
                setTimeout(function () {
                    letter.classList.remove("letter-pulse");
                }, 800);
            }, 1800);
        }

        if (!reducedMotion) {
            let ticking = false;
            window.addEventListener("scroll", function () {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(function () {
                    heroName.style.transform = `translateY(${window.scrollY * 0.15}px)`;
                    ticking = false;
                });
            }, { passive: true });
        }

        window.addEventListener("resize", function () {});

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