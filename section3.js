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
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();