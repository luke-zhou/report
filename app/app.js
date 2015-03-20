'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('report', []);

	app.controller('reportController', function(){
		this.rows = participants;
		this.keys = [];
		this.scoreCompetency =[];
		this.selectMainTable=true;
		this.selectParticipantDetailTable=false;
		this.selectAssessmentDatailTable=false;
		
		for (var key in this.rows[0].scores) {
		  if (this.rows[0].scores.hasOwnProperty(key)) {
			this.keys.push(key);
			var competencySet=[];
			for (var competency in this.rows[0].scores[key]){
				competencySet.push(competency);
			}
			this.scoreCompetency[key]=competencySet;
		  }
		};
		
		this.showParticipantDetail = function(participantId){
			console.log('click participant:'+participantId);
			this.selectMainTable=false;
			this.selectParticipantDetailTable=true;
			this.selectAssessmentDatailTable=false;
			this.selectParticipant = getParticipant(participantId);
		};
		
		this.showAssessmentDetail = function(key){
			console.log('click assessment:'+key);
			this.selectMainTable=false;
			this.selectParticipantDetailTable=false;
			this.selectAssessmentDatailTable=true;
			
			this.selectAssessmentKey= key;
		}
		
		this.showMainTable = function() {
			this.selectMainTable=true;
			this.selectParticipantDetailTable=false;
			this.selectAssessmentDatailTable=false;		
		}
		
		this.updateChart = function(score){
		var data = 
			{
				min:4,
				max:96,
				avg:65
			};
			data.score = score;
			updateChart(data);
		}
		
		var getParticipant = function(participantId){
			console.log("participants:"+participants);
			for (var index in participants){
				var participant = participants[index];
				if (participant.id==participantId) return participant;
			}
		};
		
	});

	var participants=[
	{
		id: 1,
		name: 'candidate one',
		scores:{
			video: {
				question1:27,
				question2:56,
				question3:30,
				question4:35,
				overall:34
			},
			cognitive: {
				verbal:89,
				numerical:56,
				abstract:30,
				overall:56
			},
			behavior: {
				competency1:20,
				competency2:98,
				competency3:10,
				competency4:15,
				competency5:50,
				overall:85
			}
		},
		overall: 65
	},
	{
		id: 2,
		name: 'candidate two',
		scores:{
			video: {
				question1:15,
				question2:86,
				question3:40,
				question4:45,
				overall:43
			},
			cognitive: {
				verbal:56,
				numerical:91,
				abstract:38,
				overall:65
			},
			behavior: {
				competency1:86,
				competency2:88,
				competency3:89,
				competency4:94,
				competency5:45,
				overall:87
			},
		},
		overall: 79
	},
	{
		id: 3,
		name: 'candidate three',
		scores:{
			video: {
				question1:65,
				question2:99,
				question3:99,
				question4:90,
				overall:98
			},
			cognitive: {
				verbal:50,
				numerical:11,
				abstract:10,
				overall:23
			},
			behavior: {
				competency1:84,
				competency2:98,
				competency3:62,
				competency4:81,
				competency5:32,
				overall:76
			},
		},
		overall: 60
	}
	];

})();
