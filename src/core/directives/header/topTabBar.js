define(['angular', '../../moduleDef', 'text!./topTabBar.tpl.html'], function (angular, module, tpl) {
	module.directive("toptabbar", function() {
		return {
			template: tpl,
			restrict: 'EA',
			replace: true,
			scope: {
				"active": "@"
			},
			link: function($scope, $element, $attrs, $controller) {

			}
		};
	});
});