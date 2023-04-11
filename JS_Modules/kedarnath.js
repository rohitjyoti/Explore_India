import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvasContainer = document.querySelector('#canvasContainer')

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas')
});
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
// document.body.appendChild( renderer.domElement );

renderer.setPixelRatio(window.devicePixelRatio)


console.log(renderer);

const cursor ={ x : 0 , y : 0}

window.addEventListener('mousemove',(_event)=>{

  cursor.x= _event.clientX/window.innerWidth-0.5
  cursor.y = _event.clientX / window.innerHeight - 0.5

  console.log(cursor.x)
})

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 1, 10000);

const controls = new OrbitControls(camera, renderer.domElement);

// const controls = new OrbitControls( camera, renderer );

const axesHelper = new THREE.AxesHelper(50);

// const helper = new THREE.CameraHelper(camera)
// scene.add(helper)
// scene.add(axesHelper)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVertices = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 30000
  const y = (Math.random() - 0.5) * 30000
  const z = (Math.random() - 0.5) * 30000
  starVertices.push(x, y, z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(
  starGeometry, starMaterial)

scene.add(stars)


const light = new THREE.DirectionalLight(0x808080, 4)
light.position.y = 10
light.position.x = 0
light.position.z = 10
scene.add(light)

const ambient = new THREE.AmbientLight(0x808080, 4);
scene.add(ambient);
// const directionalLight = new THREE.DirectionalLightHelper(light, 5);
// scene.add(directionalLight)


//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0 ,35 ,45);
controls.update();

function animate() {

  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);

}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = canvasContainer.offsetWidth
  sizes.height = canvasContainer.offsetHeight

  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix();

  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

animate();



const loader = new GLTFLoader();

const MODEL_PATH = "../Models/kedarnath.glb";


loader.load(MODEL_PATH, function (glft) {
  console.log(glft)

  const model = glft.scene;
  model.scale.set(12,12,12)
  model.position.x = 0
  model.position.z = 0
  model.position.y = -7
  function animate() {
    glft.scene.rotation.y += 0.005;
    requestAnimationFrame(animate)
    // const cameraX = cursor.x
    // const cameraY = cursor.y

    // camera.position.x += (cameraX-camera.position.x)/0.9
    // camera.position.y += (cameraY-camera.position.y)/0.9
  }
  animate();
  scene.add(model);

}, function (xhr) {
  console.log((xhr.loader / xhr.total * 100) + "% loader")
},    //progress
  function (error) {
    console.log("error occured")

  })