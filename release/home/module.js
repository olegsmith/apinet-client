define("ago/home/moduleDef",["angular","ago/core/module"],function(angular){return angular.module("ago.home",["ago.core"])}),define("text!ago/home/states/moduleMenu.tpl.html",[],function(){return'<li ng-class="{\'active\': $state.is(\'page.projects.projectsList\')}">\r\n	<a href="/#!/projects/listView">\r\n		<i class="icon-table"></i>\r\n		<span>{{ i18n.projects.list.title }}</span>\r\n	</a>\r\n</li>\r\n<li ng-class="{\'active\': $state.is(\'page.projects.projectTags\')}">\r\n	<a href="/#!/projects/tags">\r\n		<i class="icon-cog"></i>\r\n		<span>{{ i18n.projects.tags.title }}</span>\r\n	</a>\r\n</li>'}),define("ago/home/states/projects",["angular","../moduleDef","text!./moduleMenu.tpl.html"],function(angular,module,moduleMenuTpl){module.config(["$stateProvider","sysConfig","securityAuthorizationProvider",function($stateProvider){$stateProvider.state("page.projects",{"abstract":!0,views:{content:{template:"<div ui-view></div>"},moduleMenu:{template:moduleMenuTpl}}})}])}),define("text!ago/home/states/projects/projectsList.tpl.html",[],function(){return'<div class="container"\r\n     ng-controller="projectsListCtrl"\r\n     filtered-list="{method: \'home/projects/getProjects\'}"\r\n     initial-sorters="{ CreationTime: \'desc\' }">\r\n	<div class="row" id="content-wrapper">\r\n		<div class="col-xs-12">\r\n			<div class="row hidden-sm hidden-md hidden-lg">\r\n				<div class="col-xs-12">\r\n					<div class="page-header">\r\n						<h1 class="pull-left">\r\n							<i class="icon-table"></i>\r\n							<span>{{ i18n.projects.list.title }}</span>\r\n						</h1>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n			<div filters-box="filter" meta="home/projects/projectMetadata" group="Projects"\r\n			        apply-enabled="applyEnabled" apply-filter="applyFilter" reset-filter="resetFilter"\r\n			        style="padding-top: 5px">\r\n				<ago-box-content>\r\n					<form class="form form-horizontal">\r\n						<div class="form-group">\r\n							<label class="col-md-3 control-label">{{ i18n.projects.list.filters.participation.label }}</label>\r\n							<div class="col-md-9">\r\n								<select ng-model="filter.simple.Participation" class="form-control">\r\n									<option value="All">{{ i18n.projects.list.filters.participation.all }}</option>\r\n									<option value="Participated">{{ i18n.projects.list.filters.participation.me }}</option>\r\n								</select>\r\n							</div>\r\n						</div>\r\n						<div class="form-group">\r\n							<label class="col-md-3 control-label">{{ i18n.core.fields.name }}</label>\r\n							<div class="col-md-9">\r\n								<input ng-model="filter.simple.Name" filter-node="{path: \'Name\', op:\'like\'}" class="form-control" multiple />\r\n							</div>\r\n						</div>\r\n						<div class="form-group">\r\n							<label class="col-md-3 control-label">{{ i18n.projects.fields.status }}</label>\r\n							<div class="col-md-9">\r\n								<input ng-model="filter.simple.Status" filter-node="{path: \'Status\', op:\'=\'}"\r\n								       lookup="home/dictionary/lookupProjectStatuses" class="form-control" multiple />\r\n							</div>\r\n						</div>\r\n						<div class="form-group">\r\n							<label class="col-md-3 control-label">{{ i18n.projects.fields.tags }}</label>\r\n							<div class="col-md-9">\r\n								<input ng-model="filter.simple.Tags" filter-node="{path: \'Tags.Tag\', op:\'=\'}"\r\n								       lookup="home/dictionary/lookupProjectTags" class="form-control" multiple />\r\n							</div>\r\n						</div>\r\n					</form>\r\n				</ago-box-content>\r\n			</div>\r\n\r\n			<div class="row box">\r\n				<div class="col-lg-12">\r\n					<ago-box color="purple" large="true" header-class="{\'hidden-xs\': true, \'hidden-md\': true, \'hidden-lg\': true}">\r\n						<ago-box-title>\r\n							<i class="fa icon-table"></i>\r\n							{{ i18n.projects.list.title }}\r\n						</ago-box-title>\r\n						<ago-box-content>\r\n							<div class="box-toolbox box-toolbox-top" ng-show="currentUser.admin">\r\n								<a href="#!/projects/new" class="btn btn-primary">\r\n									<i class="icon-plus icon-white"></i>\r\n									<span>{{ i18n.core.buttons.add }}</span>\r\n								</a>\r\n							</div>\r\n\r\n							<div class="row">\r\n								<div ng-repeat="model in models" class="col-xs-12 col-sm-6 col-lg-4">\r\n									<div class="projectBox box-content clearfix">\r\n										<a href="/projects/{{model.ProjectCode}}" target="_blank">\r\n											<div class="projectIcon">&nbsp;</div>\r\n											<div class="projectInfo">\r\n												<h3 class="title">{{ model.Name }}</h3>\r\n												<small>{{ model.Description }}</small>\r\n											</div>\r\n										</a>\r\n										<div class="clearfix"></div>\r\n										<div class="pull-left">\r\n											<span class="label label-warning">{{ model.Status.Name }}</span>\r\n										</div>\r\n										<div class="pull-right">\r\n										</div>\r\n									</div>\r\n								</div>\r\n							</div>\r\n\r\n							<div class="box-toolbox box-toolbox-bottom">\r\n								<button type="button" class="btn btn-primary" ng-click="paging.page = paging.page + 1">{{ i18n.core.buttons.more }}</button>\r\n\r\n								<counter action="home/projects/getProjectsCount"></counter>\r\n							</div>\r\n						</ago-box-content>\r\n					</ago-box>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'}),define("css!ago/home/states/projects/projectsList",[],function(){}),define("ago/home/states/projects/projectsList",["angular","../../moduleDef","text!./projectsList.tpl.html","css!./projectsList.css","../projects"],function(angular,module,tpl){module.config(["$stateProvider",function($stateProvider){$stateProvider.state("page.projects.projectsList",{url:"/projects/listview",onEnter:function(pageConfig,i18n){pageConfig.setConfig({breadcrumbs:[{name:i18n.msg("projects.list.title"),url:"/#!/projects/listview"}]})},template:tpl})}]).controller("projectsListCtrl",["$scope","$window","apinetService",function($scope,$window,apinetService){angular.extend($scope,{createItemForm:{},editModel:{},deleteModel:{},validation:{},handleException:function(error){$scope.resetValidation(),$scope.validation.generalErrors=[error]},handleValidationErrors:function(validation){$scope.resetValidation(),angular.extend($scope.validation,validation)},createItem:function(){$scope.resetValidation(),delete $scope.editModel.id,$scope.editModel.Type&&$scope.editModel.Type.id&&($scope.editModel.Type=$scope.editModel.Type.id),apinetService.action({method:"home/projects/createProject",model:$scope.editModel}).then(function(result){typeof result.success=="undefined"||result.success?($scope.dropChanges(),$scope.models.unshift(result)):$scope.handleValidationErrors(result)},$scope.handleException)},dropChanges:function(){$scope.resetValidation(),$scope.editModel={},$scope.createItemForm.$setPristine(),$scope.createItemForm.$setValidity("integer",!0)},createEnabled:function(){return $scope.createItemForm.$valid&&$scope.createItemForm.$dirty&&(typeof $scope.validation.success=="undefined"||$scope.validation.success)}}),$scope.$on("resetFilter",function(){$scope.filter.simple={Participation:"All"},$scope.requestParams.mode="All"}),$scope.$watch("filter.simple.Participation",function(value){$scope.requestParams.mode=value||"All"},!0)}])}),define("text!ago/home/states/projects/projectTags.tpl.html",[],function(){return'<div class="container"\r\n		ng-controller="projectTagsCtrl"\r\n		filtered-list="{ method: \'home/dictionary/getProjectTags\'}"\r\n		initial-sorters="{ FullName: \'asc\' }">\r\n\r\n	<div class="row" id="content-wrapper">\r\n		<div class="col-xs-12">\r\n\r\n			<div class="row hidden-sm hidden-md hidden-lg">\r\n				<div class="col-xs-12">\r\n					<div class="page-header">\r\n						<h1 class="pull-left">\r\n							<i class="icon-cog"></i>\r\n							<span>{{ i18n.projects.tags.title }}</span>\r\n						</h1>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n			<div filters-box="filter" meta="home/dictionary/projectTagMetadata" group="ProjectTags"\r\n				apply-enabled="applyEnabled" apply-filter="applyFilter" reset-filter="resetFilter"\r\n				style="padding-top: 5px">\r\n				<form class="form form-horizontal">\r\n					<div class="form-group">\r\n						<label for="ownership" class="col-md-3 control-label">{{ i18n.projects.tags.filters.ownership.label }}</label>\r\n						<div class="col-md-9">\r\n							<select ng-model="filter.simple.Ownership" class="form-control">\r\n								<option value="Personal">{{ i18n.projects.tags.filters.ownership.personal }}</option>\r\n								<option value="Common">{{ i18n.projects.tags.filters.ownership.common }}</option>\r\n							</select>\r\n						</div>\r\n					</div>\r\n					<div class="form-group">\r\n						<label for="names" class="col-md-3 control-label">{{ i18n.core.fields.name }}</label>\r\n						<div class="col-md-9">\r\n							<input id="names" ng-model="filter.simple.Name" filter-node="{path: \'Name\', op:\'like\'}" class="form-control" multiple />\r\n						</div>\r\n					</div>\r\n				</form>\r\n			</div>\r\n		\r\n\r\n			<ago-box color="purple" large="true" header-class="{\'hidden-xs\': true, \'hidden-md\': true, \'hidden-lg\': true}">\r\n				<ago-box-title>\r\n					<i class="fa icon-cog"></i>\r\n					{{ i18n.projects.tags.title }}\r\n				</ago-box-title>\r\n				\r\n				<ago-box-content>\r\n					<div class="box-toolbox box-toolbox-top" ng-show="!applyEnabled && (currentUser.admin || requestParams.mode === \'Personal\')">\r\n						<button class="btn btn-primary" ng-click="newItem();">\r\n							<i class="icon-plus icon-white"></i>\r\n							<span>{{ i18n.projects.tags.buttons.add }}</span>\r\n						</button>\r\n\r\n						<div class="alert alert-error" ng-show="validation.generalErrors">\r\n							{{ validation.generalErrors | joinBy }}\r\n						</div>\r\n\r\n						<form style="margin-top: 10px;" name="editForm" class="form form-horizontal" novalidate ng-show="editFormVisible">\r\n							<div ng-class="{ \'form-group\': true, \'has-error\': !!validation.fieldErrors[\'Name\'] }">\r\n								<label for="name" class="control-label col-md-2">{{ i18n.core.fields.name }}</label>\r\n								<div class="col-md-5">\r\n									<input id="name" class="form-control" name="Name" type="text" ng-model="editingItem.Name" required />\r\n									<span ng-show="validation.fieldErrors[\'Name\']" class="help-block">\r\n										{{ validation.fieldErrors[\'Name\'] | joinBy }}\r\n									</span>\r\n								</div>\r\n							</div>\r\n\r\n							<div class="form-group">\r\n								<div class="col-md-offset-2 col-md-5">\r\n									<button class="btn btn-primary login" ng-click="saveItem();"\r\n									        ng-disabled=\'editForm.$invalid\'>{{ i18n.core.buttons.save }}</button>\r\n									<button class="btn btn-warning" ng-click="cancelEdit();">{{ i18n.core.buttons.cancel }}</button>\r\n								</div>\r\n							</div>\r\n						</form>\r\n					</div>\r\n\r\n					<div class="responsive-table">\r\n						<div class="scrollable-area">\r\n							<table class="table table-bordered">\r\n								<thead>\r\n									<tr>\r\n										<th><span sortable-heading="sorters.Name" caption="{{ i18n.core.fields.name }}"></span></th>\r\n										<th><span sortable-heading="sorters.FullName" caption="{{ i18n.core.fields.fullName }}"></span></th>\r\n										<th><span sortable-heading="sorters.CreationTime" caption="{{ i18n.core.fields.creationTime }}"></span></th>\r\n										<th style="width: 200px;" ng-show="currentUser.admin"></th>\r\n									</tr>\r\n								</thead>\r\n								<tbody>\r\n									<tr ng-repeat="model in models">\r\n										<td>{{ model.Name }} </td>\r\n										<td>{{ model.FullName }}</td>\r\n										<td>{{ model.CreationTime | date:\'dd.MM.yyyy hh:mm:ss\' }}</td>\r\n										<td ng-show="!applyEnabled && (currentUser.admin || requestParams.mode === \'Personal\')">\r\n											<button class="btn-mini btn-info" ng-click="editItem(model);">\r\n												<i class="icon-edit icon-white"></i>\r\n												<span>{{ i18n.core.buttons.edit }}</span>\r\n											</button>\r\n											<button class="btn-mini btn-danger" ng-click="deleteItem(model);">\r\n												<i class="icon-edit icon-white"></i>\r\n												<span>{{ i18n.core.buttons.delete }}</span>\r\n											</button>\r\n										</td>\r\n									</tr>\r\n								</tbody>\r\n							</table>\r\n							<div ng-show="indication.loading" us-spinner="{top:100}"></div>\r\n						</div>\r\n					</div>\r\n\r\n					<div class="box-toolbox box-toolbox-bottom">\r\n						<button type="button" class="btn btn-primary" ng-click="paging.page = paging.page + 1">{{ i18n.core.buttons.more }}</button>\r\n\r\n						<counter action="home/dictionary/getProjectTagsCount"></counter>\r\n					</div>\r\n				</ago-box-content>\r\n				\r\n			</ago-box>\r\n\r\n		</div><!-- col-xs-12 -->\r\n	</div><!-- row content-wrapper -->\r\n</div>'}),define("ago/home/states/projects/projectTags",["angular","../../moduleDef","text!./projectTags.tpl.html","../projects"],function(angular,module,tpl){module.config(["$stateProvider",function($stateProvider){$stateProvider.state({name:"page.projects.projectTags",url:"/projects/tags",onEnter:function(pageConfig,i18n){pageConfig.setConfig({breadcrumbs:[{name:i18n.msg("projects.list.title"),url:"/#!/projects/listview"},{name:i18n.msg("projects.tags.title"),url:"/#!/projects/tags"}]})},template:tpl})}]).controller("projectTagsCtrl",["$scope","apinetService","$window","i18n",function($scope,apinetService,$window,i18n){angular.extend($scope,{editFormVisible:!1,editingItem:{},newItem:function(){$scope.resetValidation(),$scope.editingItem={},$scope.editFormVisible=!0},editItem:function(item){$scope.resetValidation(),$scope.editingItem=angular.extend({},item),$scope.editFormVisible=!0},deleteItem:function(item){if(!$window.confirm(i18n.msg("core.confirm.delete.records")))return;$scope.resetValidation(),apinetService.action({method:"home/dictionary/deleteProjectTag",id:item.Id}).then(function(){$scope.cancelEdit();var index=$scope.models.indexOf(item);if(index===-1)return;$scope.models.splice(index,1)},function(error){$scope.validation.generalErrors=[error]})},saveItem:function(){$scope.resetValidation(),apinetService.action(angular.extend({method:"home/dictionary/editProjectTag",model:$scope.editingItem},$scope.requestParams)).then(function(result){result.success?($scope.refreshList(),$scope.cancelEdit()):angular.extend($scope.validation,result)},function(error){$scope.validation.generalErrors=[error]})},cancelEdit:function(){$scope.editFormVisible=!1}}),$scope.$watch("requestParams",function(){$scope.cancelEdit()},!0),$scope.$on("resetFilter",function(){$scope.filter.simple={Ownership:"Personal"},$scope.requestParams.mode="Personal"}),$scope.$watch("filter.simple.Ownership",function(value){$scope.requestParams.mode=value||"Personal"},!0)}])}),define("text!ago/home/states/projects/projectStatuses.tpl.html",[],function(){return'<div class="container" \r\n		ng-controller="projectStatusesCtrl"\r\n		filtered-list="{ method: \'home/dictionary/getProjectStatuses\'}"\r\n		initial-sorters="{ Name: \'asc\' }">\r\n\r\n	<div class="row" id="content-wrapper">\r\n		<div class="col-xs-12">\r\n			<div class="row hidden-sm hidden-md hidden-lg">\r\n				<div class="col-xs-12">\r\n					<div class="page-header">\r\n						<h1 class="pull-left">\r\n							<i class="icon-cog"></i>\r\n							<span>{{ i18n.projects.statuses.title }}</span>\r\n						</h1>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n			<div filters-box="filter" meta="home/dictionary/projectStatusMetadata" group="ProjectStatuses"\r\n				apply-enabled="applyEnabled" apply-filter="applyFilter" reset-filter="resetFilter"\r\n				style="padding-top: 5px">\r\n				<form class="form form-horizontal">\r\n					<div class="form-group">\r\n						<label class="col-md-3 control-label">{{ i18n.core.fields.name }}</label>\r\n						<div class="col-md-9">\r\n							<input type="text" ng-model="filter.simple.Name" filter-node="{path: \'Name\', op:\'like\'}"  class="form-control" />\r\n						</div>\r\n					</div>\r\n				</form>\r\n			</div>\r\n		\r\n\r\n			<ago-box color="purple" large="true" header-class="{\'hidden-xs\': true, \'hidden-md\': true, \'hidden-lg\': true}">\r\n				<ago-box-title>\r\n					<i class="fa icon-cog"></i>\r\n					{{ i18n.projects.statuses.title }}\r\n				</ago-box-title>\r\n\r\n				<ago-box-content>\r\n					<div class="box-toolbox box-toolbox-top" ng-show="currentUser.admin">\r\n						<ago-error-msg></ago-error-msg>\r\n\r\n						<form name="createItemForm" class="form-inline" novalidate>\r\n							<div class="row">\r\n								<div class="col-sm-6" ng-class="{\'has-error\': (createItemForm.$invalid || validation.fieldErrors[\'Name\'] || validation.fieldErrors[\'Description\'])}">\r\n									<div class="row">\r\n										<div class="col-md-3">\r\n											<input type="text" name="Name" ng-model="editModel.Name" class="form-control"\r\n											       placeholder="{{ i18n.core.fields.name }}"\r\n											       ng-required="editModel.focused" ng-focus="editModel.focused=true" ng-blur="editModel.focused=false" />\r\n										</div>\r\n										<div class="col-md-5">\r\n											<input type="text" name="Description" ng-model="editModel.Description" class="form-control"\r\n											       placeholder="{{ i18n.core.fields.description }}"\r\n											       ng-focus="editModel.focused=true" ng-blur="editModel.focused=false" />\r\n										</div>\r\n										<div class="col-md-3 btn-group">\r\n											<button type="button" class="btn" ng-click="createItem()" ng-disabled="!createEnabled()">{{ i18n.core.buttons.add }}</button>\r\n											<button type="button" class="btn" ng-click="dropChanges()" title="{{ i18n.core.buttons.clear }}">&times;</button>\r\n										</div>\r\n									</div>\r\n\r\n									<div class="row">\r\n										<div class="col-md-12">\r\n											<span ng-show="validation.fieldErrors[\'Name\']" class="help-block has-error">\r\n												{{ validation.fieldErrors[\'Name\'] | joinBy }}\r\n											</span>\r\n											<span ng-show="validation.fieldErrors[\'Description\']" class="help-block has-error">\r\n												{{ validation.fieldErrors[\'Description\'] | joinBy }}\r\n											</span>\r\n										</div>\r\n									</div>\r\n								</div>\r\n\r\n								<div class="col-sm-6">\r\n									<div class="row">\r\n										<div class="col-md-3">\r\n											<button type="button" class="btn btn-danger pull-right" ng-click="deleteSelected()" ng-disabled="!hasSelected()" title="{{i18n.core.buttons.deleteSelected}}">{{ i18n.core.buttons.delete }}</button>\r\n											<div class="clearfix"></div>\r\n										</div>\r\n										<div class="col-md-9">\r\n											<input type="text" lookup="home/dictionary/lookupProjectStatuses" lookup-options="{allowClear: true}" ng-model="deleteModel.replacementItem"\r\n											       placeholder="{{ i18n.core.placeholders.replacementItem }}" class="form-control" />\r\n										</div>\r\n									</div>\r\n								</div>\r\n							</div>\r\n						</form>\r\n					</div>\r\n\r\n					<div class="responsive-table">\r\n						<div class="scrollable-area">\r\n							<table class="table table-bordered">\r\n								<thead>\r\n									<tr>\r\n										<th style="width: 1%" ng-show="currentUser.admin">\r\n											<input type="checkbox" checker="items: \'models\'">\r\n										</th>\r\n										<th><span sortable-heading="sorters.Name" caption="{{ i18n.core.fields.name }}"></span></th>\r\n										<th style="width: 30%"><span sortable-heading="sorters.Description" caption="{{ i18n.core.fields.description }}"></span></th>\r\n										<th style="width: 15%"><span sortable-heading="sorters.Creator_FIO" caption="{{ i18n.core.fields.creator }}"></span></th>\r\n										<th style="width: 15%"><span sortable-heading="sorters.CreationTime" caption="{{ i18n.core.fields.creationTime }}"></span></th>\r\n										<th style="width: 1%" ng-show="currentUser.admin">&nbsp;</th>\r\n									</tr>\r\n								</thead>\r\n								<tbody>\r\n									<tr ng-repeat="model in models">\r\n										<td ng-show="currentUser.admin">\r\n											<input type="checkbox" ng-model="model.selected" data-itemid="{{ model.Id }}">\r\n										</td>\r\n										<td>\r\n											<inline-text model="model.Name" on-update="onUpdateProp(model, \'Name\', val)" \r\n											             on-cancel="onCancel(model)" input-col="col-xs-12" required></inline-text>\r\n											<span ng-show="model.validation.fieldErrors[\'Name\']"\r\n											      class="help-block has-error">\r\n												{{ model.validation.fieldErrors[\'Name\'] | joinBy }}\r\n											</span>\r\n										</td>\r\n										<td>\r\n											<inline-text model="model.Description" on-update="onUpdateProp(model, \'Description\', val)" on-cancel="onCancel(model)" input-col="col-xs-12"></inline-text>\r\n											<span ng-show="model.validation.fieldErrors[\'Description\']"\r\n											      class="help-block has-error">\r\n												{{ model.validation.fieldErrors[\'Description\'] | joinBy }}\r\n											</span>\r\n										</td>\r\n										<td>{{ model.Author }}</td>\r\n										<td>{{ model.CreationTime | date:\'ago_datetime\' }}</td>\r\n										<td ng-show="currentUser.admin">\r\n											<ago-btn-delete title="{{ i18n.core.buttons.delete }}" ng-click="deleteItem(model)"></ago-btn-delete>\r\n										</td>\r\n									</tr>\r\n								</tbody>\r\n							</table>\r\n			    		</div>\r\n					</div>\r\n\r\n					<div class="box-toolbox box-toolbox-bottom">\r\n						<button type="button" class="btn btn-primary" ng-click="paging.page = paging.page + 1">{{ i18n.core.buttons.more }}</button>\r\n\r\n						<counter action="home/dictionary/getProjectStatusesCount"></counter>\r\n					</div>\r\n				</ago-box-content>\r\n				\r\n			</ago-box>\r\n\r\n		</div><!-- col-xs-12 -->\r\n	</div><!-- row content-wrapper -->\r\n</div>'}),define("ago/home/states/projects/projectStatuses",["angular","../../moduleDef","text!./projectStatuses.tpl.html","../projects"],function(angular,module,tpl){module.config(["$stateProvider",function($stateProvider){$stateProvider.state({name:"page.projects.projectStatuses",url:"/projects/statuses",onEnter:function(pageConfig,i18n){pageConfig.setConfig({breadcrumbs:[{name:i18n.msg("projects.list.title"),url:"/#!/projects/listview"},{name:i18n.msg("projects.statuses.title"),url:"/#!/projects/statuses"}]})},template:tpl})}]).controller("projectStatusesCtrl",["$scope","sysConfig","apinetService","$window","i18n",function($scope,sysConfig,apinetService,$window,i18n){angular.extend($scope,{createItemForm:{},editModel:{},deleteModel:{},validation:{},handleException:function(error){$scope.resetValidation(),$scope.validation.generalErrors=[error]},handleValidationErrors:function(validation){$scope.resetValidation(),angular.extend($scope.validation,validation)},removeModels:function(modelsToRemove){for(var i=0;i<modelsToRemove.length;i++){var index=$scope.models.indexOf(modelsToRemove[i]);if(index===-1)continue;$scope.models.splice(index,1)}},createItem:function(){$scope.resetValidation(),delete $scope.editModel.id,apinetService.action({method:"home/dictionary/editProjectStatus",project:sysConfig.project,model:$scope.editModel}).then(function(result){typeof result.success=="undefined"||result.success?($scope.dropChanges(),$scope.models.unshift(result)):$scope.handleValidationErrors(result)},$scope.handleException)},dropChanges:function(){$scope.resetValidation(),$scope.editModel={},$scope.createItemForm.$setPristine(),$scope.createItemForm.$setValidity("integer",!0)},createEnabled:function(){return $scope.createItemForm.$valid&&(typeof $scope.validation.success=="undefined"||$scope.validation.success)},hasSelected:function(){for(var i=0;i<$scope.models.length;i++)if($scope.models[i].selected&&$scope.models[i].selected===!0)return!0;return!1},deleteItem:function(model){if(!model)return;if(!$window.confirm(i18n.msg("core.confirm.delete.record")))return;$scope.resetValidation(),apinetService.action({method:"home/dictionary/deleteProjectStatuses",project:sysConfig.project,ids:[model.Id],replaceId:$scope.deleteModel.replacementItem?$scope.deleteModel.replacementItem.id:null}).then(function(){$scope.removeModels([model])},$scope.handleException)},deleteSelected:function(){if(!$window.confirm(i18n.msg("core.confirm.delete.records")))return;var ids=[],modelsToRemove=[];for(var i=0;i<$scope.models.length;i++)$scope.models[i].selected&&$scope.models[i].selected===!0&&(ids.push($scope.models[i].Id),modelsToRemove.push($scope.models[i]));if(ids.length<=0)return;$scope.resetValidation(),apinetService.action({method:"home/dictionary/deleteProjectStatuses",project:sysConfig.project,ids:ids,replaceId:$scope.deleteModel.replacementItem?$scope.deleteModel.replacementItem.id:null}).then(function(){$scope.removeModels(modelsToRemove)},$scope.handleException)},onUpdateProp:function(model,prop,val){$scope.resetValidation();var data={Id:model.Id,Name:model.Name,Description:model.Description,ModelVersion:model.ModelVersion};return data[prop]=val,apinetService.action({method:"home/dictionary/editProjectStatus",project:sysConfig.project,model:data}).then(function(result){var success=typeof result.success=="undefined"||result.success;return success?(angular.extend(model,result),model.validation={}):model.validation=result,success},$scope.handleException)},onCancel:function(model){model.validation={}}})}])}),define("text!ago/home/states/projects/projectCreate.tpl.html",[],function(){return'<div class="container" ng-controller="projectCreateCtrl">\r\n	<div class="row" id="content-wrapper">\r\n		<div class="col-xs-12">\r\n\r\n			<div class="box ">\r\n				<div class="box-header purple-background">\r\n					<div class="title">\r\n						<i class="icon-plus"></i>\r\n						{{ i18n.projects.create.title }}\r\n					</div>\r\n				</div>\r\n\r\n				<div class="box-content">\r\n					<ago-error-msg></ago-error-msg>\r\n					\r\n					<form name="form" class="form form-horizontal" novalidate>\r\n						<!-- Project type -->\r\n						<div class="form-group" ng-class="{\'has-error\': form.Type.$invalid}">\r\n							<label class="col-md-2 control-label" for="Type">{{ i18n.core.fields.type }}</label>\r\n							<div class="col-md-5">\r\n								<input type="text" id="Type" name="Type" lookup="home/dictionary/lookupProjectTypes"\r\n								       ng-model="model.Type" placeholder="{{ i18n.projects.create.placeholders.type }}" autofocus required class="form-control" />\r\n							</div>\r\n							<div class="col-md-5">\r\n								<span ng-show="form.Type.$error.required" class="help-block has-error">\r\n									* {{ i18n.core.errors.requiredField }}\r\n								</span>\r\n								<span ng-show="validation.fieldErrors[\'Type\']" class="help-block has-error">\r\n									{{ validation.fieldErrors[\'Type\'] | joinBy }}\r\n								</span>\r\n							</div>\r\n						</div>\r\n						<!-- Project code -->\r\n						<div class="form-group" ng-class="{\'has-error\': form.ProjectCode.$invalid}">\r\n							<label class="col-md-2 control-label" for="ProjectCode">{{ i18n.projects.fields.code }}</label>\r\n							<div class="col-md-5">\r\n								<input type="text" id="ProjectCode" name="ProjectCode" ng-model="model.ProjectCode" autofocus required class="form-control" />\r\n							</div>\r\n							<div class="col-md-5">\r\n								<span ng-show="form.ProjectCode.$error.required" class="help-block has-error">\r\n									* {{ i18n.core.errors.requiredField }}\r\n								</span>\r\n								<span ng-show="validation.fieldErrors[\'ProjectCode\']" class="help-block has-error">\r\n									{{ validation.fieldErrors[\'ProjectCode\'] | joinBy }}\r\n								</span>\r\n							</div>\r\n						</div>\r\n						<!-- Name -->\r\n						<div class="form-group" ng-class="{\'has-error\': form.Name.$invalid}">\r\n							<label class="col-md-2 control-label" for="Name">{{ i18n.core.fields.name }}</label>\r\n							<div class="col-md-5">\r\n								<input type="text" id="Name" name="Name" ng-model="model.Name" autofocus required class="form-control" />\r\n							</div>\r\n							<div class="col-md-5">\r\n								<span ng-show="form.Name.$error.required" class="help-block has-error">\r\n									* {{ i18n.core.errors.requiredField }}\r\n								</span>\r\n								<span ng-show="validation.fieldErrors[\'Name\']" class="help-block has-error">\r\n									{{ validation.fieldErrors[\'Name\'] | joinBy }}\r\n								</span>\r\n							</div>\r\n						</div>\r\n						<!-- Description -->\r\n						<div class="form-group">\r\n							<label class="col-md-2 control-label">{{ i18n.core.fields.description }}</label>\r\n							<div class="col-md-5">\r\n								<textarea name="Description" ng-model="model.Description" rows="3" class="form-control"></textarea>\r\n							</div>\r\n						</div>\r\n						<!-- Tags -->\r\n						<div class="form-group" ng-class="{\'has-error\': form.Tags.$invalid}">\r\n							<label for="Tags" class="col-md-2 control-label">{{ i18n.projects.fields.tags }}</label>\r\n							<div class="col-md-5">\r\n								<input type="text" id="Tags" name="Tags" lookup="home/dictionary/lookupProjectTags" ng-model="model.Tags"\r\n								       multiple placeholder="{{ i18n.tasks.create.placeholders.tags }}" class="form-control" />\r\n							</div>\r\n							<div class="col-md-5">\r\n								<span ng-show="validation.fieldErrors[\'Tags\']" class="help-block has-error">\r\n									{{ validation.fieldErrors[\'Tags\'] | joinBy }}\r\n								</span>\r\n							</div>\r\n						</div>\r\n						<!-- Action section -->\r\n						<div class="form-actions form-actions-padding-sm">\r\n							<div class="row">\r\n								<div class="col-md-10 col-md-offset-2">\r\n									<button type="button" class="btn btn-danger" ng-click="cancel()">{{ i18n.core.buttons.cancel }}</button>\r\n									<button type="button" class="btn btn-success" ng-click="create()" ng-disabled="form.$invalid">{{ i18n.core.buttons.save }}</button>\r\n								</div>\r\n							</div>\r\n						</div>			\r\n					</form>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'}),define("ago/home/states/projects/projectCreate",["angular","../../moduleDef","text!./projectCreate.tpl.html","../projects"],function(angular,module,tpl){module.config(["$stateProvider","securityAuthorizationProvider",function($stateProvider,securityAuthorizationProvider){$stateProvider.state("page.projects.projectCreate",{url:"/projects/new",onEnter:function(pageConfig,i18n){pageConfig.setConfig({breadcrumbs:[{name:i18n.msg("projects.list.title"),url:"/#!/projects/listview"},{name:i18n.msg("projects.create.title"),url:"/#!/projects/new"}]})},template:tpl,resolve:{adminUser:securityAuthorizationProvider.requireAdminUser()}})}]).controller("projectCreateCtrl",["$scope","sysConfig","apinetService","$state",function($scope,sysConfig,apinetService,$state){angular.extend($scope,{model:{},validation:{},cancel:function(){$state.transitionTo("page.projects.projectsList",{},!0)},handleException:function(error){$scope.resetValidation(),$scope.validation.generalErrors=[error]},handleValidationErrors:function(validation){$scope.resetValidation(),angular.extend($scope.validation,validation)},resetValidation:function(){$scope.validation={}},create:function(){$scope.resetValidation(),$scope.model.Type&&($scope.model.Type=$scope.model.Type.id),apinetService.action({method:"home/projects/createProject",model:$scope.model}).then(function(result){typeof result.success=="undefined"||result.success?$state.transitionTo("page.projects.projectsList"):$scope.handleValidationErrors(result)},$scope.handleException)}})}])}),define("ago/home/states",["./states/projects","./states/projects/projectsList","./states/projects/projectTags","./states/projects/projectStatuses","./states/projects/projectCreate"],function(){}),define("ago/nls/home",{en:!0,ru:!0}),define("ago/home/module",["ago/home/moduleDef","ago/home/states","i18n!ago/nls/home"],function(module){return module.config(["$urlRouterProvider",function($urlRouterProvider){$urlRouterProvider.otherwise("/projects/listview")}])}),function(c){var d=document,a="appendChild",i="styleSheet",s=d.createElement("style");s.type="text/css",d.getElementsByTagName("head")[0][a](s),s[i]?s[i].cssText=c:s[a](d.createTextNode(c))}("div.projectBox {\n  margin: 0 15px 15px 0;\n  overflow: hidden;\n}\ndiv.projectBox div.projectIcon {\n  background-image: url(../D:/Development/AGO/apinet-client/src/home/states/projects/images/project-icon.png);\n  width: 62px;\n  height: 62px;\n  margin: 0 10px 10px 0;\n  float: left;\n}\ndiv.projectBox div.projectInfo {\n  margin-left: 72px;\n  min-height: 72px;\n}\ndiv.projectBox div.projectInfo a {\n  display: block;\n}\ndiv.projectBox div.projectInfo a h3 {\n  margin-top: 5px;\n}\n"),require([""]);