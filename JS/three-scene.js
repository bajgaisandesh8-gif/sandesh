/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   three-scene.js
   ---------------------------------------------------------
   Hero 3D network / particle background
   Requires Three.js
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       WAIT FOR DOM
    ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeHeroScene
    );


    /* =====================================================
       MAIN INITIALIZATION
    ===================================================== */

    function initializeHeroScene() {

        const canvas =
            document.getElementById(
                "heroCanvas"
            );


        if (!canvas) {

            console.warn(
                "[Three Scene] #heroCanvas not found."
            );

            return;
        }


        /* =================================================
           CHECK THREE.JS
        ================================================= */

        if (
            typeof THREE === "undefined"
        ) {

            console.warn(
                "[Three Scene] Three.js is not loaded."
            );

            return;
        }


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           SCENE
        ================================================= */

        const scene =
            new THREE.Scene();


        scene.fog =
            new THREE.FogExp2(
                0x02060a,
                0.0018
            );


        /* =================================================
           CAMERA
        ================================================= */

        const camera =
            new THREE.PerspectiveCamera(
                55,
                window.innerWidth /
                    window.innerHeight,
                0.1,
                1000
            );


        camera.position.z = 45;


        /* =================================================
           RENDERER
        ================================================= */

        const renderer =
            new THREE.WebGLRenderer({

                canvas: canvas,

                alpha: true,

                antialias: true,

                powerPreference:
                    "high-performance"
            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.outputEncoding =
            THREE.sRGBEncoding;


        /* =================================================
           PARTICLE SETTINGS
        ================================================= */

        const isMobile =
            window.innerWidth < 768;


        const particleCount =
            isMobile
                ? 180
                : 420;


        const connectionDistance =
            isMobile
                ? 7
                : 8;


        const spread =
            isMobile
                ? 45
                : 65;


        /* =================================================
           PARTICLE GEOMETRY
        ================================================= */

        const particleGeometry =
            new THREE.BufferGeometry();


        const positions =
            new Float32Array(
                particleCount * 3
            );


        const velocities =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const index = i * 3;


            positions[index] =
                (Math.random() - 0.5) *
                spread;


            positions[index + 1] =
                (Math.random() - 0.5) *
                spread;


            positions[index + 2] =
                (Math.random() - 0.5) *
                spread;


            velocities[index] =
                (Math.random() - 0.5) *
                0.002;


            velocities[index + 1] =
                (Math.random() - 0.5) *
                0.002;


            velocities[index + 2] =
                (Math.random() - 0.5) *
                0.002;
        }


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        /* =================================================
           PARTICLE MATERIAL
        ================================================= */

        const particleMaterial =
            new THREE.PointsMaterial({

                color: 0x64f3b0,

                size:
                    isMobile
                        ? 0.16
                        : 0.19,

                transparent: true,

                opacity: 0.72,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending
            });


        /* =================================================
           PARTICLE SYSTEM
        ================================================= */

        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );


        scene.add(
            particles
        );


        /* =================================================
           CONNECTION LINES
        ================================================= */

        const lineGeometry =
            new THREE.BufferGeometry();


        const maxLines =
            Math.min(
                particleCount *
                particleCount,
                isMobile
                    ? 3500
                    : 7000
            );


        const linePositions =
            new Float32Array(
                maxLines * 6
            );


        lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                linePositions,
                3
            )
        );


        const lineMaterial =
            new THREE.LineBasicMaterial({

                color: 0x64f3b0,

                transparent: true,

                opacity: 0.11,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending
            });


        const lines =
            new THREE.LineSegments(
                lineGeometry,
                lineMaterial
            );


        scene.add(
            lines
        );


        /* =================================================
           MOUSE
        ================================================= */

        const mouse = {

            x: 0,

            y: 0,

            targetX: 0,

            targetY: 0
        };


        window.addEventListener(
            "pointermove",
            function (event) {

                mouse.targetX =
                    (
                        event.clientX /
                        window.innerWidth
                    ) *
                    2 -
                    1;


                mouse.targetY =
                    -(
                        event.clientY /
                        window.innerHeight
                    ) *
                    2 +
                    1;
            },
            {
                passive: true
            }
        );


        /* =================================================
           RESIZE
        ================================================= */

        function resize() {

            const width =
                window.innerWidth;

            const height =
                window.innerHeight;


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );


            renderer.setSize(
                width,
                height
            );
        }


        window.addEventListener(
            "resize",
            resize
        );


        /* =================================================
           VISIBILITY
        ================================================= */

        let pageVisible =
            !document.hidden;


        document.addEventListener(
            "visibilitychange",
            function () {

                pageVisible =
                    !document.hidden;
            }
        );


        /* =================================================
           ANIMATION
        ================================================= */

        let animationFrame;


        function animate() {

            animationFrame =
                requestAnimationFrame(
                    animate
                );


            if (!pageVisible) {
                return;
            }


            /* ---------------------------------------------
               Reduced motion
            --------------------------------------------- */

            if (
                !reducedMotion
            ) {

                mouse.x +=
                    (
                        mouse.targetX -
                        mouse.x
                    ) *
                    0.025;


                mouse.y +=
                    (
                        mouse.targetY -
                        mouse.y
                    ) *
                    0.025;


                particles.rotation.y +=
                    0.00035;


                particles.rotation.x +=
                    0.00008;


                /*
                 * Mouse influence
                 */

                particles.rotation.y +=
                    mouse.x *
                    0.0008;


                particles.rotation.x +=
                    mouse.y *
                    0.0004;
            }


            /* =================================================
               UPDATE PARTICLES
            ================================================= */

            const positionAttribute =
                particleGeometry
                    .attributes
                    .position;


            const positionArray =
                positionAttribute.array;


            if (
                !reducedMotion
            ) {

                for (
                    let i = 0;
                    i < particleCount;
                    i++
                ) {

                    const index =
                        i * 3;


                    positionArray[index] +=
                        velocities[index];


                    positionArray[index + 1] +=
                        velocities[index + 1];


                    positionArray[index + 2] +=
                        velocities[index + 2];


                    /*
                     * Wrap particles around
                     * the scene boundaries.
                     */

                    if (
                        positionArray[index] >
                        spread / 2
                    ) {

                        positionArray[index] =
                            -spread / 2;
                    }


                    if (
                        positionArray[index] <
                        -spread / 2
                    ) {

                        positionArray[index] =
                            spread / 2;
                    }


                    if (
                        positionArray[index + 1] >
                        spread / 2
                    ) {

                        positionArray[index + 1] =
                            -spread / 2;
                    }


                    if (
                        positionArray[index + 1] <
                        -spread / 2
                    ) {

                        positionArray[index + 1] =
                            spread / 2;
                    }


                    if (
                        positionArray[index + 2] >
                        spread / 2
                    ) {

                        positionArray[index + 2] =
                            -spread / 2;
                    }


                    if (
                        positionArray[index + 2] <
                        -spread / 2
                    ) {

                        positionArray[index + 2] =
                            spread / 2;
                    }
                }


                positionAttribute.needsUpdate =
                    true;
            }


            /* =================================================
               BUILD CONNECTIONS
            ================================================= */

            let lineIndex = 0;


            for (
                let i = 0;
                i < particleCount;
                i++
            ) {

                const ax =
                    positionArray[i * 3];

                const ay =
                    positionArray[i * 3 + 1];

                const az =
                    positionArray[i * 3 + 2];


                /*
                 * Limit neighbour checks.
                 * This prevents unnecessary work.
                 */

                for (
                    let j = i + 1;
                    j < particleCount;
                    j++
                ) {

                    const bx =
                        positionArray[j * 3];

                    const by =
                        positionArray[j * 3 + 1];

                    const bz =
                        positionArray[j * 3 + 2];


                    const dx =
                        ax - bx;

                    const dy =
                        ay - by;

                    const dz =
                        az - bz;


                    const distanceSquared =
                        dx * dx +
                        dy * dy +
                        dz * dz;


                    if (
                        distanceSquared <
                        connectionDistance *
                        connectionDistance
                    ) {

                        if (
                            lineIndex + 6 >=
                            maxLines * 6
                        ) {

                            break;
                        }


                        linePositions[lineIndex++] =
                            ax;

                        linePositions[lineIndex++] =
                            ay;

                        linePositions[lineIndex++] =
                            az;


                        linePositions[lineIndex++] =
                            bx;

                        linePositions[lineIndex++] =
                            by;

                        linePositions[lineIndex++] =
                            bz;
                    }
                }


                if (
                    lineIndex >=
                    maxLines * 6
                ) {

                    break;
                }
            }


            lineGeometry.setDrawRange(
                0,
                lineIndex / 3
            );


            lineGeometry.attributes
                .position
                .needsUpdate = true;


            /* =================================================
               CAMERA MOVEMENT
            ================================================= */

            if (
                !reducedMotion
            ) {

                camera.position.x +=
                    (
                        mouse.x * 2.5 -
                        camera.position.x
                    ) *
                    0.008;


                camera.position.y +=
                    (
                        mouse.y * 1.5 -
                        camera.position.y
                    ) *
                    0.008;


                camera.lookAt(
                    0,
                    0,
                    0
                );
            }


            /* =================================================
               RENDER
            ================================================= */

            renderer.render(
                scene,
                camera
            );
        }


        animate();


        /* =================================================
           CLEANUP
        ================================================= */

        window.addEventListener(
            "beforeunload",
            function () {

                cancelAnimationFrame(
                    animationFrame
                );


                particleGeometry.dispose();

                particleMaterial.dispose();

                lineGeometry.dispose();

                lineMaterial.dispose();

                renderer.dispose();
            }
        );


        console.log(
            "%c[THREE-SCENE]%c Hero 3D scene initialized.",
            "color:#64f3b0;font-weight:bold;",
            "color:inherit;"
        );
    }

})();
