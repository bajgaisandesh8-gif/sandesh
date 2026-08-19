/* =========================================================
   SANDESH BAJGAI PORTFOLIO — CONTACT
   ---------------------------------------------------------
   Client-side validation + honeypot + Supabase submission
   with a safe mailto fallback. Never reports a fake success.
========================================================= */
(function () {
    "use strict";

    const CONTACT_EMAIL = "bajgaisandesh8@gmail.com";
    const SUPABASE_TIMEOUT_MS = 8000;
    const form = document.getElementById("contactForm");
    if (!form) return;

    const $ = (id) => document.getElementById(id);
    const nameInput = $("cf-name");
    const emailInput = $("cf-email");
    const subjectInput = $("cf-subject");
    const messageInput = $("cf-message");
    const honeypotInput = $("cf-website");
    const statusElement = $("cfStatus");
    const submitButton = $("cfSubmit");
    const submitText = $("cfSubmitText");
    const errors = {
        name: $("err-name"),
        email: $("err-email"),
        subject: $("err-subject"),
        message: $("err-message")
    };

    function showError(input, error, message) {
        if (error) { error.textContent = message; error.classList.add("visible"); }
        if (input) { input.classList.add("input-error"); input.setAttribute("aria-invalid", "true"); }
    }

    function clearError(input, error) {
        if (error) { error.textContent = ""; error.classList.remove("visible"); }
        if (input) { input.classList.remove("input-error"); input.removeAttribute("aria-invalid"); }
    }

    function clearErrors() {
        clearError(nameInput, errors.name);
        clearError(emailInput, errors.email);
        clearError(subjectInput, errors.subject);
        clearError(messageInput, errors.message);
    }

    function validate() {
        clearErrors();
        const data = {
            name: nameInput?.value.trim() || "",
            email: emailInput?.value.trim() || "",
            subject: subjectInput?.value.trim() || "",
            message: messageInput?.value.trim() || ""
        };
        let valid = true;

        if (data.name.length < 2) { showError(nameInput, errors.name, "Enter your name."); valid = false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError(emailInput, errors.email, "Enter a valid email address."); valid = false; }
        if (data.subject.length < 3) { showError(subjectInput, errors.subject, "Enter a subject."); valid = false; }
        if (data.message.length < 10) { showError(messageInput, errors.message, "Message must contain at least 10 characters."); valid = false; }

        return { valid, data };
    }

    function setStatus(message, type = "") {
        if (!statusElement) return;
        statusElement.textContent = message;
        statusElement.className = "form-status" + (type ? ` ${type}` : "");
    }

    function setLoading(loading) {
        if (submitButton) {
            submitButton.disabled = loading;
            submitButton.setAttribute("aria-busy", String(loading));
        }
        if (submitText) submitText.textContent = loading ? "TRANSMITTING..." : "SEND MESSAGE";
    }

    function mailto(data) {
        const body = [`Name: ${data.name}`, `Email: ${data.email}`, "", data.message].join("\n");
        return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    }

    async function saveToSupabase(data) {
        const client = window.supabaseClient;
        if (!client) return { success: false, reason: "not-configured" };

        const payload = { name: data.name, email: data.email, subject: data.subject, message: data.message };
        const tables = ["contact_messages", "contact_message"];

        for (const table of tables) {
            try {
                const request = client.from(table).insert(payload);
                const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), SUPABASE_TIMEOUT_MS));
                const { error } = await Promise.race([request, timeout]);
                if (!error) return { success: true, reason: "saved" };
            } catch (error) {
                console.warn(`[Contact] ${table} unavailable.`, error);
            }
        }
        return { success: false, reason: "database-unavailable" };
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (honeypotInput?.value.trim()) return;

        const result = validate();
        if (!result.valid) {
            setStatus("Please fix the highlighted fields.", "error");
            return;
        }

        setLoading(true);
        setStatus("SECURE CHANNEL: CONNECTING...", "loading");

        const saved = await saveToSupabase(result.data);
        if (saved.success) {
            form.reset();
            clearErrors();
            setLoading(false);
            setStatus("Message received. I'll get back to you soon.", "success");
            return;
        }

        setLoading(false);
        setStatus("Database is unavailable. Opening your email app instead.", "error");
        window.setTimeout(() => { window.location.href = mailto(result.data); }, 250);
    });

    [
        [nameInput, errors.name], [emailInput, errors.email],
        [subjectInput, errors.subject], [messageInput, errors.message]
    ].forEach(([input, error]) => {
        input?.addEventListener("input", () => {
            clearError(input, error);
            if (statusElement) setStatus("");
        });
    });

    console.log("%c[CONTACT]%c secure contact flow initialized.", "color:#64f3b0;font-weight:bold;", "color:inherit");
})();
