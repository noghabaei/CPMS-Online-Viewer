import { UICheckbox, UIHorizontalRule, UIInput, UIPanel, UIRow, UISelect, UISpan, UIText } from "./libs/ui.js";
import * as BIMUTils from '/static/assets/js/BIMUtils.js';

function SidebarControls(editor) {

    var controlsContainer = new UIPanel();

    var selectRow = new UIRow();
    var controlSelect = new UISelect().setId( "controlInputs" ).setWidth( '120px' );
    controlSelect.setOptions( {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4'
    } );
    selectRow.add( controlSelect );

    controlsContainer.add( selectRow );

    // controlsContainer.add( new UIHorizontalRule() );


    var BIMSwitchRow = new UIRow();

    var BIMSwitchLabel = new UIText( "BIM" ).setWidth( '90px' );
    var BIMCheckbox = new UICheckbox().setId( 'bim' ).setValue( true );
    BIMCheckbox.onChange( function (e) {
        let checked = BIMCheckbox.getValue();

        var bimObject = BIMUTils.getBIMGroupByChildrenName( editor.scene );

        if (checked) {
            bimObject.visible = true;
        } else {
            bimObject.visible = false;
        }

        editor.signals.sceneGraphChanged.dispatch();
    } );
    
    BIMSwitchRow.add( BIMSwitchLabel );
    BIMSwitchRow.add( BIMCheckbox );
    
    controlsContainer.add( BIMSwitchRow );


    var imageSwitchRow = new UIRow();
    
    var imageSwitchLabel = new UIText( "Image" ).setWidth( '90px' );
    var imageCheckbox = new UICheckbox().setId( 'image' ).setValue( false );

    imageSwitchRow.add( imageSwitchLabel );
    imageSwitchRow.add( imageCheckbox );

    controlsContainer.add( imageSwitchRow );

    // controlsContainer.add( new UIHorizontalRule() );


    var uvLaserSwitchRow = new UIRow();

    var uvLaserSwitchLabel = new UIText( "UV/Laser" ).setWidth( '90px' );
    var uvLaserCheckbox = new UICheckbox().setId( 'uvlaser' ).setValue( false );

    uvLaserSwitchRow.add( uvLaserSwitchLabel );
    uvLaserSwitchRow.add( uvLaserCheckbox );

    controlsContainer.add( uvLaserSwitchRow );

    return controlsContainer;
}

export {
	SidebarControls
};
