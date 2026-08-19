/* SANDESH // UI UPGRADE v3 — cinematic gateway hold, cursor, responsive polish */
(function(){
  "use strict";

  const HOLD_MS = 9000;
  const started = Date.now();
  let released = false;
  const originalRemove = Element.prototype.remove;

  // Give the cinematic gateway enough time to actually be experienced.
  Element.prototype.remove = function(){
    if(this && this.id === "sb-gateway" && !released){
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
    if(document.documentElement.dataset.sbUiV3 === "1") return;
    document.documentElement.dataset.sbUiV3 = "1";

    const style=document.createElement("style");
    style.textContent=`
      /* Cinematic name halo / orbit */
      .gateway-name{isolation:isolate}
      .gateway-name:global-placeholder{}
      #sb-gateway .core-inner:before,#sb-gateway .core-inner:after{content:"";position:absolute;left:50%;top:50%;width:min(46vw,520px);height:min(46vw,520px);transform:translate(-50%,-50%);border:1px solid rgba(100,243,176,.09);border-radius:50%;pointer-events:none}
      #sb-gateway .core-inner:after{width:min(34vw,390px);height:min(34vw,390px);border-style:dashed;border-color:rgba(84,168,255,.12);animation:sbUiOrbit 14s linear infinite}
      @keyframes sbUiOrbit{to{transform:translate(-50%,-50%) rotate(360deg)}}
      #sb-gateway .gateway-name{animation:sbUiNamePulse 4s ease-in-out infinite}
      @keyframes sbUiNamePulse{50%{text-shadow:0 0 85px rgba(100,243,176,.2),0 0 18px rgba(100,243,176,.08)}}

      /* Better desktop cursor */
      .sb-ui-cursor{position:fixed;left:0;top:0;width:22px;height:22px;border:1px solid rgba(100,243,176,.72);border-radius:50%;pointer-events:none;z-index:999999;transform:translate3d(-50%,-50%,0);opacity:0;transition:width .2s ease,height .2s ease,border-color .2s ease,opacity .2s ease;mix-blend-mode:screen}
      .sb-ui-cursor:before,.sb-ui-cursor:after{content:"";position:absolute;background:#64f3b0;box-shadow:0 0 10px #64f3b0}
      .sb-ui-cursor:before{width:1px;height:34px;left:50%;top:-7px}.sb-ui-cursor:after{height:1px;width:34px;top:50%;left:-7px}
      .sb-ui-dot{position:fixed;left:0;top:0;width:4px;height:4px;background:#eafff5;border-radius:50%;pointer-events:none;z-index:1000000;transform:translate3d(-50%,-50%,0);opacity:0;box-shadow:0 0 14px #64f3b0}
      body.sb-ui-cursor-active .sb-ui-cursor,body.sb-ui-cursor-active .sb-ui-dot{opacity:1}
      body.sb-ui-cursor-hover .sb-ui-cursor{width:42px;height:42px;border-color:#64f3b0}
      body.sb-ui-cursor-click .sb-ui-cursor{width:12px;height:12px}
      @media(pointer:coarse){.sb-ui-cursor,.sb-ui-dot{display:none!important}}

      /* Hero orbital rings around the existing name */
      #home .hero-name:before,#home .hero-name:after{pointer-events:none}
      #home .hero-name:before{content:"";position:absolute;left:-5%;right:5%;top:50%;height:72%;border:1px solid rgba(100,243,176,.09);border-left-color:transparent;border-right-color:transparent;border-radius:50%;transform:translateY(-50%) rotate(-8deg);animation:sbNameOrbit 8s linear infinite}
      @keyframes sbNameOrbit{to{transform:translateY(-50%) rotate(352deg)}}

      /* Mobile: make the cyber HUD usable, not merely smaller */
      @media(max-width:700px){
        body{overflow-x:hidden}
        .nav-inner{min-height:62px}
        .nav-links{padding:18px}
        .nav-link{min-height:44px;display:flex;align-items:center}
        .hero{min-height:100svh}
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
      }

      @media(prefers-reduced-motion:reduce){
        #sb-gateway .core-inner:after,#sb-gateway .gateway-name,#home .hero-name:before{animation:none!important}
      }
    `;
    document.head.appendChild(style);

    // Cursor follows with a tiny smoothing lag for a more engineered feel.
    if(!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches)){
      const ring=document.createElement("div"); ring.className="sb-ui-cursor";
      const dot=document.createElement("div"); dot.className="sb-ui-dot";
      document.body.append(ring,dot);
      let tx=innerWidth/2,ty=innerHeight/2,rx=tx,ry=ty;
      window.addEventListener("pointermove",e=>{
        tx=e.clientX;ty=e.clientY;
        document.body.classList.add("sb-ui-cursor-active");
      },{passive:true});
      window.addEventListener("pointerdown",()=>document.body.classList.add("sb-ui-cursor-click"));
      window.addEventListener("pointerup",()=>document.body.classList.remove("sb-ui-cursor-click"));
      document.addEventListener("mouseover",e=>{
        if(e.target.closest("a,button,input,textarea,select,[role=button]")) document.body.classList.add("sb-ui-cursor-hover");
      });
      document.addEventListener("mouseout",e=>{
        if(e.target.closest("a,button,input,textarea,select,[role=button]")) document.body.classList.remove("sb-ui-cursor-hover");
      });
      function tick(){
        rx+=(tx-rx)*.22; ry+=(ty-ry)*.22;
        ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
        dot.style.transform=`translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;
        requestAnimationFrame(tick);
      }
      tick();
    }

    // Add a small live label to the hero without changing its content.
    const hero=document.getElementById("home");
    if(hero && !hero.querySelector(".sb-ui-hero-tag")){
      const tag=document.createElement("span");
      tag.className="sb-ui-hero-tag";
      tag.textContent="DIGITAL PROFILE // NODE-07";
      Object.assign(tag.style,{position:"absolute",right:"24px",top:"88px",zIndex:"4",font:'600 7px "JetBrains Mono",monospace',letterSpacing:'.14em',color:'#49615f',padding:'7px 9px',border:'1px solid #17302a',background:'rgba(2,7,6,.62)'});
      hero.appendChild(tag);
    }
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",boot); else boot();
})();
