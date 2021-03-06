define(['../../moduleDef', 'jquery'], function (module, $) {
	var i18n = $('body').injector().get('i18n');
	i18n.registerLocalizationModule('tasks/nls/module');

	module.service('tasks/nls/module/en', ['i18n', function(i18n) {
		return function() {
			i18n.addMessages('tasks', {
                'priority': {
                    'normal': 'Normal'
                },

				'fields': {
					'seqNumber': 'Task number',
					'type': 'Task type',
					'executors': 'Executors',
					'dueDate': 'Due date',
					'content': 'Content',
					'status': 'Status',
					'priority': 'Priority',
					'note': 'Note',
					'agreements': 'Agreements',
					'topFiles': 'Files (top {{count}})',
					'tags': 'Tags',
					'estimatedTime': 'Estimated time',
					'spentTime': 'Spent time'
				},

				'confirm': {
					'delete': {
						'task': 'Are you really want to delete this task?',
						'tasks': 'Are you really want to delete this tasks?',
						'agreemer': 'Are you really want to delete this agreemer?'
					}
				},

				'view': {
					'tabs': {
						'overview': 'Overview',
						'comments': 'Comments',
						'files': 'Files'
					},

					'general': {
						'title': 'General properties'
					},
					'agreements': {
						'title': 'Agreements',

						'fields': {
							'agreemer': 'Agreemer',
							'dueDate': 'Due date',
							'done': 'Agreed',
							'comment': 'Comment'
						},

						'placeholders': {
							'agreemer': 'Select agreemer',
							'dueDate': 'Select due date',
							'comment': 'Type your comment here'
						},

						'buttons': {
							'agreement': {
								'dropdown': 'Actions',
								'add': 'Add agreemer',
								'agree': 'Agree',
								'toggleAgree': 'Agree with comment',
								'revoke': 'Revoke agreement'
							}
						}
					},
					'statusHistory': {
						'title': 'Status history',

						'fields': {
							'status': 'Status',
							'author': 'Set by',
							'effectivePeriod': 'Effective period',
							'duration': 'Duration'
						},

						'period': 'from {{start}} to {{finish}}',
						'duration': {
							'days': {
								'one': 'day',
								'few': 'days',
								'many': 'days',
								'other': 'days'
							},
							'hours': {
								'one': 'hour',
								'few': 'hours',
								'many': 'hours',
								'other': 'hours'
							},
							'minutes': 'min'
						}
					},
					'params': {
						'title': 'User properties',
						'empty': 'No user properties',
						'placeholders': {
							'selectType': 'select type',
							'string': 'string',
							'number': 'number',
							'date': 'date'
						},
						'numFormat': 'Expected format 0##[.0##]'
					},
					'files': {
						'title': 'Files',
						'fields': { 'size': 'File size' }
					},
					'timelog': {
						'title': 'Timelog',
						'empty': 'No timelog entries',
						'placeholders': {
							'time': 'Spent time (hours)',
							'comment': 'Comment (optional)'
						},
						'fields': {
							'time': 'Time',
							'comment': 'Comment'
						},
						'closed': 'Timelog closed'
					},
                    'comments': {
                        'title': 'Comments',
                        'placeholder': 'Type new comment...',
                        'fields': {
                            'text': 'Comment'
                        }
                    }
				},

				'list': {
					'title': 'Tasks',

					'filters': {
						'custom': 'Predefinded templates',
						'predefined': {
							'all': 'All tasks',
							'overdue': 'Overdued tasks',
							'dayLeft': '1 day to deadline',
							'weekLeft': '1 week to deadline',
							'noLimit': 'Without deadline',
							'closedToday': 'Closed today',
							'closedYesterday': 'Closed yesterday'
						}
					},

					'buttons': {
						'add': 'Create task',
						'reportDefault': 'Task list',
						'detailedTaskList': 'Detailed task list'
					},

					'placeholders': {
						'delete': 'Delete task',
						'deleteSelected': 'Delete selected tasks'
					},

					'expiration': {
						'already': 'Expired {{days}} {{daysText}}',
						'will': 'Will be expired {{days}} {{daysText}}'
					}
				},

				'create': {
					'title': 'Create new task',

					'placeholders': {
						'type': 'Select task type',
						'executors': 'Select executors',
						'priority': 'Select priority'
					},

					'labels': {
						'afterCreation': 'After task created',
						'afterCreationGoToTask': 'Navagate to new task',
						'afterCreationGoToList': 'Navagate to tasks list',
						'afterCreationStayHere': 'Create another task'
					},

					'buttons': {
						'save': 'Create task'
					}
				},

				'types': {
					'title': 'Task types',

					'placeholders': {
						'name': 'Task type name',
						'replacementType': 'With replacement for ...'
					},

					'buttons': {
						'delete': 'Delete task type'
					}
				},

				'tags': {
					'type': 'Task tags'
				}
			});
		};
	}]);

	i18n.setLocale(null);
});