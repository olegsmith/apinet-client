define([
	'../../moduleDef',
	'angular',
	'text!./tagsList.tpl.html'
], function (module, angular, tpl) {
	module.directive('tagsList', [function() {
		return {
			restrict: 'E',
			replace: true,
			template: tpl,
			scope: {
				tags: '=',
				parentId: '@',
				loadTags: '&',
				createTag: '&',
				updateTag: '&',
				deleteTag: '&'
			},
			controller: ['$scope', '$rootScope', function($scope, $rootScope) {
				$scope.newTag = function() {
					console.log('newTag', $scope);

					$scope.tags = $scope.tags || [];
					$scope.tags.unshift({ parentId: $scope.parentId, Name: $rootScope.i18n.core.tags.newTag });
				};

				/*$scope.$on('tagDeleted', function(event, id) {
					event.stopPropagation();

					$scope.tags = $scope.tags || [];

					for(var i = 0; i < $scope.tags.length; i++) {
						if($scope.tags[i] && $scope.tags[i].Id === id) {
							$scope.tags.splice(i, 1);
							break;
						}
					}
				});

				if(!$scope.parentId) {
					$scope.tags = $scope.tags || [];
					$scope.tags.unshift(null);
				}*/
			}]
		};
	}]);
});