import { UIPanel } from "./libs/ui.js";

function MenubarLinks( editor ) {
    
    var strings = editor.strings;

    var container = new UIPanel();

    // Link to Compatibility Mode
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'View Mode' ); // Externalize String!
	title.onClick( function () {

        window.location.href = '/index.html';

	} );
	container.add( title );
	
	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'Compatibility Mode' ); // Externalize String!
	title.onClick( function () {

        window.location.href = '/compatibility.html';

	} );
	// container.add( title );

    // Link to Settings Page
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'Settings' ); // Externalize String!
	title.onClick( function () {

        window.location.href = '/icons.html';

	} );
	// container.add( title );

    // Link to Profile Page
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'User Profile' ); // Externalize String!
	title.onClick( function () {

        window.location.href = '/profile.html';

	} );
	// container.add( title );

    // Link to Schedule Page
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'Schedule' ); // Externalize String!
	title.onClick( function () {

        window.location.href = '/tables.html';

	} );
	// container.add( title );

	return container;
}

export { MenubarLinks };