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

            if (childId != null && childType != null) {
                elementIdTypeMapList.push({
                    'id': childId,
                    'type': childType
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

        let dropdownOption = $('<button></button>')
            .addClass("dropdown-item")
            .attr('type', 'button')
            .attr('elementType', escape(childType))
            .text(childId);

        $('#element-dropdown-menu').append(dropdownOption);
    });

}

function loadElementObject(elementId, mainObj, canvasElement) {
    // Create scene
    let elementViewScene = new THREE.Scene();

    //TODO: setup background texture

    // Create camera
    let elementViewCanvas = canvasElement;
    let elementViewCamera = getElementViewCamera(elementViewCanvas);

    // Create lights
    let sceneLight = getElementViewLights();
    elementViewScene.add(sceneLight);

    // Create renderer
    let elementViewRenderer = new THREE.WebGLRenderer({
        canvas: elementViewCanvas,
        antialias: true
    });

    // Setup Orbit Controls
    let elementViewOrbitControls = getOrbitControls(elementViewCamera, elementViewCanvas, true, {
        'x': 0,
        'y': 1,
        'z': 0
    });

    // Find and display the child element with given element id
    if (mainObj != null) {
        mainObj.traverse(function (child) {
            if (child.isMesh) {
                if (getElementId(child) == elementId) {

                    var childWorldCenter = getCenterPoint(child);
                    child.position.set(-1 * childWorldCenter.x, -1 * childWorldCenter.y, -1 * childWorldCenter.z);
                    elementViewScene.add(child);

                    animate(elementViewScene, elementViewCamera, elementViewRenderer, elementViewOrbitControls);
                }
            }
        });
    } else {
        console.log('Main object is null');
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
function animate(scene, camera, renderer, controls = null, stats = null) {
    requestAnimationFrame(animate);
    if (controls != null) controls.update();
    if (stats != null) stats.update();

    render(scene, camera, renderer);
}

// Move this to a util module
function render(scene, camera, renderer) {
    renderer.render(scene, camera);
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
    loadElementObject
};