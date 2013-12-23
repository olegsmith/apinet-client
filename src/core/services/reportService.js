define(['../moduleDef', 'angular'], function (module, angular) {
	module.service('reportService', ['$rootScope', '$timeout', '$http', '$cacheFactory', '$q', 'apinetService',
		function($rootScope, $timeout, $http, $cacheFactory, $q, apinetService) {
			angular.extend(this, {
				cache: $cacheFactory('userReports'),

				getServices: function() {
					var that = this,
						services = that.cache.get('services');
					if (services && services.length > 0) {
						return $q.when(services);
					}

					return apinetService.action({method: 'core/reporting/getServices'})
						.then(function(response) {
							that.cache.put('services', response);
							return response;
						});
				},

				getReportSettings: function(types) {
					var that = this,
						types = types || [],
						settings = that.cache.get('settings.' + types.toString());

					if (settings && settings.length > 0) {
						return $q.when(settings);
					}
					return apinetService.action({
						method: 'core/reporting/getSettings',
						types: types}).then(function(response) {
							that.cache.put('settings.' + types.toString(), response);
							return response;
						});
				},

				runReport: function(parameters) {
					angular.extend(parameters, { method: 'core/reporting/runReport' });
					return apinetService.action(parameters)
						.then(function(response) {
							$rootScope.$emit('reports:newReport', {report: response});
						});
				},

				getTopLastReports: function() {
					return apinetService.action({ method: 'core/reporting/getTopLastReports' });
				},

				cancelReport: function(id) {
					return apinetService.action({
						method: 'core/reporting/cancelReport',
						id: id
					});
				}
			});
		}
	]);
});