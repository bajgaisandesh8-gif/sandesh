/* SANDESH // CINEMATIC CYBER GATEWAY v8 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Load the premium interaction layer after the gateway starts.
    if (!document.querySelector('script[data-sandesh-premium]')) {
      const premium = document.createElement("script");
      premium.src = "JS/portfolio-enhance.js";
      premium.dataset.sandeshPremium = "1";
      premium.defer = true;
      document.body.appendChild(premium);
    }

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const KEY = "sandeshCyberGateway_v8";
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
    if (seen && !window.location.search.includes("?intro")) return;

    const style = document.createElement("style");
    style.id = "sandesh-cyber-gateway-styles";
    style.textContent = `
      #sb-gateway{position:fixed;inset:0;z-index:1000000;overflow:hidden;background:#010304;color:#e8fff5;font-family:"JetBrains Mono",monospace;cursor:crosshair;isolation:isolate}
      #sb-gateway *{box-sizing:border-box}
      #sb-gateway .bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgba(100,243,176,.075),transparent 25%),radial-gradient(circle at 50% 110%,rgba(84,168,255,.045),transparent 38%),#010304}
      #sb-gateway .stars{position:absolute;inset:0;opacity:.3;background-image:radial-gradient(circle,#64f3b0 0 1px,transparent 1.5px);background-size:73px 71px;animation:sbStars 18s linear infinite}@keyframes sbStars{to{background-position:73px 71px}}
      #sb-gateway .grid{position:absolute;left:-25%;right:-25%;bottom:-30%;height:76%;background-image:linear-gradient(rgba(100,243,176,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(100,243,176,.055) 1px,transparent 1px);background-size:58px 58px;transform:perspective(600px) rotateX(61deg);transform-origin:center bottom;mask-image:linear-gradient(to top,#000,transparent 92%);animation:sbGrid 6s linear infinite}@keyframes sbGrid{to{background-position:0 58px,58px 0}}
      #sb-gateway .scan{position:absolute;left:0;right:0;top:-3px;height:2px;background:linear-gradient(90deg,transparent,#64f3b0,transparent);box-shadow:0 0 30px #64f3b055;animation:sbScan 3.2s linear infinite;z-index:10}@keyframes sbScan{to{top:100%}}
      #sb-gateway .crt{position:absolute;inset:0;z-index:20;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(185,255,241,.035) 4px),radial-gradient(circle,transparent 48%,rgba(0,0,0,.7) 100%)}
      #sb-gateway .noise{position:absolute;inset:-50%;z-index:21;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:sbNoise .15s steps(2) infinite}@keyframes sbNoise{25%{transform:translate(1%,-1%)}50%{transform:translate(-1%,1%)}75%{transform:translate(1%,1%)}}
      #sb-gateway .hud{position:absolute;inset:0;padding:clamp(18px,3vw,42px);z-index:12;pointer-events:none}.sb-top,.sb-bottom{display:flex;justify-content:space-between;gap:20px;color:#405858;font-size:8px;letter-spacing:.16em}.sb-top b{color:#64f3b0}.sb-live{display:inline-block;width:5px;height:5px;margin-right:7px;border-radius:50%;background:#64f3b0;box-shadow:0 0 14px #64f3b0;animation:sbBlink .8s infinite}@keyframes sbBlink{50%{opacity:.2}}
      #sb-gateway .corner{position:absolute;width:52px;height:52px;border-color:rgba(100,243,176,.4);border-style:solid;z-index:12}.sb-tl{left:28px;top:72px;border-width:1px 0 0 1px}.sb-tr{right:28px;top:72px;border-width:1px 1px 0 0}.sb-bl{left:28px;bottom:64px;border-width:0 0 1px 1px}.sb-br{right:28px;bottom:64px;border-width:0 1px 1px 0}
      #sb-gateway .target{position:absolute;left:50%;top:50%;width:280px;height:280px;transform:translate(-50%,-50%);border:1px solid rgba(100,243,176,.12);border-radius:50%;z-index:5;animation:sbRotate 22s linear infinite}.target:before,.target:after{content:"";position:absolute;background:rgba(100,243,176,.2)}.target:before{width:1px;height:340px;left:50%;top:-30px}.target:after{height:1px;width:340px;top:50%;left:-30px}@keyframes sbRotate{to{transform:translate(-50%,-50%) rotate(360deg)}}
      #sb-gateway .target i{position:absolute;inset:25%;border:1px dashed rgba(84,168,255,.18);border-radius:50%;animation:sbRotateReverse 10s linear infinite}@keyframes sbRotateReverse{to{transform:rotate(-360deg)}}
      #sb-gateway .core{position:absolute;inset:0;z-index:8;display:grid;place-items:center;text-align:center;padding:20px}.core-inner{width:min(1100px,94vw)}
      .protocol{color:#64f3b0;font-size:9px;letter-spacing:.45em;margin-bottom:25px}.gateway-name{position:relative;margin:0;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:clamp(76px,17vw,230px);line-height:.78;letter-spacing:-.105em;color:#effff8;text-shadow:0 0 70px rgba(100,243,176,.13)}
      .gateway-name:before,.gateway-name:after{content:"SANDESH";position:absolute;inset:0;opacity:0;pointer-events:none}.gateway-name:before{color:#ff315b;transform:translate(-6px,0);animation:sbGlitch 3.8s infinite}.gateway-name:after{color:#1ddcff;transform:translate(6px,0);animation:sbGlitch 3.8s .06s infinite}@keyframes sbGlitch{0%,84%,100%{opacity:0;clip-path:inset(50% 0 50%)}87%{opacity:.8;clip-path:inset(5% 0 80%)}90%{opacity:.55;clip-path:inset(65% 0 15%)}93%{opacity:.65;clip-path:inset(35% 0 42%)}}
      .gateway-sub{margin-top:25px;color:#607a77;font-size:9px;letter-spacing:.23em}.gateway-phase{display:inline-block;margin-top:18px;padding:8px 14px;border:1px solid #18362e;background:rgba(2,8,7,.75);color:#64f3b0;font-size:8px;letter-spacing:.16em;min-width:250px}
      .side{position:absolute;z-index:13;top:50%;transform:translateY(-50%);width:255px;padding:14px;border:1px solid #153029;background:rgba(2,7,6,.72);backdrop-filter:blur(7px);box-shadow:0 20px 70px rgba(0,0,0,.45)}.side-left{left:clamp(18px,4vw,65px)}.side-right{right:clamp(18px,4vw,65px)}.side-title{display:flex;justify-content:space-between;color:#4c6663;font-size:8px;letter-spacing:.12em;margin-bottom:10px}.side-title b{color:#64f3b0;font-weight:500}.terminal-log{height:142px;overflow:hidden;color:#526e6b;font-size:8px}.terminal-log div{padding:3px 0;white-space:nowrap}.terminal-log .ok{color:#64f3b0}.terminal-log .blue{color:#5cd7ff}.meter{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;margin-top:10px;color:#425a58;font-size:7px}.meter i{height:2px;background:#132620;overflow:hidden}.meter i b{display:block;width:0;height:100%;background:#64f3b0;box-shadow:0 0 10px #64f3b0;transition:width .3s}.telemetry{display:grid;gap:8px}.telemetry-row{display:flex;justify-content:space-between;color:#49615f;font-size:8px;border-bottom:1px solid rgba(255,255,255,.05);padding-bottom:7px}.telemetry-row:last-child{border:0}.telemetry-row b{color:#64f3b0;font-weight:500}
      .boot-ui{position:absolute;left:clamp(18px,4vw,65px);right:clamp(18px,4vw,65px);bottom:27px;z-index:14}.boot-bar{height:2px;background:#10231e}.boot-bar b{display:block;width:0;height:100%;background:#64f3b0;box-shadow:0 0 18px #64f3b0;transition:width .28s}.boot-meta{display:flex;justify-content:space-between;margin-top:8px;color:#425956;font-size:7px;letter-spacing:.12em}.boot-meta b{color:#64f3b0}
      .gateway-skip{position:absolute;right:clamp(18px,3vw,42px);top:clamp(18px,3vw,42px);z-index:30;padding:7px 10px;border:1px solid #1b302d;background:rgba(2,6,5,.75);color:#49615f;font:700 7px "JetBrains Mono",monospace;letter-spacing:.1em;cursor:pointer}.gateway-skip:hover{color:#64f3b0;border-color:#64f3b0}
      #sb-gateway.exit{animation:sbExit .9s cubic-bezier(.7,0,.15,1) forwards}@keyframes sbExit{0%{opacity:1;transform:scale(1);filter:none}25%{filter:contrast(1.8) brightness(1.35);transform:scale(1.01)}50%{transform:scale(1.02) skewX(-1deg);filter:contrast(2.1) brightness(1.6)}72%{transform:scale(1.045) skewX(1.5deg);opacity:.9}100%{opacity:0;transform:scale(1.12);filter:blur(13px)}}
      @media(max-width:1050px){.side{width:215px}.target{opacity:.6}}
      @media(max-width:800px){.side{display:none}.gateway-name{font-size:clamp(65px,22vw,135px)}.protocol{font-size:7px;letter-spacing:.27em}.gateway-sub{font-size:7px}.target{width:190px;height:190px}.target:before{height:240px;top:-25px}.target:after{width:240px;left:-25px}.corner{width:34px;height:34px}.sb-tl{left:18px;top:65px}.sb-tr{right:18px;top:65px}.sb-bl{left:18px;bottom:56px}.sb-br{right:18px;bottom:56px}.boot-ui{bottom:23px}}
      @media(max-width:480px){.sb-top span:last-child,.sb-bottom span:first-child{display:none}.gateway-name{font-size:clamp(58px,24vw,110px)}.gateway-sub{line-height:1.7}.target{width:145px;height:145px}}
      @media(prefers-reduced-motion:reduce){#sb-gateway *,#sb-gateway:before{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);

    const gateway = document.createElement("div");
    gateway.id = "sb-gateway";
    gateway.innerHTML = `
      <div class="bg"></div><div class="stars"></div><div class="grid"></div><div class="scan"></div><div class="crt"></div><div class="noise"></div>
      <div class="hud"><div class="sb-top"><span><i class="sb-live"></i><b>LIVE</b> // SANDESH DIGITAL ENVIRONMENT</span><span>NODE-07 // SECURE CHANNEL</span></div><div class="sb-bottom"><span>CYBERSECURITY / NETWORKING / SOFTWARE / AI</span><span id="sbClock">00:00:00</span></div></div>
      <i class="corner sb-tl"></i><i class="corner sb-tr"></i><i class="corner sb-bl"></i><i class="corner sb-br"></i>
      <div class="target"><i></i></div>
      <button class="gateway-skip" id="sbGatewaySkip" type="button">SKIP [ESC]</button>
      <div class="core"><div class="core-inner"><div class="protocol" id="sbProtocol">PROTOCOL // SYSTEM WAKE</div><h1 class="gateway-name">SANDESH</h1><div class="gateway-sub" id="sbMessage">INITIALIZING DIGITAL ENVIRONMENT</div><div class="gateway-phase" id="sbPhase">SYSTEM INITIALIZING</div></div></div>
      <section class="side side-left"><div class="side-title"><span>LIVE TERMINAL</span><b>STREAM</b></div><div class="terminal-log" id="sbLog"></div><div class="meter"><span>LOAD</span><i><b id="sbMeter"></b></i><span id="sbMeterValue">00%</span></div></section>
      <section class="side side-right"><div class="side-title"><span>TELEMETRY</span><b>ACTIVE</b></div><div class="telemetry"><div class="telemetry-row"><span>NETWORK</span><b id="sbNetwork">SCANNING</b></div><div class="telemetry-row"><span>CORE</span><b id="sbCore">BOOTING</b></div><div class="telemetry-row"><span>SECURITY</span><b id="sbSecurity">CHECKING</b></div><div class="telemetry-row"><span>IDENTITY</span><b id="sbIdentity">PENDING</b></div><div class="telemetry-row"><span>ACCESS</span><b id="sbAccess">LOCKED</b></div></div></section>
      <div class="boot-ui"><div class="boot-bar"><b id="sbBar"></b></div><div class="boot-meta"><span>PORTFOLIO BOOT SEQUENCE // VISUAL INTERFACE</span><b id="sbPercent">00%</b></div></div>`;
    document.body.prepend(gateway);
    document.body.style.overflow = "hidden";

    const $ = (id) => gateway.querySelector(id);
    const log = $("#sbLog"), bar = $("#sbBar"), meter = $("#sbMeter"), percent = $("#sbPercent"), meterValue = $("#sbMeterValue");
    const phase = $("#sbPhase"), message = $("#sbMessage"), protocol = $("#sbProtocol");
    const network = $("#sbNetwork"), core = $("#sbCore"), security = $("#sbSecurity"), identity = $("#sbIdentity"), access = $("#sbAccess");
    const lines = [
      ["[ OK ]","kernel interface initialized","CORE ONLINE"],
      ["[ OK ]","loading encrypted visual modules","MODULES READY"],
      ["[NET]","scanning portfolio network nodes","NETWORK LINK"],
      ["[ OK ]","secure channel established","CHANNEL OPEN"],
      ["[SEC]","running interface integrity check","INTEGRITY 100%"],
      ["[ID ]","matching personal environment","IDENTITY FOUND"],
      ["[ OK ]","loading projects / skills / credentials","CONTENT READY"],
      ["[SYS]","all systems nominal","ACCESS GRANTED"]
    ];
    let progress = 0, closed = false;

    function addLog(i){const row=document.createElement("div");row.innerHTML=`<span class="${i%3===2?'blue':'ok'}">${lines[i][0]}</span> ${lines[i][1]} <span style="color:#334a49">// ${lines[i][2]}</span>`;log.appendChild(row);while(log.children.length>8)log.removeChild(log.firstChild)}
    function setState(p){progress=p;bar.style.width=p+"%";meter.style.width=p+"%";percent.textContent=String(p).padStart(2,"0")+"%";meterValue.textContent=String(p).padStart(2,"0")+"%"}
    function tickClock(){const d=new Date();$("#sbClock").textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,"0")).join(":")}
    tickClock();const clockTimer=setInterval(tickClock,1000);

    function finish(){if(closed)return;closed=true;clearInterval(clockTimer);try{sessionStorage.setItem(KEY,"1")}catch(e){}gateway.classList.add("exit");document.body.style.overflow="";setTimeout(()=>{gateway.remove();style.remove()},reduced?0:900)}
    function run(){
      if(reduced){setState(100);phase.textContent="ACCESS GRANTED";message.textContent="ENTERING DIGITAL ENVIRONMENT";network.textContent="ONLINE";core.textContent="READY";security.textContent="SECURE";identity.textContent="VERIFIED";access.textContent="GRANTED";addLog(7);setTimeout(finish,250);return}
      let i=0;const timer=setInterval(()=>{
        if(closed){clearInterval(timer);return}
        const item=lines[i];addLog(i);const p=Math.min(100,Math.round(((i+1)/lines.length)*100));setState(p);
        if(i===1){protocol.textContent="PROTOCOL 02 // MODULE LOAD";phase.textContent="LOADING MODULES";core.textContent="READY"}
        if(i===2){protocol.textContent="PROTOCOL 03 // NETWORK LINK";phase.textContent="NETWORK SCANNING";network.textContent="ONLINE"}
        if(i===4){protocol.textContent="PROTOCOL 04 // SECURITY CHECK";phase.textContent="INTEGRITY VERIFIED";security.textContent="SECURE"}
        if(i===5){protocol.textContent="PROTOCOL 05 // IDENTITY MATCH";phase.textContent="IDENTITY VERIFIED";identity.textContent="VERIFIED"}
        if(i===7){protocol.textContent="PROTOCOL 06 // ACCESS GRANTED";phase.textContent="ACCESS GRANTED";message.textContent="ENTERING SANDESH'S DIGITAL ENVIRONMENT";access.textContent="GRANTED";setTimeout(finish,700)}
        i++;if(i>=lines.length)clearInterval(timer);
      },520);
    }
    $("#sbGatewaySkip").addEventListener("click",finish);
    document.addEventListener("keydown",function onKey(e){if(!document.body.contains(gateway)){document.removeEventListener("keydown",onKey);return}if(e.key==="Escape"){e.preventDefault();finish()}});
    run();
  });
})();