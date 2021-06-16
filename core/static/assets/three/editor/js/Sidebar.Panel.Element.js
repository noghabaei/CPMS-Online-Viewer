import * as THREE from '/static/assets/three/build/three.module.js';
import * as ThreeUtils from '/static/assets/js/three-utils.js';
import { UIButton, UICanvas, UIHorizontalRule, UIPanel, UIRow, UISelect, UIText } from "./libs/ui.js";
import { SidebarCompatibilityPanel } from './Sidebar.Panel.Compatibility.js';


function SidebarElementPanel( editor ) {

    var strings = editor.strings;

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

    container.add( elementViewButtonsRow );

    // Elements dropdown
    var selectRow = new UIRow();
    var elementSelect = new UISelect().setOptions( {
        '': 'No Elements Loaded',
        'Test Object 1 Type': 'Object 1 ID',
        'Test Object 2 Type': 'Object 2 ID'
    } );
    elementSelect.setWidth( '200px' );
    elementSelect.onChange( function( e ) {
        elementInfo.setValue( e.target.value );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var cube = new THREE.Mesh( geometry, material );
        
        ThreeUtils.loadObjectInCanvas( cube, 'element-canvas', false );

    } );
    selectRow.add( elementSelect );
    container.add( selectRow );

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

    return container;
}


export { SidebarElementPanel };