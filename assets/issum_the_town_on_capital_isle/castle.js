---
---
import * as THREE from 'three';
import { GLTFLoader }          from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader }         from 'three/addons/loaders/DRACOLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// ── Scene ──────────────────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.FogExp2(0x87ceeb, 0.008);

// ── Camera ─────────────────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(23.7, 1.5, 3.5);

// ── Renderer ───────────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ── Lighting ───────────────────────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0xfff4e0, 0.9));

const sun = new THREE.DirectionalLight(0xfff8e7, 2.5);
sun.position.set(60, 120, 80);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 400;
sun.shadow.camera.left = sun.shadow.camera.bottom = -100;
sun.shadow.camera.right = sun.shadow.camera.top = 100;
scene.add(sun);

const fill = new THREE.DirectionalLight(0xaac8ff, 0.6);
fill.position.set(-40, 20, -60);
scene.add(fill);

// ── Load GLB ──────────────────────────────────────────────────────────────
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/libs/draco/gltf/');
dracoLoader.preload(); // fetch the WASM decoder immediately, in parallel with the GLB

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const loadingEl  = document.getElementById('loading');
const loadingTxt = document.getElementById('loading-text');

loader.load(
    '{{ site.baseurl }}/assets/issum_the_town_on_capital_isle/scene.glb',
    (gltf) => {
        gltf.scene.traverse((node) => {
            if (node.isMesh) {
                node.castShadow    = true;
                node.receiveShadow = true;
                collidables.push(node);
            }
        });
        scene.add(gltf.scene);
        loadingEl.style.display = 'none';
    },
    (xhr) => {
        if (xhr.total) {
            const pct = Math.round((xhr.loaded / xhr.total) * 100);
            loadingTxt.textContent = `Loading... ${pct}%`;
        }
    },
    (err) => {
        console.error('GLTF error:', err);
        loadingTxt.textContent = 'Failed to load scene.';
    }
);

// ── PointerLock Controls ───────────────────────────────────────────────────
const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

const overlay = document.getElementById('overlay');
overlay.addEventListener('click', () => controls.lock());
controls.addEventListener('lock',   () => { overlay.style.display = 'none'; });
controls.addEventListener('unlock', () => { overlay.style.display = 'flex'; });

// ── Keyboard state ─────────────────────────────────────────────────────────
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

// ── Physics / ground collision ─────────────────────────────────────────────
const PLAYER_HEIGHT = 0.6;   // eye height above ground
const GRAVITY       = -25;   // units/s²
const JUMP_SPEED    = 10;    // units/s upward on jump
let   velocityY     = 0;
let   onGround      = false;
let   collidables   = [];    // filled once GLTF loads

const groundRay = new THREE.Raycaster();
groundRay.far = PLAYER_HEIGHT + 2;   // only look slightly below feet

// ── Animation loop ─────────────────────────────────────────────────────────
const clock = new THREE.Clock();
const WALK   = 6;
const SPRINT = 16;

function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        const dt    = clock.getDelta();
        const speed = (keys['ShiftLeft'] || keys['ShiftRight']) ? SPRINT : WALK;
        const v     = speed * dt;

        // Horizontal movement
        if (keys['KeyW'] || keys['ArrowUp'])    controls.moveForward(v);
        if (keys['KeyS'] || keys['ArrowDown'])  controls.moveForward(-v);
        if (keys['KeyA'] || keys['ArrowLeft'])  controls.moveRight(-v);
        if (keys['KeyD'] || keys['ArrowRight']) controls.moveRight(v);

        // Jump
        if ((keys['Space'] || keys['KeyE']) && onGround) {
            velocityY = JUMP_SPEED;
            onGround  = false;
        }

        // Gravity
        velocityY += GRAVITY * dt;
        const player = controls.getObject();
        player.position.y += velocityY * dt;

        // Ground detection via downward ray from eye position
        if (collidables.length > 0) {
            groundRay.set(player.position, new THREE.Vector3(0, -1, 0));
            const hits = groundRay.intersectObjects(collidables, true);
            if (hits.length > 0 && hits[0].distance <= PLAYER_HEIGHT + 0.3) {
                player.position.y = hits[0].point.y + PLAYER_HEIGHT;
                velocityY = 0;
                onGround  = true;
            } else {
                onGround = false;
            }
        }

        // Safety floor — don't fall into the void
        if (player.position.y < -20) {
            player.position.set(0, PLAYER_HEIGHT + 2, 12);
            velocityY = 0;
        }
    } else {
        clock.getDelta();
    }

    renderer.render(scene, camera);
}
animate();

// ── Resize ─────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
