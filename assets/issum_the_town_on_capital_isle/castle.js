import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.min.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Load GLTF Model
const loader = new GLTFLoader();
loader.load('{{ site.baseurl }}/assets/issum_the_town_on_capital_isle/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    const message = document.createElement('div');
    message.style.position = 'absolute';
    message.style.top = '10px';
    message.style.left = '10px';
    message.style.color = 'white';
    message.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    message.style.padding = '10px';
    message.style.borderRadius = '5px';
    message.innerText = 'GLTF Model Loaded Successfully!';
    document.body.appendChild(message);

    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}, undefined, (error) => {
    console.error('Error loading GLTF:', error);
    const errorMessage = document.createElement('div');
    errorMessage.style.position = 'absolute';
    errorMessage.style.top = '10px';
    errorMessage.style.left = '10px';
    errorMessage.style.color = 'white';
    errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    errorMessage.style.padding = '10px';
    errorMessage.style.borderRadius = '5px';
    errorMessage.innerText = 'Error loading GLTF model!';
    document.body.appendChild(errorMessage);

    // Remove the error message after 5 seconds
    setTimeout(() => {
        document.body.removeChild(errorMessage);
    }, 5000);
});

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.autoRotate = true;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});