/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   contact.js
   ---------------------------------------------------------
   Handles:
   - Contact form validation
   - Error messages
   - Honeypot spam protection
   - Loading state
   - Supabase-ready submission
   - Mailto fallback
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const CONTACT_EMAIL =
        "bajgaisandesh8@gmail.com";


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) {

        console.warn(
            "[Contact] Contact form not found."
        );

        return;
    }


    const nameInput =
        document.getElementById(
            "cf-name"
        );

    const emailInput =
        document.getElementById(
            "cf-email"
        );

    const subjectInput =
        document.getElementById(
            "cf-subject"
        );

    const messageInput =
        document.getElementById(
            "cf-message"
        );

    const honeypotInput =
        document.getElementById(
            "cf-website"
        );


    const statusElement =
        document.getElementById(
            "cfStatus"
        );

    const submitButton =
        document.getElementById(
            "cfSubmit"
        );

    const submitText =
        document.getElementById(
            "cfSubmitText"
        );


    /* =====================================================
       ERROR ELEMENTS
    ===================================================== */

    const errors = {

        name:
            document.getElementById(
                "err-name"
            ),

        email:
            document.getElementById(
                "err-email"
            ),

        subject:
            document.getElementById(
                "err-subject"
            ),

        message:
            document.getElementById(
                "err-message"
            )

    };


    /* =====================================================
       UTILITY: SHOW ERROR
    ===================================================== */

    function showError(
        input,
        errorElement,
        message
    ) {

        if (errorElement) {

            errorElement.textContent =
                message;

            errorElement.classList.add(
                "visible"
            );
        }


        if (input) {

            input.classList.add(
                "input-error"
            );

            input.setAttribute(
                "aria-invalid",
                "true"
            );
        }
    }


    /* =====================================================
       UTILITY: CLEAR ERROR
    ===================================================== */

    function clearError(
        input,
        errorElement
    ) {

        if (errorElement) {

            errorElement.textContent =
                "";

            errorElement.classList.remove(
                "visible"
            );
        }


        if (input) {

            input.classList.remove(
                "input-error"
            );

            input.removeAttribute(
                "aria-invalid"
            );
        }
    }


    /* =====================================================
       CLEAR ALL ERRORS
    ===================================================== */

    function clearAllErrors() {

        clearError(
            nameInput,
            errors.name
        );

        clearError(
            emailInput,
            errors.email
        );

        clearError(
            subjectInput,
            errors.subject
        );

        clearError(
            messageInput,
            errors.message
        );
    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(
        email
    ) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);
    }


    /* =====================================================
       VALIDATE FORM
    ===================================================== */

    function validateForm() {

        clearAllErrors();


        const name =
            nameInput
                ? nameInput.value.trim()
                : "";


        const email =
            emailInput
                ? emailInput.value.trim()
                : "";


        const subject =
            subjectInput
                ? subjectInput.value.trim()
                : "";


        const message =
            messageInput
                ? messageInput.value.trim()
                : "";


        let valid = true;


        /* NAME */

        if (name.length < 2) {

            showError(
                nameInput,
                errors.name,
                "Please enter your name."
            );

            valid = false;
        }


        /* EMAIL */

        if (!isValidEmail(email)) {

            showError(
                emailInput,
                errors.email,
                "Please enter a valid email address."
            );

            valid = false;
        }


        /* SUBJECT */

        if (subject.length < 3) {

            showError(
                subjectInput,
                errors.subject,
                "Please enter a subject."
            );

            valid = false;
        }


        /* MESSAGE */

        if (message.length < 10) {

            showError(
                messageInput,
                errors.message,
                "Message must contain at least 10 characters."
            );

            valid = false;
        }


        return {

            valid,

            name,

            email,

            subject,

            message
        };
    }


    /* =====================================================
       STATUS MESSAGE
    ===================================================== */

    function setStatus(
        message,
        type = ""
    ) {

        if (!statusElement) {
            return;
        }


        statusElement.textContent =
            message;


        statusElement.className =
            "form-status";


        if (type) {

            statusElement.classList.add(
                type
            );
        }
    }


    /* =====================================================
       BUTTON LOADING STATE
    ===================================================== */

    function setLoading(
        loading
    ) {

        if (submitButton) {

            submitButton.disabled =
                loading;
        }


        if (!submitText) {
            return;
        }


        if (loading) {

            submitText.textContent =
                "OPENING EMAIL...";

        } else {

            submitText.textContent =
                "SEND MESSAGE";
        }
    }


    /* =====================================================
       CREATE MAILTO
    ===================================================== */

    function createMailto(
        data
    ) {

        const body = [

            `Name: ${data.name}`,

            `Email: ${data.email}`,

            "",

            data.message

        ].join("\n");


        return (
            "mailto:" +
            CONTACT_EMAIL +
            "?subject=" +
            encodeURIComponent(
                data.subject
            ) +
            "&body=" +
            encodeURIComponent(
                body
            )
        );
    }


    /* =====================================================
       SUPABASE SUBMISSION
    ===================================================== */

    async function submitToSupabase(
        data
    ) {

        /*
         * Supabase is optional.
         *
         * We only use it when a client exists.
         */

        if (
            !window.supabaseClient
        ) {

            return false;
        }


        /*
         * IMPORTANT:
         *
         * This assumes you eventually create:
         *
         * contact_messages
         *
         * in Supabase.
         *
         * Until then, return false and use
         * the mailto fallback.
         */


        try {

            const {
                error
            } =
                await window.supabaseClient
                    .from(
                        "contact_messages"
                    )
                    .insert([
                        {

                            name:
                                data.name,

                            email:
                                data.email,

                            subject:
                                data.subject,

                            message:
                                data.message
                        }
                    ]);


            if (error) {

                console.warn(
                    "[Supabase] Contact submission failed:",
                    error
                );

                return false;
            }


            return true;

        } catch (error) {

            console.warn(
                "[Supabase] Contact request failed:",
                error
            );

            return false;
        }
    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /*
             * Honeypot:
             *
             * Normal users never see this field.
             * Bots often fill every input.
             */

            if (
                honeypotInput &&
                honeypotInput.value.trim()
            ) {

                console.warn(
                    "[Contact] Spam submission blocked."
                );

                return;
            }


            const data =
                validateForm();


            if (!data.valid) {

                setStatus(
                    "Please fix the highlighted fields.",
                    "error"
                );

                return;
            }


            setLoading(true);


            setStatus(
                "Sending your message...",
                "loading"
            );


            /*
             * First attempt Supabase.
             */

            const supabaseSuccess =
                await submitToSupabase(
                    data
                );


            if (supabaseSuccess) {

                setStatus(
                    "Message sent successfully.",
                    "success"
                );


                form.reset();

                clearAllErrors();

                setLoading(false);

                return;
            }


            /*
             * FALLBACK
             *
             * If Supabase isn't configured,
             * open the user's email application.
             */

            const mailto =
                createMailto(data);


            setStatus(
                "Opening your email application...",
                "success"
            );


            window.location.href =
                mailto;


            window.setTimeout(
                function () {

                    setLoading(false);

                },
                1500
            );
        }
    );


    /* =====================================================
       LIVE VALIDATION
    ===================================================== */

    const inputs = [

        {
            input: nameInput,
            error: errors.name
        },

        {
            input: emailInput,
            error: errors.email
        },

        {
            input: subjectInput,
            error: errors.subject
        },

        {
            input: messageInput,
            error: errors.message
        }

    ];


    inputs.forEach(
        function (field) {

            if (!field.input) {
                return;
            }


            field.input.addEventListener(
                "input",
                function () {

                    clearError(
                        field.input,
                        field.error
                    );


                    if (statusElement) {

                        setStatus("");
                    }
                }
            );
        }
    );


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "%c[CONTACT]%c initialized.",
        "color:#64f3b0;font-weight:bold;",
        "color:inherit;"
    );

})();
