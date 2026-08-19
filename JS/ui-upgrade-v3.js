/* SANDESH // UI UPGRADE v4 — cinematic hold, premium cursor, mobile UX, navigation polish */
(function(){
  "use strict";

  const HOLD_MS = 12000;
  const started = Date.now();
  let released = false;
  const originalRemove = Element.prototype.remove;

  /* Keep the cinematic gateway on-screen long enough to be experienced. */
  Element.prototype.remove = function(){
    if(this && (this.id === "sb-gateway" || this.id === "sb-secure") && !released){
      const remaining = Math.max(0, HOLD_MS - (Date.now() - started));
      window.setTimeout(()=>{
        released = true;
        originalRemove.call(this);
      }, remaining);
      return;
    }
    return originalRemove.call(this);
  };

  function boot(){
    if(document.documentElement.dataset.sbUiV4 === "1") return;
    document.documentElement.dataset.sbUiV4 = "1";

    const style=document.createElement("style");
    style.textContent=`
      /* ==================== CINEMATIC GATEWAY ==================== */
      #sb-gateway .core-inner:before,#sb-gateway .core-inner:after,
      #sb-secure .core-inner:before,#sb-secure .core-inner:after{
        content:"";position:absolute;left:50%;top:50%;width:min(58vw,700px);height:min(58vw,700px);
        transform:translate(-50%,-50%);border:1px solid rgba(100,243,176,.08);border-radius:50%;pointer-events:none
      }
      #sb-gateway .core-inner:after,#sb-secure .core-inner:after{
        width:min(42vw,510px);height:min(42vw,510px);border-style:dashed;border-color:rgba(84,168,255,.12);
        animation:sbOrbit 16s linear infinite
      }
      #sb-gateway .gateway-name,#sb-secure .gateway-name{animation:sbNamePulse 3.8s ease-in-out infinite}
      #sb-gateway .gateway-name:before,#sb-secure .gateway-name:before{
        content:"";position:absolute;left:-12%;right:-12%;top:50%;height:75%;border:1px solid rgba(100,243,176,.12);
        border-left-color:transparent;border-right-color:transparent;border-radius:50%;transform:translateY(-50%) rotate(-8deg);
        animation:sbNameOrbit 9s linear infinite;pointer-events:none
      }
      @keyframes sbOrbit{to{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes sbNameOrbit{to{transform:translateY(-50%) rotate(352deg)}}
      @keyframes sbNamePulse{50%{text-shadow:0 0 85px rgba(100,243,176,.22),0 0 20px rgba(100,243,176,.1)}}

      /* ==================== PREMIUM DESKTOP CURSOR ==================== */
      .sb-ui-cursor{position:fixed;left:0;top:0;width:24px;height:24px;border:1px solid rgba(100,243,176,.8);border-radius:50%;pointer-events:none;z-index:999999;transform:translate3d(-50%,-50%,0);opacity:0;transition:width .18s ease,height .18s ease,border-color .18s ease,box-shadow .18s ease,opacity .2s ease;mix-blend-mode:screen}
      .sb-ui-cursor:before,.sb-ui-cursor:after{content:"";position:absolute;background:#64f3b0;box-shadow:0 0 10px #64f3b0}
      .sb-ui-cursor:before{width:1px;height:34px;left:50%;top:-6px}.sb-ui-cursor:after{height:1px;width:34px;top:50%;left:-6px}
      .sb-ui-cursor .cursor-label{position:absolute;left:50%;top:31px;transform:translateX(-50%);white-space:nowrap;color:#64f3b0;font:600 7px "JetBrains Mono",monospace;letter-spacing:.1em;opacity:0;transition:opacity .18s}
      .sb-ui-dot{position:fixed;left:0;top:0;width:4px;height:4px;background:#eafff5;border-radius:50%;pointer-events:none;z-index:1000000;transform:translate3d(-50%,-50%,0);opacity:0;box-shadow:0 0 14px #64f3b0}
      body.sb-ui-cursor-active .sb-ui-cursor,body.sb-ui-cursor-active .sb-ui-dot{opacity:1}
      body.sb-ui-cursor-hover .sb-ui-cursor{width:44px;height:44px;border-color:#64f3b0;box-shadow:0 0 25px rgba(100,243,176,.12)}
      body.sb-ui-cursor-hover .cursor-label{opacity:1}
      body.sb-ui-cursor-click .sb-ui-cursor{width:11px;height:11px}
      @media(pointer:coarse){.sb-ui-cursor,.sb-ui-dot{display:none!important}}

      /* ==================== HERO NAME ORBIT ==================== */
      #home .hero-name{isolation:isolate}
      #home .hero-name:before{content:"";position:absolute;left:-5%;right:5%;top:50%;height:72%;border:1px solid rgba(100,243,176,.09);border-left-color:transparent;border-right-color:transparent;border-radius:50%;transform:translateY(-50%) rotate(-8deg);animation:sbNameOrbit 8s linear infinite;pointer-events:none}

      /* ==================== MOBILE NAVIGATION ==================== */
      @media(max-width:700px){
        body{overflow-x:hidden}
        .nav{height:auto}
        .nav-inner{min-height:62px;padding:0 16px}
        .nav-toggle{position:relative;z-index:20;width:44px;height:44px;display:grid;place-items:center;border:1px solid #20343a;background:#071015;color:#8fa4a2;border-radius:7px;font-size:18px;cursor:pointer}
        .nav-toggle.is-open{color:#64f3b0;border-color:#64f3b0;box-shadow:0 0 22px rgba(100,243,176,.1)}
        .nav-links{position:fixed;left:10px;right:10px;top:68px;display:grid!important;grid-template-columns:1fr 1fr;gap:7px;padding:10px;border:1px solid #1a3036;border-radius:12px;background:rgba(3,9,13,.96);backdrop-filter:blur(18px);box-shadow:0 25px 70px rgba(0,0,0,.55);opacity:0;visibility:hidden;transform:translateY(-10px) scale(.98);transition:opacity .2s ease,visibility .2s ease,transform .2s ease;z-index:1000}
        .nav-links.is-open{opacity:1;visibility:visible;transform:none}
        .nav-link{min-height:46px!important;display:flex!important;align-items:center;justify-content:center;padding:10px;border:1px solid rgba(255,255,255,.035);border-radius:6px;font-size:.63rem!important;letter-spacing:.12em;background:#050d11}
        .nav-link.active{border-color:rgba(100,243,176,.35);background:rgba(100,243,176,.055)}
        .hero{min-height:100svh;min-height:100dvh}
        .hero-inner{padding-top:92px;padding-bottom:70px}
        .hero-name{font-size:clamp(3.2rem,17vw,6rem);line-height:.9}
        .hero-headline{font-size:clamp(1.05rem,5vw,1.35rem)}
        .hero-desc{font-size:.86rem;line-height:1.7}
        .hero-cta{display:grid;grid-template-columns:1fr;gap:10px}
        .hero-cta .btn{width:100%;min-height:48px}
        .system-panel{margin-top:20px}
        .profile-stage{max-width:310px;margin-inline:auto}
        .scroll-cue{display:none}
        .section-head{padding-left:12px}
        #about .about-copy,#about .about-panel,#contact .contact-info,#contact .contact-form{padding:20px}
        #skills .skill-card{min-height:155px}
        #experience .timeline{padding-left:20px}
        #experience .timeline-item:before,#experience .experience-item:before{left:-19px}
        #sbDock{bottom:10px;right:10px}
        .sb-ui-hero-tag{display:none!important}
      }
      @media(max-width:430px){
        .nav-links{grid-template-columns:1fr}
        .nav-link{min-height:42px!important}
        .hero-name{font-size:clamp(2.9rem,16vw,4.7rem)}
        .hero-left{padding-inline:2px}
        .system-rows li{gap:8px}
      }

      /* Prevent accidental horizontal overflow from visual effects. */
      html,body{max-width:100%;overflow-x:hidden}
      img,canvas,video{max-width:100%}

      /* Touch-friendly controls. */
      @media(pointer:coarse){button,a,input,textarea,select{touch-action:manipulation}.filter-btn,.btn{min-height:44px}}
      @media(prefers-reduced-motion:reduce){#sb-gateway .core-inner:after,#sb-secure .core-inner:after,#sb-gateway .gateway-name,#sb-secure .gateway-name,#home .hero-name:before{animation:none!important}}
    `;
    document.head.appendChild(style);

    /* Cursor with engineered smoothing + contextual label. */
    if(!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches)){
      const ring=document.createElement("div"); ring.className="sb-ui-cursor";
      ring.innerHTML='<span class="cursor-label">INTERACT</span>';
      const dot=document.createElement("div"); dot.className="sb-ui-dot";
      document.body.append(ring,dot);
      let tx=innerWidth/2,ty=innerHeight/2,rx=tx,ry=ty;
      window.addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;document.body.classList.add("sb-ui-cursor-active")},{passive:true});
      window.addEventListener("pointerdown",()=>document.body.classList.add("sb-ui-cursor-click"));
      window.addEventListener("pointerup",()=>document.body.classList.remove("sb-ui-cursor-click"));
      document.addEventListener("mouseover",e=>{const target=e.target.closest("a,button,input,textarea,select,[role=button]");if(target){document.body.classList.add("sb-ui-cursor-hover");const label=ring.querySelector(".cursor-label");if(label)label.textContent=target.tagName==='BUTTON'?'SELECT':'OPEN'}});
      document.addEventListener("mouseout",e=>{if(e.target.closest("a,button,input,textarea,select,[role=button]"))document.body.classList.remove("sb-ui-cursor-hover")});
      function tick(){rx+=(tx-rx)*.2;ry+=(ty-ry)*.2;ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;dot.style.transform=`translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;requestAnimationFrame(tick)}
      tick();
    }

    /* Mobile navigation: robust open/close behavior and Escape support. */
    const navToggle=document.getElementById("navToggle");
    const navLinks=document.getElementById("navLinks");
    if(navToggle && navLinks){
      const closeMenu=()=>{navLinks.classList.remove("is-open");navToggle.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","Open menu");navToggle.textContent="☰"};
      const openMenu=()=>{navLinks.classList.add("is-open");navToggle.classList.add("is-open");navToggle.setAttribute("aria-expanded","true");navToggle.setAttribute("aria-label","Close menu");navToggle.textContent="×"};
      navToggle.addEventListener("click",()=>navLinks.classList.contains("is-open")?closeMenu():openMenu());
      navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
      document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
      window.addEventListener("resize",()=>{if(window.innerWidth>700)closeMenu()});
    }

    /* Add subtle hero telemetry without changing the actual copy. */
    const hero=document.getElementById("home");
    if(hero && !hero.querySelector(".sb-ui-hero-tag")){
      const tag=document.createElement("span");tag.className="sb-ui-hero-tag";tag.textContent="DIGITAL PROFILE // NODE-07";
      Object.assign(tag.style,{position:"absolute",right:"24px",top:"88px",zIndex:"4",font:'600 7px "JetBrains Mono",monospace',letterSpacing:'.14em',color:'#49615f',padding:'7px 9px',border:'1px solid #17302a',background:'rgba(2,7,6,.62)'});hero.appendChild(tag);
    }

    /* Improve touch spacing for dynamically generated cards. */
    document.querySelectorAll("#skillsGrid .skill-card,#projectsGrid .project-card,#certsGrid .cert-card").forEach(card=>card.setAttribute("tabindex","0"));

    /* Close gateway safely if user presses Escape, while preserving the minimum hold. */
    document.addEventListener("keydown",e=>{
      if(e.key!=="Escape")return;
      const gateway=document.getElementById("sb-gateway")||document.getElementById("sb-secure");
      if(!gateway)return;
      const elapsed=Date.now()-started;
      const wait=Math.max(0,HOLD_MS-elapsed);
      window.setTimeout(()=>{if(gateway.isConnected){released=true;gateway.classList.add("is-closing");setTimeout(()=>gateway.remove(),600)}},wait);
    });
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",boot); else boot();
})();
