'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping', []);

	app.controller('mappingController', function(){
		//this.nodeGroupName="test";
		this.nodes=[];
		this.orders=[1];
		this.tgCompetencies = tgCompetencies;
		this.mappings=[];
		
		var generateNumber = function(value, index){
			return Number(index+1);
		};
		
		var findNodeByCode = function(code, mappings){
			var nodeInMappings; 
			mappings.forEach(function(value){if(value.clientNode.code == code) nodeInMappings = value});
			return nodeInMappings;
		};
		
		this.updateOrderList = function(){
			this.orders = Array.apply(null, {length:this.nodes.length+1}).map(generateNumber, Number);
		};
		
		this.addNode = function(){
			this.nodes.push({name:this.nodeName, code: this.nodeCode, type:this.nodeType, order:this.nodeOrder, parentNode:this.parentNode, rank:this.nodeRank, weight:this.nodeWeight, description:this.nodeDescription});
			this.updateOrderList();
		};

		this.updateCode = function(){
			this.nodeCode = this.nodeName.toUpperCase().replace(/ /g, "_");
		};
		
		this.addMapping = function(){
			var nodeInMappings = findNodeByCode(this.selectClientNode.code, this.mappings);
			
			if (!nodeInMappings){
				this.mappings.push({clientNode:this.selectClientNode,childNodes:[{tgCompetency:this.selectTgCompetency, weight:this.selectTgCompetencyWeight, rank:this.selectTgCompetencyRank}]});
			}
			else
			{
				console.log(nodeInMappings.childNodes);
				nodeInMappings.childNodes.push({tgCompetency:this.selectTgCompetency, weight:this.selectTgCompetencyWeight, rank:this.selectTgCompetencyRank});
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
						]

})();
