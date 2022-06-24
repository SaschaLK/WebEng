//--------------------------- Setup Scene Three.js ---------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA)
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
THREE.PerspectiveCamera

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 10;

//--------------------------- Lights ---------------------------
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
scene.add( directionalLight );

const targetObject = new THREE.Object3D();
targetObject.position.set(0,-1,-5);
scene.add(targetObject);

directionalLight.target = targetObject;

const light = new THREE.AmbientLight( 0x404040 );
scene.add( light );

//const light = new THREE.PointLight( 0xEEEEEE, 1, 100 );
//light.position.set( 5, 0, 2 );
//scene.add( light );

//--------------------------- Objects ---------------------------
//Player
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//Collectable 
const collectGeometry = new THREE.OctahedronGeometry(0.4, 1);
const collectMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF00})
collectMaterial.emissive = new THREE.Color(0x222222);

let collectOne = new THREE.Mesh(collectGeometry, collectMaterial);
collectOne.position.set(2,0,0);
scene.add(collectOne);

let collectTwo = new THREE.Mesh(collectGeometry, collectMaterial);
collectTwo.position.set(2,2,0);
scene.add(collectTwo);

let collectThree = new THREE.Mesh(collectGeometry, collectMaterial);
collectThree.position.set(2,-2,0);
scene.add(collectThree);

//--------------------------- Controls ---------------------------
//Player
const xSpeed = 0.1;
const ySpeed = 0.1;
let xVelocity = 0;
let yVelocity = 0;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        yVelocity = 1;
    } else if (keyCode == 83) {
        yVelocity = -1;
    } else if (keyCode == 65) {
        xVelocity = -1;
    } else if (keyCode == 68) {
        xVelocity = 1;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
};

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event){
    var keyCode = event.which;
    if (keyCode == 87) {
        yVelocity = 0;
    } else if (keyCode == 83) {
        yVelocity = 0;
    } else if (keyCode == 65) {
        xVelocity = 0;
    } else if (keyCode == 68) {
        xVelocity = 0;
    }
};

function animate() {
    requestAnimationFrame( animate );

    //Movement
    cube.position.x += xSpeed*xVelocity;
    cube.position.y += ySpeed*yVelocity;

    //Rotation
    Rotate(cube);
    Rotate(collectOne);
    Rotate(collectTwo);
    Rotate(collectThree);

    renderer.render( scene, camera );
};

function Rotate(obj){
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
}

animate();