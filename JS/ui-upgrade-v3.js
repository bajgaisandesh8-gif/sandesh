/* SANDESH // UI UPGRADE v5
   Premium cursor, cinematic hold, mobile navigation,
   cyber skill matrix + terminal footer.
*/
(function(){
  "use strict";
  const HOLD_MS=12000, started=Date.now();
  const originalRemove=Element.prototype.remove;
  let released=false;

  /* Keep the gateway visible for the intended cinematic sequence. */
  Element.prototype.remove=function(){
    if(this&&(this.id==="sb-gateway"||this.id==="sb-secure")&&!released){
      const wait=Math.max(0,HOLD_MS-(Date.now()-started));
      setTimeout(()=>{released=true;originalRemove.call(this)},wait); return;
    }
    return originalRemove.call(this);
  };

  function addStyles(){
    const s=document.createElement("style");
    s.textContent=`
      /* Name orbit */
      #home .hero-name{isolation:isolate;position:relative}
      #home .hero-name:before{content:"";position:absolute;left:-5%;right:5%;top:50%;height:72%;border:1px solid rgba(100,243,176,.09);border-left-color:transparent;border-right-color:transparent;border-radius:50%;transform:translateY(-50%) rotate(-8deg);animation:sbOrbit 8s linear infinite;pointer-events:none}
      @keyframes sbOrbit{to{transform:translateY(-50%) rotate(352deg)}}
      @keyframes sbPulse{50%{text-shadow:0 0 70px rgba(100,243,176,.2)}}
      #sb-gateway .gateway-name,#sb-secure .gateway-name{animation:sbPulse 3.8s ease-in-out infinite}

      /* Cyber cursor */
      .sb-ui-cursor{position:fixed;left:0;top:0;width:24px;height:24px;border:1px solid rgba(100,243,176,.8);border-radius:50%;pointer-events:none;z-index:999999;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:width .18s,height .18s,border-color .18s,box-shadow .18s,opacity .2s}
      .sb-ui-cursor:before,.sb-ui-cursor:after{content:"";position:absolute;background:#64f3b0;box-shadow:0 0 10px #64f3b0}
      .sb-ui-cursor:before{width:1px;height:34px;left:50%;top:-6px}.sb-ui-cursor:after{height:1px;width:34px;top:50%;left:-6px}
      .sb-ui-cursor .cursor-label{position:absolute;top:30px;left:50%;transform:translateX(-50%);font:600 7px "JetBrains Mono",monospace;color:#64f3b0;white-space:nowrap;letter-spacing:.1em;opacity:0}
      .sb-ui-dot{position:fixed;left:0;top:0;width:4px;height:4px;border-radius:50%;background:#eafff5;pointer-events:none;z-index:1000000;opacity:0;box-shadow:0 0 14px #64f3b0}
      body.sb-ui-cursor-active .sb-ui-cursor,body.sb-ui-cursor-active .sb-ui-dot{opacity:1}
      body.sb-ui-cursor-hover .sb-ui-cursor{width:44px;height:44px;border-color:#64f3b0;box-shadow:0 0 25px rgba(100,243,176,.12)}
      body.sb-ui-cursor-hover .cursor-label{opacity:1}
      body.sb-ui-cursor-click .sb-ui-cursor{width:10px;height:10px}
      @media(pointer:coarse){.sb-ui-cursor,.sb-ui-dot{display:none!important}}

      /* Cyber skill matrix */
      #skillsGrid .skill-card{position:relative;overflow:hidden;min-height:190px;padding:22px;border:1px solid var(--border);background:linear-gradient(145deg,rgba(10,17,23,.96),rgba(5,9,13,.96));transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}
      #skillsGrid .skill-card:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(100,243,176,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(100,243,176,.025) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(to bottom,black,transparent);pointer-events:none}
      #skillsGrid .skill-card:after{content:"";position:absolute;left:22px;right:22px;bottom:20px;height:3px;background:linear-gradient(90deg,var(--accent) 0 62%,#1a2830 62%);box-shadow:0 0 12px rgba(100,243,176,.18);opacity:.9}
      #skillsGrid .skill-card:hover,#skillsGrid .skill-card:focus-visible{transform:translateY(-5px);border-color:rgba(100,243,176,.55);box-shadow:0 18px 45px rgba(0,0,0,.35),0 0 25px rgba(100,243,176,.06)}
      #skillsGrid .skill-card-header{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
      #skillsGrid .skill-category{font:600 .62rem "JetBrains Mono",monospace;color:var(--accent);letter-spacing:.12em;text-transform:uppercase}
      #skillsGrid .skill-category:before{content:"[ ";color:var(--text-muted)}#skillsGrid .skill-category:after{content:" ]";color:var(--text-muted)}
      #skillsGrid .skill-card h3,#skillsGrid .skill-card p,#skillsGrid .skill-tags{position:relative;z-index:1}
      #skillsGrid .skill-card h3{font-size:1.15rem;margin-bottom:8px}
      #skillsGrid .skill-card p{color:var(--text-secondary);font-size:.85rem;line-height:1.65}
      #skillsGrid .skill-tags{margin-top:18px;color:var(--text-muted);font:500 .62rem "JetBrains Mono",monospace;text-transform:uppercase;letter-spacing:.08em}
      #skillsGrid .skill-tags span:before{content:"LEVEL // ";color:#4d6965}

      /* Terminal footer */
      .site-footer{position:relative;overflow:hidden;border-top:1px solid var(--border);background:#030608}
      .site-footer:before{content:"SYSTEM STATUS: ONLINE   //   BUILD: HTML / CSS / JS   //   NODE: NEPAL   //   CONNECTION: STABLE";display:block;padding:9px 24px;border-bottom:1px solid rgba(27,39,52,.65);color:#4d6965;font:600 8px "JetBrains Mono",monospace;letter-spacing:.12em;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .footer-inner{position:relative;min-height:90px;display:flex;align-items:center;justify-content:space-between;gap:20px}
      .footer-inner p{font-family:"JetBrains Mono",monospace;font-size:.68rem;color:var(--text-muted)}
      .back-top{font-family:"JetBrains Mono",monospace;font-size:.65rem;color:var(--accent);letter-spacing:.08em}
      .back-top:hover{text-shadow:0 0 12px rgba(100,243,176,.4)}

      /* Mobile navigation */
      @media(max-width:700px){
        .nav-toggle{display:grid!important;place-items:center;width:44px;height:44px;z-index:20;border:1px solid #20343a;background:#071015;color:#8fa4a2;border-radius:7px;font-size:18px}
        .nav-toggle.is-open{color:var(--accent);border-color:var(--accent)}
        .nav-links{position:fixed!important;left:10px;right:10px;top:68px;display:grid!important;grid-template-columns:1fr 1fr;gap:7px;padding:10px;border:1px solid #1a3036;border-radius:12px;background:rgba(3,9,13,.96);backdrop-filter:blur(18px);box-shadow:0 25px 70px rgba(0,0,0,.55);opacity:0;visibility:hidden;transform:translateY(-10px) scale(.98);transition:.2s;z-index:1000}
        .nav-links.is-open{opacity:1;visibility:visible;transform:none}
        .nav-link{min-height:46px!important;display:flex!important;align-items:center;justify-content:center;padding:10px;border:1px solid rgba(255,255,255,.035);border-radius:6px;font-size:.63rem!important;background:#050d11}
        .nav-link.active{border-color:rgba(100,243,176,.35);background:rgba(100,243,176,.055)}
        .hero{min-height:100svh;min-height:100dvh}
        .hero-cta{grid-template-columns:1fr}
        .hero-cta .btn{width:100%}
        .footer-inner{padding-top:18px;padding-bottom:18px;flex-direction:column;align-items:flex-start}
        .site-footer:before{padding-left:16px;padding-right:16px;text-align:left}
      }
      @media(max-width:430px){.nav-links{grid-template-columns:1fr}.site-footer:before{font-size:7px}}
      @media(pointer:coarse){button,a,input,textarea,select{touch-action:manipulation}.filter-btn,.btn{min-height:44px}}
      @media(prefers-reduced-motion:reduce){#home .hero-name:before,#sb-gateway .gateway-name,#sb-secure .gateway-name{animation:none!important}}
      html,body{max-width:100%;overflow-x:hidden}
    `;
    document.head.appendChild(s);
  }

  function initCursor(){
    if(window.matchMedia&&window.matchMedia("(pointer: coarse)").matches)return;
    const ring=document.createElement("div");ring.className="sb-ui-cursor";ring.innerHTML='<span class="cursor-label">INTERACT</span>';
    const dot=document.createElement("div");dot.className="sb-ui-dot";document.body.append(ring,dot);
    let tx=innerWidth/2,ty=innerHeight/2,rx=tx,ry=ty;
    addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;document.body.classList.add("sb-ui-cursor-active")},{passive:true});
    addEventListener("pointerdown",()=>document.body.classList.add("sb-ui-cursor-click"));
    addEventListener("pointerup",()=>document.body.classList.remove("sb-ui-cursor-click"));
    document.addEventListener("mouseover",e=>{const a=e.target.closest("a,button,input,textarea,select,[role=button]");if(!a)return;document.body.classList.add("sb-ui-cursor-hover");ring.querySelector(".cursor-label").textContent=a.tagName==="BUTTON"?"SELECT":"OPEN"});
    document.addEventListener("mouseout",e=>{if(e.target.closest("a,button,input,textarea,select,[role=button]"))document.body.classList.remove("sb-ui-cursor-hover")});
    function tick(){rx+=(tx-rx)*.2;ry+=(ty-ry)*.2;ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;dot.style.transform=`translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;requestAnimationFrame(tick)}tick();
  }

  function initNav(){
    const toggle=document.getElementById("navToggle"),links=document.getElementById("navLinks");if(!toggle||!links)return;
    const close=()=>{links.classList.remove("is-open");toggle.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");toggle.textContent="☰"};
    const open=()=>{links.classList.add("is-open");toggle.classList.add("is-open");toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-label","Close menu");toggle.textContent="×"};
    toggle.addEventListener("click",()=>links.classList.contains("is-open")?close():open());links.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});addEventListener("resize",()=>{if(innerWidth>700)close()});
  }

  function initFooter(){
    const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
  }

  function init(){
    if(document.documentElement.dataset.sbUiV5)return;document.documentElement.dataset.sbUiV5="1";
    addStyles();initCursor();initNav();initFooter();
    const hero=document.getElementById("home");
    if(hero&&!hero.querySelector(".sb-ui-hero-tag")){const t=document.createElement("span");t.className="sb-ui-hero-tag";t.textContent="DIGITAL PROFILE // NODE-07";Object.assign(t.style,{position:"absolute",right:"24px",top:"88px",zIndex:4,font:'600 7px "JetBrains Mono",monospace',letterSpacing:'.14em',color:'#49615f',padding:'7px 9px',border:'1px solid #17302a',background:'rgba(2,7,6,.62)'});hero.appendChild(t)}
    /* Cards are focusable even when generated remotely. */
    const focusCards=()=>document.querySelectorAll("#skillsGrid .skill-card,#projectsGrid .project-card,#certsGrid .cert-card").forEach(c=>c.setAttribute("tabindex","0"));
    focusCards();new MutationObserver(focusCards).observe(document.getElementById("skillsGrid")||document.body,{childList:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();