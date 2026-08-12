/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   three-profile.js
   ---------------------------------------------------------
   3D profile image environment
   - Floating particles
   - Rotating rings
   - Orbiting nodes
   - Mouse interaction
   - Responsive rendering
   - Reduced-motion support

   Requires:
   - Three.js
   - #profileCanvas
   - #profileImg
========================================================= */

(function () {
    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        initializeProfileScene
    );


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    function initializeProfileScene() {

        const canvas =
            document.getElementById(
                "profileCanvas"
            );


        const profileImage =
            document.getElementById(
                "profileImg"
            );


        if (!canvas) {

            console.warn(
                "[Three Profile] #profileCanvas not found."
            );

            return;
        }


        if (
            typeof THREE === "undefined"
        ) {

            console.warn(
                "[Three Profile] Three.js is not loaded."
            );

            return;
        }


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           CONTAINER
        ================================================= */

        const container =
            canvas.parentElement;


        if (!container) {
            return;
        }


        /* =================================================
           SCENE
        ================================================= */

        const scene =
            new THREE.Scene();


        /* =================================================
           CAMERA
        ================================================= */

        const camera =
            new THREE.PerspectiveCamera(
                45,
                1,
                0.1,
                100
            );


        camera.position.z = 9;


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


        renderer.setClearColor(
            0x000000,
            0
        );


        /* =================================================
           MAIN GROUP
        ================================================= */

        const profileGroup =
            new THREE.Group();


        scene.add(
            profileGroup
        );


        /* =================================================
           RING CREATION
        ================================================= */

        function createRing(
            radius,
            tube,
            rotationX,
            rotationY,
            rotationZ,
            opacity
        ) {

            const geometry =
                new THREE.TorusGeometry(
                    radius,
                    tube,
                    16,
                    96
                );


            const material =
                new THREE.MeshBasicMaterial({

                    color: 0x64f3b0,

                    transparent: true,

                    opacity: opacity,

                    wireframe: true
                });


            const ring =
                new THREE.Mesh(
                    geometry,
                    material
                );


            ring.rotation.x =
                rotationX;

            ring.rotation.y =
                rotationY;

            ring.rotation.z =
                rotationZ;


            profileGroup.add(
                ring
            );


            return ring;
        }


        /* =================================================
           RINGS
        ================================================= */

        const ringOne =
            createRing(
                3.05,
                0.018,
                Math.PI / 2.4,
                0.25,
                0,
                0.28
            );


        const ringTwo =
            createRing(
                3.35,
                0.014,
                Math.PI / 2.1,
                -0.35,
                0.5,
                0.18
            );


        const ringThree =
            createRing(
                3.65,
                0.01,
                1.1,
                0.8,
                0.2,
                0.12
            );


        /* =================================================
           ORBITING NODES
        ================================================= */

        const nodeGroup =
            new THREE.Group();


        profileGroup.add(
            nodeGroup
        );


        const nodeGeometry =
            new THREE.SphereGeometry(
                0.055,
                8,
                8
            );


        const nodeMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x64f3b0,

                transparent: true,

                opacity: 0.85
            });


        const nodes = [];

        const nodeCount = 18;


        for (
            let i = 0;
            i < nodeCount;
            i++
        ) {

            const node =
                new THREE.Mesh(
                    nodeGeometry,
                    nodeMaterial
                );


            const angle =
                (
                    i /
                    nodeCount
                ) *
                Math.PI *
                2;


            const radius =
                3.05 +
                (
                    i % 3
                ) *
                0.18;


            node.position.x =
                Math.cos(angle) *
                radius;


            node.position.y =
                Math.sin(angle) *
                radius;


            node.position.z =
                (
                    Math.random() -
                    0.5
                ) *
                1.2;


            node.userData = {

                angle: angle,

                radius: radius,

                speed:
                    0.0008 +
                    Math.random() *
                    0.001
            };


            nodeGroup.add(
                node
            );


            nodes.push(
                node
            );
        }


        /* =================================================
           ORBIT LINES
        ================================================= */

        const orbitGeometry =
            new THREE.BufferGeometry();


        const orbitPositions =
            new Float32Array(
                nodeCount * 6
            );


        orbitGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                orbitPositions,
                3
            )
        );


        const orbitMaterial =
            new THREE.LineBasicMaterial({

                color: 0x64f3b0,

                transparent: true,

                opacity: 0.16,

                depthWrite: false
            });


        const orbitLines =
            new THREE.LineSegments(
                orbitGeometry,
                orbitMaterial
            );


        profileGroup.add(
            orbitLines
        );


        /* =================================================
           PARTICLES
        ================================================= */

        const particleCount =
            window.innerWidth < 768
                ? 80
                : 150;


        const particlePositions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const index =
                i * 3;


            const angle =
                Math.random() *
                Math.PI *
                2;


            const radius =
                3.5 +
                Math.random() *
                2.2;


            particlePositions[index] =
                Math.cos(angle) *
                radius;


            particlePositions[index + 1] =
                (
                    Math.random() -
                    0.5
                ) *
                6;


            particlePositions[index + 2] =
                (
                    Math.random() -
                    0.5
                ) *
                3;
        }


        const particleGeometry =
            new THREE.BufferGeometry();


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                particlePositions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({

                color: 0x64f3b0,

                size: 0.045,

                transparent: true,

                opacity: 0.5,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending
            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );


        profileGroup.add(
            particles
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

            const rect =
                container.getBoundingClientRect();


            const width =
                Math.max(
                    rect.width,
                    1
                );


            const height =
                Math.max(
                    rect.height,
                    1
                );


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
                height,
                false
            );
        }


        resize();


        window.addEventListener(
            "resize",
            resize
        );


        /* =================================================
           INTERSECTION OBSERVER
        ================================================= */

        let visible = true;


        if (
            "IntersectionObserver" in
            window
        ) {

            const observer =
                new IntersectionObserver(
                    function (entries) {

                        visible =
                            entries[0]
                                .isIntersecting;
                    },
                    {
                        threshold: 0
                    }
                );


            observer.observe(
                container
            );
        }


        /* =================================================
           ANIMATION
        ================================================= */

        let frame;


        function animate(
            time
        ) {

            frame =
                requestAnimationFrame(
                    animate
                );


            if (!visible) {
                return;
            }


            /* ---------------------------------------------
               Mouse smoothing
            --------------------------------------------- */

            if (
                !reducedMotion
            ) {

                mouse.x +=
                    (
                        mouse.targetX -
                        mouse.x
                    ) *
                    0.04;


                mouse.y +=
                    (
                        mouse.targetY -
                        mouse.y
                    ) *
                    0.04;
            }


            /* ---------------------------------------------
               Main group movement
            --------------------------------------------- */

            if (
                !reducedMotion
            ) {

                profileGroup.rotation.y =
                    mouse.x * 0.08;


                profileGroup.rotation.x =
                    -mouse.y * 0.04;
            }


            /* ---------------------------------------------
               Ring animations
            --------------------------------------------- */

            if (
                !reducedMotion
            ) {

                ringOne.rotation.z +=
                    0.0015;


                ringTwo.rotation.x +=
                    0.001;


                ringTwo.rotation.z -=
                    0.0012;


                ringThree.rotation.y +=
                    0.0008;
            }


            /* ---------------------------------------------
               Orbit nodes
            --------------------------------------------- */

            for (
                let i = 0;
                i < nodes.length;
                i++
            ) {

                const node =
                    nodes[i];


                if (
                    !reducedMotion
                ) {

                    node.userData.angle +=
                        node.userData.speed;


                    const angle =
                        node.userData.angle;


                    const radius =
                        node.userData.radius;


                    node.position.x =
                        Math.cos(angle) *
                        radius;


                    node.position.y =
                        Math.sin(angle) *
                        radius;


                    node.position.z =
                        Math.sin(
                            angle * 2
                        ) *
                        0.5;
                }
            }


            /* ---------------------------------------------
               Update orbit lines
            --------------------------------------------- */

            for (
                let i = 0;
                i < nodeCount;
                i++
            ) {

                const node =
                    nodes[i];


                const nextNode =
                    nodes[
                        (
                            i + 1
                        ) %
                        nodeCount
                    ];


                const index =
                    i * 6;


                orbitPositions[index] =
                    node.position.x;


                orbitPositions[index + 1] =
                    node.position.y;


                orbitPositions[index + 2] =
                    node.position.z;


                orbitPositions[index + 3] =
                    nextNode.position.x;


                orbitPositions[index + 4] =
                    nextNode.position.y;


                orbitPositions[index + 5] =
                    nextNode.position.z;
            }


            orbitGeometry
                .attributes
                .position
                .needsUpdate = true;


            /* ---------------------------------------------
               Particle movement
            --------------------------------------------- */

            if (
                !reducedMotion
            ) {

                particles.rotation.y =
                    time * 0.00005;


                particles.rotation.x =
                    Math.sin(
                        time * 0.00015
                    ) * 0.08;
            }


            /* ---------------------------------------------
               Profile image subtle movement
            --------------------------------------------- */

            if (
                profileImage &&
                !reducedMotion
            ) {

                const imageOffset =
                    Math.sin(
                        time * 0.001
                    ) * 2;


                profileImage.style.setProperty(
                    "--profile-float",
                    `${imageOffset}px`
                );
            }


            /* ---------------------------------------------
               Render
            --------------------------------------------- */

            renderer.render(
                scene,
                camera
            );
        }


        animate(
            performance.now()
        );


        /* =================================================
           CLEANUP
        ================================================= */

        window.addEventListener(
            "beforeunload",
            function () {

                cancelAnimationFrame(
                    frame
                );


                ringOne.geometry.dispose();

                ringOne.material.dispose();

                ringTwo.geometry.dispose();

                ringTwo.material.dispose();

                ringThree.geometry.dispose();

                ringThree.material.dispose();

                nodeGeometry.dispose();

                nodeMaterial.dispose();

                particleGeometry.dispose();

                particleMaterial.dispose();

                orbitGeometry.dispose();

                orbitMaterial.dispose();

                renderer.dispose();
            }
        );


        console.log(
            "%c[THREE-PROFILE]%c 3D profile scene initialized.",
            "color:#64f3b0;font-weight:bold;",
            "color:inherit;"
        );
    }

})();
