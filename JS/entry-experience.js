/* SANDESH PORTFOLIO — STEP-BY-STEP ENTRY EXPERIENCE */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Prevent the older app.js gateway from creating its own timed overlay. */
    try { sessionStorage.setItem("sandeshSecureAccess_v1", "1"); } catch (e) {}

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = [
      ["BOOT SEQUENCE", "Initializing Sandesh portfolio...", "PORTFOLIO CORE", "READY"],
      ["IDENTITY CHECK", "Verifying digital identity...", "IDENTITY", "VERIFIED"],
      ["SYSTEM LINK", "Establishing portfolio connection...", "NETWORK", "ONLINE"],
      ["FINAL CHECK", "Loading personal workspace...", "INTERFACE", "READY"]
    ];

    const style = document.createElement("style");
    style.id = "sandesh-step-entry-styles";
    style.textContent = `
      .sb-step-entry{position:fixed;inset:0;z-index:10001;display:grid;place-items:center;padding:14px;background:#020506;color:#eaf4ef;font-family:"Space Grotesk",system-ui,sans-serif;overflow:auto}
      .sb-step-entry *{box-sizing:border-box}.sb-step-entry-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 42%,rgba(100,243,176,.09),transparent 38%),linear-gradient(rgba(100,243,176,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(100,243,176,.025) 1px,transparent 1px);background-size:auto,42px 42px,42px 42px}
      .sb-step-shell{position:relative;width:min(960px,100%);border:1px solid rgba(100,243,176,.2);border-radius:16px;background:rgba(3,9,11,.97);box-shadow:0 35px 100px rgba(0,0,0,.7),0 0 80px rgba(100,243,176,.04);overflow:hidden}
      .sb-step-top{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.06);font:600 .62rem "JetBrains Mono",monospace;letter-spacing:.12em;color:#607278}.sb-step-brand{color:#dce9e3}.sb-step-brand b{color:#64f3b0}.sb-step-live{color:#64f3b0}.sb-step-body{display:grid;grid-template-columns:1.45fr .55fr;min-height:560px}.sb-step-terminal{padding:clamp(28px,5vw,58px);display:flex;flex-direction:column;justify-content:center}.sb-step-counter{color:#64f3b0;font:600 .64rem "JetBrains Mono",monospace;letter-spacing:.14em}.sb-step-title{margin:18px 0 10px;font:700 clamp(2.2rem,6vw,5.3rem)/.95 "JetBrains Mono",monospace;letter-spacing:-.07em;text-transform:uppercase}.sb-step-title span{color:#64f3b0;text-shadow:0 0 28px rgba(100,243,176,.12)}.sb-step-message{color:#8a9b9f;font:500 clamp(.78rem,1.5vw,.95rem)/1.7 "JetBrains Mono",monospace;min-height:28px}.sb-step-log{margin-top:34px;border-left:1px solid rgba(100,243,176,.25);padding:15px 17px;background:rgba(100,243,176,.018);font:500 .61rem/1.7 "JetBrains Mono",monospace}.sb-step-log div{display:flex;gap:10px}.sb-step-log b{color:#64f3b0}.sb-step-log span{color:#8da0a2}.sb-step-progress{margin-top:28px;height:2px;background:#172225;overflow:hidden}.sb-step-progress i{display:block;height:100%;width:25%;background:#64f3b0;box-shadow:0 0 12px rgba(100,243,176,.6);transition:width .35s ease}.sb-step-side{padding:28px;display:flex;flex-direction:column;justify-content:center;border-left:1px solid rgba(255,255,255,.055);background:linear-gradient(180deg,rgba(255,255,255,.015),transparent)}.sb-step-avatar{width:88px;height:88px;border:1px solid rgba(100,243,176,.28);border-radius:50%;display:grid;place-items:center;margin-bottom:20px;box-shadow:0 0 40px rgba(100,243,176,.05);position:relative}.sb-step-avatar:before{content:"";position:absolute;inset:-7px;border:1px dashed rgba(100,243,176,.17);border-radius:50%}.sb-step-avatar span{font:700 1.2rem "JetBrains Mono",monospace;color:#64f3b0}.sb-step-name{font-weight:700;font-size:1.1rem}.sb-step-role{margin-top:7px;color:#65777b;font:500 .57rem "JetBrains Mono",monospace;line-height:1.5}.sb-step-status{margin-top:25px;color:#64f3b0;font:600 .58rem "JetBrains Mono",monospace;letter-spacing:.08em}.sb-step-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#64f3b0;box-shadow:0 0 10px rgba(100,243,176,.7);margin-right:7px}.sb-step-enter{margin-top:28px;width:100%;min-height:52px;border:1px solid #64f3b0;border-radius:7px;background:linear-gradient(135deg,#64f3b0,#42d895);color:#021008;cursor:pointer;font:800 .65rem "JetBrains Mono",monospace;letter-spacing:.08em}.sb-step-enter:hover,.sb-step-enter:focus-visible{filter:brightness(1.05);transform:translateY(-1px)}.sb-step-skip{margin-top:10px;border:0;background:transparent;color:#526368;cursor:pointer;font:500 .56rem "JetBrains Mono",monospace}.sb-step-skip:hover,.sb-step-skip:focus-visible{color:#c8d3d0}.sb-step-hint{margin-top:22px;color:#435357;font:500 .49rem/1.5 "JetBrains Mono",monospace}.sb-step-closing{opacity:0;visibility:hidden;transition:opacity .55s ease,visibility .55s ease}.sb-step-entry:not(.sb-step-closing){animation:sbStepIn .55s ease both}@keyframes sbStepIn{from{opacity:0;transform:scale(.985)}to{opacity:1;transform:none}}
      @media(max-width:760px){.sb-step-shell{max-height:calc(100vh - 28px);overflow:auto}.sb-step-body{grid-template-columns:1fr;min-height:0}.sb-step-side{border-left:0;border-top:1px solid rgba(255,255,255,.055);padding:24px}.sb-step-terminal{padding:30px 24px}.sb-step-title{font-size:clamp(2rem,12vw,3.6rem)}.sb-step-log{margin-top:25px}.sb-step-avatar{width:68px;height:68px;margin-bottom:15px}.sb-step-enter{margin-top:20px}}
      @media(max-width:430px){.sb-step-entry{padding:8px}.sb-step-top{padding:13px 14px;font-size:.52rem}.sb-step-terminal{padding:26px 18px}.sb-step-side{padding:20px 18px}.sb-step-message{font-size:.72rem}.sb-step-log{font-size:.52rem;padding:12px}.sb-step-log div{gap:6px}.sb-step-hint{font-size:.45rem}}
      @media(prefers-reduced-motion:reduce){.sb-step-entry,.sb-step-progress i,.sb-step-closing{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);

    const entry = document.createElement("div");
    entry.className = "sb-step-entry";
    entry.setAttribute("role", "dialog");
    entry.setAttribute("aria-modal", "true");
    entry.setAttribute("aria-label", "Sandesh portfolio entry");
    entry.innerHTML = `
      <div class="sb-step-entry-bg" aria-hidden="true"></div>
      <div class="sb-step-shell">
        <div class="sb-step-top"><span class="sb-step-brand">SANDESH <b>//</b> PORTFOLIO ACCESS</span><span class="sb-step-live">● SYSTEM LIVE</span></div>
        <div class="sb-step-body">
          <section class="sb-step-terminal">
            <div class="sb-step-counter" id="sbStepCounter">STEP 01 / 04</div>
            <h1 class="sb-step-title" id="sbStepTitle">Welcome to <span>Sandesh.</span></h1>
            <p class="sb-step-message" id="sbStepMessage">Initializing Sandesh portfolio...</p>
            <div class="sb-step-log"><div><b id="sbLogMark">[ OK ]</b><span id="sbLogLabel">PORTFOLIO CORE</span><span id="sbLogValue">READY</span></div></div>
            <div class="sb-step-progress"><i id="sbStepProgress"></i></div>
          </section>
          <aside class="sb-step-side">
            <div class="sb-step-avatar" aria-hidden="true"><span>SB</span></div>
            <strong class="sb-step-name">Sandesh Bajgai</strong>
            <span class="sb-step-role">IT • NETWORKING • CYBERSECURITY<br>SOFTWARE • AI</span>
            <div class="sb-step-status"><i></i><span id="sbStatus">SYSTEM INITIALIZING</span></div>
            <button class="sb-step-enter" id="sbStepAction" type="button">CONTINUE →</button>
            <button class="sb-step-skip" id="sbStepSkip" type="button">SKIP INTRO / ESC</button>
            <p class="sb-step-hint">Visual portfolio gateway. No password or real authentication is used.</p>
          </aside>
        </div>
      </div>`;
    document.body.prepend(entry);
    document.body.style.overflow = "hidden";

    const counter = entry.querySelector("#sbStepCounter");
    const title = entry.querySelector("#sbStepTitle");
    const message = entry.querySelector("#sbStepMessage");
    const label = entry.querySelector("#sbLogLabel");
    const value = entry.querySelector("#sbLogValue");
    const status = entry.querySelector("#sbStatus");
    const progress = entry.querySelector("#sbStepProgress");
    const action = entry.querySelector("#sbStepAction");
    const skip = entry.querySelector("#sbStepSkip");
    let index = 0;

    function renderStep() {
      const step = steps[index];
      counter.textContent = `STEP ${String(index + 1).padStart(2, "0")} / 04`;
      if (index === 0) title.innerHTML = "Welcome to <span>Sandesh.</span>";
      else if (index === 1) title.innerHTML = "Identity <span>Verified.</span>";
      else if (index === 2) title.innerHTML = "Connection <span>Online.</span>";
      else title.innerHTML = "Access <span>Granted.</span>";
      message.textContent = step[1];
      label.textContent = step[2];
      value.textContent = step[3];
      status.textContent = index === 3 ? "ACCESS GRANTED" : step[3];
      progress.style.width = `${((index + 1) / 4) * 100}%`;
      action.textContent = index === 3 ? "ENTER SANDESH'S PORTFOLIO  →" : "CONTINUE  →";
    }

    function closeEntry() {
      entry.classList.add("sb-step-closing");
      document.body.style.overflow = "";
      window.setTimeout(function () { entry.remove(); style.remove(); }, reduced ? 0 : 560);
    }

    action.addEventListener("click", function () {
      if (index < 3) { index += 1; renderStep(); }
      else closeEntry();
    });
    skip.addEventListener("click", closeEntry);
    document.addEventListener("keydown", function onKey(event) {
      if (!document.body.contains(entry)) { document.removeEventListener("keydown", onKey); return; }
      if (event.key === "Escape") { event.preventDefault(); closeEntry(); }
      else if (event.key === "Enter") { event.preventDefault(); action.click(); }
    });

    renderStep();
    action.focus({ preventScroll: true });
  });
})();