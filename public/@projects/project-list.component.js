"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var index_1 = require('../shared/index');
var angular2_toaster_1 = require('angular2-toaster');
var ProjectListComponent = (function () {
    function ProjectListComponent(projectService, router, modal, toaster) {
        this.projectService = projectService;
        this.router = router;
        this.modal = modal;
        this.toaster = toaster;
        this.listData = [];
        this.listConfig = {
            sortOptions: [
                { name: 'Updated At', value: 'updated_at' },
                { name: 'Created At', value: 'created_at' },
                { name: 'Title', value: 'title' },
                { name: 'Category', value: 'category' }
            ],
            perPageOptions: [5, 10, 15, 25, 50, 100],
            sort: {
                by: 'updated_at',
                descending: true
            },
            page: {
                currentPage: 1,
                from: 0,
                to: 0,
                total: 0,
                lastPage: 0,
                perPage: 15
            },
            emptyText: 'Looks like no project items have been created yet.'
        };
        console.log('ProjectListComponent', this);
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        var list = this.projectService.getList();
        this.parseList(list);
    };
    ProjectListComponent.prototype.parseList = function (json) {
        this.listData = json.data.map(this.mapList);
        this.listConfig.page = {
            from: json.from,
            to: json.to,
            total: json.total,
            lastPage: json.last_page,
            currentPage: json.current_page,
            perPage: json.per_page
        };
    };
    ProjectListComponent.prototype.fetch = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var page = params.page || this.listConfig.page;
        var sort = params.sort || this.listConfig.sort;
        this.projectService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
            .subscribe(function (json) { return _this.parseList(json); });
    };
    ProjectListComponent.prototype.mapList = function (project) {
        return {
            id: project.id,
            title: project.title,
            subtitle: project.client.name,
            dates: {
                updated_at: project.updated_at,
                created_at: project.created_at
            }
        };
    };
    ProjectListComponent.prototype.add = function () {
        this.router.navigate(['/projects', 'new']);
    };
    ProjectListComponent.prototype.edit = function (project) {
        this.router.navigate(['/projects', project.id]);
    };
    ProjectListComponent.prototype.destroy = function (project) {
        var _this = this;
        console.log('delete this item: ', project);
        if (this.modalSub) {
            this.modalSub.unsubscribe();
        }
        var title = project.title;
        this.modalSub = this.modal.open({ message: 'Discard project?', okText: 'Discard' })
            .subscribe(function (action) {
            if (action.type === 'ok') {
                console.log('lets kill this project!', project);
                _this.projectService.destroy(project.id)
                    .subscribe(function (res) {
                    _this.toaster.pop('success', 'Success!', title + ' has been obliterated.');
                    setTimeout(function () { _this.fetch(); }, 0);
                });
            }
            return;
        });
    };
    ProjectListComponent.prototype.onPageChange = function (num) {
        this.listConfig.page.currentPage = num;
        this.fetch();
    };
    ProjectListComponent.prototype.ngOnDestroy = function () {
        if (this.sub)
            this.sub.unsubscribe();
        if (this.modalSub)
            this.modalSub.unsubscribe();
    };
    ProjectListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-project-list',
            templateUrl: './project-list.component.html',
            styleUrls: ['./project-list.component.css'],
            directives: [
                index_1.ListComponent
            ]
        }), 
        __metadata('design:paramtypes', [index_1.ProjectService, router_1.Router, index_1.JpaModal, angular2_toaster_1.ToasterService])
    ], ProjectListComponent);
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;

//# sourceMappingURL=project-list.component.js.map