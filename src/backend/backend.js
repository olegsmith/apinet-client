angular.module('backend', ['ngMockE2E'])
	.run(['$httpBackend', '$timeout', 'reportService',
		function($httpBackend, $timeout, reportService) {

			var userId = 0;

			var makeUser = function(fname, lname, isAdmin) {
				userId++;
				return {
					id: userId,
					firstName: fname,
					lastName: lname,
					email: fname + '.' + lname + '@abc.com',
					admin: isAdmin
				};
			};

			var admin = makeUser('a', 'admin', true); //admin
			var ivanov = makeUser('ivan', 'ivanov', false); //project manager
			var petrov = makeUser('petr', 'petrov', false); //project executor
			var sidorov = makeUser('sidor', 'sidorov', false); //project executor
			var users = [admin, ivanov, petrov, sidorov];

			var currentUser = admin;


			var projMatrix = {
				play2: {
					admins: [ivanov, admin],
					managers: [ivanov, petrov],
					executors: [sidorov]
				},
				prj2: {
					admins: [ivanov],
					managers: [ivanov],
					executors: [petrov]
				}
			};

			var userGroups = function(proj, userId) {
				var p = projMatrix[proj];
				var groups = [];
				var user = null;
				angular.forEach(users, function(u) {
					if (u.id === userId) {
						user = u;
					}
				});
				for (var group in p) {
					if ($.inArray(user, p[group]) >= 0) {
						groups.push(group);
					}
				}
				return groups;
			};

			//fake login
			$httpBackend.whenPOST('/login').respond(
				function(method, url, data, headers) {
					var prms = JSON.parse(data);
					//test error on
					if (prms.email === 'bad@abc.com') {
						return [500, 'Oops, something went wrong'];
					}

					var found = null;
					angular.forEach(users, function(u) {
						if (u.email === prms.email && '111' === prms.password) {
							found = angular.copy(u);
						}
					});

					currentUser = found;

					return [200, {
						user: currentUser
					}];
				});

			//fake logout
			$httpBackend.whenPOST('/logout').respond(function(method, url, data, headers) {
				currentUser = {};
				return [204];
			});

			//fake current-user
			$httpBackend.whenPOST('/current-user').respond(function(method, url, data, headers) {
				if (currentUser) {
					return [200, {
						user: currentUser
					}];
				} else {
					return [500, 'Oops, something went wrong'];
				}
			});


			//fake user groups
			$httpBackend.whenPOST('/user-groups').respond(function(method, url, data, headers) {
				console.log("post /user-groups", data);
				var prms = JSON.parse(data);
				return [200, {
					groups: ['admins'] //userGroups(prms.project, prms.userId)
				}];
			});


			$httpBackend.whenPOST('/api/models/').respond(function(method, url, data, headers) {
				var prms = JSON.parse(data);
				if ((prms.action === 'getModels') && (prms.modelType === 'AGO.Docstore.Model.Projects.ProjectModel')) {
					return getProjects();
				} else {
					return [500, 'Oops, something went wrong'];
				}
			});

			$httpBackend.whenPOST('/api').respond(function(method, url, data, headers) {
				var prms = JSON.parse(data);
				if (prms.action === "getUserReports") {
					return getUserReports();
				} else if (prms.action === "getUnreadUserReports") {
					return getUnreadUserReports();
				} else if (prms.action === "generateReport") {
					return generateReport();
				} else {
					return [500, 'Oops, something went wrong'];
				}
			});


			//all others
			$httpBackend.whenGET(/^(projects|ng-modules|components)*/).passThrough();
			$httpBackend.whenPOST(/^(\/api)*/).passThrough();

			var generateTimer;

			function updatePercent() {

				if (generateTimer) {
					clearTimeout(generateTimer);
				}

				var generatingExist = false;
				for (var i = 0; i < userReports.rows.length; i++) {
					if (userReports.rows[i].Status !== 'done') {
						generatingExist = true;
						var currentPercent = userReports.rows[i].Percent;
						if (currentPercent >= 100) {
							userReports.rows[i].Status = "done";
							reportService.setReports(userReports.rows);
						} else {
							userReports.rows[i].Percent = currentPercent + 10;
							reportService.setReports(userReports.rows);
						}
					}
				}


				generateTimer = window.setTimeout(function() {
					if (generatingExist) {
						updatePercent();
					}
				}, 1000);
			}

			function generateReport(prms) {
				$timeout(function() {
					userReports.rows.unshift({
						"Id": "5",
						"Name": "Report " + new Date(),
						"Status": "generating",
						"Percent": 0,
						"StartDate": new Date()
					});
					reportService.setReports(userReports.rows);

					updatePercent();

				}, 1000);

				return [200];
			}

			function getProjects() {
				return [200, {
					"rows": [{
						"Id": "play2",
						"Name": "Play 2.0"
					}, {
						"Id": "prj2",
						"Name": "Play 1.2.4"
					}, {
						"Id": "prj3",
						"Name": "Website"
					}, {
						"Id": "prj4",
						"Name": "Secret project"
					}, {
						"Id": "prj5",
						"Name": "Playmate"
					}, {
						"Id": "prj6",
						"Name": "Things to do"
					}]
				}];
			}

			var userReports = {
				"rows": [{
					"Id": "1",
					"Name": "Report1",
					"Status": "generating",
					"Percent": 10,
					"StartDate": new Date()
				}, {
					"Id": "2",
					"Name": "Report2",
					"Status": "generating",
					"Percent": 30,
					"StartDate": new Date()
				}, {
					"Id": "3",
					"Name": "Report3",
					"Status": "done",
					"StartDate": new Date(),
					"EndDate": new Date()
				}, {
					"Id": "4",
					"Name": "Report4",
					"Status": "done",
					"StartDate": new Date(),
					"EndDate": new Date()
				}]
			};

			function getUserReports() {
				return [200, userReports];
			}


			function getUnreadUserReports() {

				updatePercent();
				return [200, userReports];

			}


		}
	]);