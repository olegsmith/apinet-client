define(['../../moduleDef', 'text!./eventNotifier.tpl.html'], function (module, tpl) {
	module.directive('eventNotifier', [function() {
		return {
			template: tpl,
			restrict: 'EA',
			replace: true,
			scope: true,
			link: function($scope, $element, $attrs, $controller) { }
		};
	}]);
});