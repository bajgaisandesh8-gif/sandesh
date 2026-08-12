/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   projects.js
   ---------------------------------------------------------
   Handles:
   - Skills
   - Experience
   - Projects
   - Certifications
   - Category filters
   - Dynamic rendering
   - Supabase-ready architecture

   IMPORTANT:
   Local data is the fallback.
   The website must NEVER become blank just because
   Supabase is unavailable.
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       PORTFOLIO DATA
    ===================================================== */

    const portfolioData = {

        /* =================================================
           SKILLS
        ================================================= */

        skills: [

            {
                category: "networking",

                title: "Networking",

                description:
                    "Practical understanding of networking, connectivity and infrastructure fundamentals.",

                tags: [
                    "IPv4",
                    "IPv6",
                    "DHCP",
                    "DNS",
                    "Subnetting",
                    "TCP/IP",
                    "Wi-Fi"
                ]
            },


            {
                category: "infrastructure",

                title: "IT Infrastructure",

                description:
                    "Hands-on exposure to switches, access points, servers, CCTV and IT hardware.",

                tags: [
                    "Switches",
                    "PoE",
                    "STP",
                    "Fiber",
                    "CCTV",
                    "NVR",
                    "Printers"
                ]
            },


            {
                category: "development",

                title: "Web Development",

                description:
                    "Building responsive and interactive websites using core web technologies.",

                tags: [
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "Git",
                    "GitHub",
                    "VS Code"
                ]
            },


            {
                category: "cybersecurity",

                title: "Cybersecurity",

                description:
                    "Developing knowledge in cybersecurity, networking security and defensive concepts.",

                tags: [
                    "Linux",
                    "Networking Security",
                    "System Security",
                    "Threat Awareness",
                    "Security Basics"
                ]
            },


            {
                category: "ai",

                title: "AI & Automation",

                description:
                    "Using modern AI tools to improve development, design and productivity workflows.",

                tags: [
                    "Generative AI",
                    "Prompt Engineering",
                    "AI Tools",
                    "Automation"
                ]
            }

        ],


        /* =================================================
           EXPERIENCE
        ================================================= */

        experience: [

            {
                date: "INTERNSHIP",

                title:
                    "IT & Network Intern",

                company:
                    "Soaltee Westend Itahari",

                description:
                    "Worked with hotel IT infrastructure including networking, Wi-Fi, access points, switches, CCTV, NVR, printers, projectors, POS systems and general technical support."
            }

        ],


        /* =================================================
           PROJECTS
        ================================================= */

        projects: [

            {
                category: "WEB",

                title:
                    "Developer Portfolio",

                description:
                    "A handcrafted developer and cybersecurity portfolio built with HTML5, CSS3 and Vanilla JavaScript.",

                technologies: [
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "Three.js"
                ],

                link: "#"
            },


            {
                category: "NETWORKING",

                title:
                    "Hotel Network QA",

                description:
                    "Practical quality-assurance work involving access points, Wi-Fi, TVs and network-related infrastructure checks.",

                technologies: [
                    "Networking",
                    "Wi-Fi",
                    "AP",
                    "QA"
                ],

                link: "#"
            },


            {
                category: "IT",

                title:
                    "IT Infrastructure Practice",

                description:
                    "Hands-on experience with Ethernet, RJ45 termination, switches, fiber, projectors, printers and CCTV infrastructure.",

                technologies: [
                    "Ethernet",
                    "RJ45",
                    "Switching",
                    "Fiber",
                    "CCTV"
                ],

                link: "#"
            },


            {
                category: "AI",

                title:
                    "AI-Assisted Workflow",

                description:
                    "Exploring AI tools for development, design, content creation and productivity.",

                technologies: [
                    "AI",
                    "Automation",
                    "Prompting"
                ],

                link: "#"
            }

        ],


        /* =================================================
           CERTIFICATIONS
        ================================================= */

        certifications: [

            {
                title:
                    "Networking Fundamentals",

                description:
                    "Networking concepts including IP addressing, subnetting, DHCP, DNS and connectivity."
            },


            {
                title:
                    "Web Development",

                description:
                    "Practical development using HTML, CSS and JavaScript."
            },


            {
                title:
                    "IT Infrastructure",

                description:
                    "Hands-on exposure to hardware, network infrastructure and technical support."
            }

        ]

    };


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       RENDER SKILLS
    ===================================================== */

    function renderSkills(category = "all") {

        const container =
            document.getElementById(
                "skillsGrid"
            );


        if (!container) {
            return;
        }


        let skills =
            portfolioData.skills;


        if (category !== "all") {

            skills =
                skills.filter(
                    function (skill) {

                        return (
                            skill.category ===
                            category
                        );
                    }
                );
        }


        if (!skills.length) {

            container.innerHTML = `
                <div class="empty-state">
                    No skills found in this category.
                </div>
            `;

            return;
        }


        container.innerHTML =
            skills
                .map(
                    function (skill) {

                        return `
                            <article
                                class="skill-card reveal"
                                data-category="${escapeHTML(
                                    skill.category
                                )}"
                            >

                                <div class="skill-card-header">

                                    <span class="skill-category">
                                        ${escapeHTML(
                                            skill.category
                                        )}
                                    </span>

                                </div>


                                <h3>
                                    ${escapeHTML(
                                        skill.title
                                    )}
                                </h3>


                                <p>
                                    ${escapeHTML(
                                        skill.description
                                    )}
                                </p>


                                <div class="skill-tags">

                                    ${skill.tags
                                        .map(
                                            function (tag) {

                                                return `
                                                    <span>
                                                        ${escapeHTML(
                                                            tag
                                                        )}
                                                    </span>
                                                `;
                                            }
                                        )
                                        .join("")}

                                </div>

                            </article>
                        `;
                    }
                )
                .join("");


        activateDynamicReveal(
            container
        );
    }


    /* =====================================================
       RENDER EXPERIENCE
    ===================================================== */

    function renderExperience() {

        const container =
            document.getElementById(
                "timeline"
            );


        if (!container) {
            return;
        }


        if (
            !portfolioData.experience.length
        ) {

            container.innerHTML = `
                <div class="empty-state">
                    Experience information coming soon.
                </div>
            `;

            return;
        }


        container.innerHTML =
            portfolioData.experience
                .map(
                    function (item) {

                        return `
                            <article
                                class="timeline-item reveal"
                            >

                                <span class="date">
                                    ${escapeHTML(
                                        item.date
                                    )}
                                </span>


                                <h3>
                                    ${escapeHTML(
                                        item.title
                                    )}
                                </h3>


                                <p class="timeline-company">
                                    ${escapeHTML(
                                        item.company
                                    )}
                                </p>


                                <p>
                                    ${escapeHTML(
                                        item.description
                                    )}
                                </p>

                            </article>
                        `;
                    }
                )
                .join("");


        activateDynamicReveal(
            container
        );
    }


    /* =====================================================
       RENDER PROJECTS
    ===================================================== */

    function renderProjects(category = "ALL") {

        const container =
            document.getElementById(
                "projectsGrid"
            );


        if (!container) {
            return;
        }


        let projects =
            portfolioData.projects;


        if (category !== "ALL") {

            projects =
                projects.filter(
                    function (project) {

                        return (
                            project.category ===
                            category
                        );
                    }
                );
        }


        if (!projects.length) {

            container.innerHTML = `
                <div class="empty-state">
                    No projects available in this category yet.
                </div>
            `;

            return;
        }


        container.innerHTML =
            projects
                .map(
                    function (project) {

                        return `
                            <article
                                class="project-card reveal"
                                data-category="${escapeHTML(
                                    project.category
                                )}"
                            >

                                <div class="project-card-top">

                                    <span class="project-category">
                                        ${escapeHTML(
                                            project.category
                                        )}
                                    </span>

                                </div>


                                <h3>
                                    ${escapeHTML(
                                        project.title
                                    )}
                                </h3>


                                <p>
                                    ${escapeHTML(
                                        project.description
                                    )}
                                </p>


                                <div class="project-tech">

                                    ${project.technologies
                                        .map(
                                            function (
                                                technology
                                            ) {

                                                return `
                                                    <span>
                                                        ${escapeHTML(
                                                            technology
                                                        )}
                                                    </span>
                                                `;
                                            }
                                        )
                                        .join("")}

                                </div>


                                ${
                                    project.link &&
                                    project.link !== "#"
                                        ? `
                                            <a
                                                href="${escapeHTML(
                                                    project.link
                                                )}"
                                                class="project-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Project
                                            </a>
                                        `
                                        : ""
                                }

                            </article>
                        `;
                    }
                )
                .join("");


        activateDynamicReveal(
            container
        );
    }


    /* =====================================================
       RENDER CERTIFICATIONS
    ===================================================== */

    function renderCertifications() {

        const container =
            document.getElementById(
                "certsGrid"
            );


        if (!container) {
            return;
        }


        if (
            !portfolioData.certifications.length
        ) {

            container.innerHTML = `
                <div class="empty-state">
                    Certifications coming soon.
                </div>
            `;

            return;
        }


        container.innerHTML =
            portfolioData.certifications
                .map(
                    function (certification) {

                        return `
                            <article
                                class="cert-card reveal"
                            >

                                <h3>
                                    ${escapeHTML(
                                        certification.title
                                    )}
                                </h3>


                                <p>
                                    ${escapeHTML(
                                        certification.description
                                    )}
                                </p>

                            </article>
                        `;
                    }
                )
                .join("");


        activateDynamicReveal(
            container
        );
    }


    /* =====================================================
       FILTER SYSTEM
    ===================================================== */

    function initializeFilters() {

        const filterContainers =
            document.querySelectorAll(
                ".filter-group, " +
                ".projects-filter, " +
                ".skills-filter"
            );


        filterContainers.forEach(
            function (container) {

                const buttons =
                    container.querySelectorAll(
                        ".filter-btn"
                    );


                buttons.forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                const category =
                                    button.dataset.cat ||
                                    button.dataset.category ||
                                    "ALL";


                                buttons.forEach(
                                    function (
                                        currentButton
                                    ) {

                                        currentButton.classList.remove(
                                            "active"
                                        );

                                        currentButton.setAttribute(
                                            "aria-selected",
                                            "false"
                                        );
                                    }
                                );


                                button.classList.add(
                                    "active"
                                );

                                button.setAttribute(
                                    "aria-selected",
                                    "true"
                                );


                                /*
                                 * Decide which renderer
                                 * should receive the filter.
                                 */

                                if (
                                    container.id ===
                                    "skillsFilter"
                                ) {

                                    renderSkills(
                                        category
                                    );

                                } else {

                                    renderProjects(
                                        category
                                    );
                                }

                            }
                        );
                    }
                );
            }
        );
    }


    /* =====================================================
       DYNAMIC REVEAL
    ===================================================== */

    function activateDynamicReveal(
        container
    ) {

        const elements =
            container.querySelectorAll(
                ".reveal"
            );


        if (!elements.length) {
            return;
        }


        /*
         * If animation observer exists
         * from animations.js, let CSS show
         * them normally.
         */

        elements.forEach(
            function (element) {

                /*
                 * Give dynamically generated
                 * content a tiny stagger.
                 */

                const index =
                    Array.from(
                        container.children
                    ).indexOf(element);


                element.style.setProperty(
                    "--stagger-index",
                    index
                );
            }
        );


        /*
         * Fallback: make dynamic content visible
         * after insertion.
         */

        window.requestAnimationFrame(
            function () {

                elements.forEach(
                    function (element) {

                        element.classList.add(
                            "visible"
                        );
                    }
                );
            }
        );
    }


    /* =====================================================
       SUPABASE HOOK
    ===================================================== */

    async function loadSupabaseData() {

        /*
         * Supabase is OPTIONAL.
         *
         * The portfolio must work without it.
         */

        if (
            !window.supabaseClient
        ) {

            return;
        }


        /*
         * Don't invent database tables here.
         *
         * When you actually create tables in
         * Supabase, we can connect them here.
         */

        try {

            console.log(
                "[Supabase] Client detected."
            );

        } catch (error) {

            console.warn(
                "[Supabase] Unable to load remote data:",
                error
            );
        }
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        async function () {

            renderSkills();

            renderExperience();

            renderProjects();

            renderCertifications();

            initializeFilters();

            await loadSupabaseData();


            /*
             * Make the data available globally
             * for debugging / future modules.
             */

            window.PortfolioData =
                portfolioData;


            console.log(
                "%c[PROJECTS]%c initialized.",
                "color:#64f3b0;font-weight:bold;",
                "color:inherit;"
            );
        }
    );


})();
