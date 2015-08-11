'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping');

	app.controller('clientCompetencyCtrl', function(){
		
		this.nodes=[];
		this.node={};
		this.orders=[1];

		this.nodes.findByType = function(type){
			return this.filter(function(value){return value.type === type});
		};

		this.nodes.findeByParent = function (parent){
			return this.filter(function(value){return value.parentNode === parent;})
		};

		this.nodes.validateUnique = function(node, key){
			if (node[key]==null||node[key]=='') return 'error';
			if (this.some(function(value){return value!=node&&value[key]==node[key];})) return 'error';
			return '';
		};

		this.nodes.validateNotNull = function(node, key){
			if (node[key]==null||node[key]=='') return 'error';
			return '';
		};

		this.nodes.validateRank = function(node){
			if (node.parentNode==null) return '';

			if (node.rank==null) return 'error';
			if (this.some(function(value){return value!=node&&value.parentNode==node.parentNode&&value.rank==node.rank;})) return 'error';
			return '';
		};

		this.nodes.validateWeight = function(node){
			if (node.parentNode==null) return '';

			if (node.weight==null) return 'error';
			var weightSum =0;
			this.forEach(
				function(value){
					if(value.parentNode===node.parentNode) weightSum+=Number(value.weight);
				});
			console.log(weightSum);
			if (weightSum!=100) return 'error';
			else return '';
		};

		this.deleteNode = function(node){
			this.nodes.remove(node);
			this.orders.decrease();
		};

		this.addNode = function(){
			this.nodes.push(
			{ 
			  name:this.node.name, 
			  code: this.node.code, 
			  type:this.node.type, 
			  order:this.node.order, 
			  parentNode:this.node.parentNode, 
			  rank:this.node.rank, 
			  weight:this.node.weight, 
			  description:this.node.description
			});
			this.orders.increase();
			this.node.clear();
		};

		this.orders.increase = function(){
			this.push(this.length+1);
		};

		this.orders.decrease = function(){
			this.pop();
		};

		this.node.getPossibleRank = function(nodes){
			var allChildNodes = nodes.findeByParent(this.parentNode);
			return range(1, allChildNodes.length+1);
		};

		this.node.clear = function(){
			this.name =null;
			this.code =null;
			this.type ="";
			this.order =null;
			this.parentNode = null;
			this.rank =null;
			this.weight =null;
			this.description = null;
		};

		//generate node code based on input node name
		this.updateCode = function(){
			this.node.code = this.node.name.toUpperCase().replace(/ /g, "_");
		};

		//update possible parent nodes option
		this.updatePossibleParentNodes = function(){
			this.possibleParentNodes = this.node.getPossibleParentNodes(this.nodes);
		};

		//update possilbe rank option
		this.updatePossibleRank = function(){
			this.possibleRank = this.node.getPossibleRank(this.nodes);
		};

		this.node.getPossibleParentNodes = function(nodes){
			if (this.type==="Cluster") return nodes.findByType("Domain");
			if (this.type ==="Competency") return nodes.findByType("Cluster");
			return [];
		};

		this.nodes.remove = function(node){
			this.forEach(
				function(value){
					if(value.parentNode===node){
						value.parentNode = null;
						value.rank = null;
						value.weight = null;
					}
				});
			this.splice(this.indexOf(node), 1);
		};

		var range = function(start, end){
			var result =[];
			for (var i = start;i<=end;i++){
				result.push(i);
			}
			return result;
		};
		

	});
	

})();
