/* SANDESH // CINEMATIC PORTFOLIO BOOT SEQUENCE */
(function () {
  "use strict";

  const STORAGE_KEY = "sandeshEntrySequence_v5";
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
  } catch (_) {}

  const style = document.createElement("style");
  style.textContent = `
    #sandesh-entry{
      position:fixed;inset:0;z-index:99999;display:grid;place-items:center;
      padding:14px;background:#010506;color:#e8f5ef;
      font:500 12px/1.7 "JetBrains Mono",monospace;overflow:hidden;
      isolation:isolate;
    }
    #sandesh-entry *{box-sizing:border-box}
    #sandesh-entry::before{
      content:"";position:absolute;inset:0;z-index:-2;
      background:
        radial-gradient(circle at 50% 48%,#64f3b00d 0 12%,transparent 42%),
        radial-gradient(circle at 15% 20%,#64f3b008,transparent 28%),
        radial-gradient(circle at 85% 80%,#64f3b006,transparent 28%),#010506;
    }
    #sandesh-entry::after{
      content:"";position:absolute;inset:0;z-index:10;pointer-events:none;opacity:.16;
      background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,#b8fff11a 4px);
      mix-blend-mode:screen;
    }
    #sandesh-entry .particles{position:absolute;inset:0;overflow:hidden;z-index:-1}
    #sandesh-entry .particle{position:absolute;width:2px;height:2px;border-radius:50%;background:#64f3b0;opacity:.25;animation:float 6s linear infinite}
    @keyframes float{0%{transform:translate3d(0,20px,0);opacity:0}20%{opacity:.4}80%{opacity:.2}100%{transform:translate3d(40px,-110vh,0);opacity:0}}
    #sandesh-entry .box{
      width:min(980px,100%);min-height:min(650px,calc(100vh - 28px));
      padding:clamp(20px,4vw,46px);border:1px solid #29443c;border-radius:18px;
      background:linear-gradient(145deg,#071214eF,#020708F5 70%);
      box-shadow:0 35px 120px #000,0 0 90px #64f3b00b,inset 0 1px #ffffff08;
      display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;
      backdrop-filter:blur(12px);
    }
    #sandesh-entry .box::before{
      content:"";position:absolute;inset:0;pointer-events:none;
      background:linear-gradient(#64f3b008 1px,transparent 1px),linear-gradient(90deg,#64f3b008 1px,transparent 1px);
      background-size:38px 38px;mask-image:linear-gradient(to bottom,#fff,transparent 85%);
    }
    #sandesh-entry .corner{position:absolute;width:22px;height:22px;border-color:#64f3b0;border-style:solid;opacity:.8}
    #sandesh-entry .c1{top:14px;left:14px;border-width:1px 0 0 1px}.c2{top:14px;right:14px;border-width:1px 1px 0 0}.c3{bottom:14px;left:14px;border-width:0 0 1px 1px}.c4{bottom:14px;right:14px;border-width:0 1px 1px 0}
    #sandesh-entry .top,#sandesh-entry main,#sandesh-entry .bottom{position:relative;z-index:1}
    #sandesh-entry .top{display:flex;justify-content:space-between;gap:20px;color:#53676a;font-size:9px;letter-spacing:.12em;text-transform:uppercase}
    #sandesh-entry .top b,#sandesh-entry .step,#sandesh-entry .access{color:#64f3b0}
    #sandesh-entry .brand-mark{display:inline-flex;align-items:center;gap:7px}
    #sandesh-entry .brand-dot{width:6px;height:6px;border-radius:50%;background:#64f3b0;box-shadow:0 0 12px #64f3b0;animation:blink 1s infinite}
    @keyframes blink{50%{opacity:.3;transform:scale(.7)}}
    #sandesh-entry main{width:min(760px,100%);margin:auto 0}
    #sandesh-entry .step{font-size:10px;letter-spacing:.18em;min-height:18px}
    #sandesh-entry .title{margin:14px 0 16px;font-size:clamp(34px,7vw,78px);line-height:.92;letter-spacing:-.07em;font-weight:700}
    #sandesh-entry .title span{color:#64f3b0;text-shadow:0 0 30px #64f3b02b}
    #sandesh-entry .msg{min-height:54px;color:#839699;line-height:1.9;max-width:650px}
    #sandesh-entry .terminal{margin-top:18px;padding:14px 16px;border:1px solid #17332c;border-left:2px solid #64f3b0;background:#64f3b005;color:#617578;font-size:10px;min-height:72px;box-shadow:inset 0 0 30px #64f3b003}
    #sandesh-entry .terminal i{display:block;color:#64f3b0;font-style:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    #sandesh-entry .cursor{display:inline-block;width:6px;height:11px;background:#64f3b0;margin-left:4px;vertical-align:-1px;animation:blink .7s steps(1) infinite}
    #sandesh-entry .bar-wrap{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin-top:22px}
    #sandesh-entry .bar{height:3px;background:#142421;overflow:hidden}
    #sandesh-entry .bar i{display:block;width:0;height:100%;background:#64f3b0;box-shadow:0 0 18px #64f3b0;transition:width .45s cubic-bezier(.2,.8,.2,1)}
    #sandesh-entry .percent{color:#64f3b0;font-size:10px;min-width:34px;text-align:right}
    #sandesh-entry .actions{display:flex;gap:10px;margin-top:24px}
    #sandesh-entry button{min-height:44px;padding:0 17px;border-radius:7px;font:700 10px "JetBrains Mono",monospace;letter-spacing:.07em;cursor:pointer;transition:.2s ease}
    #sandesh-entry button:hover{transform:translateY(-2px)}
    #sandesh-entry .enter{background:#64f3b0;color:#031008;border:1px solid #64f3b0;box-shadow:0 0 24px #64f3b01a}
    #sandesh-entry .bypass{background:#071011;color:#6d8082;border:1px solid #263a3a}
    #sandesh-entry .enter[hidden]{display:none}
    #sandesh-entry .bottom{display:flex;justify-content:space-between;gap:20px;border-top:1px solid #ffffff0b;padding-top:14px;color:#405356;font-size:8px;letter-spacing:.04em}
    #sandesh-entry .access{font-weight:700}
    #sandesh-entry .out{animation:entryOut .55s cubic-bezier(.2,.8,.2,1) forwards}
    @keyframes entryOut{to{opacity:0;transform:scale(1.035);filter:blur(5px)}}
    @media(max-width:600px){
      #sandesh-entry{padding:7px}.box{min-height:calc(100vh - 14px)!important;padding:20px!important;border-radius:13px}
      .top span:last-child{display:none}.title{font-size:clamp(31px,12vw,55px)}
      .actions{display:grid!important}.actions button{width:100%}.bottom{font-size:7px}
    }
    @media(prefers-reduced-motion:reduce){#sandesh-entry *,#sandesh-entry::after{animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "sandesh-entry";
  root.innerHTML = `
    <div class="particles" aria-hidden="true"></div>
    <div class="box">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <div class="top">
        <span class="brand-mark"><i class="brand-dot"></i><b>SANDESH</b> // SECURE DIGITAL ENVIRONMENT</span>
        <span>PORTFOLIO OS // v5.0</span>
      </div>
      <main>
        <div class="step" id="seStep"></div>
        <h1 class="title" id="seTitle"></h1>
        <div class="msg" id="seMsg"></div>
        <div class="terminal" id="seLog"></div>
        <div class="bar-wrap"><div class="bar"><i id="seBar"></i></div><span class="percent" id="sePercent">00%</span></div>
        <div class="actions"><button class="enter" id="seEnter" hidden>ENTER PORTFOLIO →</button><button class="bypass" id="seBypass">SKIP INTRO</button></div>
      </main>
      <div class="bottom"><span>VISUAL BOOT SEQUENCE // NOT AUTHENTICATION</span><span class="access" id="seAccess">SYSTEM: INITIALIZING</span></div>
    </div>`;
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  const particles = root.querySelector(".particles");
  for (let i = 0; i < 26; i++) {
    const p = document.createElement("i");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = (80 + Math.random() * 30) + "%";
    p.style.animationDelay = (Math.random() * 6) + "s";
    p.style.animationDuration = (5 + Math.random() * 7) + "s";
    particles.appendChild(p);
  }

  const data = [
    ["BOOT 01 // INITIALIZATION", "WELCOME TO<br><span>SANDESH'S PORTFOLIO</span>", "Initializing the personal digital environment...", ["BOOT SEQUENCE ................. START", "PORTFOLIO CORE ................ LOADING"]],
    ["BOOT 02 // IDENTITY", "IDENTITY<br><span>VERIFIED ✓</span>", "Verifying portfolio owner: Sandesh Bajgai", ["IDENTITY ....................... VERIFIED", "OWNER .......................... SANDESH BAJGAI"]],
    ["BOOT 03 // NETWORK", "ESTABLISHING<br><span>CONNECTION</span>", "Synchronizing interface and interactive systems...", ["NETWORK ........................ ONLINE", "INTERFACE ...................... READY"]],
    ["BOOT 04 // SYSTEM READY", "ACCESS<br><span>GRANTED ✓</span>", "All systems operational. Welcome to the portfolio.", ["SECURITY CHECK ................. PASSED", "PORTFOLIO CORE ................ ONLINE", "ACCESS LEVEL .................. PUBLIC"]]
  ];

  const q = (x) => root.querySelector(x);
  const step = q("#seStep"), title = q("#seTitle"), msg = q("#seMsg"), log = q("#seLog");
  const bar = q("#seBar"), percent = q("#sePercent"), enter = q("#seEnter"), bypass = q("#seBypass"), access = q("#seAccess");
  let n = 0;

  function typeText(el, text, speed = 15) {
    el.textContent = "";
    let i = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    el.appendChild(cursor);
    const timer = setInterval(() => {
      if (i >= text.length) { clearInterval(timer); return; }
      el.insertBefore(document.createTextNode(text[i++]), cursor);
    }, speed);
  }

  function draw() {
    const d = data[n];
    step.textContent = d[0];
    title.innerHTML = d[1];
    typeText(msg, d[2]);
    log.innerHTML = d[3].map((x) => `<i>> ${x}</i>`).join("") + `<span class="cursor"></span>`;
    const value = (n + 1) * 25;
    bar.style.width = value + "%";
    percent.textContent = String(value).padStart(2, "0") + "%";
    access.textContent = n === 3 ? "SYSTEM: READY" : "SYSTEM: RUNNING";
    if (n === 3) { enter.hidden = false; bypass.textContent = "ENTER DIRECTLY"; }
  }

  function leave() {
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (_) {}
    root.classList.add("out");
    setTimeout(() => { root.remove(); style.remove(); document.body.style.overflow = ""; }, 550);
  }

  function advance() { if (n < data.length - 1) { n++; draw(); } else leave(); }
  enter.onclick = leave;
  bypass.onclick = leave;
  root.addEventListener("click", (e) => { if (e.target.closest("button")) return; advance(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && n < data.length - 1) advance();
    else if (e.key === "Escape") leave();
  });
  draw();
})();
