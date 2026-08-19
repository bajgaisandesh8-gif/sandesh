/* SANDESH // CINEMATIC HACKER TERMINAL INTRO */
(function () {
  "use strict";

  const STORAGE_KEY = "sandeshHackerIntro_v1";
  try { if (sessionStorage.getItem(STORAGE_KEY) === "1") return; } catch (_) {}

  const style = document.createElement("style");
  style.textContent = `
    #sandesh-entry{position:fixed;inset:0;z-index:99999;overflow:hidden;background:#020303;color:#c9ffe9;font:500 12px/1.55 "JetBrains Mono",monospace;isolation:isolate;cursor:crosshair}
    #sandesh-entry *{box-sizing:border-box}
    #sandesh-entry .rain,#sandesh-entry .noise,#sandesh-entry .scan,#sandesh-entry .vignette{position:absolute;inset:0;pointer-events:none}
    #sandesh-entry .rain{opacity:.28;background-image:linear-gradient(90deg,transparent 49%,#63f3b00a 50%,transparent 51%),linear-gradient(#63f3b00b 1px,transparent 1px);background-size:47px 47px,100% 5px;animation:rainShift 8s linear infinite}
    @keyframes rainShift{to{background-position:120px 280px,0 0}}
    #sandesh-entry .noise{opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");animation:noise .16s steps(2) infinite}
    @keyframes noise{50%{transform:translate(1px,-1px)}}
    #sandesh-entry .scan{opacity:.12;background:repeating-linear-gradient(0deg,transparent 0,transparent 3px,#8fffd01a 4px);animation:scan 7s linear infinite}
    @keyframes scan{to{transform:translateY(8px)}}
    #sandesh-entry .vignette{background:radial-gradient(circle at center,transparent 25%,#000b 100%);z-index:3}
    #sandesh-entry .shell{position:absolute;inset:0;padding:clamp(16px,3vw,42px);display:grid;grid-template-rows:auto 1fr auto;gap:18px}
    #sandesh-entry .topbar,#sandesh-entry .footer{display:flex;justify-content:space-between;align-items:center;gap:20px;text-transform:uppercase;letter-spacing:.12em;color:#526966;font-size:9px;position:relative;z-index:5}
    #sandesh-entry .brand{color:#65f5b0;font-weight:700;text-shadow:0 0 18px #65f5b044}
    #sandesh-entry .live{display:inline-flex;align-items:center;gap:7px}
    #sandesh-entry .live i{width:6px;height:6px;border-radius:50%;background:#65f5b0;box-shadow:0 0 14px #65f5b0;animation:blink .7s infinite}
    @keyframes blink{50%{opacity:.2}}
    #sandesh-entry .terminal-wrap{width:min(1180px,100%);height:min(720px,calc(100vh - 150px));margin:auto;display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:1px;border:1px solid #244b3b;background:#07100d;box-shadow:0 0 70px #45f3ad0b,0 30px 120px #000;position:relative;z-index:4;overflow:hidden}
    #sandesh-entry .terminal-wrap:before{content:"";position:absolute;inset:0;pointer-events:none;border:1px solid #65f5b00a;box-shadow:inset 0 0 80px #65f5b006}
    #sandesh-entry .mainterm{min-width:0;padding:clamp(18px,3vw,38px);display:flex;flex-direction:column;justify-content:center;background:linear-gradient(120deg,#06100d,#020504)}
    #sandesh-entry .side{border-left:1px solid #19362c;background:#030807;padding:20px;display:flex;flex-direction:column;gap:14px}
    #sandesh-entry .window{display:flex;align-items:center;gap:7px;border-bottom:1px solid #17352b;padding-bottom:13px;color:#506863;font-size:9px}
    #sandesh-entry .window b{color:#65f5b0}
    #sandesh-entry .window i{width:6px;height:6px;border-radius:50%;background:#243d36}
    #sandesh-entry .prompt{color:#65f5b0;font-size:10px;letter-spacing:.1em;margin-bottom:15px}
    #sandesh-entry .hero{font-size:clamp(38px,7vw,92px);line-height:.86;letter-spacing:-.075em;font-weight:700;margin:0;color:#d9fff0;text-transform:uppercase;text-shadow:0 0 35px #65f5b018}
    #sandesh-entry .hero span{color:#65f5b0;text-shadow:0 0 35px #65f5b055}
    #sandesh-entry .glitch{position:relative;animation:flicker 3.5s infinite}
    @keyframes flicker{0%,93%,100%{transform:none}94%{transform:skewX(-3deg);text-shadow:4px 0 #ff416c,-4px 0 #65f5b0}96%{transform:skewX(2deg);text-shadow:-5px 0 #ff416c,5px 0 #65f5b0}}
    #sandesh-entry .sub{margin:18px 0 22px;color:#6d8580;max-width:680px}
    #sandesh-entry .logs{height:145px;overflow:hidden;border-top:1px solid #15352a;border-bottom:1px solid #15352a;padding:12px 0;position:relative}
    #sandesh-entry .logs:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 70%,#020504);pointer-events:none}
    #sandesh-entry .line{display:block;color:#5c746e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:logIn .18s ease-out both}
    @keyframes logIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:none}}
    #sandesh-entry .line b{color:#65f5b0;font-weight:500}.line .warn{color:#d9c66b}.line .dim{color:#405650}
    #sandesh-entry .progress{display:flex;align-items:center;gap:12px;margin-top:18px}
    #sandesh-entry .bar{height:3px;flex:1;background:#10231d;overflow:hidden}.bar i{display:block;height:100%;width:0;background:#65f5b0;box-shadow:0 0 18px #65f5b0;transition:width .4s ease}
    #sandesh-entry .pct{min-width:38px;color:#65f5b0;text-align:right;font-size:10px}
    #sandesh-entry .enter{margin-top:20px;width:max-content;min-height:43px;padding:0 18px;border:1px solid #65f5b0;background:#65f5b0;color:#031008;font:700 10px "JetBrains Mono",monospace;letter-spacing:.08em;cursor:pointer;box-shadow:0 0 30px #65f5b018;transition:.2s}
    #sandesh-entry .enter:hover{box-shadow:0 0 35px #65f5b044;transform:translateY(-2px)}
    #sandesh-entry .side-title{font-size:8px;letter-spacing:.14em;color:#536a64;border-bottom:1px solid #17352b;padding-bottom:10px}
    #sandesh-entry .meter{padding:10px 0;border-bottom:1px solid #10271f}.meter-head{display:flex;justify-content:space-between;color:#536b64;font-size:8px}.meter-head b{color:#65f5b0;font-weight:500}.meter-bar{height:2px;background:#10231d;margin-top:7px;overflow:hidden}.meter-bar i{display:block;height:100%;background:#65f5b0;animation:meter 2s ease-in-out infinite alternate}@keyframes meter{from{width:35%}to{width:94%}}
    #sandesh-entry .ascii{color:#65f5b0;font-size:8px;line-height:1.15;opacity:.55;white-space:pre;overflow:hidden;margin-top:auto}
    #sandesh-entry .footer{border-top:1px solid #ffffff08;padding-top:12px}.footer .access{color:#65f5b0}
    #sandesh-entry .exit{animation:exit .65s cubic-bezier(.2,.8,.2,1) forwards}@keyframes exit{35%{filter:brightness(3);transform:skewX(-1deg)}to{opacity:0;filter:blur(12px);transform:scale(1.05)}}
    @media(max-width:800px){#sandesh-entry .terminal-wrap{grid-template-columns:1fr;height:min(700px,calc(100vh - 120px))}.side{display:none!important}.hero{font-size:clamp(38px,12vw,70px)!important}.shell{padding:12px}.footer span:first-child{display:none}}
    @media(prefers-reduced-motion:reduce){#sandesh-entry *,#sandesh-entry:before,#sandesh-entry:after{animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "sandesh-entry";
  root.innerHTML = `
    <div class="rain"></div><div class="noise"></div><div class="scan"></div><div class="vignette"></div>
    <div class="shell">
      <header class="topbar"><span class="brand">SANDESH // CYBER TERMINAL</span><span class="live"><i></i> NODE ONLINE // PUBLIC PORTFOLIO</span></header>
      <section class="terminal-wrap">
        <main class="mainterm">
          <div class="window"><i></i><i></i><i></i><b>terminal://sandesh@portfolio</b></div>
          <div class="prompt">root@SANDESH:~$ ./initialize_portfolio --secure-mode</div>
          <h1 class="hero glitch">ENTER THE<br><span>DIGITAL GRID</span></h1>
          <p class="sub">Initializing interface. Establishing encrypted visual channel. Loading systems, projects and digital identity...</p>
          <div class="logs" id="seLogs"></div>
          <div class="progress"><div class="bar"><i id="seBar"></i></div><span class="pct" id="sePct">00%</span></div>
          <button class="enter" id="seEnter">ENTER SYSTEM →</button>
        </main>
        <aside class="side">
          <div class="side-title">SYSTEM MONITOR</div>
          <div class="meter"><div class="meter-head"><span>CORE</span><b>ONLINE</b></div><div class="meter-bar"><i style="width:88%"></i></div></div>
          <div class="meter"><div class="meter-head"><span>NETWORK</span><b>STABLE</b></div><div class="meter-bar"><i style="width:74%"></i></div></div>
          <div class="meter"><div class="meter-head"><span>INTERFACE</span><b>READY</b></div><div class="meter-bar"><i style="width:96%"></i></div></div>
          <div class="meter"><div class="meter-head"><span>SECURITY</span><b>ACTIVE</b></div><div class="meter-bar"><i style="width:91%"></i></div></div>
          <pre class="ascii">     ████████
   ██        ██
  ██  S A N   ██
 ██   D E S H  ██
  ██          ██
   ██        ██
     ████████</pre>
        </aside>
      </section>
      <footer class="footer"><span>VISUAL SIMULATION // NO AUTHENTICATION PERFORMED</span><span class="access">ACCESS: GRANTED</span></footer>
    </div>`;
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  const logs = root.querySelector("#seLogs");
  const bar = root.querySelector("#seBar");
  const pct = root.querySelector("#sePct");
  const enter = root.querySelector("#seEnter");

  const messages = [
    ["BOOT", "Initializing portfolio kernel..."],
    ["OK", "Loading visual interface modules..."],
    ["SCAN", "Mapping digital environment..."],
    ["OK", "Identity signature: SANDESH BAJGAI"],
    ["NET", "Network channel synchronized..."],
    ["OK", "Interactive systems loaded."],
    ["SEC", "Security layer active."],
    ["READY", "Portfolio core ready for access."]
  ];

  let progress = 0;
  let index = 0;
  function addLog() {
    if (index >= messages.length) return;
    const [tag, text] = messages[index++];
    const line = document.createElement("span");
    line.className = "line";
    line.innerHTML = `> <b>[${tag}]</b> ${text}`;
    logs.appendChild(line);
    while (logs.children.length > 7) logs.removeChild(logs.firstChild);
    progress = Math.min(100, Math.round((index / messages.length) * 100));
    bar.style.width = progress + "%";
    pct.textContent = String(progress).padStart(2, "0") + "%";
    if (index < messages.length) setTimeout(addLog, 230 + Math.random() * 260);
  }
  addLog();

  function leave() {
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (_) {}
    root.classList.add("exit");
    setTimeout(() => { root.remove(); style.remove(); document.body.style.overflow = ""; }, 650);
  }

  enter.addEventListener("click", leave);
  document.addEventListener("keydown", function keyHandler(e) {
    if (e.key === "Enter" || e.key === "Escape") { leave(); document.removeEventListener("keydown", keyHandler); }
  });
})();
