import { UIBreak, UIButton, UICanvas, UIPanel, UIRow, UISelect, UIText } from "./libs/ui.js";

function SidebarElementPanel( editor ) {
    
    var strings = editor.strings;

    var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );

    // compatibility check button
    var buttonRow = new UIRow();
    var compatibilityCheckButton = new UIButton( 'Compatibility Check' );   // EXTERNALIZE
    compatibilityCheckButton.setId( 'compat-btn' );
    buttonRow.add( compatibilityCheckButton );
    
    // View mode button
    var viewModeButton = new UIButton( 'View Mode' ); // EXTERNALIZE
    viewModeButton.setId( 'view-mode-btn' );
    viewModeButton.setStyle( 'display' , ['none'] );
    buttonRow.add( viewModeButton );

    container.add( buttonRow );

    // Elements dropdown
    var selectRow = new UIRow();
    var elementSelect = new UISelect().setOptions( {
        'None': 'No Elements Loaded'
    } );
    elementSelect.setWidth( '200px' );
    selectRow.add( elementSelect );
    container.add( selectRow );

    // Info string
    var elementInfoRow = new UIRow();
	var elementInfo = new UIText(' - ');

	elementInfoRow.add( new UIText( 'Info:' ).setWidth( '90px' ) );
	elementInfoRow.add( elementInfo );

	container.add( elementInfoRow );

    // Canvas
    var canvasRow = new UIRow();
    var elementCanvas = new UICanvas( 'rgba(51,51,51,255)', '280px', '200px' )
                        .setId( 'element-canvas' );
    container.add( elementCanvas );

    return container;
}

export { SidebarElementPanel };