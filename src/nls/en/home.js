define(['angular', 'ago/core/moduleDef'], function(angular, module) {
	module.run(['i18n', function(i18n) {
		i18n.addMessages('projects', {
			'fields': {
				'code': 'Project code',
				'status': 'Status',
				'tags': 'Tags',
				'isArchive': 'Archive'
			},

			'list': {
				'title': 'Projects',
				'buttons': {
					'add': 'New project'
				},

				'filters': {
					'participation': {
						'label': 'Projects',
						'all': 'Any',
						'me': 'My'
					}
				}
			},
			'create': {
				'title': 'New project',
				'legend': 'Creating new project'
			},
			'statuses': {
				'title': 'Statuses dictionary',
				'buttons': {
					'add': 'New status'
				}
			},
			'tags': {
				'title': 'Tags dictionary',
				'buttons': {
					'add': 'New tag'
				},

				'filters': {
					'ownership': {
						'label': 'Ownership',

						'personal': 'Personal tags',
						'common': 'Common tags'
					}
				}
			}
		});
	}]);
});