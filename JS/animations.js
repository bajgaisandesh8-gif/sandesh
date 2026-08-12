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


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializeScrollReveal();

            initializeHeroName();

            initializeStaggeredElements();

            initializeButtonEffects();

            initializeCardEffects();

            initializeCursorGlow();

            initializeParallax();

            console.log(
                "%c[ANIMATIONS]%c initialized.",
                "color:#64f3b0;font-weight:bold;",
                "color:inherit;"
            );
        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    function initializeScrollReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal, " +
                ".reveal-left, " +
                ".reveal-right, " +
                ".reveal-scale"
            );


        if (!elements.length) {
            return;
        }


        /*
         * If user has requested reduced motion,
         * show everything immediately.
         */

        if (prefersReducedMotion) {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );
                }
            );

            return;
        }


        /*
         * IntersectionObserver is much better
         * than running scroll calculations
         * on every frame.
         */

        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );
                }
            );

            return;
        }


        const observer =
            new IntersectionObserver(
                function (entries, observerInstance) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "visible"
                            );


                            /*
                             * Once revealed,
                             * stop observing it.
                             */

                            observerInstance.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        elements.forEach(
            function (element) {

                observer.observe(element);
            }
        );
    }


    /* =====================================================
       HERO NAME
    ===================================================== */

    function initializeHeroName() {

        const heroName =
            document.getElementById(
                "heroName"
            );


        if (!heroName) {
            return;
        }


        const letters =
            heroName.querySelectorAll(
                ".letter"
            );


        if (!letters.length) {
            return;
        }


        /*
         * Reduced motion = no stagger.
         */

        if (prefersReducedMotion) {

            letters.forEach(
                function (letter) {

                    letter.classList.add(
                        "letter-visible"
                    );
                }
            );

            return;
        }


        letters.forEach(
            function (letter, index) {

                letter.style.setProperty(
                    "--letter-index",
                    index
                );


                window.setTimeout(
                    function () {

                        letter.classList.add(
                            "letter-visible"
                        );

                    },
                    80 + index * 70
                );
            }
        );


        /*
         * Small interactive movement
         * when the pointer moves over the name.
         */

        heroName.addEventListener(
            "pointermove",
            function (event) {

                if (prefersReducedMotion) {
                    return;
                }


                const rect =
                    heroName.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                heroName.style.setProperty(
                    "--name-x",
                    `${x * 8}px`
                );


                heroName.style.setProperty(
                    "--name-y",
                    `${y * 5}px`
                );
            }
        );


        heroName.addEventListener(
            "pointerleave",
            function () {

                heroName.style.setProperty(
                    "--name-x",
                    "0px"
                );

                heroName.style.setProperty(
                    "--name-y",
                    "0px"
                );
            }
        );
    }


    /* =====================================================
       STAGGERED ELEMENTS
    ===================================================== */

    function initializeStaggeredElements() {

        const groups =
            document.querySelectorAll(
                ".stagger"
            );


        groups.forEach(
            function (group) {

                const children =
                    group.children;


                Array.from(children).forEach(
                    function (child, index) {

                        child.style.setProperty(
                            "--stagger-index",
                            index
                        );
                    }
                );
            }
        );
    }


    /* =====================================================
       BUTTON EFFECTS
    ===================================================== */

    function initializeButtonEffects() {

        const buttons =
            document.querySelectorAll(
                ".btn"
            );


        if (
            !buttons.length ||
            prefersReducedMotion
        ) {
            return;
        }


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "pointermove",
                    function (event) {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        button.style.setProperty(
                            "--mouse-x",
                            `${x}px`
                        );


                        button.style.setProperty(
                            "--mouse-y",
                            `${y}px`
                        );
                    }
                );


                button.addEventListener(
                    "pointerleave",
                    function () {

                        button.style.setProperty(
                            "--mouse-x",
                            "50%"
                        );


                        button.style.setProperty(
                            "--mouse-y",
                            "50%"
                        );
                    }
                );
            }
        );
    }


    /* =====================================================
       CARD INTERACTION
    ===================================================== */

    function initializeCardEffects() {

        const cards =
            document.querySelectorAll(
                ".project-card, " +
                ".skill-card, " +
                ".cert-card, " +
                ".about-panel, " +
                ".timeline-item"
            );


        if (
            !cards.length ||
            prefersReducedMotion
        ) {
            return;
        }


        cards.forEach(
            function (card) {

                card.addEventListener(
                    "pointermove",
                    function (event) {

                        /*
                         * Disable tilt on smaller screens.
                         */

                        if (
                            window.innerWidth < 900
                        ) {
                            return;
                        }


                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height;


                        const rotateY =
                            (x - 0.5) * 5;


                        const rotateX =
                            (0.5 - y) * 5;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-4px)`;
                    }
                );


                card.addEventListener(
                    "pointerleave",
                    function () {

                        card.style.transform =
                            "";
                    }
                );
            }
        );
    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    function initializeCursorGlow() {

        /*
         * Don't create cursor effects on
         * touch devices or reduced motion.
         */

        if (
            prefersReducedMotion ||
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
        ) {
            return;
        }


        let glow =
            document.querySelector(
                ".cursor-glow"
            );


        /*
         * Create the element only if
         * the HTML doesn't already contain it.
         */

        if (!glow) {

            glow =
                document.createElement(
                    "div"
                );

            glow.className =
                "cursor-glow";

            glow.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.appendChild(
                glow
            );
        }


        let mouseX = -100;
        let mouseY = -100;

        let currentX = -100;
        let currentY = -100;


        document.addEventListener(
            "pointermove",
            function (event) {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;
            },
            {
                passive: true
            }
        );


        function animateGlow() {

            currentX +=
                (mouseX - currentX) *
                0.12;


            currentY +=
                (mouseY - currentY) *
                0.12;


            glow.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                ) translate(-50%, -50%)`;


            requestAnimationFrame(
                animateGlow
            );
        }


        animateGlow();
    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    function initializeParallax() {

        if (prefersReducedMotion) {
            return;
        }


        const hero =
            document.getElementById(
                "home"
            );


        if (!hero) {
            return;
        }


        const heroInner =
            hero.querySelector(
                ".hero-inner"
            );


        if (!heroInner) {
            return;
        }


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


                        /*
                         * Stop calculating after
                         * the hero has mostly left.
                         */

                        if (
                            scrollY <
                            window.innerHeight
                        ) {

                            const movement =
                                scrollY * 0.12;


                            heroInner.style.transform =
                                `translate3d(
                                    0,
                                    ${movement}px,
                                    0
                                )`;
                        }


                        ticking = false;
                    }
                );
            },
            {
                passive: true
            }
        );
    }

})();
