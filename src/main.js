import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
//import {OrbirtControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


camera.position.z = 10
const renderer = new THREE. WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight(0xffffff, 200, 0);
light.position.set(0, 0, 0);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);


function createCelestialBody(filename, radius, orbit, phong) {
    const texture = new THREE.TextureLoader().load(filename);
    texture.colorSpace = THREE.SRGBColorSpace;
    let material;
    if (phong) {
	material = new THREE.MeshPhongMaterial({map: texture});	
    } else {
	material = new THREE.MeshBasicMaterial({map: texture});
    }

    const geometry = new THREE.SphereGeometry(radius, 30, 20);
    if (orbit) {
	let curve = new THREE.EllipseCurve(0, 0, 10, 10);
	let points = curve.getPoints(50);
	let geome = new THREE.BufferGeometry().setFromPoints(points);
	let mate = new THREE.LineBasicMaterial({color: 0xffffff});
	let orbit = new THREE.Line(geome, mate);
	scene.add(orbit);
    }

    
    return new THREE.Mesh(geometry, material);
}
let grid = new THREE.GridHelper(20, 40);
grid.geometry.rotateX(Math.PI / 2);
scene.add(grid);


const sun = createCelestialBody("2k_sun.jpg", 5, false, false)
const earth = createCelestialBody("2k_earth_daymap.jpg", 1, true, true)
earth.geometry.rotateX(Math.PI / 2);

earth.position.x = 10;
scene.add(sun)
scene.add(earth)

renderer.setClearColor(0x000000, 1);

function rotate(celestial, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x = celestial.position.x;
    const y = celestial.position.y;
    
    celestial.position.x = x * c - y * s;
    celestial.position.y = x * s + y * c;
}

let angle = 0;
let prevTime = 0;
function animate(time) {
    const dt = time - prevTime;
    earth.rotation.z += 0.0004 * dt;

    angle = 0.0003;
    rotate(earth, angle);
    renderer.render(scene, camera);
    prevTime = time;
}

renderer.setAnimationLoop(animate);
