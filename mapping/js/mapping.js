'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping', []);

	app.controller('mappingController', function(){
		//this.nodeGroupName="test";
		this.node={};
		this.nodes=[];
		this.orders=[1];
		this.tgCompetencies = tgCompetencies;
		this.mappings=[];
		this.possibleParentNodes=[];
		this.possibleRank =[];
		this.validate ={};

		this.mappings.findNodeByCode = function(code){
			var nodeInMappings; 
			this.forEach(
				function(value){
				if(value.clientNode.code == code) nodeInMappings = value;
				});
			return nodeInMappings;
		};

		this.orders.increase = function(){
			this.push(this.length+1);
		};

		this.orders.decrease = function(){
			this.pop();
		}

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

		this.deleteNode = function(node){
			this.nodes.remove(node);
			this.orders.decrease();
		};

		var range = function(start, end){
			var result =[];
			for (var i = start;i<=end;i++){
				result.push(i);
			}
			return result;
		}

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
		}
		
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
		
		this.addMapping = function(){
			var nodeInMappings = this.mappings.findNodeByCode(this.selectClientNode.code);
			
			if (nodeInMappings){
				nodeInMappings.childNodes.push(
				{
					tgCompetency:this.selectTgCompetency, 
					weight:this.selectTgCompetencyWeight, 
					rank:this.selectTgCompetencyRank
				});
			}
			else
			{
				this.mappings.push(
				{
					clientNode:this.selectClientNode,
					childNodes:[{
									tgCompetency:this.selectTgCompetency, 
									weight:this.selectTgCompetencyWeight, 
									rank:this.selectTgCompetencyRank
								}]
				});
			}
		};
	});
	
	var tgCompetencies =[	{name:"Builds Relationships", code:"BUILDS_RELATIONSHIPS"},
							{name:"Shows Interpersonal Awareness", code:"SHOWS_INTERPERSONAL_AWARENESS"},
							{name:"Fosters Team Spirit", code:"FOSTERS_TEAM_SPIRIT"},
							{name:"Communicates With Impact", code:"COMMUNICATES_MESSAGE"},
							{name:"Persuades Audience", code:"PERSUADES_AUDIENCE"},
							{name:"Resolves Conflict", code:"RESOLVES_CONFLICT"},
							{name:"Maintains Resilience", code:"STAYS_COMPOSED"},
							{name:"Embraces Change", code:"EMBRACES_CHANGE"},
							{name:"Maintains Balance", code:"MAINTAINS_BALANCE"},
							{name:"Shows Optimism", code:"SHOWS_OPTIMISM"},
							{name:"Understands Own Emotions", code:"UNDERSTANDS_OWN_EMOTIONS"},
							{name:"Understands Others Emotions", code:"UNDERSTANDS_OTHERS_EMOTIONS"},
							{name:"Displays Integrity", code:"DISPLAYS_INTEGRITY"},
							{name:"Embraces Diversity", code:"EMBRACES_DIVERSITY"},
							{name:"Shows Tolerance", code:"SHOWS_TOLERANCE"},
							{name:"Promotes Corporate Social Responsibility", code:"PROMOTES_CORPORATE_SOCIAL_RESPONSIBILITY"},
							{name:"Uses Diplomacy", code:"USES_DIPLOMACY"},
							{name:"Networks Strategically", code:"NETWORKS_STRATEGICALLY"},
							{name:"Seeks Learning Opportunities", code:"SEEKS_LEARNING_OPPORTUNITIES"},
							{name:"Achieves Excellence", code:"ACHIEVES_RESULTS"},
							{name:"Drives Self-Improvement", code:"DRIVES_SELF-IMPROVEMENT"},
							{name:"Motivates Action", code:"MOTIVATES_ACTION"},
							{name:"Mentors Individuals", code:"MENTORS_INDIVIDUALS"},
							{name:"Envisions Possibilities", code:"ENVISIONS_POSSIBILITIES"},
							{name:"Drives Change", code:"INSPIRES_CHANGE"},
							{name:"Sources Talent", code:"SOURCES_TALENT"},
							{name:"Manages Performance", code:"MANAGES_PERFORMANCE"},
							{name:"Makes Tough Calls", code:"MAKES_TOUGH_CALLS"},
							{name:"Takes Control", code:"TAKES_CONTROL"},
							{name:"Plans Activities", code:"PLANS_ACTIVITIES"},
							{name:"Organises Self", code:"ORGANISES_SELF"},
							{name:"Ensures Quality", code:"ENSURES_QUALITY"},
							{name:"Works Efficiently", code:"WORKS_EFFICIENTLY"},
							{name:"Monitors Progress", code:"MONITORS_PROGRESS"},
							{name:"Acts Compliantly", code:"ACTS_COMPLIANTLY"},
							{name:"Works Safely", code:"WORKS_SAFELY"},
							{name:"Researches Effectively", code:"RESEARCHES_EFFECTIVELY"},
							{name:"Synthesises Information", code:"SYNTHESISES_INFORMATION"},
							{name:"Finds Solutions", code:"FINDS_SOLUTIONS"},
							{name:"Makes Decisions", code:"MAKES_DECISIONS"},
							{name:"Thinks Strategically", code:"THINKS_STRATEGICALLY"},
							{name:"Thinks Globally", code:"THINKS_GLOBALLY"},
							{name:"Thinks Innovatively", code:"THINKS_INNOVATIVELY"},
							{name:"Meets Deadlines", code:"MEETS_DEADLINES"}
						];

})();
