'use strict';

// Configuring the Articles module
angular.module('valuploaders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Valuploaders', 'valuploaders', 'dropdown', '/valuploaders(/create)?');
		Menus.addSubMenuItem('topbar', 'valuploaders', 'List Valuploaders', 'valuploaders');
		Menus.addSubMenuItem('topbar', 'valuploaders', 'New Valuploader', 'valuploaders/create');
	}
]);