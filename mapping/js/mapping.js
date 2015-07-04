'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping', []);

	app.controller('mappingController', function(){
		//this.nodeGroupName="test";
		this.nodes=[];
		this.addNodes = function(){
			this.nodes.push({name:this.nodeName});
		}
	});

})();
