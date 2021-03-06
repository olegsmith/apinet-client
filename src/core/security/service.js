define(['./moduleDef', 'text!./loginForm.tpl.html'], function (module, loginFormTpl) {

	var AUTH_EVENTS = {
		LOGIN: 'auth:login',
		LOGOUT: 'auth:logout'
	};

	module
		.constant('AUTH_EVENTS', AUTH_EVENTS)
		.factory('security', 
			['$q', '$location', 'securityRetryQueue', '$modal', 'moduleConfig', 'apinetService'
			 , '$rootScope', '$window', 'startupPath', 

			function ($q, $location, queue, $modal, moduleConfig, apinetService, $rootScope, $window, startupPath) {

				// Redirect to the given url (defaults to '/')
				function redirect(url) {
					url = url || '/';
					$location.path(url);
					window.location.href = '/';
				}

				// Login form dialog stuff
				var loginDialog = null;

				function openLoginDialog() {
					if (loginDialog) {
						return;
					}
					loginDialog = $modal.open({
						template: loginFormTpl,
						controller: 'LoginFormController',
						keyboard: false,
						backdrop: 'static' });
					loginDialog.result.then(onLoginDialogClose);
				}

				function closeLoginDialog(success) {
					if (loginDialog) {
						loginDialog.close(success);
					}
				}

				function onLoginDialogClose(success) {
					loginDialog = null;
					if (success) {
						queue.retryAll();
					} else {
						queue.cancelAll();
						redirect();
					}
				}

				// Register a handler for when an item is added to the retry queue
				queue.onItemAddedCallbacks.push(function () {
					if (queue.hasMore()) {
						service.showLogin();
					}
				});

				function oauthLoginUrl(provider) {
					var returnUrl = startupPath.url || $location.absUrl();
					return apinetService.oauthUrl(provider) + 
						'?url=' + $window.encodeURIComponent(returnUrl);
				};

				// The public API of the service
				var service = {

					// Get the first reason for needing a login
					getLoginReason: function () {
						return queue.retryReason();
					},

					// Show the modal login dialog
					showLogin: function () {
						openLoginDialog();
					},

					// Attempt to authenticate a user by the given email and password
					loginAsDemo: function () {
						$rootScope.$emit(AUTH_EVENTS.LOGOUT);
						service.currentUser = null;

						var deferred = $q.defer();

						apinetService.action({
							method: 'core/auth/loginAsDemo'
						}).then(function (result) {
							if (typeof result.success === 'undefined' || result.success) {
								service.currentUser = result;
								if (service.isAuthenticated()) {
									closeLoginDialog(true);
								}
								$rootScope.$emit(AUTH_EVENTS.LOGIN, {user: service.currentUser});
							}

							deferred.resolve(result);
						}, function (error) {
							deferred.reject(error);
						});

						return deferred.promise;
					},

					facebookLoginUrl: function() {
						return oauthLoginUrl('fb');
					},

					twitterLoginUrl: function() {
						return oauthLoginUrl('twi');
					},

					// Give up trying to login and clear the retry queue
					cancelLogin: function () {
						closeLoginDialog(false);
						redirect();
					},

					// Logout the current user and redirect
					logout: function (redirectTo) {
						apinetService.action({
							method: 'core/auth/logout'
						})
						.then(function () {
							$rootScope.$emit(AUTH_EVENTS.LOGOUT);
							service.currentUser = null;
							redirect(redirectTo);
						});
					},

					// Ask the backend to see if a user is already authenticated - this may be from a previous session.
					requestCurrentUser: function () {
						if (service.isAuthenticated()) {
							return $q.when(service.currentUser);
						}
						else {
							return apinetService.action({
								method: 'core/auth/currentUserDto'
							})
							.then(function (result) {
								if (typeof result.success === 'undefined' || result.success) {
									service.currentUser = result;
									$rootScope.$emit(AUTH_EVENTS.LOGIN, {user: service.currentUser})
									if (service.currentUser) {
										service.currentUser.admin = service.currentUser.SystemRole === 'Administrator';
									}
								}

								return service.currentUser;
							});
						}
					},

					// Information about the current user
					currentUser: null,

					// Is the current user authenticated?
					isAuthenticated: function () {
						return !!service.currentUser;
					},

					// Is the current user an adminstrator?
					isAdmin: function () {
						return !!(service.currentUser && service.currentUser.admin);
					},

					//Ask the backend about user roles in provided project
					requestUserRole: function (project) {

						function getRole() {
							return moduleConfig.getRole(project)
								.then(function (role) {
									return role;
								});
						}

						if (!service.isAuthenticated()) {
							return service.requestCurrentUser().then(getRole);
						} else {
							return getRole();
						}
					},

					switchRole: function(project, role) {
						return apinetService.action({
							method: $rootScope.module + '/project/switchRole',
							project: project,
							current: role
						});
					}
				};

				return service;
			}
		]);
});