import * as THREE from '/static/assets/three/build/three.module.js';
import * as OC from '/static/assets/three/examples/jsm/controls/OrbitControls.js';

function getCenterPoint(mesh) {
    var geometry = mesh.geometry;
    geometry.computeBoundingBox();

    var center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    mesh.localToWorld(center);

    return center;
}

/*
    displayWindow = 'editor' | 'view' ... 'editor' for canvases in panels in editor, 
        'view' for canvases in panels in View page (index.html)
*/
function loadObjectInCanvas(objectToLoad, canvasId, centerObjectForCPMS = true
    , displayWindow = 'editor'
    , showGrid = false, showAxes = false) {

    // Get required canvas
    let canvas = document.getElementById(canvasId);

    // Get canvas's current style to reapply it later
    let canvasBgColor = canvas.style.backgroundColor;
    let canvasBgImg = canvas.style.backgroundImage;

    // Create scene
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( canvasBgColor );

    // Create camera
    let camera = new THREE.PerspectiveCamera(
        60, $(canvas).width() / $(canvas).height(), 0.00001, 2000);
    camera.translateZ(5);

    // Create lights
    let sceneLight = new THREE.HemisphereLight('white', 'brown', 1);;
    scene.add(sceneLight);

    // Create renderer
    let renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    // Setup Orbit Controls
    let orbitControls = new OC.OrbitControls(camera, canvas);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(0, 1, 0);

    if (showGrid) {
        const gridHelper = new THREE.GridHelper(10, 5);
        scene.add(gridHelper);
    }

    if (showAxes) {
        const axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);
    }

    // Position and add object
    let objectCenter = getCenterPoint(objectToLoad);
    if (centerObjectForCPMS) {
        objectToLoad.position.setX(-1 * objectCenter.x);
        objectToLoad.position.setZ(-1 * objectCenter.y);
        objectToLoad.position.setY(1 * objectCenter.z);
        if (displayWindow == 'view') {
            objectToLoad.translateX(-180);
            objectToLoad.translateY(-120);
            objectToLoad.translateZ(-100);
        }
    }

    scene.add(objectToLoad);
    console.log( 'Loading object:' );
    console.log( objectToLoad );

    function animate() {
        requestAnimationFrame(animate);
        if (orbitControls != null) orbitControls.update();

        render();
    }

    function render() {
        
        renderer.render(scene, camera);
        
    }

    animate();
}

export {
    loadObjectInCanvas, 
    getCenterPoint
};