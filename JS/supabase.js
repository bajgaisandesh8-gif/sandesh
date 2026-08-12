/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   supabase.js
   ---------------------------------------------------------
   Handles:
   - Supabase client initialization
   - Public configuration
   - Safe availability check
   - Future database features
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       SUPABASE CONFIGURATION
    ===================================================== */

    /*
     * IMPORTANT:
     *
     * Replace these with your Supabase PROJECT URL
     * and PUBLIC ANON KEY.
     *
     * NEVER put the service_role key in this file.
     */

    const SUPABASE_URL = "";

    const SUPABASE_ANON_KEY = "";


    /* =====================================================
       GLOBAL CONFIG
    ===================================================== */

    window.SUPABASE_CONFIG = {

        url:
            SUPABASE_URL,

        anonKey:
            SUPABASE_ANON_KEY,

        enabled:
            Boolean(
                SUPABASE_URL &&
                SUPABASE_ANON_KEY
            )
    };


    /* =====================================================
       CLIENT INITIALIZATION
    ===================================================== */

    function initializeSupabase() {

        /*
         * Supabase library hasn't loaded.
         */

        if (
            typeof window.supabase ===
            "undefined"
        ) {

            console.warn(
                "[Supabase] Supabase library not loaded."
            );

            window.supabaseClient =
                null;

            return;
        }


        /*
         * No credentials yet.
         *
         * This is completely fine.
         * The portfolio can work without Supabase.
         */

        if (
            !SUPABASE_URL ||
            !SUPABASE_ANON_KEY
        ) {

            console.info(
                "[Supabase] No credentials configured. Running in local mode."
            );

            window.supabaseClient =
                null;

            return;
        }


        /*
         * Create client.
         */

        try {

            window.supabaseClient =
                window.supabase.createClient(
                    SUPABASE_URL,
                    SUPABASE_ANON_KEY
                );


            console.log(
                "%c[SUPABASE]%c connected.",
                "color:#64f3b0;font-weight:bold;",
                "color:inherit;"
            );

        } catch (error) {

            console.error(
                "[Supabase] Client initialization failed:",
                error
            );

            window.supabaseClient =
                null;
        }
    }


    /* =====================================================
       INITIALIZE AFTER DOM LOAD
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSupabase
        );

    } else {

        initializeSupabase();
    }


    /* =====================================================
       CONNECTION CHECK
    ===================================================== */

    window.checkSupabaseConnection =
        async function () {

            if (
                !window.supabaseClient
            ) {

                return {

                    connected: false,

                    reason:
                        "Supabase client is not configured."
                };
            }


            try {

                /*
                 * We don't make an unnecessary
                 * database query here.
                 *
                 * Successful client creation means
                 * the client is available.
                 */

                return {

                    connected: true,

                    reason:
                        "Supabase client initialized."
                };

            } catch (error) {

                return {

                    connected: false,

                    reason:
                        error.message
                };
            }
        };


    /* =====================================================
       FUTURE DATABASE HELPERS
    ===================================================== */

    window.PortfolioSupabase = {

        /*
         * Check whether Supabase is available.
         */

        isAvailable: function () {

            return Boolean(
                window.supabaseClient
            );
        },


        /*
         * Get the current client.
         */

        getClient: function () {

            return (
                window.supabaseClient ||
                null
            );
        }

    };


})();
