define([
	'./moduleDef',
	'./states',

	'css!./assets/form.css',
	'css!./assets/lists.css',

	'i18n!ago/nls/tasks'
], function(module) {
	return module.constant('taskStatuses', {
		NotStarted: 'NotStarted',
		InWork: 'InWork',
		Completed: 'Completed',
		Closed: 'Closed',
		Suspended: 'Suspended'
	});
});