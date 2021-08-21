// Utility File for CPMS application


/**
 * Get type string of a BIM element, given a valid BIM element JS object.
 * @param  {*} element
 */
function getElementType( element ) {
    if (element == null || element.name == null || !validateElementName(element.name)) return null;

    var nameStringRegex = new RegExp("(^.*)_[0-9]*_Geometry$");
    var found = element.name.match(nameStringRegex);

    if (found == null || found.length === 0) return null;
    else return found[found.length - 1];
}


/**
 * Get ID string of a BIM element, given a valid BIM element JS object.
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
 * Helper method for setElementInfo()
 * @param  {string} elementTypeString Element Type String
 * @param  {boolean} prefixInfo=false Append Info: to resulting string if true
 * @return {string} Element Info String
 */
function getElementInfoFromTypeString(elementTypeString, prefixInfo=false) {
    if (elementTypeString == null) return null;

    var infoString = unescape(elementTypeString).replace(/_/g, ' ');
    return prefixInfo ? 'Info: ' + infoString : infoString;
}

/**
 * The BIM Group in the scene has around 1949 children, and each child (which is a Mesh) has a name ending in "_Geometry".
 * @param  {THREE.Scene} scene
 * @return {Object} Parent JS object containing the BIM elements.
 */
function getBIMGroupByChildrenName( scene ) {
    let BIMGroup = null;

    var children = scene.children;

    var queue = [ scene ]
    while ( queue.length > 0 ) {
        var node = queue.shift();
        if ( testForBimParent( node ) ) {
            BIMGroup = node;
            break;
        }
        
        for ( let i=0; i<node.children.length; i++ ) {
            queue.push( node.children[i] );
        }
    }

    // for ( let i=0, l=children.length; i < l; i++ ) {
        
    // }

    // for ( let i=0, l=children.length; i < l; i++ ) {
    //     var objectsArray = children[i].children;
    //     if ( objectsArray != null ) {
    //         for ( let j=0, k=objectsArray.length; j < k; j++ ) {
    //             if ( objectsArray[j].name != null 
    //                 && objectsArray[j].name.endsWith( '_Geometry' ) 
    //                 && objectsArray[j].isMesh ) {
    //                     BIMGroup = children[i];
    //                     break;
    //                 }
    //         }
    //     }
    // }

    if ( BIMGroup == null ) {
        BIMGroup = scene.children[0].children[2];
    }

    return BIMGroup;
}

// Test if the current node is a parent node for the BIM elements. 
// The BIM elements each have a name that ends with '_Geometry'.
//TODO: Use a better test.
function testForBimParent( node ) {
    var objectsArray = node.children;
    if ( objectsArray != null ) {
        for ( let j=0, k=objectsArray.length; j < k; j++ ) {
            if ( objectsArray[j].name != null 
                && objectsArray[j].name.endsWith( '_Geometry' ) 
                && objectsArray[j].isMesh ) {
                    return true;
                }
        }
    }

    return false;
}


// DEPRECATED. 
// Faulty logic. Do not use.
function getBIMGroupByUUId( scene ) {
    //TODO externalize this string!!!!
    const BIMGroupUUID = "C72D7B41-8227-4E77-B423-45CCF2FD6942";
    
    var BIMGroup = null;

    var children = scene.children;
    for ( let i = 0, l = children.length; i < l; i++ ) {
        if ( children[i].uuid == BIMGroupUUID ) {
            BIMGroup = children[i];
            break;
        }
    }

    return BIMGroup;
}

export {
    getElementType,
    getElementId,
    validateElementName,
    getElementInfoFromTypeString, 
    getBIMGroupByChildrenName
};