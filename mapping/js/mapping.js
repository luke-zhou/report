'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping', []);

	app.controller('mappingController', function(){
		//this.nodeGroupName="test";
		this.nodes=[];

		this.addNodes = function(){
			this.nodes.push({name:this.nodeName, code: this.nodeCode, type:this.nodeType, order:this.nodeOrder, parentNode:this.parentNode, rank:this.nodeRank, weight:this.nodeWeight, description:this.nodeDescription});
		};

		this.updateCode = function(){
			this.nodeCode = this.nodeName.toUpperCase().replace(/ /g, "_");
		};
	});

})();
