'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('mapping');

	app.controller('mappingCtrl', function(){
		this.nodeGroupName='';
		this.organisationId='';


		this.tgCompetencies = tgCompetencies;
		this.mappings=[];
		this.possibleParentNodes=[];
		this.possibleRank =[];
		this.validate ={};
		this.possibleTgCompetencyRank=[];


		this.updatePossibleTgCompetencyRank = function(clientNode){
			var node = this.mappings.findNodeByCode(clientNode.code);
			var childNodeNumber = node==null ? 1 : node.childNodes.length+1;
			var plusOneNumber = function(value, index){return index+1;};
			this.possibleTgCompetencyRank = Array.apply(null, {length: childNodeNumber}).map(plusOneNumber);
		}

		this.mappings.findNodeByCode = function(code){
			var nodeInMappings; 
			this.forEach(
				function(value){
				if(value.clientNode.code == code) nodeInMappings = value;
				});
			return nodeInMappings;
		};

		this.mappings.deleteMapping = function(clientCompetency, tgCompetency){
			clientCompetency.childNodes.splice(clientCompetency.childNodes.indexOf(tgCompetency), 1);
			if (clientCompetency.childNodes.length==0){
				this.splice(this.indexOf(clientCompetency),1);
			}

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

			this.selectClientNode=null;
			this.selectTgCompetencyWeight=null;
			this.selectTgCompetency=null;
			this.selectTgCompetencyRank=null;
		};

		this.mappings.validateTgCompetency = function(childNode, clientNode){
			if ((!childNode.tgCompetency) || childNode.tgCompetency=='') return 'error';
			if (clientNode.childNodes.some(function(value){return value!=childNode&&value.tgCompetency==childNode.tgCompetency;})) return 'error';
			return '';
		};

		this.mappings.validateWeight = function(childNode, clientNode){
			if ((!childNode.weight) || childNode.weight=='') return 'error';

			var weightSum=0;
			clientNode.childNodes.forEach(
				function(value){
					 weightSum+=Number(value.weight);
				});
			return weightSum ==100?'':'error';

		};

		this.mappings.validateRank = function(childNode, clientNode){
			if ((!childNode.rank)||childNode.rank==null) return 'error';

			if (clientNode.childNodes.some(function(value){return value!=childNode&&value.rank==childNode.rank;})) return 'error';
			return '';

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
