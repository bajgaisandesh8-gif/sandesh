/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   supabase.js
   ---------------------------------------------------------
   Supabase public client configuration.

   IMPORTANT:
   - The URL and publishable/anon key are intended for browser use.
   - NEVER put the Supabase service_role/secret key here.
   - Database security MUST be enforced with RLS policies.
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       SUPABASE CONFIGURATION
       -----------------------------------------------------
       TODO: Fill these two values with your Supabase project
       URL and publishable (anon) key.
    ===================================================== */

    const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
    const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE";

    const hasPlaceholderCredentials =
        SUPABASE_URL.includes("PASTE_YOUR_") ||
        SUPABASE_ANON_KEY.includes("PASTE_YOUR_");

    window.SUPABASE_CONFIG = {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY,
        enabled: Boolean(
            SUPABASE_URL &&
            SUPABASE_ANON_KEY &&
            !hasPlaceholderCredentials
        )
    };

    /* =====================================================
       CLIENT INITIALIZATION
    ===================================================== */

    function initializeSupabase() {
        if (typeof window.supabase === "undefined") {
            console.warn("[Supabase] Supabase library not loaded.");
            window.supabaseClient = null;
            return;
        }

        if (!window.SUPABASE_CONFIG.enabled) {
            console.info("[Supabase] Credentials not configured. Running in local mode.");
            window.supabaseClient = null;
            return;
        }

        try {
            window.supabaseClient = window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );

            console.log("[SUPABASE] Client initialized.");
        } catch (error) {
            console.error("[Supabase] Client initialization failed:", error);
            window.supabaseClient = null;
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeSupabase);
    } else {
        initializeSupabase();
    }

    /* =====================================================
       CONNECTION CHECK
    ===================================================== */

    window.checkSupabaseConnection = async function () {
        if (!window.supabaseClient) {
            return {
                connected: false,
                reason: "Supabase client is not configured."
            };
        }

        try {
            return {
                connected: true,
                reason: "Supabase client initialized."
            };
        } catch (error) {
            return {
                connected: false,
                reason: error.message
            };
        }
    };

    /* =====================================================
       PORTFOLIO DATABASE HELPER
    ===================================================== */

    window.PortfolioSupabase = {
        isAvailable: function () {
            return Boolean(window.supabaseClient);
        },

        getClient: function () {
            return window.supabaseClient || null;
        }
    };
})();
