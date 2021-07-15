import "/static/assets/potree/three.min.js";
import { OrbitControls } from "/static/assets/fbx/OrbitControls-r110.js";
import { loadPointCloud } from "/static/assets/js/three-utils.js";
import { Panel } from "./CPMSElements.js";

class CompatibilityPanel extends Panel {

    comaptibilitySelectDropdown;
    infoStringSpan;
    canvas;
    bringElementButton;
    #infoStringPrefix = "Info: ";
    #initiallyHidden = true;

    #compatScene;
    // #compatRenderer = new THREE.WebGLRenderer({
    //                         canvas: this.canvas[0],
    //                         antialias: true
    //                     });;
    // #compatCamera = new THREE.PerspectiveCamera(60, $(this.canvas[0]).width() / $(this.canvas[0]).height(), 0.1, 2000);
    // #compatControls = new OrbitControls(this.#compatCamera, this.#compatRenderer.domElement);

    signals = {
        selectedPointCloudChanged: new signals.Signal(),
        bringElementButtonClicked: new signals.Signal()
    }

    constructor(panelHeaderText = "COMPATIBILITY MODE") {

        super();

        this.setId("compat-panel");

        this.panelHeader.setPanelHeaderText(panelHeaderText);

        this.panelContent.setId("compat-panel-content");

        this.panelContent.appendElement(this.createCompatibilityButtonsRow());

        this.panelContent.appendElement(this.createComaptibilityDropdown());

        this.panelContent.appendElement(this.createCompatibilityInfoRow());

        this.panelContent.appendElement(this.createCompatibilityCanvas());

        if (this.#initiallyHidden) {
            this.element.hide();
        }

        this.signals.selectedPointCloudChanged.add( this.onSelectedPoinCloudChanged, this );

        this.bringElementButton.click( () => this.signals.bringElementButtonClicked.dispatch() );
        this.comaptibilitySelectDropdown.change( () => this.signals.selectedPointCloudChanged.dispatch() );

        // this.initScene();

    }

    initScene() {

        // let compatScene = new THREE.Scene();
        // this.#compatScene = compatScene;

        // let loader = new THREE.TextureLoader();
        // let backgroundTexture = loader.load('/static/assets/img/canvas-bg.jpg');
        // this.#compatScene.background = backgroundTexture;

        // let compatCanvas = this.canvas[0];
        // const compatCamera = new THREE.PerspectiveCamera(60, $(compatCanvas).width() / $(compatCanvas).height(), 0.1, 2000);
        // this.#compatCamera.translateZ(25);

        // let ambientLight = new THREE.AmbientLight('white', 1.5);
        // let hemisphereLight = new THREE.HemisphereLight('white', 'brown', 1);
        // let sceneLight = hemisphereLight;
        // this.#compatScene.add(sceneLight);

        // const gridHelper = new THREE.GridHelper(10, 10);
        // this.#compatScene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(5);
        // this.#compatScene.add(axesHelper);

        // // const compatRenderer = new THREE.WebGLRenderer({
        // //     canvas: compatCanvas,
        // //     antialias: true
        // // });

        // // const compatControls = new OrbitControls(compatCamera, compatRenderer.domElement);
        // this.#compatControls.screenSpacePanning = true;
        // this.#compatControls.target.set(0, 1, 0);

        // var animateCompatScene = function () {
        //     requestAnimationFrame( animateCompatScene );
        //     this.#compatControls.update();
        //     renderScene();
        // };

        // function renderScene() {
        //     this.#compatRenderer.render( this.#compatScene, this.#compatCamera );
        // }
        
        // animateCompatScene();

    }

    getSelectedPointCloud() {

        return new Promise( (resolve, reject) => {

            let selectedValue = this.comaptibilitySelectDropdown.val();

            this.getCompatObjectToLoad( selectedValue )
                .then( resolve )
                .catch( reject );

        } );
    }

    onSelectedPoinCloudChanged() {

        let newValue = this.comaptibilitySelectDropdown.val();

        if (newValue != null && newValue.length > 0) {

            this.setInfoString( newValue );

            this.getCompatObjectToLoad( newValue )
                .then( (pc) => this.loadCompatibilityCanvas(pc) )
                .catch( console.error );
        }

    }

    getCompatObjectToLoad( shapeToLoad ) {

        return new Promise( (resolve, reject) => {
            
            if ( shapeToLoad == null || shapeToLoad.length === 0 ) {

                reject( 'getCompatObjectToLoad: Invalid Compatibility Point Cloud Selection' );
                
            }

            if (shapeToLoad.toLowerCase() == 'bar') {

                loadPointCloud( '/static/assets/pointclouds/bar/cloud.js' )
                    .then( resolve )
                    .catch( reject );

            } else if (shapeToLoad.toLowerCase() == 'slab') {

                loadPointCloud( '/static/assets/pointclouds/slab/cloud.js' )
                    .then( resolve )
                    .catch( reject );

            } else {
                var shapeGeometry = null;

                if (shapeToLoad.toLowerCase() == 'cube') {
                    
                    shapeGeometry = new THREE.BoxGeometry(2, 2, 2);

                } else if (shapeToLoad.toLowerCase() == 'sphere') {
                    
                    shapeGeometry = new THREE.SphereGeometry(1, 20, 20);

                } else if (shapeToLoad.toLowerCase() == 'cylinder') {
                    
                    shapeGeometry = new THREE.CylinderGeometry(1, 1, 5, 10, 10);

                }

                console.log('Selected geometry:');
                console.log(shapeGeometry);

                var material = new THREE.MeshPhongMaterial({
                    color: 'white'
                });

                var mesh = new THREE.Mesh(shapeGeometry, material);
                
                resolve( mesh );
            }
            
        } );
    }

    clearScene() {

        if ( this.#compatScene != null ) {

            let scene = this.#compatScene;

            for (let i=0; i<scene.children.length; i++) {

                if ( scene.children[i].type === "Mesh" )
                    scene.remove( scene.children[i] );

            }

        }

    }

    loadCompatibilityCanvas(shapeToLoad) {
        if (shapeToLoad == null || shapeToLoad.length === 0) {
            return;
        }

        this.clearScene();

        let compatScene = new THREE.Scene();
        this.#compatScene = compatScene;

        let loader = new THREE.TextureLoader();
        let backgroundTexture = loader.load('/static/assets/img/canvas-bg.jpg');
        compatScene.background = backgroundTexture;

        let compatCanvas = this.canvas[0];
        const compatCamera = new THREE.PerspectiveCamera(60, $(compatCanvas).width() / $(compatCanvas).height(), 0.1, 2000);
        compatCamera.translateZ(25);

        let ambientLight = new THREE.AmbientLight('white', 1.5);
        let hemisphereLight = new THREE.HemisphereLight('white', 'brown', 1);
        let sceneLight = hemisphereLight;
        compatScene.add(sceneLight);

        const gridHelper = new THREE.GridHelper(10, 10);
        compatScene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        compatScene.add(axesHelper);

        const compatObjRenderer = new THREE.WebGLRenderer({
            canvas: compatCanvas,
            antialias: true
        });

        const compatControls = new OrbitControls(compatCamera, compatObjRenderer.domElement);
        compatControls.screenSpacePanning = true;
        compatControls.target.set(0, 1, 0);

        var animateCompatScene = function () {
            requestAnimationFrame( animateCompatScene );
            compatControls.update();
            renderScene();
        };

        function renderScene() {
            compatObjRenderer.render(compatScene, compatCamera);
        }
        
        compatScene.add( shapeToLoad );

        animateCompatScene();
    }

    setInfoString(text) {

        this.infoStringSpan.text(this.#infoStringPrefix + text);

    }

    createComaptibilityDropdown() {
        let selectDiv = $("<div></div>");
        selectDiv.attr("id", "compat-panel-dropdown");

        let selectElement = $("<select></select>");
        selectElement.addClass("custom-select-sm");
        selectElement.attr({
            "id": "compat-panel-select",
            "data-size": "4"
        });

        selectDiv.append(selectElement);

        selectElement.append($('<option value="">No Option Selected</option>'));
        // selectElement.append($('<option value="sphere">Sphere</option>'));
        // selectElement.append($('<option value="cube">Cube</option>'));
        // selectElement.append($('<option value="cylinder">Cylinder</option>'));
        selectElement.append($('<option value="bar">Bar</option>'));
        selectElement.append($('<option value="slab">Slab</option>'));

        this.comaptibilitySelectDropdown = selectElement;

        return selectDiv;
    }

    createCompatibilityInfoRow() {
        let infoDiv = $("<div></div>");
        infoDiv.addClass("dropdown-element-info-div");
        infoDiv.attr("id", "compat-panel-info");

        let span = $("<span></span>");
        span.attr("id", "compat-info-span");
        span.text(this.#infoStringPrefix + "");

        this.infoStringSpan = span;

        infoDiv.append(span);

        return infoDiv;
    }

    createCompatibilityCanvas() {
        let canvasDiv = $("<div></div>");
        canvasDiv.attr("id", "compat-panel-canvas");

        let canvas = $("<canvas></canvas>");
        canvas.addClass("subcanvas");
        canvas.attr("id", "compat-canvas");

        this.canvas = canvas;

        canvasDiv.append(canvas);

        return canvasDiv;
    }

    createCompatibilityButtonsRow() {
        let element = $("<div></div>");
        element.attr("id", "compat-panel-buttons");

        this.bringElementButton = this.createBringElementButton();
        element.append( this.bringElementButton );

        element.append(this.createGreaterButton());

        return element;
    }

    createBringElementButton() {
        let button = $("<button></button>");
        button.addClass("btn btn-light btn-sm");
        button.attr("id", "compat-modal-bring-btn");
        button.text("Bring Element");

        return button;
    }

    createGreaterButton() {
        let button = $("<button></button>");
        button.addClass("btn btn-light btn-sm");
        button.attr("id", "compat-modal-symbol-btn");
        button.text(">");

        return button;
    }
}

export { CompatibilityPanel };