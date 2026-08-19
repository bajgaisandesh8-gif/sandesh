/* SANDESH // FULL-SCREEN CINEMATIC CYBER ENTRY v7 */
(function () {
  "use strict";

  const STORAGE_KEY = "sandeshEntrySequence_v7";
  try { if (sessionStorage.getItem(STORAGE_KEY) === "1") return; } catch (_) {}

  const style = document.createElement("style");
  style.textContent = `
    #sandesh-entry{position:fixed;inset:0;z-index:999999;overflow:hidden;background:#010304;color:#e8fff5;font:500 11px/1.5 "JetBrains Mono",monospace;isolation:isolate;cursor:crosshair}
    #sandesh-entry *{box-sizing:border-box}
    #sandesh-entry .void{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,#0b2d2518,transparent 32%),radial-gradient(circle at 50% 120%,#64f3b00b,transparent 45%),#010304}
    #sandesh-entry .stars{position:absolute;inset:0;background-image:radial-gradient(circle,#64f3b044 0 1px,transparent 1.5px);background-size:83px 79px;opacity:.24;animation:starDrift 20s linear infinite}
    @keyframes starDrift{to{background-position:83px 79px}}
    #sandesh-entry .grid{position:absolute;left:-30%;right:-30%;bottom:-26%;height:78%;background-image:linear-gradient(#64f3b012 1px,transparent 1px),linear-gradient(90deg,#64f3b012 1px,transparent 1px);background-size:58px 58px;transform:perspective(620px) rotateX(62deg);transform-origin:center bottom;mask-image:linear-gradient(to top,black,transparent 88%);animation:gridRun 7s linear infinite}
    @keyframes gridRun{to{background-position:0 58px,58px 0}}
    #sandesh-entry .scanline{position:absolute;left:0;right:0;height:2px;top:-3px;background:linear-gradient(90deg,transparent,#64f3b055,transparent);box-shadow:0 0 25px #64f3b033;animation:scan 3.8s linear infinite;z-index:8;pointer-events:none}
    @keyframes scan{to{top:100%}}
    #sandesh-entry .crt{position:absolute;inset:0;pointer-events:none;z-index:20;background:repeating-linear-gradient(0deg,transparent 0 3px,#b9fff10a 4px),radial-gradient(circle,transparent 52%,#000b 100%);mix-blend-mode:screen}
    #sandesh-entry .noise{position:absolute;inset:-50%;z-index:21;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");animation:noise .16s steps(2) infinite}
    @keyframes noise{25%{transform:translate(1%,-1%)}50%{transform:translate(-1%,1%)}75%{transform:translate(1%,1%)}}
    #sandesh-entry .hud{position:absolute;inset:0;padding:clamp(18px,3vw,42px);z-index:12;pointer-events:none}
    #sandesh-entry .topline,#sandesh-entry .bottomline{display:flex;justify-content:space-between;gap:20px;color:#405858;font-size:8px;letter-spacing:.16em;text-transform:uppercase}
    #sandesh-entry .topline strong{color:#64f3b0;font-weight:600}.live-dot{display:inline-block;width:5px;height:5px;margin-right:7px;border-radius:50%;background:#64f3b0;box-shadow:0 0 13px #64f3b0;animation:blink .8s infinite}
    @keyframes blink{50%{opacity:.2}}
    #sandesh-entry .corner{position:absolute;width:48px;height:48px;border-color:#64f3b066;border-style:solid}.tl{left:28px;top:72px;border-width:1px 0 0 1px}.tr{right:28px;top:72px;border-width:1px 1px 0 0}.bl{left:28px;bottom:62px;border-width:0 0 1px 1px}.br{right:28px;bottom:62px;border-width:0 1px 1px 0}
    #sandesh-entry .crosshair{position:absolute;left:50%;top:50%;width:160px;height:160px;transform:translate(-50%,-50%);border:1px solid #64f3b014;border-radius:50%;box-shadow:0 0 80px #64f3b008;animation:spin 18s linear infinite}.crosshair::before,.crosshair::after{content:"";position:absolute;background:#64f3b025}.crosshair::before{left:50%;top:-30px;width:1px;height:220px}.crosshair::after{top:50%;left:-30px;height:1px;width:220px}
    @keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
    #sandesh-entry .core{position:absolute;inset:0;z-index:10;display:grid;place-items:center;text-align:center;padding:20px}
    #sandesh-entry .core-inner{width:min(1000px,92vw);position:relative}
    #sandesh-entry .protocol{color:#64f3b0;font-size:9px;letter-spacing:.42em;text-transform:uppercase;margin-bottom:24px;text-shadow:0 0 20px #64f3b044}
    #sandesh-entry .name{position:relative;margin:0;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:clamp(68px,17vw,220px);line-height:.75;letter-spacing:-.1em;color:#eafff5;text-shadow:0 0 55px #64f3b01a}
    #sandesh-entry .name::before,#sandesh-entry .name::after{content:"SANDESH";position:absolute;inset:0;pointer-events:none;opacity:0}.name::before{color:#ff315b;transform:translate(-5px,0);animation:rgbGlitch 4s infinite}.name::after{color:#18d9ff;transform:translate(5px,0);animation:rgbGlitch 4s .08s infinite}
    @keyframes rgbGlitch{0%,88%,100%{opacity:0;clip-path:inset(50% 0 50%)}90%{opacity:.7;clip-path:inset(8% 0 78%)}92%{opacity:.45;clip-path:inset(67% 0 14%)}94%{opacity:.55;clip-path:inset(38% 0 39%)}}
    #sandesh-entry .sub{margin:25px auto 0;color:#5f7775;font-size:9px;letter-spacing:.2em;text-transform:uppercase}
    #sandesh-entry .phase{display:inline-block;margin-top:20px;min-width:230px;padding:7px 12px;border:1px solid #17352d;background:#020807aa;color:#64f3b0;font-size:8px;letter-spacing:.13em}
    #sandesh-entry .side{position:absolute;z-index:13;top:50%;transform:translateY(-50%);width:260px;padding:13px;border:1px solid #153029;background:#0207069c;backdrop-filter:blur(5px);box-shadow:0 18px 50px #0008}.side.left{left:clamp(18px,4vw,65px)}.side.right{right:clamp(18px,4vw,65px)}
    #sandesh-entry .side-title{display:flex;justify-content:space-between;color:#4c6663;font-size:8px;letter-spacing:.12em;margin-bottom:10px}.side-title b{color:#64f3b0;font-weight:500}
    #sandesh-entry .log{height:125px;overflow:hidden;color:#52706c;font-size:8px}.log div{padding:3px 0;white-space:nowrap}.log .ok{color:#64f3b0}.log .blue{color:#5cd7ff}.log .dim{color:#3f5655}
    #sandesh-entry .meter{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin-top:9px;color:#425a58;font-size:7px}.meter i{height:2px;background:#132620;overflow:hidden}.meter i b{display:block;width:0;height:100%;background:#64f3b0;box-shadow:0 0 10px #64f3b0;transition:width .7s ease}
    #sandesh-entry .telemetry{display:grid;gap:7px}.telemetry-row{display:flex;justify-content:space-between;color:#49615f;font-size:8px;border-bottom:1px solid #ffffff08;padding-bottom:6px}.telemetry-row:last-child{border:0}.telemetry-row b{color:#64f3b0;font-weight:500}
    #sandesh-entry .bottom-ui{position:absolute;left:clamp(18px,4vw,65px);right:clamp(18px,4vw,65px);bottom:27px;z-index:14}.progress{height:2px;background:#10231e}.progress b{display:block;width:0;height:100%;background:#64f3b0;box-shadow:0 0 18px #64f3b0;transition:width .75s cubic-bezier(.2,.8,.2,1)}.progress-meta{display:flex;justify-content:space-between;margin-top:8px;color:#425956;font-size:7px;letter-spacing:.12em}.progress-meta b{color:#64f3b0;font-weight:500}
    #sandesh-entry .enter{position:absolute;left:50%;bottom:77px;z-index:16;transform:translateX(-50%);padding:10px 16px;border:1px solid #64f3b0;background:#64f3b0;color:#031008;font:700 8px "JetBrains Mono",monospace;letter-spacing:.14em;cursor:pointer;opacity:0;pointer-events:none;transition:.25s;box-shadow:0 0 28px #64f3b033}.enter.show{opacity:1;pointer-events:auto}.enter:hover{box-shadow:0 0 45px #64f3b066;transform:translateX(-50%) translateY(-2px)}
    #sandesh-entry .skip{position:absolute;right:clamp(18px,3vw,42px);top:clamp(18px,3vw,42px);z-index:30;padding:7px 10px;border:1px solid #1b302d;background:#020605bb;color:#49615f;font:700 7px "JetBrains Mono",monospace;letter-spacing:.1em;cursor:pointer}.skip:hover{color:#64f3b0;border-color:#64f3b0}
    #sandesh-entry.out{animation:exit .95s cubic-bezier(.7,0,.15,1) forwards}@keyframes exit{0%{opacity:1;transform:scale(1);filter:none}22%{filter:contrast(1.8) brightness(1.5);transform:scale(1.01)}40%{transform:scale(1.015) skewX(-1deg)}52%{opacity:.9;filter:contrast(2.2) brightness(1.8) saturate(1.5)}70%{transform:scale(1.04) skewX(1.5deg)}100%{opacity:0;transform:scale(1.11);filter:blur(14px) contrast(1.3)}}
    @media(max-width:1050px){#sandesh-entry .side{width:220px}.crosshair{opacity:.5}}
    @media(max-width:800px){#sandesh-entry .side{display:none}.corner{width:32px!important;height:32px!important}.tl{left:18px;top:65px}.tr{right:18px;top:65px}.bl{left:18px;bottom:56px}.br{right:18px;bottom:56px}.name{font-size:clamp(62px,22vw,130px)!important}.protocol{font-size:7px!important;letter-spacing:.25em!important}.sub{font-size:7px!important}.bottom-ui{bottom:23px!important}.enter{bottom:65px!important}}
    @media(max-width:480px){#sandesh-entry .topline span:last-child,#sandesh-entry .bottomline span:first-child{display:none}.crosshair{width:110px;height:110px}.crosshair::before{height:165px;top:-28px}.crosshair::after{width:165px;left:-28px}}
    @media(prefers-reduced-motion:reduce){#sandesh-entry *,#sandesh-entry::before{animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "sandesh-entry";
  root.innerHTML = `
    <div class="void"></div><div class="stars"></div><div class="grid"></div><div class="scanline"></div><div class="crt"></div><div class="noise"></div>
    <div class="hud"><div class="topline"><span><i class="live-dot"></i><strong>LIVE</strong> // SANDESH DIGITAL ENVIRONMENT</span><span>NODE-07 // NEPAL // SECURE CHANNEL</span></div><div class="bottomline"><span>CYBERSECURITY / NETWORKING / SOFTWARE</span><span id="clock">00:00:00</span></div></div>
    <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i><div class="crosshair"></div>
    <button class="skip" id="skip">SKIP INTRO [ESC]</button>
    <div class="core"><div class="core-inner"><div class="protocol" id="protocol">PROTOCOL 01 // SYSTEM WAKE</div><h1 class="name">SANDESH</h1><div class="sub" id="message">Initializing personal digital environment</div><div class="phase" id="phase">SYSTEM INITIALIZING</div></div></div>
    <section class="side left"><div class="side-title"><span>LIVE TERMINAL</span><b>● STREAM</b></div><div class="log" id="log"></div><div class="meter"><span>PROCESS</span><i><b id="meter"></b></i><span id="meterValue">00%</span></div></section>
    <section class="side right"><div class="side-title"><span>TELEMETRY</span><b>ACTIVE</b></div><div class="telemetry"><div class="telemetry-row"><span>NETWORK</span><b id="network">SCANNING</b></div><div class="telemetry-row"><span>CORE</span><b id="core">BOOTING</b></div><div class="telemetry-row"><span>SECURITY</span><b id="security">CHECKING</b></div><div class="telemetry-row"><span>IDENTITY</span><b id="identity">PENDING</b></div><div class="telemetry-row"><span>ACCESS</span><b id="access">LOCKED</b></div></div></section>
    <div class="bottom-ui"><div class="progress"><b id="bar"></b></div><div class="progress-meta"><span>PORTFOLIO BOOT SEQUENCE // VISUAL INTERFACE</span><b id="percent">00%</b></div></div>
    <button class="enter" id="enter">ENTER DIGITAL ENVIRONMENT →</button>
  `;
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  const $ = (s) => root.querySelector(s);
  const protocol = $("#protocol"), message = $("#message"), phase = $("#phase"), log = $("#log");
  const bar = $("#bar"), meter = $("#meter"), percent = $("#percent"), meterValue = $("#meterValue");
  const network = $("#network"), core = $("#core"), security = $("#security"), identity = $("#identity"), access = $("#access"), enter = $("#enter");
  let stage = 0, done = false, autoTimer = null;
  const stages = [
    {p:"PROTOCOL 01 // SYSTEM WAKE",m:"Initializing personal digital environment",phase:"SYSTEM INITIALIZING",logs:["> boot kernel................ ONLINE","> interface matrix........... READY","> visual renderer............ READY"],net:"SCANNING",cor:"BOOTING",sec:"CHECKING",id:"PENDING",acc:"LOCKED"},
    {p:"PROTOCOL 02 // NETWORK MAP",m:"Mapping the interactive network layer",phase:"NETWORK SYNCHRONIZING",logs:["> node discovery............. 24 FOUND","> route analysis............. STABLE","> signal channel............. CONNECTED"],net:"ONLINE",cor:"BOOTING",sec:"CHECKING",id:"PENDING",acc:"LOCKED"},
    {p:"PROTOCOL 03 // IDENTITY",m:"Loading portfolio identity and interface modules",phase:"IDENTITY VERIFIED",logs:["> owner...................... SANDESH BAJGAI","> signature.................. VERIFIED","> security layer............. PASSED"],net:"ONLINE",cor:"ONLINE",sec:"PASSED",id:"VERIFIED",acc:"LOCKED"},
    {p:"PROTOCOL 04 // ACCESS",m:"All systems operational. Entering portfolio.",phase:"ACCESS GRANTED",logs:["> portfolio core............. ONLINE","> interactive layer.......... READY","> access protocol............ GRANTED"],net:"ONLINE",cor:"ONLINE",sec:"PASSED",id:"VERIFIED",acc:"GRANTED"}
  ];

  function draw(i){
    const s=stages[i]; protocol.textContent=s.p; message.textContent=s.m; phase.textContent=s.phase;
    log.innerHTML=s.logs.map(x=>`<div class="${/(ONLINE|READY|FOUND|CONNECTED|VERIFIED|PASSED|GRANTED)/.test(x)?"ok":"blue"}">${x}</div>`).join("");
    const value=(i+1)*25; bar.style.width=value+"%"; meter.style.width=value+"%"; percent.textContent=String(value).padStart(2,"0")+"%"; meterValue.textContent=String(value).padStart(2,"0")+"%";
    network.textContent=s.net; core.textContent=s.cor; security.textContent=s.sec; identity.textContent=s.id; access.textContent=s.acc;
    if(i===3) enter.classList.add("show");
  }

  function loadEnhancement(){
    if(document.querySelector('script[data-sandesh-enhance="1"]')) return;
    const script=document.createElement("script"); script.src="JS/portfolio-enhance.js"; script.dataset.sandeshEnhance="1"; script.defer=true; document.body.appendChild(script);
  }

  function finish(){
    if(done)return; done=true;
    try{sessionStorage.setItem(STORAGE_KEY,"1");}catch(_){ }
    loadEnhancement(); root.classList.add("out");
    setTimeout(()=>{root.remove();style.remove();document.body.style.overflow=""},950);
  }

  function next(){if(stage<3){stage++;draw(stage)}else finish()}
  draw(0);
  const started=Date.now();
  const clock=$("#clock");
  const clockTimer=setInterval(()=>{const s=Math.floor((Date.now()-started)/1000);clock.textContent=new Date(s*1000).toISOString().slice(11,19)},1000);
  autoTimer=setInterval(()=>{if(stage<3)next();else clearInterval(autoTimer)},1150);
  enter.onclick=finish; $("#skip").onclick=finish;
  root.addEventListener("click",e=>{if(e.target.closest("button"))return;next()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")finish();if(e.key==="Enter"&&stage===3)finish()});
  root.addEventListener("animationend",e=>{if(e.animationName==="exit"){clearInterval(clockTimer);clearInterval(autoTimer)}});
})();
