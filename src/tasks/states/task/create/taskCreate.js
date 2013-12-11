define([
	'../../../moduleDef',
	'angular',
	'text!./taskCreate.tpl.html',
	'text!../../moduleMenu.tpl.html'
], function (module, angular, tpl, moduleMenuTpl) {
	module.state({
		name: 'page.project.taskCreate',
		url: '/tasks/new',
		views: {
			'': { template: tpl },
			'moduleMenu@page': { template: moduleMenuTpl }
		},
		onEnter: function(pageConfig, i18n) {
			pageConfig.setConfig({
				breadcrumbs: [
					{ name: i18n.msg('tasks.list.title'), url: 'page.project.tasks' },
					{ name: i18n.msg('tasks.create.title'), url: 'page.project.taskCreate' }
				]
			});
		}
	}).controller('taskCreateCtrl', ['$scope', '$stateParams', 'apinetService', '$state',
		function($scope, $stateParams, apinetService, $state) {

			$scope.cancel = function() {
				$state.go('page.project.tasks');
			};

			$scope.create = function() {
				var req = modelToRequest();
				apinetService.action({
					method: 'tasks/tasks/createTask',
					project: $stateParams.project,
					model: req })
				.then(function(response) {
					if (response.validation.success) {
						if ($scope.nextAction === 'goToTask') {
							$state.transitionTo('page.taskView', {num: response.model}, true);
						} else if ($scope.nextAction === 'goToList') {
							$state.transitionTo('page.root', {}, true);
						} else if ($scope.nextAction === 'stayHere') {
							$scope.model = initModel();
							$scope.form.$setPristine();
						}
					} else {
						resetValidation();
						angular.extend($scope.validation, response.validation);
					}
				}, function(error) {
					resetValidation();
					$scope.validation.generalErrors = [error];
				});
			};

			var initModel = function() {
				return {
					taskType: null,
					executors: [],
					dueDate: null,
					content: null,
					priority: null
				};
			};

			$scope.model = initModel();

			$scope.nextAction = 'goToTask';
			$scope.validation = { };

			var modelToRequest = function() {
				var m = $scope.model;
				var e = [];
				angular.forEach(m.executors, function(v) { this.push(v.id); }, e);
				return {
					TaskType: m.taskType.id,
					Executors: e,
					DueDate: m.dueDate,
					Content: m.content,
					Priority: m.priority ? m.priority.id : null
				};
			};

			var resetValidation = function() {
				$scope.validation.generalErrors = [];
				$scope.validation.fieldErrors = {};
			};
		}
	]);
});