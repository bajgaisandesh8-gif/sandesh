/* SANDESH // PORTFOLIO ENHANCEMENT LAYER */
(function () {
  "use strict";
  const boot = () => {
    const hero = document.querySelector("#home");
    if (!hero || hero.dataset.enhanced === "1") return;
    hero.dataset.enhanced = "1";

    const style = document.createElement("style");
    style.textContent = `
      .hero::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;background:radial-gradient(circle at 18% 45%,rgba(100,243,176,.09),transparent 28%),radial-gradient(circle at 78% 48%,rgba(84,168,255,.08),transparent 25%)}
      .hero-inner{transform-style:preserve-3d}
      .hero-left,.hero-right{transition:transform .18s ease-out}
      .hero-eyebrow{position:relative;width:max-content;padding:7px 10px;border:1px solid rgba(100,243,176,.18);background:rgba(100,243,176,.025);box-shadow:0 0 30px rgba(100,243,176,.04)}
      .hero-eyebrow::after{content:"";position:absolute;right:-1px;top:-1px;width:28px;height:2px;background:var(--accent);box-shadow:0 0 12px var(--accent)}
      .hero-name{position:relative;text-shadow:0 0 50px rgba(100,243,176,.08)}
      .hero-name::after{content:"SYSTEM / IDENTITY";position:absolute;right:0;bottom:-18px;color:rgba(100,243,176,.35);font:500 8px "JetBrains Mono",monospace;letter-spacing:.22em}
      .hero-headline{max-width:650px}
      .hero-desc{max-width:610px}
      .hero-command-strip{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
      .hero-command-strip span{padding:6px 9px;border:1px solid var(--border);background:rgba(5,7,10,.65);color:var(--text-muted);font:500 8px "JetBrains Mono",monospace;letter-spacing:.06em}
      .hero-command-strip span b{color:var(--accent);font-weight:600}
      .system-panel{position:relative;overflow:hidden}
      .system-panel::before{content:"";position:absolute;left:0;right:0;top:-100%;height:100%;background:linear-gradient(transparent,rgba(100,243,176,.07),transparent);animation:systemScan 4s linear infinite;pointer-events:none}
      @keyframes systemScan{to{top:100%}}
      .profile-stage{filter:drop-shadow(0 30px 70px rgba(0,0,0,.45))}
      .profile-stage::before{content:"";position:absolute;inset:7%;border:1px solid rgba(100,243,176,.18);clip-path:polygon(0 0,28% 0,28% 2px,72% 2px,72% 0,100% 0,100% 28%,calc(100% - 2px) 28%,calc(100% - 2px) 72%,100% 72%,100% 100%,72% 100%,72% calc(100% - 2px),28% calc(100% - 2px),28% 100%,0 100%,0 72%,2px 72%,2px 28%,0 28%);animation:framePulse 3s ease-in-out infinite}
      @keyframes framePulse{50%{opacity:.45;transform:scale(1.02)}}
      .profile-frame{box-shadow:0 0 80px rgba(100,243,176,.1),inset 0 0 35px rgba(100,243,176,.04);transition:transform .2s ease-out}
      .profile-frame::after{content:"SANDESH / NODE-07";position:absolute;left:18px;bottom:18px;padding:5px 8px;border:1px solid rgba(100,243,176,.3);background:rgba(2,6,8,.72);color:var(--accent);font:600 8px "JetBrains Mono",monospace;letter-spacing:.1em}
      .profile-ring{animation:orbit 12s linear infinite}
      .ring-2{animation-duration:18s;animation-direction:reverse}
      @keyframes orbit{to{transform:rotate(360deg)}}
      .hero-data-dock{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:22px;border:1px solid var(--border);background:var(--border);width:min(100%,560px)}
      .hero-data-dock article{padding:11px 13px;background:rgba(5,7,10,.82)}
      .hero-data-dock small{display:block;color:var(--text-muted);font:500 7px "JetBrains Mono",monospace;letter-spacing:.1em}
      .hero-data-dock strong{display:block;margin-top:4px;color:var(--text-primary);font:600 11px "JetBrains Mono",monospace}
      .hero-data-dock i{display:inline-block;width:5px;height:5px;margin-right:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 9px var(--accent)}
      .nav{box-shadow:0 1px 0 rgba(100,243,176,.03),0 12px 40px rgba(0,0,0,.12)}
      .nav-logo{transition:transform .2s ease,color .2s ease}.nav-logo:hover{transform:translateY(-2px)}
      .section-head{position:relative}.section-head::after{content:"";display:block;width:70px;height:1px;margin-top:18px;background:linear-gradient(90deg,var(--accent),transparent)}
      .section-title{max-width:850px}
      .project-card,.skill-card,.cert-card{transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .35s ease,box-shadow .35s ease}
      .project-card:hover,.skill-card:hover,.cert-card:hover{transform:translateY(-7px);border-color:rgba(100,243,176,.45);box-shadow:0 20px 55px rgba(0,0,0,.28),0 0 28px rgba(100,243,176,.05)}
      @media(max-width:700px){.hero-name::after{display:none}.hero-data-dock{grid-template-columns:1fr}.hero-command-strip span{font-size:7px}.profile-frame::after{font-size:7px}}
      @media(prefers-reduced-motion:reduce){.system-panel::before,.profile-stage::before,.profile-ring{animation:none}.hero-left,.hero-right,.profile-frame{transition:none}}
    `;
    document.head.appendChild(style);

    const left = hero.querySelector(".hero-left");
    if (left) {
      const commands = document.createElement("div");
      commands.className = "hero-command-strip";
      commands.innerHTML = `<span><b>01</b> NETWORKING</span><span><b>02</b> CYBERSECURITY</span><span><b>03</b> SOFTWARE</span><span><b>04</b> AI / AUTOMATION</span>`;
      const panel = left.querySelector(".system-panel");
      if (panel) panel.before(commands);

      const dock = document.createElement("div");
      dock.className = "hero-data-dock";
      dock.innerHTML = `<article><small>CURRENT MODE</small><strong><i></i>BUILDING</strong></article><article><small>PRIMARY STACK</small><strong>HTML / CSS / JS</strong></article><article><small>ENVIRONMENT</small><strong>NEPAL / ONLINE</strong></article>`;
      left.appendChild(dock);
    }

    const move = (e) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 900) return;
      const x = e.clientX / window.innerWidth - .5;
      const y = e.clientY / window.innerHeight - .5;
      const l = hero.querySelector(".hero-left");
      const r = hero.querySelector(".hero-right");
      if (l) l.style.transform = `translate3d(${x * -8}px,${y * -5}px,0)`;
      if (r) r.style.transform = `translate3d(${x * 10}px,${y * 7}px,0)`;
      const frame = hero.querySelector(".profile-frame");
      if (frame) frame.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -6}deg) rotate(2deg)`;
    };
    const reset = () => {
      const l = hero.querySelector(".hero-left"), r = hero.querySelector(".hero-right"), f = hero.querySelector(".profile-frame");
      if (l) l.style.transform = ""; if (r) r.style.transform = ""; if (f) f.style.transform = "";
    };
    window.addEventListener("pointermove", move, {passive:true});
    window.addEventListener("blur", reset);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, {once:true}); else boot();
})();
