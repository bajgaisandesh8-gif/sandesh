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
    ===================================================== */

    const SUPABASE_URL = "https://gcxxnyrocdjilnteezkt.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_R-wc8U-GTylEdMGNiIYeVQ_zvy0sVLz";

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
            // A lightweight authenticated client check. The actual database
            // availability is verified by the feature-specific queries.
            const { error } = await window.supabaseClient
                .from("site_settings")
                .select("setting_key")
                .limit(1);

            if (error) {
                return {
                    connected: false,
                    reason: error.message
                };
            }

            return {
                connected: true,
                reason: "Supabase database is reachable."
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

    /* =====================================================
       OPTIONAL REMOTE CONTENT MODULE
       -----------------------------------------------------
       Loaded after this client is initialized. It never replaces
       static portfolio content with an empty/error response.
    ===================================================== */

    function loadRemoteContentModule() {
        const existing = document.querySelector(
            'script[data-supabase-content-loader="true"]'
        );

        if (existing) return;

        const script = document.createElement("script");
        script.src = "JS/supabase-content.js";
        script.async = true;
        script.dataset.supabaseContentLoader = "true";
        script.onerror = function () {
            console.warn("[Supabase] Optional content loader could not be loaded. Static content remains active.");
        };
        document.head.appendChild(script);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadRemoteContentModule, { once: true });
    } else {
        loadRemoteContentModule();
    }
})();
