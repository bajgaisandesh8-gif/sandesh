/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   navigation.js
   ---------------------------------------------------------
   Handles:
   - Desktop navigation
   - Mobile menu
   - Active section
   - Scroll progress
   - Navbar scroll state
   - Outside-click menu closing
   - Escape-key menu closing
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const nav =
        document.getElementById("nav");

    const navLinksContainer =
        document.getElementById("navLinks");

    const navToggle =
        document.getElementById("navToggle");

    const navProgress =
        document.getElementById("navProgress");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!navLinksContainer || !navToggle) {

        console.warn(
            "[Navigation] Required navigation elements not found."
        );

        return;
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        navLinksContainer.classList.add("open");

        navToggle.classList.add("active");

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    }


    function closeMenu() {

        navLinksContainer.classList.remove(
            "open"
        );

        navToggle.classList.remove(
            "active"
        );

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }


    function toggleMenu() {

        const isOpen =
            navLinksContainer.classList.contains(
                "open"
            );

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();
        }
    }


    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    navToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            toggleMenu();
        }
    );


    /* =====================================================
       CLOSE MENU AFTER CLICKING LINK
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();
            }
        );
    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideNav =
                nav.contains(event.target);

            if (
                !clickedInsideNav &&
                navLinksContainer.classList.contains(
                    "open"
                )
            ) {

                closeMenu();
            }
        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMenu();
            }
        }
    );


    /* =====================================================
       ACTIVE SECTION
    ===================================================== */

    function updateActiveSection() {

        if (!sections.length) {
            return;
        }


        let currentSection = "home";

        const scrollPosition =
            window.scrollY;


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop;

                const sectionHeight =
                    section.offsetHeight;


                /*
                 * The 180px offset prevents the
                 * active state from changing too early.
                 */

                if (
                    scrollPosition >=
                    sectionTop - 180
                ) {

                    currentSection =
                        section.id;
                }
            }
        );


        navLinks.forEach(
            function (link) {

                const sectionName =
                    link.dataset.section;

                const isActive =
                    sectionName === currentSection;


                link.classList.toggle(
                    "active",
                    isActive
                );


                if (isActive) {

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                } else {

                    link.removeAttribute(
                        "aria-current"
                    );
                }
            }
        );
    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!navProgress) {
            return;
        }


        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const viewportHeight =
            window.innerHeight;


        const scrollableHeight =
            documentHeight -
            viewportHeight;


        if (scrollableHeight <= 0) {

            navProgress.style.width = "0%";

            return;
        }


        const percentage =
            (scrollTop /
                scrollableHeight) *
            100;


        navProgress.style.width =
            `${Math.min(percentage, 100)}%`;
    }


    /* =====================================================
       NAVBAR SCROLL STATE
    ===================================================== */

    function updateNavbarState() {

        if (!nav) {
            return;
        }


        const scrolled =
            window.scrollY > 40;


        nav.classList.toggle(
            "scrolled",
            scrolled
        );
    }


    /* =====================================================
       COMBINED SCROLL HANDLER
    ===================================================== */

    let ticking = false;


    function handleScroll() {

        if (ticking) {
            return;
        }


        window.requestAnimationFrame(
            function () {

                updateActiveSection();

                updateScrollProgress();

                updateNavbarState();

                ticking = false;
            }
        );


        ticking = true;
    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE HANDLER
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            /*
             * If the screen becomes desktop size,
             * force-close the mobile navigation.
             */

            if (window.innerWidth > 900) {

                closeMenu();
            }


            updateScrollProgress();

            updateActiveSection();
        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateActiveSection();

    updateScrollProgress();

    updateNavbarState();


    /* =====================================================
       DEBUG MESSAGE
    ===================================================== */

    console.log(
        "%c[NAVIGATION]%c initialized.",
        "color:#64f3b0;font-weight:bold;",
        "color:inherit;"
    );

})();
