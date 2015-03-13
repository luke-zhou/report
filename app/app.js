'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('report', []);

	app.controller('reportController', function(){
		this.rows = participants;
		this.keys = [];
		for (var key in this.rows[0].scores) {
		  if (this.rows[0].scores.hasOwnProperty(key)) {
			this.keys.push(key);
			console.log(key);
		  }
		}
	})

	var participants=[
	{
		name: 'candidate one',
		scores:{
			video: {
				question1:27,
				question2:56,
				question3:30,
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
				overall:85
			}
		},
		overall: 65
	},
	{
		name: 'candidate two',
		scores:{
			video: {
				question1:15,
				question2:86,
				question3:40,
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
				overall:87
			},
		},
		overall: 79
	},
	{
		name: 'candidate three',
		scores:{
			video: {
				question1:65,
				question2:99,
				question3:99,
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
				overall:76
			},
		},
		overall: 60
	}
	]

})();
