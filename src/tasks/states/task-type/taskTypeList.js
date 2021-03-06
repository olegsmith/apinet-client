define([
	'../../moduleDef',
	'angular',
	'text!./taskTypeList.tpl.html',
	'text!../moduleMenu.tpl.html'
], function (module, angular, tpl, moduleMenuTpl) {
	module.state({
		name: 'page.project.taskTypes',
		url: '/dictionary/types',
		views: {
			'': { template: tpl },
			'moduleMenu@page': { template: moduleMenuTpl }
		},
		onEnter: function($rootScope) {
			$rootScope.breadcrumbs.push({
				name: 'tasks.types.title',
				url: 'page.project.taskTypes'
			});
		},
		onExit: function($rootScope) {
			$rootScope.breadcrumbs.splice($rootScope.breadcrumbs.length - 1, 1);
		}
	}).controller('taskTypeCtrl', ['$scope', '$stateParams', 'apinetService', '$window', 'i18n',
		function($scope, $stateParams, apinetService, $window, i18n) {
			var handleException = function(error) {
				$scope.resetValidation();
				$scope.validation.generalErrors = [error];
			};
			var handleError = function(validation) {
				$scope.resetValidation();
				angular.extend($scope, validation);
			};

			$scope.removeFromModels = function(modelsToRemove) {
				for(var i = 0; i < modelsToRemove.length; i++) {
					var index = $scope.models.indexOf(modelsToRemove[i]);
					if (index < 0) {
						continue;
					}
					$scope.models.splice(index, 1);
				}
			};

			$scope.createTaskType = function() {
				$scope.resetValidation();
				$scope.editModel.id = null;

				apinetService.action({
					method: 'tasks/dictionary/editTaskType',
					project: $stateParams.project,
					model: $scope.editModel})
				.then(function(result) {
					if(result.validation.success) {
						$scope.editModel.name = '';
						$scope.createTaskTypeForm.$setPristine();
						$scope.models.unshift(result.model);
					} else {
						handleError(result);
					}
				}, handleException);
			};

			$scope.hasSelected = function() {
				for(var i = 0; i < $scope.models.length; i++) {
					if ($scope.models[i].selected && $scope.models[i].selected === true) {
						return true;
					}
				}

				return false;
			};

			$scope.deleteSelected = function() {
				if (!$window.confirm(i18n.msg('core.confirm.delete.records'))) {
					return;
				}

				var ids = [];
				var modelsToRemove = [];
				for(var i = 0; i < $scope.models.length; i++) {
					if ($scope.models[i].selected && $scope.models[i].selected === true) {
						ids.push($scope.models[i].Id);
						modelsToRemove.push($scope.models[i]);
					}
				}
				if (ids.length <= 0) {
					return;
				}

				$scope.resetValidation();

				var replaceId = null;
				if ($scope.deleteModel.replacementType && $scope.deleteModel.replacementType.id) {
					replaceId = $scope.deleteModel.replacementType.id;
				}

				apinetService.action({
					method: 'tasks/dictionary/deleteTaskTypes',
					project: $stateParams.project,
					ids: ids,
					replacementTypeId: replaceId })
				.then(function() {
					$scope.removeFromModels(modelsToRemove);
				}, handleException);
			};

			$scope.delete = function(model) {
				if (!model) {
					return;
				}
				if (!$window.confirm(i18n.msg('core.confirm.delete.record'))) {
					return;
				}

				apinetService.action({
					method: 'tasks/dictionary/deleteTaskType',
					project: $stateParams.project,
					id: model.Id })
				.then(function() {
					$scope.removeFromModels([model]);
				}, handleException);
			};

			$scope.onUpdate = function(model, val) {
				$scope.resetValidation();

				return apinetService.action({
					method: 'tasks/dictionary/editTaskType',
					project: $stateParams.project,
					model: { Id: model.Id, Name: val, ModelVersion: model.ModelVersion }
				}).then(function(response) {
					if (response.validation.success) {
						angular.extend(model, response.model);
						model.validation = {};
					} else {
						model.validation = response.validation;
					}
					return response.validation.success;
				}, handleException);
			};

			$scope.onCancel = function(model) {
				model.validation = {};
			};

			$scope.createEnabled = function() {
				return $scope.editModel.name && $scope.editModel.name.length > 0;
			};

			$scope.dropChanges = function() {
				$scope.editModel = {id: null, name: ''};
				$scope.resetValidation();
			}

			$scope.requestParams = { project: $stateParams.project };
			$scope.editModel = {id: null, name: ''};
			$scope.deleteModel = { replacementType: null };
		}
	]);
});