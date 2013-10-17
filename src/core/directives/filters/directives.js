angular.module('core')

	.directive('filterPersister', ['sysConfig', 'apinetService', function(sysConfig, apinetService) {
		return {
			replace: true,
			templateUrl: sysConfig.src('core/directives/filters/filterPersister.tpl.html'),
			scope: {
				group: '=',
				filter: '='
			},
			controller: ['$scope', '$rootScope', function($scope, $rootScope) {
				angular.extend($scope, {
					i18n: $rootScope.i18n,

					filterNames: [ ],
					validation: {
						generalErrors: [],
						fieldErrors: {}
					},
					saveFilterName: '',
					loadFilterName: { id:'', text: ''},

					saveFilter: function() {
						apinetService.action({
							method: 'system/users/saveFilter',
							name: $scope.saveFilterName,
							group: $scope.group,
							filter: $scope.filter
						})
						.then(function(result) {
							if(result.success) {
								if($scope.filterNames.indexOf($scope.saveFilterName) === -1) {
									$scope.filterNames.push($scope.saveFilterName);
								}
							}
							else {
								angular.extend($scope.validation, result);
							}
						}, function(error) {
							$scope.validation.generalErrors = error;
						});
					},

					loadFilter: function() {
						apinetService.action({
							method: 'system/users/loadFilter',
							name: $scope.loadFilterName ? $scope.loadFilterName : null,
							group: $scope.group
						})
						.then(function(result) {
							if(result) {
								for(var key in result) {
									if(!result.hasOwnProperty(key)) {
										continue;
									}
									$scope.filter[key] = result[key];
								}
							}
						}, function(error) {
							$scope.validation.generalErrors = error;
						});
					},

					deleteFilter: function() {
						apinetService.action({
							method: 'system/users/deleteFilter',
							name: $scope.loadFilterName ? $scope.loadFilterName : null,
							group: $scope.group
						})
						.then(function() {
							var index = $scope.filterNames.indexOf($scope.loadFilterName);
							if(index === -1) {
								return;
							}
							$scope.filterNames.splice(index, 1);
						}, function(error) {
							$scope.validation.generalErrors = error;
						});
					}
				});

				apinetService.getModels({
					method: 'system/users/getFilterNames',
					group: $scope.group
				})
				.then(function (result) {
					$scope.filterNames = result;
				});
			}]
		};
	}])
	.directive('filteredList', ['apinetService', '$timeout', function($apinetService, $timeout) {
		return {
			controller: ['$scope', function($scope) {
				angular.extend($scope, {
					filter: { },

					sorters: { },
					sortersArray: [ ],

					paging: {
						page: 0,
						loadedPages: []
					},

					applyEnabled: false,
					firstEvent: true,
					models: [ ],
					validation: { },
					indication: { loading: false },

					clearFilter: function() {
						var clearFn = function() {
							$scope.filter = { };
						};
						clearFn = !$scope.$$phase ? $scope.$apply(function() { clearFn(); }) : clearFn;
						clearFn();

						$scope.refreshList();
					},

					resetValidation: function() {
						$scope.validation.generalErrors = [];
						$scope.validation.fieldErrors = {};
					},

					refreshList: function(append) {
						if($scope.timeout) {
							$scope.indication.loading = true;

							$timeout.cancel($scope.timeout);
							$scope.timeout = $timeout(function() {
								$scope.timeout = null;
								$scope.indication.loading = false;
								$scope.refreshList(append);
							}, 1000);
							return;
						}

						if(!append) {
							$scope.paging.page = 0;
							$scope.paging.loadedPages = [];
						}
						else {
							if($scope.paging.loadedPages.indexOf($scope.paging.page) !== -1) {
								return;
							}
						}

						var params = angular.extend({ }, $scope.requestParams, {
							method: $scope.method,
							filter: $scope.filter,
							sorters: $scope.sortersArray,
							page: $scope.paging.page
						});
						$scope.resetValidation();

						$scope.indication.loading = true;
						$scope.timeout = $timeout(function() { $scope.timeout = null; }, 500);

						$apinetService.getModels(params).then(function(result) {
								$scope.indication.loading = false;
								$scope.applyEnabled = false;

								if(!append) {
									$scope.models = result;
								}
								else {
									if(!result.length) {
										$scope.paging.page = $scope.paging.page - 1;
										if($scope.paging.page < 0) {
											$scope.paging.page = 0;
										}
										return;
									}

									$scope.paging.loadedPages.push($scope.paging.page);
									for(var i = 0; i < result.length; i++) {
										$scope.models.push(result[i]);
									}
								}
							},
							function(error) {
								$scope.indication.loading = false;
								$scope.validation.generalErrors = [ error ];
							});
					}
				});

				$scope.$watch('filter', function() {
					$scope.applyEnabled = true;
				}, true);

				$scope.$watch('requestParams', function() {
					$scope.applyEnabled = true;
				}, true);

				$scope.$watch('sorters', function(value) {
					var tempArray = [ ];
					var sorter;
					var key;

					var maxPriority = 0;
					for(key in value) {
						if(!$scope.sorters.hasOwnProperty(key)) {
							continue;
						}

						sorter = $scope.sorters[key];
						if(!sorter.direction || !sorter.priority ||
							(sorter.direction !== 'asc' && sorter.direction !== 'desc') || !sorter.priority) {
							continue;
						}

						maxPriority = sorter.priority > maxPriority ? sorter.priority : maxPriority;

						sorter.property = key.replace('_', '.');
						tempArray.push(sorter);
					}

					for(key in value) {
						if(!$scope.sorters.hasOwnProperty(key)) {
							continue;
						}

						sorter = $scope.sorters[key];
						if(!sorter.direction || sorter.priority ||
							(sorter.direction !== 'asc' && sorter.direction !== 'desc')) {
							continue;
						}

						maxPriority = maxPriority + 1;
						sorter.priority = maxPriority;

						sorter.property = key.replace('_', '.');
						tempArray.push(sorter);
					}

					tempArray.sort(function(s1, s2) {
						if (s1.priority > s2.priority) {
							return 1;
						}
						return s1.priority < s2.priority ? -1 : 0;
					});

					$scope.sortersArray = [ ];
					for(var i = 0; i < tempArray.length; i++) {
						sorter = tempArray[i];

						$scope.sortersArray.push({
							property: sorter.property,
							descending: sorter.direction === 'desc'
						});

						sorter.priority = i + 1;
						delete sorter.property;
					}

					$scope.refreshList();
				}, true);

				$scope.$watch('paging.page', function(value, oldValue) {
					if($scope.firstEvent) {
						$scope.firstEvent = false;
						return;
					}

					if(value === oldValue + 1) {
						if($scope.timeout) {
							$scope.paging.page = oldValue;
						}
						else {
							$scope.refreshList(true);
						}
					}

				}, true);
			}],

			link: function($scope, element, attrs) {
				var initialSorters = $scope.$eval(attrs.initialSorters) || { };

				var i = 1;
				for(var key in initialSorters) {
					if(!initialSorters.hasOwnProperty(key)) {
						continue;
					}

					var direction = initialSorters[key];
					if(!direction || (direction !== 'asc' && direction !== 'desc')) {
						continue;
					}

					$scope.sorters[key] = {
						direction: direction,
						priority: i
					};

					i = i + 1;
				}

				var inputParams = $scope.$eval(attrs.filteredList);
				angular.extend($scope, inputParams);
			}
		};
	}])
	.directive('filterNode', ['$parse', function($parse) {
		return {
			restrict: 'A',
			require: 'ngModel',

			link: function($scope, $element, $attrs, ngModelCtrl) {
				var node = $scope.$eval($attrs.filterNode);

				var ngModelGet = $parse($attrs.ngModel);
				var ngModelSet = ngModelGet.assign;

				if(angular.isObject(node) && ngModelSet) {
					ngModelSet($scope, angular.extend({ }, node, { value: ngModelGet($scope) }));
				}

				ngModelCtrl.$parsers.push(function(value) {
					if(!angular.isObject(node)) {
						return value;
					}

					return angular.extend({ }, node, { value: value });
				});

				ngModelCtrl.$formatters.push(function(value) {
					return angular.isObject(node) && angular.isObject(value) &&
						value.hasOwnProperty('value') ?	value.value : value;
				});
			}
		};
	}])
	.directive('filteredListActions', ['sysConfig', function(sysConfig) {
		return {
			restrict: 'A',
			replace: true,

			templateUrl: sysConfig.src('core/directives/filters/filteredListActions.tpl.html')
		};
	}]);