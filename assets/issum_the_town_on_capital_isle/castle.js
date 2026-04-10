---
---
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.min.js';
import { GLTFLoader }          from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader }         from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/DRACOLoader.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/PointerLockControls.js';

// ── Scene ──────────────────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.FogExp2(0x87ceeb, 0.008);

// ── Camera ─────────────────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 12);

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
                node.castShadow = true;
                node.receiveShadow = true;
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
    // prevent arrow keys from scrolling the page
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

// ── Animation loop ─────────────────────────────────────────────────────────
const clock = new THREE.Clock();
const WALK   = 8;
const SPRINT = 22;
const FLY    = 6;

function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        const dt    = clock.getDelta();
        const speed = (keys['ShiftLeft'] || keys['ShiftRight']) ? SPRINT : WALK;
        const v     = speed * dt;
        const fv    = FLY * dt;

        if (keys['KeyW'] || keys['ArrowUp'])    controls.moveForward(v);
        if (keys['KeyS'] || keys['ArrowDown'])  controls.moveForward(-v);
        if (keys['KeyA'] || keys['ArrowLeft'])  controls.moveRight(-v);
        if (keys['KeyD'] || keys['ArrowRight']) controls.moveRight(v);
        if (keys['KeyE'] || keys['Space'])      controls.getObject().position.y += fv;
        if (keys['KeyQ'])                       controls.getObject().position.y -= fv;
    } else {
        clock.getDelta(); // keep clock ticking so dt doesn't spike on re-entry
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
