/* Small, optional scroll reveals. Content remains visible if observation is unavailable. */
(function () {
  "use strict";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealContent() {
    const elements = [...document.querySelectorAll(".reveal, .reveal-left, .reveal-right")];
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(element => element.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -40px 0px" });
    document.documentElement.classList.add("reveal-enabled");
    elements.forEach(element => observer.observe(element));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealContent, { once: true });
  } else {
    revealContent();
  }
})();
