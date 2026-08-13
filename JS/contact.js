/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   contact.js
   ---------------------------------------------------------
   Contact form with:
   - Client-side validation
   - Honeypot spam protection
   - Supabase database submission
   - Safe mailto fallback
   - Loading / success / error states
========================================================= */

(function () {
    "use strict";

    const CONTACT_EMAIL = "bajgaisandesh8@gmail.com";
    const SUPABASE_TIMEOUT_MS = 8000;

    const form = document.getElementById("contactForm");
    if (!form) {
        console.warn("[Contact] Contact form not found.");
        return;
    }

    const nameInput = document.getElementById("cf-name");
    const emailInput = document.getElementById("cf-email");
    const subjectInput = document.getElementById("cf-subject");
    const messageInput = document.getElementById("cf-message");
    const honeypotInput = document.getElementById("cf-website");
    const statusElement = document.getElementById("cfStatus");
    const submitButton = document.getElementById("cfSubmit");
    const submitText = document.getElementById("cfSubmitText");

    const errors = {
        name: document.getElementById("err-name"),
        email: document.getElementById("err-email"),
        subject: document.getElementById("err-subject"),
        message: document.getElementById("err-message")
    };

    function showError(input, errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add("visible");
        }
        if (input) {
            input.classList.add("input-error");
            input.setAttribute("aria-invalid", "true");
        }
    }

    function clearError(input, errorElement) {
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove("visible");
        }
        if (input) {
            input.classList.remove("input-error");
            input.removeAttribute("aria-invalid");
        }
    }

    function clearAllErrors() {
        clearError(nameInput, errors.name);
        clearError(emailInput, errors.email);
        clearError(subjectInput, errors.subject);
        clearError(messageInput, errors.message);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm() {
        clearAllErrors();

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const subject = subjectInput ? subjectInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";
        let valid = true;

        if (name.length < 2) {
            showError(nameInput, errors.name, "Please enter your name.");
            valid = false;
        }
        if (!isValidEmail(email)) {
            showError(emailInput, errors.email, "Please enter a valid email address.");
            valid = false;
        }
        if (subject.length < 3) {
            showError(subjectInput, errors.subject, "Please enter a subject.");
            valid = false;
        }
        if (message.length < 10) {
            showError(messageInput, errors.message, "Message must contain at least 10 characters.");
            valid = false;
        }

        return { valid, name, email, subject, message };
    }

    function setStatus(message, type = "") {
        if (!statusElement) return;
        statusElement.textContent = message;
        statusElement.className = "form-status";
        if (type) statusElement.classList.add(type);
    }

    function setLoading(loading) {
        if (submitButton) submitButton.disabled = loading;
        if (submitText) submitText.textContent = loading ? "SENDING..." : "SEND MESSAGE";
    }

    function createMailto(data) {
        const body = [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            "",
            data.message
        ].join("\n");

        return (
            "mailto:" + CONTACT_EMAIL +
            "?subject=" + encodeURIComponent(data.subject) +
            "&body=" + encodeURIComponent(body)
        );
    }

    async function submitToSupabase(data) {
        const client = window.supabaseClient;

        if (!client) {
            return { success: false, reason: "not-configured" };
        }

        try {
            const request = client
                .from("contact_messages")
                .insert({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message
                });

            const timeout = new Promise((_, reject) => {
                window.setTimeout(
                    () => reject(new Error("Supabase request timed out.")),
                    SUPABASE_TIMEOUT_MS
                );
            });

            const { error } = await Promise.race([request, timeout]);

            if (error) {
                console.warn("[Supabase] Contact submission failed:", error);
                return { success: false, reason: "database-error" };
            }

            return { success: true, reason: "saved" };
        } catch (error) {
            console.warn("[Supabase] Contact request failed:", error);
            return { success: false, reason: "request-error" };
        }
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (honeypotInput && honeypotInput.value.trim()) {
            console.warn("[Contact] Spam submission blocked.");
            return;
        }

        const data = validateForm();
        if (!data.valid) {
            setStatus("Please fix the highlighted fields.", "error");
            return;
        }

        setLoading(true);
        setStatus("Sending your message...", "loading");

        const result = await submitToSupabase(data);

        if (result.success) {
            setStatus("Message sent successfully.", "success");
            form.reset();
            clearAllErrors();
            setLoading(false);
            return;
        }

        setStatus("Database unavailable — opening your email application...", "success");
        window.location.href = createMailto(data);

        window.setTimeout(function () {
            setLoading(false);
        }, 1500);
    });

    [
        { input: nameInput, error: errors.name },
        { input: emailInput, error: errors.email },
        { input: subjectInput, error: errors.subject },
        { input: messageInput, error: errors.message }
    ].forEach(function (field) {
        if (!field.input) return;

        field.input.addEventListener("input", function () {
            clearError(field.input, field.error);
            if (statusElement) setStatus("");
        });
    });

    console.log("%c[CONTACT]%c initialized.", "color:#64f3b0;font-weight:bold;", "color:inherit;");
})();
