import * as THREE from 'three';
import { FontLoader } from "https://unpkg.com/three@0.164.1/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://unpkg.com/three@0.164.1/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let textGeo = new THREE.Mesh();
let stars, starGeo;

lighting();
Text();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("textures/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xFFFFE0,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.y -= 0.2;

    if (stars.position.y < - 190) {
        stars.position.y = 190;
    }
  }
  
  function Text() {
  const texture = new THREE.TextureLoader().load("textures/wooden.jpg");

  const loader = new FontLoader();

    loader.load( 'textures/Font/Starborn_Regular.json', function ( font ) {

	const textGeometry = new TextGeometry( 'Thania', {font: font, size: 4.5, depth: 1} );
      textGeometry.center();
    const textMaterial = new THREE.MeshPhongMaterial({map: texture, emissive: 0x77dd77, emissiveIntensity: 0.25 });
    textGeo = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textGeo);
} );

    camera.position.z = 20;
}

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff, 10);
  spotLight.position.set(10, 20, 30);
  spotLight.target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  textGeo.rotation.x += 0.008;
  textGeo.rotation.y += 0.008;
  renderer.render(scene, camera);
}

animate();