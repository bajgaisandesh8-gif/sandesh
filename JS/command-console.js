/* PORTFOLIO COMMAND INTERFACE — Phase 3
   Portfolio-only navigation. No shell, OS commands, or external execution. */
(function () {
  "use strict";
  const launcher = document.getElementById("commandLauncher");
  const dialog = document.getElementById("commandConsole");
  const input = document.getElementById("commandInput");
  const output = document.getElementById("commandOutput");
  if (!launcher || !dialog || !input || !output) return;

  const commands = {
    help: { title: "AVAILABLE COMMANDS", text: "about · topology · skills · projects · experience · contact\nUse one command at a time. This console only navigates this portfolio." },
    about: { title: "ABOUT", text: "An early-career technology learner exploring networking, IT infrastructure, cybersecurity and software development.", href: "#about", link: "OPEN ABOUT SECTION" },
    topology: { title: "CAPABILITY TOPOLOGY", text: "Explore the six connected areas: networking, cybersecurity, development, field experience, projects and learning.", href: "#topology", link: "OPEN TECHNICAL MAP" },
    skills: { title: "TECHNICAL TOOLKIT", text: "Networking · Infrastructure · Web Development · Cybersecurity Foundations · AI & Automation. Skill cards describe current exposure and learning, not proficiency scores.", href: "#skills", link: "VIEW SKILLS" },
    projects: { title: "PROJECTS", text: "Developer Portfolio — live. NETSCOPE — in development. NETLAB — specification stage.", href: "#projects", link: "VIEW PROJECTS" },
    experience: { title: "PRACTICAL EXPERIENCE", text: "Contract-based IT support and networking exposure at Soaltee Westend Itahari, including cabling, access points, switching, CCTV/NVR and connected-device support.", href: "#experience", link: "VIEW EXPERIENCE" },
    contact: { title: "CONTACT", text: "Use the contact section to find public profile links or send a message through the portfolio form.", href: "#contact", link: "OPEN CONTACT" }
  };

  let lastFocus = null;
  function showResult(command) {
    const item = commands[command];
    output.replaceChildren();
    const heading = document.createElement("strong");
    const paragraph = document.createElement("p");
    heading.textContent = item ? item.title : "COMMAND NOT FOUND";
    paragraph.textContent = item ? item.text : "That command is not supported. Type help to see the available portfolio commands.";
    output.append(heading, paragraph);
    if (item && item.href) {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.link;
      link.addEventListener("click", closeConsole);
      output.append(link);
    }
    output.scrollTop = 0;
  }
  function runCommand(value) {
    const command = String(value || "").trim().toLowerCase();
    if (!command) return;
    input.value = command;
    showResult(command);
  }
  function openConsole() {
    lastFocus = document.activeElement;
    dialog.hidden = false;
    document.body.classList.add("command-console-open");
    input.value = "";
    showResult("help");
    input.focus();
  }
  function closeConsole() {
    dialog.hidden = true;
    document.body.classList.remove("command-console-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  launcher.addEventListener("click", openConsole);
  dialog.addEventListener("click", event => {
    if (event.target.matches("[data-close-command]")) closeConsole();
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") { event.preventDefault(); runCommand(input.value); }
    if (event.key === "Escape") { event.preventDefault(); closeConsole(); }
  });
  dialog.querySelectorAll("[data-command]").forEach(button => {
    button.addEventListener("click", () => {
      runCommand(button.dataset.command);
      input.focus();
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !dialog.hidden) closeConsole();
  });
})();