import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
//import {OrbirtControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


camera.position.z = 50
const renderer = new THREE. WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight(0xffffff, 300, 0);
light.position.set(0, 0, 0);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);


function createCelestialMesh(filename, radius, phong) {
    const texture = new THREE.TextureLoader().load(filename);
    texture.colorSpace = THREE.SRGBColorSpace;
    let material;
    if (phong) {
	material = new THREE.MeshPhongMaterial({map: texture});	
    } else {
	material = new THREE.MeshBasicMaterial({map: texture});
    }

    const geometry = new THREE.SphereGeometry(radius, 30, 20);

    
    return new THREE.Mesh(geometry, material);
}
function createOrbit(orbitRadius) {
    let curve = new THREE.EllipseCurve(0, 0, orbitRadius, orbitRadius);
    let points = curve.getPoints(50);
    let geome = new THREE.BufferGeometry().setFromPoints(points);
    let mate = new THREE.LineBasicMaterial({color: 0xffffff});
    return new THREE.Line(geome, mate);

    
}

class Celestial {
    constructor(mesh, orbitRadius) {
	this.mesh = mesh;
	this.orbitRadius = orbitRadius;
    }
}

let planets = [];
const planetsInfo = [
    {"filename": "2k_mercury.jpg", "orbitRadius": 10, "radius": 0.4},
    {"filename": "2k_venus.jpg", "orbitRadius": 20, "radius": 1},
    {"filename": "2k_earth_daymap.jpg", "orbitRadius": 30, "radius": 1},
    {"filename": "2k_mars.jpg", "orbitRadius": 50, "radius": 0.5},

    
];

for (let info of planetsInfo) {
    const b = createCelestialMesh(info["filename"], info["radius"], true, true);
    b.position.x = info["orbitRadius"]
    scene.add(b)

    const orbit = createOrbit(info["orbitRadius"]);
    scene.add(orbit);

    planets.push(b);
}



const sun = createCelestialMesh("2k_sun.jpg", 5, false, false)


scene.add(sun)

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
   
    angle = 0.0003;
    //rotate(earth, angle);
    renderer.render(scene, camera);
    prevTime = time;
}

renderer.setAnimationLoop(animate);


// https://science.nasa.gov/solar-system/planets/planet-sizes-and-locations-in-our-solar-system/
// https://www.solarsystemscope.com/textures/
// https://solarsystem.nasa.gov/planet-compare/
