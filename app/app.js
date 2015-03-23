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
		};
		
		this.showMainTable = function() {
			this.selectMainTable=true;
			this.selectParticipantDetailTable=false;
			this.selectAssessmentDatailTable=false;		
		};
		
		this.updateChart = function(participant, scoreKey, competency){
		console.log(participant.scores[scoreKey][competency]);

		var data = prepareChartData(participant, scoreKey, competency);

		updateChart(data);
		};

		var prepareChartData= function(participant, scoreKey, competency){
	
			var data = {};
			data.score = participant.scores[scoreKey][competency];
			data.min = getMinScore(scoreKey, competency);
			data.max = getMaxScore(scoreKey, competency);
			data.avg = getAverageScore(scoreKey, competency);
			
			return data;
		};
		
		var getMinScore = function(scoreKey, competency){
			var min = 100;
			for (var index in participants){
				var participant = participants[index];
				if (participant.scores[scoreKey][competency]<min){
					min = participant.scores[scoreKey][competency];
				};
			};
			return min;
		};
		
		var getMaxScore = function(scoreKey, competency){
			var max = 0;
			for (var index in participants){
				var participant = participants[index];
				if (participant.scores[scoreKey][competency]>max){
					max = participant.scores[scoreKey][competency];
				};
			};
			return max;
		};

		var getAverageScore = function(scoreKey, competency){
			var sum = 0;
			var count = 0;
			for (var index in participants){
				var participant = participants[index];
					sum += participant.scores[scoreKey][competency];
					count++;
				};
			return Math.round(sum/count);
		};

		var getParticipant = function(participantId){
			console.log("participants:"+participants);
			for (var index in participants){
				var participant = participants[index];
				if (participant.id==participantId) return participant;
			}
		};
		
	});

})();
