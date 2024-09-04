// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Create the truck
// Truck body
const bodyGeometry = new THREE.BoxGeometry(8, 2, 3);
const bodyMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 2;
scene.add(body);

// Truck cabin
const cabinGeometry = new THREE.BoxGeometry(3, 2, 3);
const cabinMaterial = new THREE.MeshStandardMaterial({color: 0xff5500});
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.position.set(2, 4, 0);
scene.add(cabin);

// Wheels
const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
const wheelMaterial = new THREE.MeshStandardMaterial({color: 0x333333});

function createWheel(x, z) {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.rotation.y = Math.PI / 2;
    wheel.position.set(x, 1, z);
    scene.add(wheel);
    return wheel;
}

const wheel1 = createWheel(3, 2);
createWheel(-3, 2);
createWheel(3, -2);
createWheel(-3, -2);

// Ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    body.position.x += 0.01;
    cabin.position.x += 0.01;
    wheel1.position.x += 0.01;
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

