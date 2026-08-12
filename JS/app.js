/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   app.js
   ---------------------------------------------------------
   Global portfolio initialization and utilities.
========================================================= */

(function () {
    "use strict";

    const CONFIG = {
        name: "Sandesh Bajgai",
        email: "bajgaisandesh8@gmail.com",
        github: "https://github.com/bajgaisandesh8-gif",
        linkedin: "",
        instagram: ""
    };

    document.addEventListener("DOMContentLoaded", function () {
        initializeYear();
        initializeExternalLinks();
        initializeBackToTop();
        initializeProfileImage();
        initializeSmoothAnchors();
        initializePageReady();

        console.log(
            "%c[SANDESH.DEV]%c Portfolio initialized successfully.",
            "color:#64f3b0;font-weight:bold;",
            "color:inherit;"
        );
    });

    function initializeYear() {
        const yearElement = document.getElementById("year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    function initializeExternalLinks() {
        const githubLink = document.getElementById("linkGithub");
        const linkedinLink = document.getElementById("linkLinkedin");
        const instagramLink = document.getElementById("linkInstagram");
        const emailLink = document.getElementById("linkEmail");

        if (githubLink && CONFIG.github) {
            githubLink.href = CONFIG.github;
            githubLink.target = "_blank";
            githubLink.rel = "noopener noreferrer";
        }

        if (linkedinLink && CONFIG.linkedin) {
            linkedinLink.href = CONFIG.linkedin;
            linkedinLink.target = "_blank";
            linkedinLink.rel = "noopener noreferrer";
        }

        if (instagramLink && CONFIG.instagram) {
            instagramLink.href = CONFIG.instagram;
            instagramLink.target = "_blank";
            instagramLink.rel = "noopener noreferrer";
        }

        if (emailLink) {
            emailLink.href = `mailto:${CONFIG.email}`;
        }
    }

    function initializeProfileImage() {
        const profileImage = document.getElementById("profileImg");

        if (!profileImage) return;

        profileImage.addEventListener("error", function () {
            console.warn("[Portfolio] Profile image could not be loaded.");
            profileImage.classList.add("image-error");
        });

        profileImage.addEventListener("load", function () {
            profileImage.classList.add("loaded");
        });
    }

    function initializeBackToTop() {
        const backTop = document.querySelector(".back-top");
        if (!backTop) return;

        backTop.addEventListener("click", function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function initializeSmoothAnchors() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                const targetID = link.getAttribute("href");

                if (!targetID || targetID === "#") return;

                const target = document.querySelector(targetID);
                if (!target) return;

                event.preventDefault();

                const nav = document.getElementById("nav");
                const navHeight = nav ? nav.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            });
        });
    }

    function initializePageReady() {
        document.documentElement.classList.add("js-ready");
    }

    window.PORTFOLIO_CONFIG = CONFIG;
})();
