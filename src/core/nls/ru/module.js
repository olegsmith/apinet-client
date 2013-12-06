define(['../../moduleDef'], function (module) {
	module.run(['i18n', 'strapConfig', '$locale', function(i18n, strapConfig, $locale) {

		$locale.DATETIME_FORMATS.ago_date = "dd.MM.yyyy";
		$locale.DATETIME_FORMATS.ago_datetime = "dd.MM.yyyy HH:mm";

		strapConfig.format = 'dd.mm.yyyy';

		i18n.addMessages('core', {
			'roles': {
				'title': 'Роли ({{role}})',
				'admin': 'Администратор',
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
				'more': 'Еще'
			},

			'fields': {
				'name': 'Наименование',
				'fullName': 'Полное наименование',
				'description': 'Описание',
				'type': 'Тип',
				'creationTime': 'Дата создания',
				'creator': 'Автор',
				'viewOrder': '№ п/п',

				'customProperties': {
					'type': 'Параметр',
					'value': 'Значение'
				}
			},

			'sorting': {
				'ascending': 'По возрастанию',
				'descending': 'По убыванию'
			},

			'errors': {
				'title': 'Ошибка',
				'unknown': 'Неизвестная ошибка',
				'integerInRange': 'Значение должно быть числом в диапазоне {{range}}',
				'requiredField': 'Обязательное поле',
				'nothingToDelete': 'Не найдена запись для удаления (обновите страницу)'
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
					'legend': 'Введите данные для авторизации',
					'email': 'E-mail',
					'password': 'Пароль'
				},
				'buttons': {
					'signIn': 'Вход',
					'signOut': 'Выход'
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
					expected: {
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
			}
		});

		i18n.addMessages('projects', {
			'fields': {
				'code': 'Код проекта',
				'status': 'Статус',
				'tags': 'Теги'
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
					'type': 'Выберите тип проекта'
				}
			},
			'statuses': {
				'title': 'Справочник статусов',
				'buttons': {
					'add': 'Новый статус'
				}
			},
			'tags': {
				'title': 'Справочник тегов',
				'buttons': {
					'add': 'Новый тег'
				},

				'filters': {
					'ownership': {
						'label': 'Принадлежность',
						'personal': 'Персональные теги',
						'common': 'Общие теги'
					}
				}
			}
		});
	}]);
});