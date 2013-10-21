//extracted from angular-strap project
//https://github.com/mgcrea/angular-strap/blob/master/src/directives/datepicker.js
// https://github.com/eternicode/bootstrap-datepicker
angular.module('core')
.directive('agoDatepicker', function($timeout, $strapConfig) {

	var isAppleTouch = /(iP(a|o)d|iPhone)/g.test(navigator.userAgent);

	var regexpMap = function regexpMapFn(language) {
		if (!($.fn.datetimepicker.dates[language] && language)) {
			language = 'en';
		}
		return {
			'/'    : '[\\/]',
			'-'    : '[-]',
			'.'    : '[.]',
			' '    : '[\\s]',
			'dd'   : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
			'd'    : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
			'mm'   : '(?:[0]?[1-9]|[1][012])',
			'm'    : '(?:[0]?[1-9]|[1][012])',
			'DD'   : '(?:' + $.fn.datetimepicker.dates[language].days.join('|') + ')',
			'D'    : '(?:' + $.fn.datetimepicker.dates[language].daysShort.join('|') + ')',
			'MM'   : '(?:' + $.fn.datetimepicker.dates[language].months.join('|') + ')',
			'M'    : '(?:' + $.fn.datetimepicker.dates[language].monthsShort.join('|') + ')',
			'yyyy' : '(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])',
			'yy'   : '(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])'
		};
	};

	var regexpForDateFormat = function regexpForDateFormatFn(format, language) {
		var re = format, map = regexpMap(language), i;
		// Abstract replaces to avoid collisions
		i = 0;
		angular.forEach(map, function(v, k) {
			re = re.split(k).join('${' + i + '}');
			i++;
		});
		// Replace abstracted values
		i = 0;
		angular.forEach(map, function(v, k) {
			re = re.split('${' + i + '}').join(v);
			i++;
		});
		return new RegExp('^' + re + '$', ['i']);
	};

	var ISODateRegexp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attrs, controller) {

			var options = angular.extend({autoclose: true}, $strapConfig || {});
			var type = attrs.dateType || options.type || 'date';

			var getFormattedModelValue = function(modelValue, format, language) {
				if (modelValue && type === 'iso' && ISODateRegexp.test(modelValue)) {
					return $.fn.datetimepicker.DPGlobal.parseDate(new Date(modelValue), $.fn.datetimepicker.DPGlobal.parseFormat(format), language);
				} else if(modelValue && type === 'date' && angular.isString(modelValue)) {
					return $.fn.datetimepicker.DPGlobal.parseDate(modelValue, $.fn.datetimepicker.DPGlobal.parseFormat(format), language);
				} else {
					return modelValue;
				}
			};

			var init = function() {
				options = angular.extend({autoclose: true}, $strapConfig || {});
				type = attrs.dateType || options.type || 'date';

				// $.fn.datetimepicker options
				angular.forEach(['format', 'weekStart', 'calendarWeeks', 'startDate', 'endDate', 'daysOfWeekDisabled', 'autoclose', 'startView', 'minViewMode', 'todayBtn', 'todayHighlight', 'keyboardNavigation', 'language', 'forceParse'], function(key) {
					if(angular.isDefined(attrs[key])) options[key] = attrs[key];
				});

				var language = options.language || 'en',
					readFormat = attrs.dateFormat || options.format || ($.fn.datetimepicker.dates[language] && $.fn.datetimepicker.dates[language].format) || 'mm/dd/yyyy',
					format = isAppleTouch ? 'yyyy-mm-dd' : readFormat,
					dateFormatRegexp = regexpForDateFormat(format, language);

				// Handle date validity according to dateFormat
			    if(controller) {
					// modelValue -> $formatters -> viewValue
					controller.$formatters.unshift(function(modelValue) {
						return getFormattedModelValue(modelValue, readFormat, language);
					});

					// viewValue -> $parsers -> modelValue
					controller.$parsers.unshift(function(viewValue) {
						if(!viewValue) {
							controller.$setValidity('date', true);
							return null;
						} else if ((type === 'date' || type === 'iso') && angular.isDate(viewValue)) {
							controller.$setValidity('date', true);
							return viewValue;
						} else if(angular.isString(viewValue) && dateFormatRegexp.test(viewValue)) {
						 	controller.$setValidity('date', true);
							if(isAppleTouch) {
								return new Date(viewValue);
							}
							return type === 'string' ? viewValue : $.fn.datetimepicker.DPGlobal.parseDate(viewValue, $.fn.datetimepicker.DPGlobal.parseFormat(format), language);
						} else {
							controller.$setValidity('date', false);
							return undefined;
						}
					});

					// ngModel rendering
					controller.$render = function ngModelRender() {
						if(isAppleTouch) {
							var date = controller.$viewValue ? $.fn.datetimepicker.DPGlobal.formatDate(controller.$viewValue, $.fn.datetimepicker.DPGlobal.parseFormat(format), language) : '';
							element.val(date);
							return date;
						}
						if(!controller.$viewValue) {
							element.val('');
						}
						return element.datetimepicker('update', controller.$viewValue);
					};

			    }

				// Use native interface for touch devices
				if (isAppleTouch) {
					element.prop('type', 'date').css('-webkit-appearance', 'textfield');
				} else {
					// If we have a ngModelController then wire it up
					if (controller) {
						element.on('changeDate', function(ev) {
							scope.$apply(function () {
								controller.$setViewValue(type === 'string' ? element.val() : ev.date);
							});
						});
					}

					// Create datetimepicker
					// element.attr('data-toggle', 'datetimepicker');
					element.datetimepicker(angular.extend(options, {
						format: format,
						language: language
					}));

					// Garbage collection
					scope.$on('$destroy', function() {
						var datetimepicker = element.data('datetimepicker');
						if(datetimepicker) {
							datetimepicker.picker.remove();
							element.data('datetimepicker', null);
						}
					});

					// Update start-date when changed
					attrs.$observe('startDate', function(value) {
						element.datetimepicker('setStartDate',value);
					});

					// Update end-date when changed
					attrs.$observe('endDate', function(value) {
						element.datetimepicker('setEndDate',value);
					});
				}

				// Support add-on
				var component = element.siblings('[data-toggle="datetimepicker"]');
				if(component.length) {
					component.on('click', function() {
						if (!element.prop('disabled')) { // Hack check for IE 8
							element.trigger('focus');
						}
					});
				}
			};

			init();

			scope.$watch(
				function() {
					return attrs.language;
				},
				function(newValue, oldValue) {
					if (newValue !== oldValue) {
						// Gets the old date as Date
						var oldLanguage = $.fn.datetimepicker.dates[oldValue] ? oldValue : 'en';
						var oldFormat = attrs.dateFormat || options.format || ($.fn.datetimepicker.dates[oldLanguage] && $.fn.datetimepicker.dates[oldLanguage].format) || 'mm/dd/yyyy';
						var oldDate = $.fn.datetimepicker.DPGlobal.parseDate(element.val(), $.fn.datetimepicker.DPGlobal.parseFormat(oldFormat), oldLanguage);
						// Transform the old date into a new Date string formatted with the new locale
						var newLanguage = $.fn.datetimepicker.dates[newValue] ? newValue : 'en';
						var newFormat = ($.fn.datetimepicker.dates[newLanguage] && $.fn.datetimepicker.dates[newLanguage].format) || 'mm/dd/yyyy';
						var newDateString = $.fn.datetimepicker.DPGlobal.formatDate(oldDate, $.fn.datetimepicker.DPGlobal.parseFormat(newFormat), newLanguage);

						// Remove the datetimepicker
						element.datetimepicker('remove');
						// Reset the input value
						element.val('');
						// Reinitialize everything
						init();
						// Eventually change the modelValue type according to the set type
						var mValue = getFormattedModelValue(newDateString, newFormat, newLanguage);
						// Set both the modelValue and the viewValue
						controller.$modelValue = mValue;
						controller.$viewValue = newDateString;
					}
				}
			);
		}
	};
});