import * as ThreeUtils from '/static/assets/js/three-utils.js';
import { UIButton, UICanvas, UIHorizontalRule, UIPanel, UIRow, UISelect, UIText } from "./libs/ui.js";
import { SidebarCompatibilityPanel } from './Sidebar.Panel.Compatibility.js';
import * as BIMUtils from "/static/assets/js/BIMUtils.js";

function SidebarElementPanel( editor ) {

    var strings = editor.strings;
    var signals = editor.signals;

    var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );

    // compatibility check button
    var elementViewButtonsRow = new UIRow();
    var compatibilityCheckButton = new UIButton( 'Compatibility Check' );   // EXTERNALIZE
    compatibilityCheckButton.setId( 'compat-btn' );

    compatibilityCheckButton.onClick( function( e ) {
        document.getElementById( 'view-mode-btn' ).style.display = 'block';
        document.getElementById( 'compat-panel' ).style.display = 'block';
        e.target.style.display = 'none';
    } );

    elementViewButtonsRow.add( compatibilityCheckButton );
    
    // View mode button
    var viewModeButton = new UIButton( 'View Mode' ); // EXTERNALIZE
    viewModeButton.setId( 'view-mode-btn' );
    viewModeButton.setStyle( 'display' , ['none'] );

    viewModeButton.onClick( function( e ) {
        document.getElementById( 'compat-btn' ).style.display = 'block';
        document.getElementById( 'compat-panel' ).style.display = 'none';
        e.target.style.display = 'none';
    } );

    elementViewButtonsRow.add( viewModeButton );

    // container.add( elementViewButtonsRow );

    // Elements dropdown
    var selectRow = new UIRow();
    var elementSelect = new UISelect().setOptions( {
        '': 'No Elements Loaded'
    } );
    elementSelect.setWidth( '200px' );

    elementSelect.onChange( function( e ) {
        elementInfo.setValue( e.target.value );

        var selectedOption = e.target.options[ e.target.selectedIndex ];

        var elementToLoad = getElementToLoad( selectedOption.getAttribute( 'name' ) );
        
        if ( elementToLoad != null )
            ThreeUtils.loadObjectInCanvas( elementToLoad, 'element-canvas', true, 'view');

    } );
    selectRow.add( elementSelect );
    container.add( selectRow );

    function getElementToLoad( elementName ) {
        var BIMGroup = getBIMGroupFromScene( editor.scene );

        return BIMGroup.getObjectByName( elementName );
    }

    // Info string
    var elementInfoRow = new UIRow();
	var elementInfo = new UIText('').setId( 'element-info-text' );

	elementInfoRow.add( new UIText( 'Element Info:' ).setWidth( '90px' ) );
	elementInfoRow.add( elementInfo );

	container.add( elementInfoRow );

    // Element Canvas
    var elementCanvasRow = new UIRow();
    var elementCanvas = new UICanvas( 'rgba(51,51,51,255)', '280px', '200px' )
                        .setId( 'element-canvas' );
    elementCanvasRow.add( elementCanvas );
    container.add( elementCanvasRow );

    container.add( new UIHorizontalRule() );

    // Import the compatibility panel
    var compatibilityContainer = new SidebarCompatibilityPanel( editor );

    container.add( compatibilityContainer );

    signals.sceneGraphChanged.add( refreshElementPanelUI );

    function refreshElementPanelUI() {
        console.log( 'Refreshing Element Panel' );
        populateElementDropdown();
    }

    function getBIMGroupFromScene( scene ) {
        let BIMGroup = null;

        // BIMGroup = getBIMGroupByUUId( scene );
        BIMGroup = BIMUtils.getBIMGroupByChildrenName( scene );

        if ( BIMGroup == null ) {
            // BIMGroup = scene.getObjectByName( "BIM" );
            BIMGroup = scene.children[0].children[2];
            // BIMUtils.getBIMGroupByChildrenName( scene );
        }

        console.log("BIM Group:");
        console.log(BIMGroup);

        return BIMGroup;
    }
    
    // The BIM Group in the scene has around 1949 children, 
    // and each child (which is a Mesh) has a name ending in "_Geometry".
    function getBIMGroupByChildrenName( scene ) {
        var BIMGroup = null;

        var children = scene.children;
        for ( let i=0, l=children.length; i < l; i++ ) {
            var objectsArray = children[i].children;
            if ( objectsArray != null ) {
                for ( let j=0, k=objectsArray.length; j < k; j++ ) {
                    if ( objectsArray[j].name != null 
                        && objectsArray[j].name.endsWith( '_Geometry' ) 
                        && objectsArray[j].isMesh ) {
                            BIMGroup = children[i];
                            break;
                        }
                }
            }
        }

        return BIMGroup;
    }

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

    function populateElementDropdown() {
        
        var elementObjectsList = getElementObjectsList();

        elementSelect.clear();
        elementSelect.addOption( {
            "value": "",
            "text": "",
            "attributes":[]
        } );

        for ( let elementObj of elementObjectsList ) {
            let optionObj = {
                "value": BIMUtils.getElementInfoFromTypeString( elementObj.type ),
                "text": elementObj.id,
                "attributes":[
                    { "name": elementObj.name }
                ]
            };

            elementSelect.addOption( optionObj );
        }
    }

    function getElementObjectsList() {
        var elementsList = [];

        var BIMGroup = getBIMGroupFromScene( editor.scene );

        if (BIMGroup == null) return elementsList;

        var children = BIMGroup.children;

        for ( let i = 0; i < children.length; i++ ) {
            let child = children[i];
            let childId = BIMUtils.getElementId(child);
            let childType = BIMUtils.getElementType(child);
            let childName = child.name;
            
            if (childId != null && childType != null) {
                let elementObj = {
                    "type": BIMUtils.getElementInfoFromTypeString( childType ),
                    "id": childId,
                    "name": childName
                };

                elementsList.push( elementObj );
            }

        }

        // sort objects in the list based on ID
        elementsList.sort( (ele1, ele2) => {
            return ele1.id.localeCompare(ele2.id);
        });

        return elementsList;
    }

    return container;
}

export { SidebarElementPanel };