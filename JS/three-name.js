/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   three-name.js
   ---------------------------------------------------------
   Interactive Hero Name Animation
========================================================= */

(function () {
    "use strict";

    document.addEventListener(
        "DOMContentLoaded",
        initializeHeroName
    );

    function initializeHeroName() {

        const heroName =
            document.getElementById(
                "heroName"
            );

        if (!heroName) {

            console.warn(
                "[Three Name] heroName not found."
            );

            return;
        }

        const letters =
            heroName.querySelectorAll(
                ".letter"
            );

        if (!letters.length) {
            return;
        }

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        const isMobile =
            window.innerWidth < 768;


        /* ============================================
           INITIAL REVEAL
        ============================================ */

        letters.forEach(
            function (letter, index) {

                letter.style.setProperty(
                    "--letter-index",
                    index
                );

                if (reducedMotion) {

                    letter.classList.add(
                        "letter-visible"
                    );

                    return;
                }

                setTimeout(
                    function () {

                        letter.classList.add(
                            "letter-visible"
                        );

                    },
                    100 + index * 70
                );
            }
        );


        /* ============================================
           FLOATING ANIMATION
        ============================================ */

        if (!reducedMotion) {

            letters.forEach(
                function (
                    letter,
                    index
                ) {

                    letter.animate(
                        [
                            {
                                transform:
                                    "translateY(0px)"
                            },
                            {
                                transform:
                                    "translateY(-6px)"
                            },
                            {
                                transform:
                                    "translateY(0px)"
                            }
                        ],
                        {

                            duration:
                                2500 +
                                index * 120,

                            iterations:
                                Infinity,

                            easing:
                                "ease-in-out"
                        }
                    );
                }
            );
        }


        /* ============================================
           MOUSE INTERACTION
        ============================================ */

        if (
            !reducedMotion &&
            !isMobile
        ) {

            heroName.addEventListener(
                "pointermove",
                function (event) {

                    const rect =
                        heroName.getBoundingClientRect();

                    const mouseX =
                        event.clientX -
                        rect.left;

                    const mouseY =
                        event.clientY -
                        rect.top;


                    letters.forEach(
                        function (
                            letter
                        ) {

                            const letterRect =
                                letter.getBoundingClientRect();

                            const centerX =
                                letterRect.left +
                                letterRect.width / 2;

                            const centerY =
                                letterRect.top +
                                letterRect.height / 2;

                            const dx =
                                event.clientX -
                                centerX;

                            const dy =
                                event.clientY -
                                centerY;

                            const distance =
                                Math.sqrt(
                                    dx * dx +
                                    dy * dy
                                );

                            if (
                                distance < 120
                            ) {

                                const force =
                                    1 -
                                    (
                                        distance /
                                        120
                                    );

                                const moveX =
                                    dx * force * 0.08;

                                const moveY =
                                    dy * force * 0.08;

                                letter.style.transform =
                                    `translate(
                                        ${moveX}px,
                                        ${moveY}px
                                    ) scale(
                                        ${1 + force * 0.2}
                                    )`;

                                letter.style.textShadow =
                                    `
                                    0 0 ${
                                        10 +
                                        force * 20
                                    }px rgba(
                                        100,
                                        243,
                                        176,
                                        0.9
                                    )
                                `;
                            }
                        }
                    );
                }
            );


            heroName.addEventListener(
                "pointerleave",
                function () {

                    letters.forEach(
                        function (
                            letter
                        ) {

                            letter.style.transform =
                                "";

                            letter.style.textShadow =
                                "";
                        }
                    );
                }
            );
        }


        /* ============================================
           RANDOM GLOW
        ============================================ */

        if (!reducedMotion) {

            setInterval(
                function () {

                    const randomIndex =
                        Math.floor(
                            Math.random() *
                            letters.length
                        );

                    const letter =
                        letters[randomIndex];

                    letter.classList.add(
                        "letter-pulse"
                    );

                    setTimeout(
                        function () {

                            letter.classList.remove(
                                "letter-pulse"
                            );

                        },
                        800
                    );

                },
                1800
            );
        }


        /* ============================================
           SCROLL PARALLAX
        ============================================ */

        if (!reducedMotion) {

            let ticking = false;

            window.addEventListener(
                "scroll",
                function () {

                    if (ticking) {
                        return;
                    }

                    ticking = true;

                    requestAnimationFrame(
                        function () {

                            const scrollY =
                                window.scrollY;

                            heroName.style.transform =
                                `translateY(${
                                    scrollY * 0.15
                                }px)`;

                            ticking = false;
                        }
                    );
                },
                {
                    passive: true
                }
            );
        }


        /* ============================================
           RESIZE
        ============================================ */

        window.addEventListener(
            "resize",
            function () {

                /*
                 * Future responsive adjustments
                 */
            }
        );


        console.log(
            "%c[THREE-NAME]%c initialized.",
            "color:#64f3b0;font-weight:bold;",
            "color:inherit;"
        );
    }

})();
