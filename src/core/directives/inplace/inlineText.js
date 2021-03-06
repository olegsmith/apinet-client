define(['../../moduleDef'], function (module) {
	module.directive('inlineText', [function() {
		return {
			restrict: 'E',
			replace: true,
			template: function(elm, attr) {
				var inpt = '<input type="text" class="form-control' +
					(attr.inputClass ? ' ' + attr.inputClass + '"' : '"') +
					(attr.hasOwnProperty('required') ? ' required="true"' : '') +
					' ng-model="emodel.value" ng-readonly="waiting"></input>';

				var viewTmpl = '<span class="editable" ng-hide="editMode" ng-click="edit()">{{ ' +
					(attr.viewModel || attr.model) + ' }}<inline-none></inline-none></span>';

				return '<div inline-edit="' + attr.model + '">' +
					viewTmpl +
					'<form name="editForm" class="form-inline" ng-show="editMode" ng-class="{\'has-error\': editForm.$invalid}" style="width: 100%" novalidate>' +
					'	<div class="input-group ' + (attr.inputCol ? attr.inputCol : '') + '" style="padding-left: 0px">' +
						inpt +
					'		<inline-buttons class="input-group-btn"></inline-buttons>' +
					'	</div>' +
					'</form>' +
					'</div>';
			}
		};
	}]);
});