function getElementType(element) {
    if (element == null || element.name == null || !validateElementName(element.name)) return null;

    var nameStringRegex = new RegExp("(^.*)_[0-9]*_Geometry$");
    var found = element.name.match(nameStringRegex);

    if (found == null || found.length === 0) return null;
    else return found[found.length - 1];
}

function getElementId(element) {
    if (element == null || element.name == null || !validateElementName(element.name)) return null;

    var nameStringRegex = new RegExp("^.*_([0-9]*)_Geometry$");
    var found = element.name.match(nameStringRegex);

    if (found == null || found.length === 0) return null;
    else return found[found.length - 1];
}

function validateElementName(nameString) {
    if (nameString == null || nameString.length === 0) return false;

    var nameStringRegex = new RegExp("^.*_[0-9]*_Geometry$");

    if (!nameStringRegex.test(nameString)) {
        console.log('Invalid namestring: ' + nameString);
    }

    return nameStringRegex.test(nameString);
}

function setElementInfo(elementTypeString) {
    let infoString = getElementInfoFromTypeString(elementTypeString, true);
    $('#element-info-span').text(infoString);
}

function getElementInfoFromTypeString(elementTypeString, prefixInfo) {
    if (elementTypeString == null) return null;

    var infoString = unescape(elementTypeString).replace(/_/g, ' ');
    return prefixInfo ? 'Info: ' + infoString : infoString;
}

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

function loadElementObject(objectTotLoad) {
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
    let elementViewOrbitControls = new THREE.OrbitControls(elementViewCamera, elementViewCanvas);
    elementViewOrbitControls.screenSpacePanning = true;
    elementViewOrbitControls.target.set(0, 1, 0);

    // Add object to load to scene
    let childWorldCenter = getCenterPoint(objectTotLoad);
    objectTotLoad.position.set(-1 * childWorldCenter.x, -1 * childWorldCenter.y, -1 * childWorldCenter.z);
    elementViewScene.add(objectTotLoad);
    
    const gridHelper = new THREE.GridHelper(10, 10);
    elementViewScene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    elementViewScene.add(axesHelper);

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

// Move this to a util module
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