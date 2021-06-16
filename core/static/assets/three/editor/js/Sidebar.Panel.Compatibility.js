import * as THREE from '/static/assets/three/build/three.module.js';
import * as ThreeUtils from '/static/assets/js/three-utils.js';
import {
	UIButton,
	UICanvas,
	UIPanel,
	UIRow,
	UISelect,
	UIText
} from "./libs/ui.js";

function SidebarCompatibilityPanel( editor ) {

	// Compatibility Container
	var compatibilityContainer = new UIPanel().setId('compat-panel');
	compatibilityContainer.setDisplay('none');
	compatibilityContainer.setMarginLeft('-10px');

	// Compatibility title
	var compatibilityPanelTitle = new UIText('Compatibility View')
		.setFontSize('20px')
		.setFontWeight('bold');
	compatibilityContainer.add(new UIRow().add(compatibilityPanelTitle));

	// Bring Element and > Buttons
	var compatibilityButtonsRow = new UIRow();
	var bringElementButton = new UIButton('Bring Element'); // EXTERNALIZE
	var compatibilityButton2 = new UIButton('>'); // EXTERNALIZE
	compatibilityButton2.setMarginLeft('10px');
	compatibilityButtonsRow.add(bringElementButton);
	compatibilityButtonsRow.add(compatibilityButton2);
	compatibilityContainer.add(compatibilityButtonsRow);

	// Compatibility dropdown
	var compatibilitySelectRow = new UIRow();
	var compatibilitySelect = new UISelect().setOptions({
		'': 'No Elements Loaded',
		'Test Object 1 Type': 'Object 1 ID',
		'Test Object 2 Type': 'Object 2 ID'
	});
	compatibilitySelect.setWidth('200px');
	compatibilitySelect.onChange(function (e) {
		compatibilityInfo.setValue(e.target.value);

		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({
			color: 0x00ff00
		});
		var cube = new THREE.Mesh(geometry, material);

		ThreeUtils.loadObjectInCanvas(cube, 'compat-canvas', false);

	});
	compatibilitySelectRow.add(compatibilitySelect);
	compatibilityContainer.add(compatibilitySelectRow);

	// Info string
	var compatibilityInfoRow = new UIRow();
	var compatibilityInfo = new UIText('').setId('compatibility-info-text');

	compatibilityInfoRow.add(new UIText('Info:').setWidth('90px'));
	compatibilityInfoRow.add(compatibilityInfo);

	compatibilityContainer.add(compatibilityInfoRow);

	// Compatibility Canvas
	var compatibilityCanvasRow = new UIRow();
	var compatibilityCanvas = new UICanvas('rgba(51,51,51,255)', '280px', '200px')
		.setId('compat-canvas');
	compatibilityCanvasRow.add(compatibilityCanvas);
	compatibilityContainer.add(compatibilityCanvasRow);


	return compatibilityContainer;
}

export {
	SidebarCompatibilityPanel
};
