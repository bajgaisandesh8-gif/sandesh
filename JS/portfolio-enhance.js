/* SANDESH // PREMIUM PORTFOLIO EXPERIENCE LAYER v2 */
(function () {
  "use strict";

  function boot() {
    if (document.documentElement.dataset.sandeshPremium === "1") return;
    document.documentElement.dataset.sandeshPremium = "1";

    const style = document.createElement("style");
    style.textContent = `
      :root{--sb-glow:rgba(100,243,176,.18);--sb-cyan:#54a8ff}
      body{background-color:#030609}
      .section{position:relative}
      .section:before{content:"";position:absolute;left:24px;right:24px;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--sb-glow),transparent);pointer-events:none}
      .section-head{position:relative;padding-left:16px}.section-head:before{content:"";position:absolute;left:0;top:2px;width:2px;height:calc(100% - 4px);background:var(--accent);box-shadow:0 0 15px var(--sb-glow)}
      .section-tag{font-family:"JetBrains Mono",monospace;letter-spacing:.18em;color:var(--accent);font-size:.65rem}.section-title{text-shadow:0 0 35px rgba(100,243,176,.06)}

      /* HERO command-center treatment */
      .hero:after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 72% 48%,rgba(100,243,176,.055),transparent 28%),linear-gradient(90deg,transparent 0 49.9%,rgba(100,243,176,.025) 50%,transparent 50.1%)}
      .hero-left,.hero-right{z-index:3}.hero-name{position:relative;text-shadow:0 0 50px rgba(100,243,176,.08)}
      .hero-name:after{content:"SECURE // BUILD // EXPLORE";display:block;margin-top:12px;color:#385158;font:600 8px "JetBrains Mono",monospace;letter-spacing:.22em}
      .system-panel{position:relative;overflow:hidden}.system-panel:before{content:"LIVE";position:absolute;right:16px;top:13px;color:var(--accent);font:600 7px "JetBrains Mono",monospace;letter-spacing:.15em;opacity:.7}
      .system-panel:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent,rgba(100,243,176,.035),transparent);transform:translateX(-110%);animation:sbSweep 5s linear infinite;pointer-events:none}@keyframes sbSweep{to{transform:translateX(110%)}}
      .profile-stage{filter:drop-shadow(0 30px 80px rgba(0,0,0,.35))}.profile-frame{transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}.profile-stage:hover .profile-frame{box-shadow:0 0 90px rgba(100,243,176,.14),0 30px 90px rgba(0,0,0,.45)}

      /* premium cards */
      #about .about-copy,#about .about-panel,#contact .contact-info,#contact .contact-form{position:relative;overflow:hidden;border-color:#172631;background:linear-gradient(145deg,rgba(10,18,25,.97),rgba(3,8,12,.94));box-shadow:0 25px 80px rgba(0,0,0,.22)}
      #about .about-copy:before,#about .about-panel:before,#contact .contact-info:before,#contact .contact-form:before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(100,243,176,.045),transparent 35%,rgba(84,168,255,.025) 75%,transparent)}
      #about .about-copy:after{content:"PROFILE / 01";position:absolute;right:22px;top:18px;color:#3d5659;font:600 8px "JetBrains Mono",monospace;letter-spacing:.15em}
      #about .about-lead{font-size:clamp(1.25rem,2vw,1.55rem);line-height:1.45;max-width:650px}#about .about-body{max-width:650px;line-height:1.8}
      #about .value-chip{position:relative;transition:.25s ease}#about .value-chip:hover{border-color:var(--accent);background:rgba(100,243,176,.06);transform:translateY(-2px);box-shadow:0 0 20px var(--sb-glow)}
      #about .level-row{position:relative;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.045)}#about .level-row:last-child{border-bottom:0}#about .level-fill{animation:sbFill 1.4s cubic-bezier(.2,.8,.2,1) both;box-shadow:0 0 14px rgba(100,243,176,.22)}@keyframes sbFill{from{width:0!important}}
      #skills .skills-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
      #skills .skill-card,#projects .project-card,#experience .project-card,#certifications .cert-card{position:relative;overflow:hidden;border-color:#172631;background:linear-gradient(145deg,#0a1219,#050a0f);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .35s}
      #skills .skill-card{min-height:180px}#skills .skill-card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(100,243,176,.12),transparent 42%);opacity:0;transition:opacity .25s;pointer-events:none}
      #skills .skill-card:hover,#projects .project-card:hover,#experience .project-card:hover,#certifications .cert-card:hover{transform:translateY(-9px);border-color:rgba(100,243,176,.55);box-shadow:0 25px 60px rgba(0,0,0,.43),0 0 30px rgba(100,243,176,.07)}#skills .skill-card:hover:before{opacity:1}
      .upgrade-index{position:absolute;right:15px;top:13px;color:#33474c;font:600 8px "JetBrains Mono",monospace;letter-spacing:.12em;z-index:2}
      #experience .timeline{position:relative;padding-left:28px}#experience .timeline:before{content:"";position:absolute;left:6px;top:0;bottom:0;width:1px;background:linear-gradient(var(--accent),rgba(100,243,176,.08),transparent);box-shadow:0 0 12px rgba(100,243,176,.18)}
      #experience .timeline-item:before,#experience .experience-item:before{content:"";position:absolute;left:-27px;top:28px;width:9px;height:9px;border:1px solid var(--accent);background:#030609;border-radius:50%;box-shadow:0 0 16px rgba(100,243,176,.55)}
      #projects .projects-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}#projects .project-card img,#experience .project-card img{transition:transform .7s ease,filter .5s}#projects .project-card:hover img,#experience .project-card:hover img{transform:scale(1.05);filter:brightness(1.06) saturate(1.08)}
      #projects .project-card:after{content:"OPEN PROJECT ↗";position:absolute;right:16px;top:16px;padding:6px 9px;border:1px solid rgba(100,243,176,.35);background:rgba(2,6,8,.82);color:var(--accent);font:600 8px "JetBrains Mono",monospace;letter-spacing:.1em;opacity:0;transform:translateY(-6px);transition:.25s;pointer-events:none}#projects .project-card:hover:after{opacity:1;transform:none}
      #certifications .certs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}#certifications .cert-card{min-height:190px}#certifications .cert-card:before{content:"VERIFIED CREDENTIAL";position:absolute;right:14px;top:14px;color:#385258;font:600 7px "JetBrains Mono",monospace;letter-spacing:.12em}#certifications .cert-card:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);transform:scaleX(.2);transition:.4s}#certifications .cert-card:hover:after{transform:scaleX(1)}
      #contact .contact-grid{align-items:stretch}#contact .contact-info,#contact .contact-form{padding:28px;border-radius:var(--radius-lg)}#contact .contact-info:after,#contact .contact-form:after{content:"SECURE CHANNEL";position:absolute;right:20px;top:18px;color:#344b50;font:600 7px "JetBrains Mono",monospace;letter-spacing:.14em}#contact .contact-links li{transition:transform .25s}#contact .contact-links li:hover{transform:translateX(6px)}#contact .field input,#contact .field textarea{border-color:#1a2a34;background:#04090e;transition:border-color .2s,box-shadow .2s,transform .2s}#contact .field input:focus,#contact .field textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(100,243,176,.06),0 0 25px rgba(100,243,176,.04);transform:translateY(-1px)}

      /* command palette */
      #sbCommand{position:fixed;inset:0;z-index:100000;display:none;align-items:flex-start;justify-content:center;padding:12vh 20px;background:rgba(0,0,0,.72);backdrop-filter:blur(12px)}#sbCommand.open{display:flex}
      .sb-cmd-box{width:min(680px,100%);border:1px solid rgba(100,243,176,.32);background:#050b0f;box-shadow:0 30px 100px #000;overflow:hidden}.sb-cmd-top{padding:16px;border-bottom:1px solid #16252c}.sb-cmd-top input{width:100%;border:0;background:transparent;color:#eafff5;font:500 14px "JetBrains Mono",monospace}.sb-cmd-list{padding:8px}.sb-cmd-item{display:flex;justify-content:space-between;align-items:center;width:100%;padding:12px;border:1px solid transparent;background:transparent;color:#a9bcba;text-align:left;cursor:pointer;font:500 11px "JetBrains Mono",monospace}.sb-cmd-item:hover,.sb-cmd-item.active{border-color:#214038;background:#0a1516;color:var(--accent)}.sb-cmd-key{color:#405958;font-size:8px}
      .sb-cmd-hint{padding:10px 16px;border-top:1px solid #16252c;color:#405958;font:500 8px "JetBrains Mono",monospace;letter-spacing:.08em}
      /* floating utility dock */
      #sbDock{position:fixed;right:20px;bottom:20px;z-index:900;display:flex;gap:7px;padding:6px;border:1px solid #182a31;background:rgba(4,9,13,.82);backdrop-filter:blur(12px);box-shadow:0 15px 50px #0008;border-radius:9px}#sbDock button{width:34px;height:34px;border:1px solid #1a2c33;background:#071015;color:#6a8582;cursor:pointer;border-radius:6px;font:700 11px "JetBrains Mono",monospace}#sbDock button:hover{color:var(--accent);border-color:var(--accent)}
      .sb-cursor{position:fixed;left:0;top:0;width:16px;height:16px;border:1px solid var(--accent);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);opacity:0;mix-blend-mode:screen;transition:width .18s,height .18s,opacity .2s}.sb-cursor-dot{position:fixed;width:4px;height:4px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:99999;transform:translate(-50%,-50%);opacity:0;box-shadow:0 0 10px var(--accent)}body.sb-pointer .sb-cursor,body.sb-pointer .sb-cursor-dot{opacity:.75}body.sb-pointer .sb-cursor.hover{width:34px;height:34px}
      .sb-reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}.sb-reveal.sb-in{opacity:1;transform:none}
      @media(max-width:900px){#skills .skills-grid,#certifications .certs-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#projects .projects-grid{grid-template-columns:1fr}}
      @media(max-width:600px){.section:before{left:16px;right:16px}#skills .skills-grid,#certifications .certs-grid{grid-template-columns:1fr}.section{padding-top:76px;padding-bottom:76px}#sbDock{right:12px;bottom:12px}.sb-cmd-box{margin-top:3vh}}
      @media(pointer:coarse){.sb-cursor,.sb-cursor-dot{display:none}}
      @media(prefers-reduced-motion:reduce){.sb-reveal{opacity:1;transform:none;transition:none}*,*:before,*:after{scroll-behavior:auto!important}}
    `;
    document.head.appendChild(style);

    // Card numbering and pointer spotlight.
    function decorateCards() {
      document.querySelectorAll("#skillsGrid,#projectsGrid,#certsGrid").forEach(grid => {
        grid.querySelectorAll("article,.skill-card,.project-card,.cert-card").forEach((card,i) => {
          if(!card.querySelector(":scope > .upgrade-index")){const n=document.createElement("span");n.className="upgrade-index";n.textContent=String(i+1).padStart(2,"0");card.appendChild(n)}
        });
      });
      document.querySelectorAll("#skillsGrid .skill-card").forEach(card=>{
        if(card.dataset.spotlight)return;card.dataset.spotlight="1";
        card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();card.style.setProperty("--mx",`${e.clientX-r.left}px`);card.style.setProperty("--my",`${e.clientY-r.top}px`)},{passive:true});
      });
    }
    decorateCards();
    ["skillsGrid","projectsGrid","certsGrid"].forEach(id=>{const el=document.getElementById(id);if(el)new MutationObserver(decorateCards).observe(el,{childList:true})});

    // Smooth reveal for content that may be injected later.
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("sb-in");revealObserver.unobserve(e.target)}}),{threshold:.1});
    document.querySelectorAll(".about-copy,.about-panel,#skillsGrid,#timeline,.network-gallery,#projectsGrid,#certsGrid,.contact-info,.contact-form").forEach(el=>{el.classList.add("sb-reveal");revealObserver.observe(el)});

    // Reading progress.
    const progress=document.getElementById("navProgress");
    const updateProgress=()=>{if(!progress)return;const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+"%"};
    window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();

    // Keyboard-accessible command palette: Ctrl/Cmd+K.
    const commands=[
      ["HOME","Go to home","1","home"],["ABOUT","Open profile","2","about"],["SKILLS","View technical toolkit","3","skills"],["EXPERIENCE","View experience","4","experience"],["PROJECTS","Explore selected work","5","projects"],["CERTIFICATIONS","View credentials","6","certifications"],["CONTACT","Open contact channel","7","contact"]
    ];
    const modal=document.createElement("div");modal.id="sbCommand";modal.innerHTML='<div class="sb-cmd-box"><div class="sb-cmd-top"><input id="sbCmdInput" autocomplete="off" placeholder="Type a section or command..."></div><div class="sb-cmd-list" id="sbCmdList"></div><div class="sb-cmd-hint">ENTER SELECT · ↑↓ NAVIGATE · ESC CLOSE · CTRL/CMD+K OPEN</div></div>';document.body.appendChild(modal);
    const cmdInput=modal.querySelector("#sbCmdInput"),cmdList=modal.querySelector("#sbCmdList");let cmdIndex=0;
    function renderCommands(q=""){const items=commands.filter(c=>(c[0]+c[1]).toLowerCase().includes(q.toLowerCase()));cmdList.innerHTML=items.map((c,i)=>`<button class="sb-cmd-item ${i===0?'active':''}" data-target="${c[3]}"><span>${c[0]} — ${c[1]}</span><span class="sb-cmd-key">${c[2]}</span></button>`).join("");cmdIndex=0;cmdList.querySelectorAll(".sb-cmd-item").forEach(b=>b.addEventListener("click",()=>{closeCmd();document.getElementById(b.dataset.target)?.scrollIntoView({behavior:"smooth"})}));}
    function openCmd(){modal.classList.add("open");renderCommands();setTimeout(()=>cmdInput.focus(),20)}function closeCmd(){modal.classList.remove("open");cmdInput.value=""}
    cmdInput.addEventListener("input",()=>renderCommands(cmdInput.value));cmdInput.addEventListener("keydown",e=>{const items=[...cmdList.querySelectorAll(".sb-cmd-item")];if(e.key==="ArrowDown"){e.preventDefault();cmdIndex=Math.min(cmdIndex+1,items.length-1)}else if(e.key==="ArrowUp"){e.preventDefault();cmdIndex=Math.max(cmdIndex-1,0)}else if(e.key==="Enter"&&items[cmdIndex]){items[cmdIndex].click();return}items.forEach((b,i)=>b.classList.toggle("active",i===cmdIndex))});
    modal.addEventListener("click",e=>{if(e.target===modal)closeCmd()});
    window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();modal.classList.contains("open")?closeCmd():openCmd()}if(e.key==="Escape"&&modal.classList.contains("open"))closeCmd()});

    // Floating utility controls.
    const dock=document.createElement("div");dock.id="sbDock";dock.innerHTML='<button id="sbTop" title="Back to top" aria-label="Back to top">↑</button><button id="sbCmd" title="Command palette" aria-label="Command palette">⌘</button>';document.body.appendChild(dock);
    dock.querySelector("#sbTop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});dock.querySelector("#sbCmd").onclick=openCmd;

    // Desktop cyber cursor, automatically disabled on touch devices.
    if(window.matchMedia("(pointer:fine)").matches){const ring=document.createElement("div");ring.className="sb-cursor";const dot=document.createElement("div");dot.className="sb-cursor-dot";document.body.append(ring,dot);let mx=-100,my=-100,rx=-100,ry=-100;window.addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;document.body.classList.add("sb-pointer")},{passive:true});const tick=()=>{rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+"px";ring.style.top=ry+"px";dot.style.left=mx+"px";dot.style.top=my+"px";requestAnimationFrame(tick)};tick();document.querySelectorAll("a,button,.filter-btn,.skill-card,.project-card,.cert-card,input,textarea").forEach(el=>{el.addEventListener("mouseenter",()=>ring.classList.add("hover"));el.addEventListener("mouseleave",()=>ring.classList.remove("hover"))})}

    // Active section state, robust even when existing scripts are absent.
    const sections=[...document.querySelectorAll("main section[id]")];const navLinks=[...document.querySelectorAll(".nav-link[data-section]")];
    const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.dataset.section===e.target.id))}}),{rootMargin:"-30% 0px -60% 0px",threshold:0});sections.forEach(s=>navObserver.observe(s));

    // Avoid accidental browser jump when loading a hash; preserve smooth UX.
    if(location.hash){setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({behavior:"smooth"}),300)}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
