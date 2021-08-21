import * as OC from '/static/assets/fbx/OrbitControls.js';

// Methods used in the Element panel loading and operation workflow

/**
 * Get type string of a BIM element, given a valid element name.
 * @param  {*} element 
 */
function getElementType(element) {
    if (element == null || element.name == null || !validateElementName(element.name)) return null;

    var nameStringRegex = new RegExp("(^.*)_[0-9]*_Geometry$");
    var found = element.name.match(nameStringRegex);

    if (found == null || found.length === 0) return null;
    else return found[found.length - 1];
}

/**
 * Get ID string of a BIM element, given a valid element name.
 * @param  {*} element
 */
function getElementId(element) {
    if (element == null || element.name == null || !validateElementName(element.name)) return null;

    var nameStringRegex = new RegExp("^.*_([0-9]*)_Geometry$");
    var found = element.name.match(nameStringRegex);

    if (found == null || found.length === 0) return null;
    else return found[found.length - 1];
}


/**
 * Validate that the BIM element name is of the form '<description>_[ID]_Geometry' string using RegEx
 * @param  {string} nameString
 */
function validateElementName(nameString) {
    if (nameString == null || nameString.length === 0) return false;

    var nameStringRegex = new RegExp("^.*_[0-9]*_Geometry$");

    if (!nameStringRegex.test(nameString)) {
        console.log('Invalid namestring: ' + nameString);
    }

    return nameStringRegex.test(nameString);
}


/**
 * Populates the info field with the input string in the element Panel 
 * @param  {string} elementTypeString
 */
function setElementInfo(elementTypeString) {
    let infoString = getElementInfoFromTypeString(elementTypeString, true);
    $('#element-info-span').text(infoString);
}


/**
 * Helper method for setElementInfo()
 * @param  {string} elementTypeString
 * @param  {boolean} prefixInfo Append "Info: " to resulting Info Type String 
 * @return {string} Information type string for the element
 */
function getElementInfoFromTypeString(elementTypeString, prefixInfo) {
    if (elementTypeString == null) return null;

    var infoString = unescape(elementTypeString).replace(/_/g, ' ');
    return prefixInfo ? 'Info: ' + infoString : infoString;
}


/**
 * Main method used to populate the Element Panel dropdown.
 * Calls the above methods to create options in the Element Panel dropdown, setting value to Element Type and name attribute to Element Name.
 * @param  {THREE.Model} mainObj Main BIM Model
 */
function populateElementsDropdown(mainObj) {
    let elementIdTypeMapList = [];

    mainObj.traverse(function (child) {
        if (child.isMesh) {
            let childId = getElementId(child);
            let childType = getElementType(child);
            let childName = child.name;

            if (childId != null && childType != null) {
                elementIdTypeMapList.push({
                    'id': childId,
                    'type': childType, 
                    'name': childName
                });
            }
        }
    });

    // sort {id, type} objects in the list
    elementIdTypeMapList.sort((ele1, ele2) => {
        return ele1.id.localeCompare(ele2.id);
    });

    // Construct the element view dropdown
    $('#element-dropdown-menu').empty();
    $.each(elementIdTypeMapList, function (index, obj) {
        let childType = obj.type;
        let childId = obj.id;
        let childName = obj.name;

        let dropdownOption = $('<option></option>')
                                .attr('value', childType)
                                .attr('name', childName)
                                .text(childId);

        $('#element-panel-select').append(dropdownOption);
    });

}


/**
 * Load the passed object in the Element Panel canvas.
 * @param  {THREE.Model} objectTotLoad Selected BIM element in dropdown
 * @param  {boolean} centerObject=true Apply CPMS transformations to center the object in the canvas.
 */
function loadElementObject( objectTotLoad, centerObject=true ) {
    // Create scene
    let elementViewScene = new THREE.Scene();

    // Setup background texture
    let loader = new THREE.TextureLoader();
    let backgroundTexture = loader.load('/static/assets/img/canvas-bg.jpg');
    elementViewScene.background = backgroundTexture;

    // Create camera
    let elementViewCanvas = document.getElementById('element-canvas');
    let elementViewCamera = new THREE.PerspectiveCamera(
        60, $(elementViewCanvas).width() / $(elementViewCanvas).height(), 0.00001, 2000);
    elementViewCamera.translateZ(5);

    // Create lights
    let sceneLight = new THREE.HemisphereLight('white', 'brown', 1);;
    elementViewScene.add(sceneLight);

    // Create renderer
    let elementViewRenderer = new THREE.WebGLRenderer({
        canvas: elementViewCanvas,
        antialias: true
    });

    // Setup Orbit Controls
    let elementViewOrbitControls = new OC.OrbitControls(elementViewCamera, elementViewCanvas);
    elementViewOrbitControls.screenSpacePanning = true;
    elementViewOrbitControls.target.set(0, 1, 0);

    // const gridHelper = new THREE.GridHelper(10, 5);
    // elementViewScene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(50);
    // elementViewScene.add(axesHelper);

    // Position and add object
    let objectCenter = getCenterPoint( objectTotLoad );
    if ( centerObject )  {
        objectTotLoad.position.setX(-1*objectCenter.x);
        objectTotLoad.position.setZ(-1*objectCenter.y);
        objectTotLoad.position.setY(1*objectCenter.z);
        objectTotLoad.translateX(-180);
        objectTotLoad.translateY(-120);
        objectTotLoad.translateZ(-100);
    }

    elementViewScene.add(objectTotLoad);

    function animate() {
        requestAnimationFrame(animate);
        if (elementViewOrbitControls != null) elementViewOrbitControls.update();
        // if (stats != null) stats.update();

        render();
    }

    function render() {
        elementViewRenderer.render(elementViewScene, elementViewCamera);
    }

    animate();
}

// Get center of a THREE.Mesh object. Returns THREE.Vector3
/**
 * @param  {THREE.Mesh} mesh
 */
function getCenterPoint(mesh) {
    var geometry = mesh.geometry;
    geometry.computeBoundingBox();
    var center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    mesh.localToWorld(center);

    return center;
}

export {
    populateElementsDropdown,
    getElementInfoFromTypeString,
    loadElementObject, 
    setElementInfo
};