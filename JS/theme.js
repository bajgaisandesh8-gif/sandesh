/* Dark/light theme control. The early head bootstrap prevents a theme flash. */
(function () {
  "use strict";
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

  function hasSavedPreference() {
    try { return localStorage.getItem("sandesh-theme") === "dark" || localStorage.getItem("sandesh-theme") === "light"; }
    catch (_) { return false; }
  }
  let savedPreference = hasSavedPreference();

  function applyTheme(theme, persist) {
    const light = theme === "light";
    root.dataset.theme = light ? "light" : "dark";
    toggle.setAttribute("aria-pressed", String(light));
    toggle.setAttribute("aria-label", "Toggle light theme");
    const label = toggle.querySelector(".theme-toggle-label");
    if (label) label.textContent = light ? "DARK" : "LIGHT";
    if (meta) meta.content = light ? "#f2f5f4" : "#080c10";
    if (persist) {
      try { localStorage.setItem("sandesh-theme", light ? "light" : "dark"); savedPreference = true; }
      catch (_) { /* Theme remains usable for this page view when storage is blocked. */ }
      savedPreference = true;
    }
  }

  applyTheme(root.dataset.theme === "light" ? "light" : "dark", false);
  toggle.addEventListener("click", () => applyTheme(root.dataset.theme === "light" ? "dark" : "light", true));
  root.classList.add("js-theme");
  if (media) {
    const syncSystem = event => { if (!savedPreference) applyTheme(event.matches ? "light" : "dark", false); };
    if (media.addEventListener) media.addEventListener("change", syncSystem);
    else if (media.addListener) media.addListener(syncSystem);
  }
})();
