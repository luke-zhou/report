'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping');

	app.controller('nodeGroupCtrl', function(){
		this.nodeGroupName='';
		this.organisationId='';
	});
})();