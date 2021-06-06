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

function loadElementObject(elementId, mainObj, canvasElement) {
    // Create scene
    var elementViewScene = new THREE.Scene();

    //TODO: setup background texture

    // Create camera
    var elementViewCanvas = canvasElement;
    var elementViewCamera = getElementViewCamera(elementViewCanvas);

    // Create lights
    var sceneLight = getElementViewLights();
    elementViewScene.add(sceneLight);

    // Create renderer
    var elementViewRenderer = new THREE.WebGLRenderer({
        canvas: elementViewCanvas,
        antialias: true
    });

    // Setup Orbit Controls
    var elementViewOrbitControls = getOrbitControls(elementViewCamera, elementViewCanvas, true, {
        'x': 0,
        'y': 1,
        'z': 0
    });

    // Find and display the child element with given element id
    var loader = new THREE.ObjectLoader();
    loader.load(
        "/static/assets/fbx/scene.json",
        function (obj) {
            mainObj.traverse(function (child) {
                if (child.isMesh) {
                    if (getElementId(child) == elementId) {
    
                        var childWorldCenter = getCenterPoint(child);
                        child.position.set(-1 * childWorldCenter.x, -1 * childWorldCenter.y, -1 * childWorldCenter.z);
                        elementViewScene.add(child);
    
                        animate();
                    }
                }
            });
        });

    function animate() {
        requestAnimationFrame(animate);
        if (elementViewOrbitControls != null) elementViewOrbitControls.update();
        // if (stats != null) stats.update();

        render();
    }

    function render() {
        elementViewRenderer.render(elementViewScene, elementViewCamera);
    }
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

// Move this to a util module
function getOrbitControls(camera, canvas, screenSpacePanning = true, target = {
    'x': 0,
    'y': 0,
    'z': 0
}) {
    let oc = new THREE.OrbitControls(camera, canvas);
    oc.screenSpacePanning = screenSpacePanning;
    oc.target.set(target.x, target.y, target.z);

    return oc;
}

function getElementViewCamera(elementViewCanvas) {
    let camera = new THREE.PerspectiveCamera(
        60, $(elementViewCanvas).width() / $(elementViewCanvas).height(), 0.00001, 2000);

    camera.translateZ(5);

    return camera;
}

function getElementViewLights() {
    return new THREE.HemisphereLight('white', 'brown', 1);
}

export {
    populateElementsDropdown,
    getElementInfoFromTypeString,
    loadElementObject, 
    setElementInfo
};