import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
//import {OrbirtControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE. WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);



amera.position.z = 5

// const loader = new THREE.TextureLoader();
// const texture = loader.load("2k_earth_daymap.jpg")
// texture.colorSpace = THREE.SRGBColorSpace;
// const material = new THREE.MeshBasicMaterial({map: texture});



// const radius = 1;
// const widthSegments = 30;
// const heightSegments = 20;
// const geometryS = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
// const sphere = new THREE.Mesh(geometryS, material);

function createPlanet(filename) {
    const texture = new THREE.TextureLoader().load(filename);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({map: texture});

    const geometry = new THREE.SphereGeometry(1, 30, 20);
    return new THREE.Mesh(geometry, material);
}


const earth = createPlanet("2k_earth_daymap.jpg")
const sun = createPlanet("2k_sun.jpg")

scene.add(earth)
scene.add(sun)
earth.position.x = 2

renderer.setClearColor(0x000000, 1);

function animate(time) {
    earth.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
