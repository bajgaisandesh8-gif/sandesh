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
       SECURE ACCESS ENTRY — SANDESH // DIGITAL IDENTITY
       ---------------------------------------------------------
       Visual cybersecurity-inspired gateway. This is NOT an
       authentication system; it is an entry experience for the
       portfolio. It is short, skippable and mobile-first.
    ========================================================= */
    function initializeIdentityEntry() {
        const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ENTRY_KEY = "sandeshSecureAccess_v1";
        let introSeen = false;

        try {
            introSeen = sessionStorage.getItem(ENTRY_KEY) === "1";
        } catch (error) {
            introSeen = false;
        }
        if (introSeen) return;

        const style = document.createElement("style");
        style.id = "sandesh-secure-entry-styles";
        style.textContent = `
            .sb-secure{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;overflow:auto;padding:clamp(14px,3vw,36px);background:#020506;color:#eef5f2;font-family:"Space Grotesk",system-ui,sans-serif;isolation:isolate;opacity:1;visibility:visible;transition:opacity .55s ease,visibility .55s ease}
            .sb-secure.is-closing{opacity:0;visibility:hidden;pointer-events:none}
            .sb-secure::before{content:"";position:absolute;inset:0;z-index:-3;background:radial-gradient(circle at 50% 50%,rgba(100,243,176,.075),transparent 35%),radial-gradient(circle at 8% 90%,rgba(62,145,255,.055),transparent 30%),#020506}
            .sb-secure::after{content:"";position:absolute;inset:0;z-index:-2;pointer-events:none;background-image:linear-gradient(rgba(100,243,176,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(100,243,176,.028) 1px,transparent 1px);background-size:42px 42px;mask-image:radial-gradient(ellipse at center,#000 20%,transparent 78%)}
            .sb-secure-noise{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.055;background:repeating-linear-gradient(0deg,transparent 0,transparent 3px,rgba(255,255,255,.04) 4px);mix-blend-mode:screen}
            .sb-secure-shell{position:relative;width:min(1080px,100%);min-height:min(690px,calc(100vh - 40px));display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);border:1px solid rgba(100,243,176,.18);border-radius:18px;background:linear-gradient(145deg,rgba(8,16,19,.96),rgba(3,8,10,.97));box-shadow:0 40px 120px rgba(0,0,0,.68),0 0 100px rgba(100,243,176,.045);overflow:hidden;animation:sb-shell-in .7s cubic-bezier(.2,.8,.2,1) both}
            .sb-secure-shell::before{content:"";position:absolute;inset:0;pointer-events:none;border:1px solid rgba(255,255,255,.025);border-radius:inherit}
            .sb-secure-terminal{position:relative;padding:clamp(24px,4vw,44px);border-right:1px solid rgba(255,255,255,.055);display:flex;flex-direction:column;justify-content:space-between;min-width:0}
            .sb-secure-terminal::after{content:"";position:absolute;top:0;bottom:0;right:-1px;width:1px;background:linear-gradient(transparent,rgba(100,243,176,.35),transparent)}
            .sb-secure-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;color:#60717a;font:600 .6rem/1 "JetBrains Mono",monospace;letter-spacing:.12em}
            .sb-secure-brand{color:#dce8e3}.sb-secure-brand b{color:#64f3b0;font-weight:700}
            .sb-secure-dots{display:flex;gap:6px}.sb-secure-dots i{width:6px;height:6px;border-radius:50%;background:#2b3a3b}.sb-secure-dots i:first-child{background:#64f3b0;box-shadow:0 0 10px rgba(100,243,176,.55)}
            .sb-secure-terminal-main{padding:clamp(45px,8vh,100px) 0 25px}
            .sb-secure-kicker{display:flex;align-items:center;gap:9px;color:#64f3b0;font:600 .62rem/1 "JetBrains Mono",monospace;letter-spacing:.13em;text-transform:uppercase}
            .sb-secure-kicker::before{content:"";width:24px;height:1px;background:#64f3b0;box-shadow:0 0 10px rgba(100,243,176,.7)}
            .sb-secure-title{margin:18px 0 0;font:700 clamp(2.5rem,6vw,5.7rem)/.9 "JetBrains Mono",monospace;letter-spacing:-.075em;text-transform:uppercase}
            .sb-secure-title span{display:block;color:#64f3b0;text-shadow:0 0 35px rgba(100,243,176,.15)}
            .sb-secure-copy{max-width:600px;margin-top:24px;color:#82939a;font-size:clamp(.88rem,1.7vw,1rem);line-height:1.75}
            .sb-secure-log{display:grid;gap:7px;margin-top:34px;padding:15px 17px;border-left:1px solid rgba(100,243,176,.22);background:rgba(100,243,176,.018);font:500 .58rem/1.55 "JetBrains Mono",monospace;color:#53666b}
            .sb-secure-log div{display:flex;gap:10px}.sb-secure-log b{color:#64f3b0;font-weight:600}.sb-secure-log span{color:#91a3a5}.sb-secure-log .muted{color:#506066}
            .sb-secure-footer{display:flex;align-items:center;justify-content:space-between;gap:15px;padding-top:18px;border-top:1px solid rgba(255,255,255,.05);color:#435357;font:500 .56rem/1.4 "JetBrains Mono",monospace}
            .sb-secure-access{position:relative;display:flex;flex-direction:column;justify-content:center;padding:clamp(25px,4vw,46px);background:linear-gradient(180deg,rgba(255,255,255,.018),rgba(255,255,255,.005))}
            .sb-secure-access-label{color:#64767b;font:600 .58rem/1.2 "JetBrains Mono",monospace;letter-spacing:.13em;text-transform:uppercase}
            .sb-secure-avatar{position:relative;width:86px;height:86px;margin:24px 0 20px;border:1px solid rgba(100,243,176,.25);border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,rgba(100,243,176,.09),rgba(100,243,176,.015) 58%,transparent 60%);box-shadow:0 0 45px rgba(100,243,176,.06)}
            .sb-secure-avatar::before,.sb-secure-avatar::after{content:"";position:absolute;border:1px solid rgba(100,243,176,.15);border-radius:50%}.sb-secure-avatar::before{inset:-7px}.sb-secure-avatar::after{inset:8px;border-style:dashed;opacity:.65}
            .sb-secure-avatar span{font:700 1.15rem/1 "JetBrains Mono",monospace;color:#64f3b0}
            .sb-secure-name{font-size:1.2rem;font-weight:700;letter-spacing:-.02em}.sb-secure-role{margin-top:6px;color:#687a80;font:500 .58rem/1.4 "JetBrains Mono",monospace;letter-spacing:.06em}
            .sb-secure-status{display:flex;align-items:center;gap:8px;margin-top:22px;color:#64f3b0;font:600 .58rem/1 "JetBrains Mono",monospace;letter-spacing:.08em}.sb-secure-status i{width:6px;height:6px;border-radius:50%;background:#64f3b0;box-shadow:0 0 12px rgba(100,243,176,.75)}
            .sb-secure-enter{width:100%;min-height:52px;margin-top:30px;border:1px solid #64f3b0;border-radius:7px;background:linear-gradient(135deg,#64f3b0,#42d895);color:#021008;cursor:pointer;font:800 .68rem/1 "JetBrains Mono",monospace;letter-spacing:.09em;box-shadow:0 10px 30px rgba(100,243,176,.09);transition:transform .2s ease,box-shadow .2s ease,filter .2s ease}
            .sb-secure-enter:hover,.sb-secure-enter:focus-visible{transform:translateY(-2px);filter:brightness(1.04);box-shadow:0 16px 40px rgba(100,243,176,.17)}
            .sb-secure-bypass{width:100%;min-height:42px;margin-top:9px;border:0;background:transparent;color:#53666b;cursor:pointer;font:500 .58rem/1 "JetBrains Mono",monospace;letter-spacing:.07em;transition:color .2s ease}.sb-secure-bypass:hover,.sb-secure-bypass:focus-visible{color:#c4d0cd}
            .sb-secure-meta{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:25px}.sb-secure-meta div{padding:11px 10px;border:1px solid rgba(255,255,255,.045);border-radius:6px;background:rgba(255,255,255,.012)}.sb-secure-meta small{display:block;color:#4d5f64;font:500 .48rem/1 "JetBrains Mono",monospace;letter-spacing:.08em}.sb-secure-meta strong{display:block;margin-top:6px;color:#94a5a8;font:600 .56rem/1 "JetBrains Mono",monospace}
            .sb-secure-hint{margin-top:auto;padding-top:28px;color:#3f5054;text-align:center;font:500 .5rem/1.5 "JetBrains Mono",monospace}
            .sb-secure-corner{position:absolute;width:14px;height:14px;border-color:rgba(100,243,176,.45);pointer-events:none}.sb-secure-corner.tl{top:12px;left:12px;border-top:1px solid;border-left:1px solid}.sb-secure-corner.tr{top:12px;right:12px;border-top:1px solid;border-right:1px solid}.sb-secure-corner.bl{bottom:12px;left:12px;border-bottom:1px solid;border-left:1px solid}.sb-secure-corner.br{bottom:12px;right:12px;border-bottom:1px solid;border-right:1px solid}
            @keyframes sb-shell-in{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
            @keyframes sb-log-pulse{0%,100%{opacity:.55}50%{opacity:1}}
            .sb-secure-log b{animation:sb-log-pulse 1.8s ease-in-out infinite}
            @media(max-width:820px){.sb-secure-shell{grid-template-columns:1fr;min-height:auto;max-height:calc(100vh - 28px);overflow:auto}.sb-secure-terminal{border-right:0;border-bottom:1px solid rgba(255,255,255,.055);padding-bottom:24px}.sb-secure-terminal::after{display:none}.sb-secure-terminal-main{padding:42px 0 25px}.sb-secure-access{padding:30px 24px 26px}.sb-secure-avatar{margin-top:18px}.sb-secure-hint{margin-top:20px}}
            @media(max-width:520px){.sb-secure{padding:10px}.sb-secure-shell{width:100%;border-radius:14px;max-height:calc(100vh - 20px)}.sb-secure-terminal,.sb-secure-access{padding:20px}.sb-secure-terminal-main{padding:32px 0 20px}.sb-secure-title{font-size:clamp(2.15rem,12vw,3.6rem)}.sb-secure-copy{font-size:.82rem;line-height:1.65;margin-top:18px}.sb-secure-log{margin-top:24px;padding:12px}.sb-secure-log div{gap:7px}.sb-secure-footer{font-size:.48rem}.sb-secure-access-label{font-size:.52rem}.sb-secure-name{font-size:1.08rem}.sb-secure-enter{min-height:50px}.sb-secure-meta{margin-top:18px}.sb-secure-hint{font-size:.46rem;padding-top:18px}}
            @media(prefers-reduced-motion:reduce){.sb-secure,.sb-secure-shell,.sb-secure-log b{animation:none!important;transition:none!important}}
        `;
        document.head.appendChild(style);

        const entry = document.createElement("div");
        entry.className = "sb-secure";
        entry.setAttribute("role", "dialog");
        entry.setAttribute("aria-modal", "true");
        entry.setAttribute("aria-label", "Sandesh secure access portfolio entry");
        entry.innerHTML = `
            <div class="sb-secure-noise"></div>
            <div class="sb-secure-shell">
                <i class="sb-secure-corner tl"></i><i class="sb-secure-corner tr"></i><i class="sb-secure-corner bl"></i><i class="sb-secure-corner br"></i>
                <section class="sb-secure-terminal">
                    <div class="sb-secure-bar"><span class="sb-secure-brand">SANDESH <b>//</b> SECURE ACCESS</span><span class="sb-secure-dots"><i></i><i></i><i></i></span></div>
                    <div class="sb-secure-terminal-main">
                        <p class="sb-secure-kicker">Digital identity gateway</p>
                        <h2 class="sb-secure-title">Welcome to <span>Sandesh.</span></h2>
                        <p class="sb-secure-copy">A personal digital environment focused on networking, cybersecurity, software development and practical technical exploration.</p>
                        <div class="sb-secure-log" aria-label="System status">
                            <div><b>[ OK ]</b><span>PORTFOLIO CORE</span><span class="muted">READY</span></div>
                            <div><b>[ OK ]</b><span>IDENTITY MODULE</span><span class="muted">VERIFIED</span></div>
                            <div><b>[ OK ]</b><span>INTERFACE</span><span class="muted">ONLINE</span></div>
                        </div>
                    </div>
                    <div class="sb-secure-footer"><span>SESSION / PERSONAL PORTFOLIO</span><span>v1.0</span></div>
                </section>
                <aside class="sb-secure-access">
                    <span class="sb-secure-access-label">Identity verification</span>
                    <div class="sb-secure-avatar" aria-hidden="true"><span>SB</span></div>
                    <strong class="sb-secure-name">Sandesh Bajgai</strong>
                    <span class="sb-secure-role">IT • NETWORKING • CYBERSECURITY</span>
                    <span class="sb-secure-status"><i></i> ACCESS READY</span>
                    <button class="sb-secure-enter" type="button">AUTHENTICATE &amp; ENTER&nbsp; →</button>
                    <button class="sb-secure-bypass" type="button">BYPASS INTRO&nbsp; / &nbsp;ESC</button>
                    <div class="sb-secure-meta"><div><small>MODE</small><strong>PORTFOLIO</strong></div><div><small>ACCESS</small><strong>PUBLIC</strong></div></div>
                    <p class="sb-secure-hint">This is a visual entry experience — no password is required.</p>
                </aside>
            </div>`;

        document.body.prepend(entry);
        document.body.style.overflow = "hidden";

        const closeEntry = function () {
            if (!entry || entry.classList.contains("is-closing")) return;
            try { sessionStorage.setItem(ENTRY_KEY, "1"); } catch (error) { /* ignore */ }
            entry.classList.add("is-closing");
            document.body.style.overflow = "";
            window.setTimeout(function () { entry.remove(); style.remove(); }, reducedMotion ? 0 : 600);
        };

        const enterButton = entry.querySelector(".sb-secure-enter");
        const bypassButton = entry.querySelector(".sb-secure-bypass");
        enterButton.addEventListener("click", closeEntry);
        bypassButton.addEventListener("click", closeEntry);

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
        window.setTimeout(closeEntry, reducedMotion ? 1200 : 6500);
    }

    window.PORTFOLIO_CONFIG = CONFIG;
})();
