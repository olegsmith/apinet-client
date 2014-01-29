define(['module', '../moduleDef', 'angular'], function (requireModule, module, angular) {

	var REPORT_EVENTS = {
		CREATED    : 'reports:created',
		RUNNED     : 'reports:runned',
		PROGRESS   : 'reports:progress',
		COMPLETED  : 'reports:completed',
		ABORTED    : 'reports:aborted',
		ERROR      : 'reports:error',
		CANCELED   : 'reports:canceled',
		DELETED    : 'reports:deleted',
		DOWNLOADED : 'reports:downloaded'
	};

	var REPORT_STATES = {
		NotStarted : 'NotStarted',
		Running    : 'Running',
		Completed  : 'Completed',
		Canceled   : 'Canceled',
		Error      : 'Error'
	};

	var REPORT_PRIORITY_TYPE = {
		BY_DATE : 0,
		BY_USER : 1
	};

	module
		.constant('REPORT_EVENTS', REPORT_EVENTS)
		.constant('REPORT_STATES', REPORT_STATES)
		.constant('REPORT_PRIORITY_TYPE', REPORT_PRIORITY_TYPE)
		.service('reportService', ['$rootScope', '$timeout', '$cacheFactory', '$q', 'apinetService',
		function($rootScope, $timeout, $cacheFactory, $q, apinetService) {
			angular.extend(this, {
				cache: $cacheFactory('userReports'),

				getReportSettings: function(types) {
					types = types || [];
					var that = this, settings = that.cache.get('settings.' + types.toString());

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
					return apinetService.action(parameters);
				},

				getTopLastReports: function() {
					return apinetService.action({ method: 'core/reporting/getTopLastReports' });
				},

				cancelReport: function(id) {
					return apinetService.action({
						method: 'core/reporting/cancelReport',
						id: id
					});
				},

				deleteReport: function(id) {
					return apinetService.action({
						method: 'core/reporting/deleteReport',
						id: id
					});
				},

				templateUploadUrl: function() {
					return apinetService.apiUrl('core/reporting/UploadTemplate');
				},

				templateDownloadUrl: function(id) {
					return apinetService.downloadUrl('report-template/' + id);
				},

				reportDownloadUrl: function(id) {
					return apinetService.downloadUrl('report/' + id);
				}
			});
		}
	]);
});