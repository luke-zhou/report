'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping', []);

	app.controller('mappingController', function(){
		//this.nodeGroupName="test";
		this.nodes=[];
		this.orders=[];
		
		var generateNumber = function(value, index){
			return Number(index+1);
		};
		this.updateOrderList = function(){
			this.orders = Array.apply(null, {length:this.nodes.length}).map(generateNumber, Number);
		};
		
		this.addNodes = function(){
			this.nodes.push({name:this.nodeName, code: this.nodeCode, type:this.nodeType, order:this.nodeOrder, parentNode:this.parentNode, rank:this.nodeRank, weight:this.nodeWeight, description:this.nodeDescription});
			this.updateOrderList();
		};

		this.updateCode = function(){
			this.nodeCode = this.nodeName.toUpperCase().replace(/ /g, "_");
		};
	});

})();
