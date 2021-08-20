import * as OC from '/static/assets/fbx/OrbitControls.js';
import { loadPointCloud } from "/static/assets/js/three-utils.js";

// ************
// DEPRECATED FILE !!!! 
// Please refer to CompatibilityPanel.js classes and methods related to Compatibility Panel class

function loadCompatibilityCanvas(shapeToLoad) {
    if (shapeToLoad == null || shapeToLoad.length === 0) {
        return;
    }

    let compatScene = new THREE.Scene();

    let loader = new THREE.TextureLoader();
    let backgroundTexture = loader.load('/static/assets/img/canvas-bg.jpg');
    compatScene.background = backgroundTexture;

    let compatCanvas = document.getElementById('compat-canvas');
    const compatCamera = new THREE.PerspectiveCamera(60, $(compatCanvas).width() / $(compatCanvas).height(), 0.1, 2000);
    compatCamera.translateZ(5);

    let ambientLight = new THREE.AmbientLight('white', 1.5);
    let hemisphereLight = new THREE.HemisphereLight('white', 'brown', 1);
    let sceneLight = hemisphereLight;
    compatScene.add(sceneLight);

    // const gridHelper = new THREE.GridHelper(10, 10);
    // compatScene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(5);
    // compatScene.add(axesHelper);

    const compatObjRenderer = new THREE.WebGLRenderer({
        canvas: compatCanvas,
        antialias: true
    });

    const compatControls = new OC.OrbitControls(compatCamera, compatObjRenderer.domElement);
    compatControls.screenSpacePanning = true;
    compatControls.target.set(0, 1, 0);

    var animateCompatScene = function () {
        requestAnimationFrame(animateCompatScene);
        compatControls.update();
        renderCompatScene();
        // stats.update();
    };

    function renderCompatScene() {
        compatObjRenderer.render(compatScene, compatCamera);
    }

    var compatObj = getCompatObjectToLoad(shapeToLoad);
    compatScene.add(compatObj);

    animateCompatScene();
}

function getCompatObjectToLoad2(shapeToLoad, forScene = 'compat') {

    return new Promise( (resolve, reject) => {
        
        if (shapeToLoad.toLowerCase() == 'bar') {

            loadPointCloud( '/static/assets/pointclouds/bar/cloud.js' )
                .then( resolve )
                .catch( reject );

        } else {
            var shapeGeometry = null;

            if (shapeToLoad == null) {
                console.log('getCompatObjectToLoad: Null Input : Loading Cube by default');
                shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(2, 2, 2);

            } else if (shapeToLoad.toLowerCase() == 'cube') {
                shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(2, 2, 2);

            } else if (shapeToLoad.toLowerCase() == 'sphere') {
                shapeGeometry = forScene == 'main' ? new THREE.SphereGeometry(20, 50, 50) : new THREE.SphereGeometry(1, 20, 20);

            } else if (shapeToLoad.toLowerCase() == 'cylinder') {
                shapeGeometry = forScene == 'main' ? new THREE.CylinderGeometry(20, 20, 50, 50, 50) : new THREE.CylinderGeometry(1, 1, 5, 10, 10);

            } else {
                shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(1, 1, 1);
            }
            console.log('Loading:');
            console.log(shapeGeometry);

            var material = new THREE.MeshPhongMaterial({
                color: 'white'
            });

            var mesh = new THREE.Mesh(shapeGeometry, material);
            
            resolve( mesh );
        }
        
    } );
}

function getCompatObjectToLoad(shapeToLoad, forScene = 'compat') {
    var shapeGeometry = null;

    if (shapeToLoad == null) {
        console.log('getCompatObjectToLoad: Null Input : Loading Cube by default');
        shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(2, 2, 2);

    } else if (shapeToLoad.toLowerCase() == 'cube') {
        shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(2, 2, 2);

    } else if (shapeToLoad.toLowerCase() == 'sphere') {
        shapeGeometry = forScene == 'main' ? new THREE.SphereGeometry(20, 50, 50) : new THREE.SphereGeometry(1, 20, 20);

    } else if (shapeToLoad.toLowerCase() == 'cylinder') {
        shapeGeometry = forScene == 'main' ? new THREE.CylinderGeometry(20, 20, 50, 50, 50) : new THREE.CylinderGeometry(1, 1, 5, 10, 10);

    } else {
        shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(1, 1, 1);
    }
    console.log('Loading:');
    console.log(shapeGeometry);

    var material = new THREE.MeshPhongMaterial({
        color: 'white'
    });

    var mesh = new THREE.Mesh(shapeGeometry, material);
    return mesh;
}

export {
    getCompatObjectToLoad, 
    getCompatObjectToLoad2
};