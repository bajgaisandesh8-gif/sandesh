/* =========================================================
   SANDESH BAJGAI PORTFOLIO — CONTACT
   ---------------------------------------------------------
   Client-side validation + honeypot + explicit email fallback.
   Ambiguous database outcomes never trigger an automatic resend.
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
        statusElement.replaceChildren(document.createTextNode(message));
        statusElement.className = "form-status" + (type ? ` ${type}` : "");
    }

    function setEmailFallback(data, message) {
        if (!statusElement) return;
        statusElement.replaceChildren(document.createTextNode(message + " "));
        const link = document.createElement("a");
        link.href = mailto(data);
        link.textContent = "Open an email draft";
        link.className = "contact-email-fallback";
        statusElement.appendChild(link);
        statusElement.className = "form-status error";
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
        if (!client) return { outcome: "unavailable" };

        const payload = { name: data.name, email: data.email, subject: data.subject, message: data.message };
        const controller = new AbortController();
        let timeoutId;

        try {
            const request = client
                .from("contact_messages")
                .insert(payload)
                .abortSignal(controller.signal);

            const timeout = new Promise((_, reject) => {
                timeoutId = window.setTimeout(() => {
                    controller.abort();
                    reject(new Error("Contact request timed out; server outcome is unknown."));
                }, SUPABASE_TIMEOUT_MS);
            });

            const result = await Promise.race([request, timeout]);
            if (!result.error) return { outcome: "saved" };

            const status = Number(result.error.status);
            if (status >= 400 && status < 500) {
                return { outcome: "rejected", error: result.error };
            }
            return { outcome: "unknown", error: result.error };
        } catch (error) {
            console.warn("[Contact] Submission outcome could not be confirmed.", error);
            return { outcome: "unknown", error };
        } finally {
            if (timeoutId) window.clearTimeout(timeoutId);
        }
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
        setLoading(false);

        if (saved.outcome === "saved") {
            form.reset();
            clearErrors();
            setStatus("Message received. I'll get back to you soon.", "success");
            return;
        }

        if (saved.outcome === "rejected" || saved.outcome === "unavailable") {
            setEmailFallback(result.data, "The database did not accept the message. You can send it directly instead:");
            return;
        }

        // A timeout/network failure is ambiguous: the insert may have reached
        // the server. Never auto-open email or silently retry, which could duplicate it.
        setEmailFallback(
            result.data,
            "I couldn't confirm whether the message was saved. Don't submit it again yet; use the email draft only if you decide to send it separately."
        );
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

    console.log("%c[CONTACT]%c single-attempt contact flow initialized.", "color:#64f3b0;font-weight:bold;", "color:inherit");
})();
