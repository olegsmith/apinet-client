angular.module('tasks', ['core', 'ui.state', 'tasks.templates'])
.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}])
.constant('moduleMenuUrl', sysConfig.src('tasks/menu.tpl.html'))
.constant('taskStatuses', {
	NotStarted: 'NotStarted',
	InWork: 'InWork',
	Completed: 'Completed',
	Closed: 'Closed',
	Suspended: 'Suspended'
});

