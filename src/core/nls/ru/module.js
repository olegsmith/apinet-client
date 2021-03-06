define(['../../moduleDef', 'moment'], function (module, moment) {
	module.run(['i18n', function(i18n) {
		i18n.registerLocalizationModule('core/nls/angular');
		i18n.registerLocalizationModule('core/nls/moment');
		i18n.registerLocalizationModule('core/nls/module');
	}]);

	module.service('core/nls/angular/ru', ['$locale', function($locale) {
		return function() {
			angular.extend($locale, angular.injector(['ngLocale_ru']).get('$locale'));

			$locale.DATETIME_FORMATS.ago_date = "dd.MM.yyyy";
			$locale.DATETIME_FORMATS.ago_datetime = "dd.MM.yyyy HH:mm";
			$locale.DATETIME_FORMATS.ago_datelongtime = "dd.MM.yyyy HH:mm:ss";
		};
	}]);

	module.service('core/nls/moment/ru', function() {
		return function() {
			moment.lang('ru');
		};
	});

	module.service('core/nls/module/ru', ['i18n', function(i18n) {
		return function() {
			i18n.addMessages('core', {
				'roles': {
					'title': 'Роли ({{role}})',
					'nothing': 'отсутствует'
				},

				'locale': {
					'label': 'Язык',
					'ru': 'Русский',
					'en': 'Английский'
				},

				'labels': {
					'yes': 'Да',
					'no': 'Нет',
					'loading': 'Загрузка данных',
					'presentTime': 'настоящее время',
					'none': 'Отсутствует'
				},

				'placeholders': {
					'replacementItem': 'Заменить имеющиеся ссылки на: (опционально)'
				},

				'buttons': {
					'cancel': 'Отмена',
					'clear': 'Очистить',
					'apply': 'Применить',
					'save': 'Сохранить',
					'add': 'Добавить',
					'new': 'Создать',
					'load': 'Загрузить',
					'delete': 'Удалить',
					'deleteSelected': 'Удалить выбранные',
					'edit': 'Редактировать',
					'more': 'Еще',
					'refresh': 'Обновить',
					'back': 'Назад',
					'today': 'Сегодня'
				},

				'fields': {
					'name': 'Наименование',
					'fullName': 'Полное наименование',
					'description': 'Описание',
					'type': 'Тип',
					'creationTime': 'Создано',
					'lastChangeTime': 'Изменено',
					'creator': 'Автор',
					'editor': 'Редактор',
					'viewOrder': '№ п/п',
					'predecessor': 'Предшественник',

					'customProperties': {
						'type': 'Параметр',
						'value': 'Значение'
					}
				},

				'sorting': {
					'ascending': 'По возрастанию',
					'descending': 'По убыванию',
					'title': 'Сортировка',
					'availableFields': 'Доступные поля',
					'sortingFields': 'Используемые поля',
					'removeField': 'Убрать поле'
				},

				'errors': {
					'title': 'Ошибка',
					'unknown': 'Неизвестная ошибка',
					'integerInRange': 'Значение должно быть числом в диапазоне {{range}}',
					'requiredField': 'Обязательное поле',
					'nothingToDelete': 'Не найдена запись для удаления (обновите страницу)',
					'invalidProjectTitle': 'Проект не найден',
					'invalidProject': 'Запрашиваемый проект не существует',
					'accessDeniedTitle': 'Доступ запрещен',
					'accessDenied': 'Недостаточный уровень привилегий для доступа к представлению'
				},

				'confirm': {
					'delete': {
						'records': 'Вы действительно хотите удалить записи?',
						'record': 'Вы действительно хотите удалить запись?'
					}
				},

				'menu' :{
					'user': {
						'currentUser': 'Пользователь',
						'profile': 'Профиль',
						'messages': 'Сообщения',
						'reports': 'Отчеты',
						'system': 'Система'
					},
					'dictionaries': 'Справочники'
				},

				'auth': {
					'credentials': {
						'legend': 'Выберите способ аутентификации'
					},
					'buttons': {
						'signIn': 'Вход',
						'signOut': 'Выход',
						'signInFacebook': 'Facebook',
						'signInTwitter': 'Twitter',
						'demo': 'Войти как тестовый пользователь'
					},
					'reason': {
						'notAuthorized': 'У вас недостаточно прав. Возможно вы хотите войти под другим именем?',
						'notAuthenticated': 'Вы должны быть авторизованы, для доступа к этой части приложения.'
					},
					'errors': {
						'invalidCredentials': 'Неудачная попытка входа в систему. Проверьте введенные данные, и попробуйте еще раз.',
						'serverError': 'Непредвиденная ошибка при входе в систему: {{exception}}.'
					}
				},

				'filters': {
					'title': 'Фильтр',
					'simple': 'Простой',
					'complex': 'Сложный',
					'user': 'По параметрам',
					'favorites': 'Избранные',
					'displayedRecords': 'Всего показано записей: {{ count }}',
					'applyRequired': 'Примените изменения фильтра, для отображения записей',

					'placeholders': {
						'typeNode': 'Тип свойства'
					},

					'ops': {
						'exists': 'СУЩЕСТВУЕТ',
						'like': 'СОДЕРЖИТ',
						'and': 'И',
						'or': 'ИЛИ',

						'not': {
							'exists': 'НЕ СУЩЕСТВУЕТ',
							'like': 'НЕ СОДЕРЖИТ',
							'and': 'И НЕ'
						}
					},

					'buttons': {
						'newRootNode': 'Добавить верхний уровень',
						'rootNode': 'верхний уровень',
						'newNode': 'Добавить',
						'editNode': 'Редактировать',
						'deleteNode': 'Удалить'
					},

					'errors': {
						'unexpected': {
							op: 'Данное условие не может содержать оператора',
							value: 'Данное условие не может содержать значения',
							child: 'Данное условие не должно содержать вложенных условий'
						},
						'missing': {
							'op': 'Не указан оператор',
							'value': 'Не указано значение'
						},
						'invalid': {
							'op': 'Недопустимый оператор'
						},
						'expected': {
							'guid': 'Значение должно уникальным идентификатором (Guid)',
							'int': 'Значение должно быть целочисленным',
							'float': 'Значение должно быть численным',
							'bool': 'Значение должно быть "Да" или "Нет"',
							'date': 'Значение должно быть валидной датой',
							'enum': 'Значение не входит в список допустимых'
						}
					}
				},

				'application': {
					'creator': 'Компания',
					'landing': 'Компания'
				},

				'profile': {
					'title': 'Профиль пользователя',
					'personalInfo': 'Персональные данные',
					'personalInfoDesc': 'Микроволновая энергия, чтобы подтолкнуть, чтобы освоиться здесь. Эта функция, которая позволяет инвесторам, но, нет, мой лев автомобилей, гости из автомобиля удовольствие.',
					'settings': 'Настройки',
					'settingsDesc': 'Персональные настройки приложения',
					'fields': {
						'firstName': 'Имя'
					}
				},

				'reporting': {
					'selector': 'Отчеты',
					'title': 'Создание отчета',
					'report': 'Выберите отчет',
					'priority': {
						'title': 'Выберите вид приоритета выполнения',
						'byUser': 'По участнику проекта',
						'byDate': 'По дате'
					},
					'result': 'Имя файла отчета (опционально)',
					'run': 'Создать',
					'viewAllProj': 'Все отчеты проекта',
					'viewAll': 'Все отчеты',
					'running': 'Выполняющиеся отчеты',
					'unread': 'Непросмотренные отчеты',
					'position': 'Место в очереди задач',

					'templates': {
						'title': 'Шаблоны отчетов',
						'fields': {
							'size': 'Размер файла'
						}
					},
					'reports': {
						'title': 'Отчеты пользователя',
						'fields': {
							'state': 'Состояние',
							'startedAt': 'Запущен',
							'completedAt': 'Завершен',
							'duration': 'Время создания',
							'progress': '% выполнения',
							'errorMsg': 'Описание ошибки',
							'errorDetails': 'Подробные сведения об ошибке',

							//archived
							'project': 'Проект',
							'type': 'Тип отчета'
						},
						'duration': {
							'hours': {
								'one': 'час',
								'few': 'часа',
								'many': 'часов',
								'other': 'часов'
							},
							'minutes': {
								'one': 'минута',
								'few': 'минуты',
								'many': 'минут',
								'other': 'минут'
							},
							'seconds': 'с'
						}
					}
				},

				'upload': {
					'placeholder': 'Перетащите сюда файлы для загрузки',
					'addFiles': 'Выбрать файлы...'
				},

				'tags': {
					'addTag': 'Добавить тег',
					'removeTag': 'Удалить тег',
					'newTag': 'Введите название нового тега'
				},

				'activities': {
					'title': 'Активность',
					'empty': 'Активность не зарегистрирована',
					'moreUsers': '(+{{num}} еще)',

					'filters': {
						'period': {
							'title': 'Период активности',
							'today': 'Сегодня',
							'yesterday': 'Вчера',
							'thisWeek': 'На этой неделе',
							'pastWeek': 'На прошлой неделе',
							'thisMonth': 'В этом месяце',
							'pastMonth': 'В прошлом месяце',
							'specificDate': 'За конкретную дату'
						},
						'specificDate': {
							'title': 'Дата активности'
						}
					}
				},

				'customPropTypes': {
					'title': 'Типы пользовательских свойств',
					'fields': {
						'valueType': 'Тип значения',
						'format': 'Формат отображения'
					}
				}
			});

			i18n.addMessages('projects', {
				'fields': {
					'code': 'Код проекта',
					'public': 'Публичный проект',
					'status': 'Статус',
					'tags': 'Теги',
					'db': 'Сервер'
				},

				'list': {
					'title': 'Проекты',
					'buttons': {
						'add': 'Новый проект'
					},

					'filters': {
						'participation': {
							'label': 'Проекты',

							'all': 'Любые',
							'me': 'Мои'
						}
					}
				},
				'create': {
					'title': 'Новый проект',
					'legend': 'Создание нового проекта',
					'placeholders': {
						'type': 'Выберите тип проекта',
						'db': 'Выберите сервер БД'
					}
				},
				'statuses': {
					'title': 'Справочник статусов',
					'buttons': {
						'add': 'Новый статус'
					}
				},
				'tags': {
					'type': 'Теги проектов',
					'title': 'Теги',
					'placeholders': {
						'new': 'Новый тег'
					}
				},
				'settings': {
					'title': 'Настройки проекта',
					'publicTitle': 'Да (видем всем)',
					'privateTitle': 'Нет (видим только участникам)',
					'tabs': {
						'overview': 'Свойства',
						'members': 'Участники',
						'templates': 'Шаблоны отчетов'
					}
				},
				'members': {
					'title': 'Участники',
					'placeholders': {
						'newMember': 'Выберите пользователя'
					},
					'fields': {
						'user': 'ФИО',
						'roles': 'Роли в проекте',
						'current': 'Текущая роль'
					}
				}
			});
		};
	}]);
});