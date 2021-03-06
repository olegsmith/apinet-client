define(['../../moduleDef', 'jquery'], function (module, $) {
	module.directive('inlineDate', ['$timeout', function ($timeout) {
		return {
			restrict: 'E',
			replace: true,
			template: function (elm, attr) {
				var viewTmpl = '<span ng-hide="editMode" ng-click="edit()" class="editable">{{ ' +
					attr.model +
					' | date:\'' + (attr.dateFormat || 'ago_date') + '\'' +
					' }}<inline-none></inline-none></span>';
				var editTmpl = '<input type="text"' +
					' class="form-control ' + (attr.inputClass ? attr.inputClass + '"' : '"') +
					(attr.hasOwnProperty('required') ? ' required="required"' : '') +
					' ng-model="emodel.value" bs-datepicker ng-readonly="waiting"></input>';

				return '<div inline-edit="' + attr.model + '">' +
					viewTmpl +
					'	<form name="editForm" class="form-inline" ng-show="editMode" style="width: 100%" novalidate>' +
					'		<div class="input-group ' + (attr.inputCol ? attr.inputCol : '') + '" style="padding-left: 0px">' +
					editTmpl +
					'			<inline-buttons class="input-group-btn"></inline-buttons>' +
					'		</div>' +
					'	</form>' +
					'</div>';
			},
			link: function(scope, elm) {
				$elm = $('input', elm);
				$elm.off('blur', scope.onBlur);
				$elm.on('blur', function() {
					$timeout(scope.onBlur);
				});
			}
		};
	}]);
});