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
import { AddObjectCommand } from './commands/AddObjectCommand.js';

function SidebarCompatibilityPanel( editor ) {

	// Compatibility Container
	var compatibilityContainer = new UIPanel().setId('compat-panel');
	// compatibilityContainer.setDisplay('none');
	compatibilityContainer.setMarginLeft('-10px');

	// Compatibility title
	var compatibilityPanelTitle = new UIText('Compatibility View')
		.setFontSize('20px')
		.setFontWeight('bold');
	compatibilityContainer.add(new UIRow().add(compatibilityPanelTitle));

	// Bring Element and > Buttons
	var compatibilityButtonsRow = new UIRow();
	var bringElementButton = new UIButton('Bring Element'); // EXTERNALIZE
	bringElementButton.onClick( function() {
		var selectValue = document.getElementById( compatibilitySelect.getId() ).value;
		// console.log( 'select value: '+ selectValue );

		var mesh = getCompatObjectToLoad( selectValue, 'main' );

		editor.execute( new AddObjectCommand( editor, mesh ) );
	} );

	function getCompatObjectToLoad(shapeToLoad, forScene = 'compat') {
		var shapeGeometry = null;
	
		if (shapeToLoad == null) {
			console.log('getCompatObjectToLoad: Null Input : Loading Cube by default');
			shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(2, 2, 2);
	
		} else if (shapeToLoad.toLowerCase() == 'cube') {
			shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(2, 2, 2);
	
		} else if (shapeToLoad.toLowerCase() == 'sphere') {
			shapeGeometry = forScene == 'main' ? new THREE.SphereGeometry(20, 50, 50) : new THREE.SphereGeometry(1, 20, 20);
	
		} else if (shapeToLoad.toLowerCase() == 'cylinder') {
			shapeGeometry = forScene == 'main' ? new THREE.CylinderGeometry(20, 20, 50, 50, 50) : new THREE.CylinderGeometry(1, 1, 5, 10, 10);
	
		} else {
			shapeGeometry = forScene == 'main' ? new THREE.BoxGeometry(50, 50, 50) : new THREE.BoxGeometry(1, 1, 1);
		}
		console.log('Loading:');
		console.log(shapeGeometry);
	
		var material = new THREE.MeshPhongMaterial({
			color: 'white'
		});
	
		var mesh = new THREE.Mesh(shapeGeometry, material);
		return mesh;
	}

	var compatibilityButton2 = new UIButton('>'); // EXTERNALIZE
	compatibilityButton2.setMarginLeft('10px');
	
	compatibilityButtonsRow.add(bringElementButton);
	compatibilityButtonsRow.add(compatibilityButton2);
	compatibilityContainer.add(compatibilityButtonsRow);

	// Compatibility dropdown
	var compatibilitySelectRow = new UIRow();
	var compatibilitySelect = new UISelect().setId( "compat-select" ).setOptions({
		'': 'No Elements Loaded',
		'cube': 'Cube',
		'sphere': 'Sphere',
		'cylinder': 'Cylinder',
	});
	compatibilitySelect.setWidth('200px');

	compatibilitySelect.onChange(function (e) {
		compatibilityInfo.setValue(e.target.value);

		// var geometry = new THREE.BoxGeometry(1, 1, 1);
		// var material = new THREE.MeshBasicMaterial({
		// 	color: 0x00ff00
		// });
		// var cubeMesh = new THREE.Mesh(geometry, material);
		// cubeMesh.name = "Box";

		var mesh = getCompatObjectToLoad( e.target.value, 'compat' );

		ThreeUtils.loadObjectInCanvas(mesh, 'compat-canvas', false);

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
