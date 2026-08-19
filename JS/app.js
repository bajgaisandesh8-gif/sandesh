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
        initializeIdentityEntry();

        console.log(
            "%c[SANDESH.DEV]%c Portfolio initialized successfully.",
            "color:#64f3b0;font-weight:bold;",
            "color:inherit;"
        );
    });

    function initializeYear() {
        const yearElement = document.getElementById("year");
        if (yearElement) yearElement.textContent = new Date().getFullYear();
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
        if (emailLink) emailLink.href = `mailto:${CONFIG.email}`;
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
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            });
        });
    }

    function initializePageReady() {
        document.documentElement.classList.add("js-ready");
    }

    /* =========================================================
       CINEMATIC ENTRY — SANDESH // DIGITAL IDENTITY
       ---------------------------------------------------------
       Short, skippable, accessible portfolio gateway.
       The versioned session key ensures a newly deployed intro
       is shown once even if an older version was already seen.
    ========================================================= */
    function initializeIdentityEntry() {
        const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ENTRY_KEY = "sandeshIdentitySeen_v2";
        let introSeen = false;

        try {
            introSeen = sessionStorage.getItem(ENTRY_KEY) === "1";
        } catch (error) {
            introSeen = false;
        }
        if (introSeen) return;

        const style = document.createElement("style");
        style.id = "sandesh-identity-entry-styles";
        style.textContent = `
            .sb-entry{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:24px;overflow:hidden;background:radial-gradient(circle at 50% 45%,rgba(100,243,176,.075),transparent 34%),radial-gradient(circle at 15% 85%,rgba(84,168,255,.045),transparent 30%),#030608;color:#f1f5f9;font-family:"Space Grotesk",system-ui,sans-serif;opacity:1;transition:opacity .65s ease,visibility .65s ease}
            .sb-entry::before{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(100,243,176,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(100,243,176,.035) 1px,transparent 1px);background-size:46px 46px;mask-image:linear-gradient(to bottom,black,transparent 92%)}
            .sb-entry::after{content:"";position:absolute;left:0;right:0;top:-20%;height:20%;pointer-events:none;background:linear-gradient(to bottom,transparent,rgba(100,243,176,.08),transparent);animation:sb-entry-scan 2.8s linear infinite}
            .sb-entry.is-closing{opacity:0;visibility:hidden;pointer-events:none}
            .sb-entry-card{position:relative;z-index:2;width:min(720px,100%);padding:clamp(28px,5vw,52px);border:1px solid rgba(100,243,176,.22);border-radius:20px;background:linear-gradient(145deg,rgba(12,20,27,.94),rgba(4,8,12,.96));box-shadow:0 35px 100px rgba(0,0,0,.58),0 0 70px rgba(100,243,176,.055);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);animation:sb-entry-card-in .7s cubic-bezier(.2,.8,.2,1) both}
            .sb-entry-top{display:flex;align-items:center;justify-content:space-between;gap:18px;color:#64748b;font:600 .62rem/1 "JetBrains Mono",monospace;letter-spacing:.14em}
            .sb-entry-dot{display:inline-block;width:6px;height:6px;margin-right:8px;border-radius:50%;background:#64f3b0;box-shadow:0 0 12px #64f3b0}
            .sb-entry-kicker{margin-top:clamp(42px,7vw,70px);color:#64f3b0;font:600 .7rem/1 "JetBrains Mono",monospace;letter-spacing:.16em}
            .sb-entry-title{margin-top:12px;font:700 clamp(2.4rem,7vw,5.5rem)/.95 "JetBrains Mono",monospace;letter-spacing:-.075em;text-transform:uppercase}
            .sb-entry-title span{color:#64f3b0}
            .sb-entry-subtitle{max-width:620px;margin-top:18px;color:#94a3b8;font-size:clamp(.92rem,2vw,1.05rem);line-height:1.7}
            .sb-entry-status{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:32px}
            .sb-entry-status span{padding:10px 9px;border:1px solid rgba(255,255,255,.055);border-radius:7px;background:rgba(255,255,255,.012);color:#aeb9c5;text-align:center;font:500 .55rem/1.35 "JetBrains Mono",monospace;letter-spacing:.06em}
            .sb-entry-status b{display:block;margin-bottom:5px;color:#64f3b0;font-weight:600}
            .sb-entry-actions{display:flex;align-items:center;flex-wrap:wrap;gap:14px;margin-top:34px}
            .sb-entry-enter{display:inline-flex;align-items:center;justify-content:center;min-width:180px;min-height:48px;padding:0 20px;border:1px solid #64f3b0;border-radius:6px;background:#64f3b0;color:#031009;cursor:pointer;font:700 .68rem/1 "JetBrains Mono",monospace;letter-spacing:.09em;transition:transform .2s ease,box-shadow .2s ease,background .2s ease}
            .sb-entry-enter:hover,.sb-entry-enter:focus-visible{transform:translateY(-2px);box-shadow:0 12px 35px rgba(100,243,176,.2)}
            .sb-entry-skip{border:0;background:transparent;color:#64748b;cursor:pointer;font:500 .62rem/1 "JetBrains Mono",monospace;letter-spacing:.06em}
            .sb-entry-skip:hover,.sb-entry-skip:focus-visible{color:#f1f5f9}
            .sb-entry-foot{display:flex;justify-content:space-between;gap:20px;margin-top:30px;padding-top:14px;border-top:1px solid rgba(255,255,255,.055);color:#475569;font:500 .55rem/1.5 "JetBrains Mono",monospace}
            @keyframes sb-entry-card-in{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
            @keyframes sb-entry-scan{from{transform:translateY(0)}to{transform:translateY(600%)}}
            @media(max-width:620px){.sb-entry{padding:15px}.sb-entry-card{padding:25px 20px;border-radius:16px}.sb-entry-status{grid-template-columns:repeat(2,1fr)}.sb-entry-actions{align-items:stretch;flex-direction:column}.sb-entry-enter{width:100%}.sb-entry-skip{min-height:40px}.sb-entry-foot{flex-direction:column;gap:6px}}
            @media(prefers-reduced-motion:reduce){.sb-entry,.sb-entry-card{animation:none!important;transition:none!important}.sb-entry::after{display:none}}
        `;
        document.head.appendChild(style);

        const entry = document.createElement("div");
        entry.className = "sb-entry";
        entry.setAttribute("role", "dialog");
        entry.setAttribute("aria-modal", "true");
        entry.setAttribute("aria-label", "Sandesh digital identity entry");
        entry.innerHTML = `
            <div class="sb-entry-card">
                <div class="sb-entry-top"><span><i class="sb-entry-dot"></i>IDENTITY SYSTEM</span><span>SB / 01</span></div>
                <p class="sb-entry-kicker">SANDESH // DIGITAL IDENTITY</p>
                <h2 class="sb-entry-title">Sandesh <span>Bajgai</span></h2>
                <p class="sb-entry-subtitle">A personal portfolio built around networking, cybersecurity, software development and continuous technical exploration.</p>
                <div class="sb-entry-status" aria-label="Areas of focus"><span><b>01</b>NETWORKING</span><span><b>02</b>CYBERSECURITY</span><span><b>03</b>DEVELOPMENT</span><span><b>04</b>AI / SYSTEMS</span></div>
                <div class="sb-entry-actions"><button class="sb-entry-enter" type="button">ENTER PORTFOLIO&nbsp; →</button><button class="sb-entry-skip" type="button">SKIP INTRO</button></div>
                <div class="sb-entry-foot"><span>SYSTEM READY</span><span>ESC TO SKIP</span></div>
            </div>`;

        document.body.prepend(entry);
        document.body.style.overflow = "hidden";

        const closeEntry = function () {
            if (!entry || entry.classList.contains("is-closing")) return;
            try { sessionStorage.setItem(ENTRY_KEY, "1"); } catch (error) { /* ignore */ }
            entry.classList.add("is-closing");
            document.body.style.overflow = "";
            window.setTimeout(function () { entry.remove(); style.remove(); }, reducedMotion ? 0 : 700);
        };

        const enterButton = entry.querySelector(".sb-entry-enter");
        const skipButton = entry.querySelector(".sb-entry-skip");
        enterButton.addEventListener("click", closeEntry);
        skipButton.addEventListener("click", closeEntry);

        document.addEventListener("keydown", function onEntryKeydown(event) {
            if (!document.body.contains(entry)) {
                document.removeEventListener("keydown", onEntryKeydown);
                return;
            }
            if (event.key === "Escape" || event.key === "Enter") {
                event.preventDefault();
                closeEntry();
            }
        });

        enterButton.focus({ preventScroll: true });
        window.setTimeout(closeEntry, reducedMotion ? 900 : 3200);
    }

    window.PORTFOLIO_CONFIG = CONFIG;
})();
