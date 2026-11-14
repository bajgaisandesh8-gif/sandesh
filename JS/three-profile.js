/* =========================================================
   SANDESH BAJGAI PORTFOLIO
   three-profile.js
   ---------------------------------------------------------
   3D hero profile environment
   - Real 3D photo card using the existing profile image
   - Perspective tilt follows the pointer
   - Floating motion
   - Rotating cyber rings
   - Orbiting nodes and particles
   - Reduced-motion support
========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", initializeProfileScene);

    function initializeProfileScene() {
        const canvas = document.getElementById("profileCanvas");
        const profileImage = document.getElementById("profileImg");
        const container = canvas && canvas.parentElement;

        if (!canvas || !container || typeof THREE === "undefined") return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 8.5);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) {
            renderer.outputColorSpace = THREE.SRGBColorSpace;
        } else if ("outputEncoding" in renderer && THREE.sRGBEncoding) {
            renderer.outputEncoding = THREE.sRGBEncoding;
        }

        const group = new THREE.Group();
        scene.add(group);

        /* -------------------------------------------------
           Lighting
           The photo itself uses an unlit material so the
           original image cannot be blown out by 3D lights.
        ------------------------------------------------- */
        scene.add(new THREE.AmbientLight(0xffffff, 0.65));
        const keyLight = new THREE.PointLight(0x55cfe2, 3.2, 18);
        keyLight.position.set(3, 4, 6);
        scene.add(keyLight);

        const fillLight = new THREE.PointLight(0x318da3, 1.4, 16);
        fillLight.position.set(-4, -2, 4);
        scene.add(fillLight);

        /* -------------------------------------------------
           3D photo card
        ------------------------------------------------- */
        const photo = new THREE.TextureLoader().load(profileImage.src, function (texture) {
            if ("colorSpace" in texture && THREE.SRGBColorSpace) {
                texture.colorSpace = THREE.SRGBColorSpace;
            } else if ("encoding" in texture && THREE.sRGBEncoding) {
                texture.encoding = THREE.sRGBEncoding;
            }
            texture.needsUpdate = true;
        });

        const sideMaterial = new THREE.MeshStandardMaterial({
            color: 0x0b1118,
            metalness: 0.75,
            roughness: 0.28
        });

        const edgeMaterial = new THREE.MeshStandardMaterial({
            color: 0x55cfe2,
            metalness: 0.9,
            roughness: 0.2,
            emissive: 0x123d2c,
            emissiveIntensity: 0.5
        });

        /* IMPORTANT: the original photo is not lighted by Three.js.
           MeshBasicMaterial preserves the actual image exposure. */
        const frontMaterial = new THREE.MeshBasicMaterial({
            map: photo
        });

        const backMaterial = new THREE.MeshStandardMaterial({
            color: 0x071017,
            metalness: 0.85,
            roughness: 0.25
        });

        const photoGeometry = new THREE.BoxGeometry(3.55, 4.45, 0.18);
        const photoCard = new THREE.Mesh(photoGeometry, [
            sideMaterial,
            sideMaterial,
            edgeMaterial,
            edgeMaterial,
            frontMaterial,
            backMaterial
        ]);

        photoCard.position.z = 0.35;
        group.add(photoCard);

        /* Thin floating frame around the 3D card. */
        const frameGeometry = new THREE.BoxGeometry(3.72, 4.62, 0.12);
        const frameMaterial = new THREE.MeshBasicMaterial({
            color: 0x55cfe2,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.z = 0.15;
        group.add(frame);

        /* -------------------------------------------------
           Cyber rings
        ------------------------------------------------- */
        function createRing(radius, tube, rotation, opacity) {
            const geometry = new THREE.TorusGeometry(radius, tube, 16, 96);
            const material = new THREE.MeshBasicMaterial({
                color: 0x55cfe2,
                transparent: true,
                opacity,
                wireframe: true
            });
            const ring = new THREE.Mesh(geometry, material);
            ring.rotation.set(rotation.x, rotation.y, rotation.z);
            group.add(ring);
            return ring;
        }

        const ringOne = createRing(3.0, 0.018, { x: Math.PI / 2.4, y: 0.25, z: 0 }, 0.18);
        const ringTwo = createRing(3.3, 0.014, { x: Math.PI / 2.1, y: -0.35, z: 0.5 }, 0.1);
        const ringThree = createRing(3.6, 0.01, { x: 1.1, y: 0.8, z: 0.2 }, 0.06);

        /* -------------------------------------------------
           Orbiting nodes
        ------------------------------------------------- */
        const nodeGroup = new THREE.Group();
        group.add(nodeGroup);
        const nodeGeometry = new THREE.SphereGeometry(0.055, 8, 8);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x55cfe2, transparent: true, opacity: 0.7 });
        const nodes = [];
        const nodeCount = 12;

        for (let i = 0; i < nodeCount; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            const angle = (i / nodeCount) * Math.PI * 2;
            const radius = 3.05 + (i % 3) * 0.18;
            node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 1.2);
            node.userData = { angle, radius, speed: 0.0008 + Math.random() * 0.001 };
            nodeGroup.add(node);
            nodes.push(node);
        }

        const orbitGeometry = new THREE.BufferGeometry();
        const orbitPositions = new Float32Array(nodeCount * 6);
        orbitGeometry.setAttribute("position", new THREE.BufferAttribute(orbitPositions, 3));
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x55cfe2, transparent: true, opacity: 0.11, depthWrite: false });
        const orbitLines = new THREE.LineSegments(orbitGeometry, orbitMaterial);
        group.add(orbitLines);

        /* -------------------------------------------------
           Particles
        ------------------------------------------------- */
        const particleCount = window.innerWidth < 768 ? 36 : 80;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 3.5 + Math.random() * 2.2;
            particlePositions[index] = Math.cos(angle) * radius;
            particlePositions[index + 1] = (Math.random() - 0.5) * 6;
            particlePositions[index + 2] = (Math.random() - 0.5) * 3;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x55cfe2,
            size: 0.045,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        group.add(particles);

        /* -------------------------------------------------
           Pointer interaction
        ------------------------------------------------- */
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        container.addEventListener("pointermove", function (event) {
            const rect = container.getBoundingClientRect();
            mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.targetY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        }, { passive: true });

        container.addEventListener("pointerleave", function () {
            mouse.targetX = 0;
            mouse.targetY = 0;
        }, { passive: true });

        function resize() {
            const rect = container.getBoundingClientRect();
            const width = Math.max(rect.width, 1);
            const height = Math.max(rect.height, 1);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(width, height, false);
        }

        resize();
        window.addEventListener("resize", resize);

        let visible = !("IntersectionObserver" in window);
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
                visible = entries[0].isIntersecting;
                syncAnimation();
            });
            observer.observe(container);
        }

        let frameId = 0;
        function animate(time) {
            frameId = 0;
            if (!visible || document.hidden) return;

            if (!reducedMotion) {
                mouse.x += (mouse.targetX - mouse.x) * 0.06;
                mouse.y += (mouse.targetY - mouse.y) * 0.06;

                group.rotation.y = mouse.x * 0.22;
                group.rotation.x = -mouse.y * 0.12;
                group.position.y = Math.sin(time * 0.0012) * 0.08;

                photoCard.rotation.z = Math.sin(time * 0.0008) * 0.012;
                frame.rotation.z = photoCard.rotation.z;

                ringOne.rotation.z += 0.0005;
                ringTwo.rotation.x += 0.00035;
                ringTwo.rotation.z -= 0.0004;
                ringThree.rotation.y += 0.00025;
                particles.rotation.y = time * 0.000025;
            }

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (!reducedMotion) {
                    node.userData.angle += node.userData.speed;
                    const angle = node.userData.angle;
                    node.position.x = Math.cos(angle) * node.userData.radius;
                    node.position.y = Math.sin(angle) * node.userData.radius;
                    node.position.z = Math.sin(angle * 2) * 0.5;
                }
            }

            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];
                const next = nodes[(i + 1) % nodeCount];
                const index = i * 6;
                orbitPositions[index] = node.position.x;
                orbitPositions[index + 1] = node.position.y;
                orbitPositions[index + 2] = node.position.z;
                orbitPositions[index + 3] = next.position.x;
                orbitPositions[index + 4] = next.position.y;
                orbitPositions[index + 5] = next.position.z;
            }
            orbitGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);

            if (!reducedMotion) frameId = requestAnimationFrame(animate);
        }

        function syncAnimation() {
            if (!visible || document.hidden) {
                cancelAnimationFrame(frameId);
                frameId = 0;
                return;
            }
            if (reducedMotion) animate(performance.now());
            else if (!frameId) frameId = requestAnimationFrame(animate);
        }

        document.addEventListener("visibilitychange", syncAnimation);
        syncAnimation();

        window.addEventListener("beforeunload", function () {
            cancelAnimationFrame(frameId);
            photo.dispose();
            photoGeometry.dispose();
            frameGeometry.dispose();
            frameMaterial.dispose();
            sideMaterial.dispose();
            edgeMaterial.dispose();
            frontMaterial.dispose();
            backMaterial.dispose();
            nodeGeometry.dispose();
            nodeMaterial.dispose();
            particleGeometry.dispose();
            particleMaterial.dispose();
            orbitGeometry.dispose();
            orbitMaterial.dispose();
            renderer.dispose();
        });

        console.log("%c[THREE-PROFILE]%c 3D photo card initialized.", "color:#64f3b0;font-weight:bold;", "color:inherit;");
    }
})();
