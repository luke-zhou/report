'use strict';

// Declare app level module which depends on views, and components
(function(){
	var app = angular.module('report', []);

	app.controller('reportController', function(){
		this.rows = participants;
	})

	var participants=[
	{
		name: 'candidate one',
		video: 34,
		cognitive: 56,
		behavior: 78,
		overall: 65
	},
	{
		name: 'candidate two',
		video: 43,
		cognitive: 65,
		behavior: 87,
		overall: 79
	},
	{
		name: 'candidate three',
		video: 98,
		cognitive: 23,
		behavior: 76,
		overall: 60
	}
	]


})();
