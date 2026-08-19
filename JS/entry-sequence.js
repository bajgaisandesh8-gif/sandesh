/* SANDESH // FULL-SCREEN CINEMATIC CYBER ENTRY */
(function () {
  "use strict";

  const STORAGE_KEY = "sandeshEntrySequence_v6";
  try { if (sessionStorage.getItem(STORAGE_KEY) === "1") return; } catch (_) {}

  const style = document.createElement("style");
  style.textContent = `
    #sandesh-entry{position:fixed;inset:0;z-index:99999;overflow:hidden;background:#010305;color:#dfffee;font:500 12px/1.55 "JetBrains Mono",monospace;isolation:isolate}
    #sandesh-entry *{box-sizing:border-box}
    #sandesh-entry .scene{position:absolute;inset:0;overflow:hidden;background:radial-gradient(circle at 50% 48%,#0b30261f,transparent 35%),linear-gradient(180deg,#010304,#020807 55%,#010303)}
    #sandesh-entry .grid{position:absolute;inset:-25%;opacity:.34;background-image:linear-gradient(#64f3b00b 1px,transparent 1px),linear-gradient(90deg,#64f3b00b 1px,transparent 1px);background-size:52px 52px;transform:perspective(700px) rotateX(62deg) translateY(18%);transform-origin:center bottom;animation:gridMove 10s linear infinite}
    @keyframes gridMove{to{background-position:0 52px,52px 0}}
    #sandesh-entry .scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0,transparent 3px,#b8fff10b 4px);opacity:.55}
    #sandesh-entry .vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle,transparent 40%,#000b 100%)}
    #sandesh-entry .noise{position:absolute;inset:-50%;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");animation:noise .18s steps(2) infinite}
    @keyframes noise{0%{transform:translate(0,0)}25%{transform:translate(2%, -1%)}50%{transform:translate(-1%,2%)}75%{transform:translate(1%,1%)}100%{transform:translate(-2%,-1%)}}
    #sandesh-entry .nodes{position:absolute;inset:0}
    #sandesh-entry .node{position:absolute;width:5px;height:5px;border-radius:50%;background:#64f3b0;box-shadow:0 0 14px #64f3b0;opacity:.7}
    #sandesh-entry .node::after{content:"";position:absolute;width:130px;height:1px;background:linear-gradient(90deg,#64f3b044,transparent);transform-origin:left;transform:rotate(var(--r));animation:nodePulse 2.4s ease-in-out infinite}
    @keyframes nodePulse{50%{opacity:.25}}
    #sandesh-entry .hud{position:absolute;inset:0;padding:clamp(18px,3vw,42px);display:flex;flex-direction:column;justify-content:space-between}
    #sandesh-entry .hudtop,#sandesh-entry .hudbottom{display:flex;justify-content:space-between;gap:20px;letter-spacing:.12em;text-transform:uppercase;font-size:9px;color:#4d6567}
    #sandesh-entry .live{color:#64f3b0}.live::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#64f3b0;box-shadow:0 0 12px #64f3b0;margin-right:7px;animation:blink .8s infinite}
    @keyframes blink{50%{opacity:.25}}
    #sandesh-entry .center{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:20px}
    #sandesh-entry .core{width:min(900px,92vw);position:relative}
    #sandesh-entry .eyebrow{color:#64f3b0;font-size:10px;letter-spacing:.35em;margin-bottom:22px;text-shadow:0 0 16px #64f3b044}
    #sandesh-entry .name{position:relative;margin:0;font-family:"Space Grotesk",sans-serif;font-size:clamp(58px,15vw,190px);line-height:.78;letter-spacing:-.095em;font-weight:700;color:#eafff5;text-shadow:0 0 35px #64f3b018}
    #sandesh-entry .name::before,#sandesh-entry .name::after{content:"SANDESH";position:absolute;inset:0;pointer-events:none;opacity:0}
    #sandesh-entry .name::before{color:#ff315b;transform:translate(-3px,0);animation:glitch 3.5s infinite}
    #sandesh-entry .name::after{color:#20d9ff;transform:translate(3px,0);animation:glitch 3.5s .12s infinite}
    @keyframes glitch{0%,88%,100%{opacity:0;clip-path:inset(50% 0 50% 0)}90%{opacity:.7;clip-path:inset(12% 0 72% 0)}92%{opacity:.35;clip-path:inset(68% 0 12% 0)}94%{opacity:.55;clip-path:inset(35% 0 42% 0)}}
    #sandesh-entry .sub{margin:28px auto 0;color:#718888;letter-spacing:.16em;font-size:10px;text-transform:uppercase}
    #sandesh-entry .terminal{position:absolute;left:clamp(18px,4vw,70px);bottom:clamp(90px,12vh,150px);width:min(390px,42vw);padding:12px 14px;border-left:2px solid #64f3b0;background:#020a08aa;text-align:left;backdrop-filter:blur(4px);color:#526d6c;font-size:9px}
    #sandesh-entry .terminal span{display:block;white-space:nowrap;overflow:hidden}.ok{color:#64f3b0}.cyan{color:#62d9ff}.muted{color:#526d6c}
    #sandesh-entry .status{position:absolute;right:clamp(18px,4vw,70px);bottom:clamp(90px,12vh,150px);width:min(270px,30vw);text-align:left;border:1px solid #173a31;background:#020a08aa;padding:14px;backdrop-filter:blur(4px)}
    #sandesh-entry .statusrow{display:flex;justify-content:space-between;border-bottom:1px solid #ffffff08;padding:6px 0;color:#526d6c;font-size:9px}.statusrow:last-child{border:0}.statusrow b{color:#64f3b0;font-weight:500}
    #sandesh-entry .progress{position:absolute;left:clamp(18px,4vw,70px);right:clamp(18px,4vw,70px);bottom:52px;height:2px;background:#11251f}.progress i{display:block;width:0;height:100%;background:#64f3b0;box-shadow:0 0 18px #64f3b0;transition:width .8s cubic-bezier(.2,.8,.2,1)}
    #sandesh-entry .progresslabel{position:absolute;right:clamp(18px,4vw,70px);bottom:61px;color:#64f3b0;font-size:9px}
    #sandesh-entry .enter{position:absolute;left:50%;bottom:25px;transform:translateX(-50%);border:1px solid #64f3b0;background:#64f3b0;color:#031008;padding:9px 16px;font:700 9px "JetBrains Mono",monospace;letter-spacing:.12em;cursor:pointer;opacity:0;transition:.25s;box-shadow:0 0 25px #64f3b01a}.enter.show{opacity:1}.enter:hover{box-shadow:0 0 35px #64f3b055;transform:translateX(-50%) translateY(-2px)}
    #sandesh-entry .skip{position:absolute;right:clamp(18px,3vw,42px);top:clamp(18px,3vw,42px);border:1px solid #263a38;background:#020605aa;color:#526d6c;padding:7px 11px;font:700 8px "JetBrains Mono",monospace;letter-spacing:.1em;cursor:pointer}.skip:hover{color:#64f3b0;border-color:#64f3b0}
    #sandesh-entry.out{animation:exit .8s cubic-bezier(.7,0,.2,1) forwards}@keyframes exit{0%{opacity:1;filter:none;transform:scale(1)}35%{filter:contrast(1.7) brightness(1.4);transform:scale(1.01)}60%{opacity:.85;transform:scale(1.025) skewX(-1deg)}100%{opacity:0;filter:blur(12px);transform:scale(1.08)}}
    @media(max-width:800px){#sandesh-entry .terminal{width:44vw}.status{width:31vw}.node::after{width:70px}.sub{font-size:8px!important}}
    @media(max-width:600px){#sandesh-entry .terminal,#sandesh-entry .status{display:none}#sandesh-entry .name{font-size:clamp(58px,22vw,120px)}#sandesh-entry .eyebrow{letter-spacing:.22em;font-size:8px}.hudtop span:last-child,.hudbottom span:last-child{display:none}.progress{bottom:44px!important}.enter{bottom:17px!important}}
    @media(prefers-reduced-motion:reduce){#sandesh-entry *,#sandesh-entry::before{animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "sandesh-entry";
  root.innerHTML = `
    <div class="scene"><div class="grid"></div><div class="nodes" id="nodes"></div><div class="noise"></div><div class="scan"></div><div class="vignette"></div></div>
    <div class="hud">
      <div class="hudtop"><span><b class="live">LIVE</b> // SANDESH DIGITAL ENVIRONMENT</span><span>NODE 07 // NEPAL</span></div>
      <div class="hudbottom"><span>CYBER / NETWORK / SOFTWARE</span><span id="clock">00:00:00</span></div>
    </div>
    <button class="skip" id="skip">SKIP [ESC]</button>
    <div class="center"><div class="core"><div class="eyebrow" id="phase">INITIALIZING SYSTEM</div><h1 class="name">SANDESH</h1><div class="sub" id="message">Booting secure portfolio interface</div></div></div>
    <div class="terminal" id="terminal"></div>
    <div class="status"><div class="statusrow"><span>NETWORK</span><b id="network">SCANNING</b></div><div class="statusrow"><span>CORE</span><b id="core">BOOTING</b></div><div class="statusrow"><span>SECURITY</span><b id="security">CHECKING</b></div><div class="statusrow"><span>ACCESS</span><b id="access">PENDING</b></div></div>
    <div class="progress"><i id="bar"></i></div><span class="progresslabel" id="percent">00%</span>
    <button class="enter" id="enter">ENTER DIGITAL ENVIRONMENT →</button>
  `;
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  const nodeLayer = root.querySelector("#nodes");
  for (let i = 0; i < 24; i++) {
    const n = document.createElement("i"); n.className = "node";
    n.style.left = (Math.random() * 96 + 2) + "%"; n.style.top = (Math.random() * 86 + 7) + "%";
    n.style.setProperty("--r", (Math.random() * 360) + "deg"); n.style.animationDelay = (Math.random() * 2) + "s"; nodeLayer.appendChild(n);
  }

  const $ = (s) => root.querySelector(s);
  const phase = $("#phase"), message = $("#message"), terminal = $("#terminal"), bar = $("#bar"), percent = $("#percent");
  const network = $("#network"), core = $("#core"), security = $("#security"), access = $("#access"), enter = $("#enter");
  let progress = 0, done = false;

  const stages = [
    ["INITIALIZING SYSTEM", "Waking the digital environment", ["> kernel................. ONLINE", "> interface.............. LOADING", "> visual matrix.......... READY"]],
    ["MAPPING NETWORK", "Establishing secure interface channels", ["> scanning nodes......... 24 FOUND", "> network route.......... STABLE", "> connection............. ENCRYPTED"]],
    ["VERIFYING IDENTITY", "Authenticating portfolio environment", ["> identity............... SANDESH BAJGAI", "> security layer......... PASSED", "> owner signature........ VERIFIED"]],
    ["ACCESS GRANTED", "Digital environment ready", ["> all systems............ OPERATIONAL", "> portfolio core......... ONLINE", "> access level........... PUBLIC"]]
  ];

  function renderStage(i) {
    const s = stages[i]; phase.textContent = s[0]; message.textContent = s[1]; terminal.innerHTML = s[2].map(x => `<span class="${x.includes("ONLINE") || x.includes("READY") || x.includes("FOUND") || x.includes("PASSED") || x.includes("VERIFIED") ? "ok" : "cyan"}">${x}</span>`).join("");
    const value = (i + 1) * 25; bar.style.width = value + "%"; percent.textContent = String(value).padStart(2, "0") + "%";
    network.textContent = i >= 1 ? "ONLINE" : "SCANNING"; core.textContent = i >= 2 ? "ONLINE" : "BOOTING"; security.textContent = i >= 2 ? "PASSED" : "CHECKING"; access.textContent = i === 3 ? "GRANTED" : "PENDING";
  }

  function finish() {
    if (done) return; done = true;
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (_) {}
    root.classList.add("out");
    setTimeout(() => { root.remove(); style.remove(); document.body.style.overflow = ""; }, 820);
  }

  let stage = 0;
  function next() { if (stage < 3) { stage++; renderStage(stage); if (stage === 3) enter.classList.add("show"); } else finish(); }
  renderStage(0);
  const clock = $("#clock");
  const started = Date.now();
  const clockTimer = setInterval(() => { const s = Math.floor((Date.now() - started) / 1000); clock.textContent = new Date(s * 1000).toISOString().slice(11,19); }, 1000);
  const auto = setInterval(() => { if (stage < 3) next(); else clearInterval(auto); }, 1050);
  enter.onclick = finish; $("#skip").onclick = finish;
  root.addEventListener("click", e => { if (e.target.closest("button")) return; next(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") finish(); });
  const oldFinish = finish;
  function cleanupClock() { clearInterval(clockTimer); clearInterval(auto); }
  root.addEventListener("animationend", e => { if (e.animationName === "exit") cleanupClock(); });
})();
