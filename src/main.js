import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
//import {OrbirtControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE. WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);



camera.position.z = 5

const loader = new THREE.TextureLoader();
const texture = loader.load("2k_earth_daymap.jpg")
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshBasicMaterial({map: texture});



const radius = 1;
const widthSegments = 30;
const heightSegments = 20;
const geometryS = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
const sphere = new THREE.Mesh(geometryS, material);

scene.add(sphere);
renderer.setClearColor(0x000000, 1);

function animate(time) {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
