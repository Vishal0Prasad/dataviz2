import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import { GUI } from "dat.gui";

const scene = new THREE.Scene();
// scene.add();

const light = new THREE.AmbientLight(0xffffff, 3);
light.visible = true;
light.position.set(0, 0, 5);
light.lookAt(0, 0, 0);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const canvas = document.getElementById("3dChart") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const sphereGeometry = new THREE.SphereGeometry(1, 1024, 1024);


const texture = new THREE.TextureLoader().load("density.jpeg");
const displacementTexture = new THREE.TextureLoader().load("density-height.jpeg");

const earthMaterial = new THREE.MeshPhongMaterial({
    // side: THREE.DoubleSide,
    wireframe: true,
    // color: "black",
    map: texture,
    reflectivity: 0,
    // bumpMap: height,
    displacementMap: displacementTexture,
    displacementScale: 0.1,
    // emissiveIntensity: 0,
    // transparent: true,
    // opacity: 0.1,
    // specular: "white",
    // flatShading: true,
    // metalness: 0.2,
    displacementBias: 0.1,
});

const earthChart = new THREE.Mesh(sphereGeometry, earthMaterial);
scene.add(earthChart);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

// const gui = new GUI();
// gui.add(material.normalScale, "x", 0, 10, 0.01);
// gui.add(material.normalScale, "y", 0, 10, 0.01);
// gui.add(light.position, "x", -20, 20).name("Light Pos X");

function animate() {
  requestAnimationFrame(animate);

  earthChart.rotation.y += 0.01;
  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();