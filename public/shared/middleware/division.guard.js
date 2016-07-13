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
var index_1 = require('../services/index');
var Rx_1 = require('rxjs/Rx');
var DivisionGuard = (function () {
    function DivisionGuard(router, service, cache) {
        this.router = router;
        this.service = service;
        this.cache = cache;
    }
    DivisionGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            console.log(_this.router.routerState.snapshot);
            observer.complete(false);
        });
    };
    DivisionGuard.prototype.ngOnDestroy = function () {
        if (this.routeParamsSub)
            this.routeParamsSub.unsubscribe();
        if (this.modelSub)
            this.modelSub.unsubscribe();
    };
    DivisionGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, index_1.DivisionService, index_1.CacheService])
    ], DivisionGuard);
    return DivisionGuard;
}());
exports.DivisionGuard = DivisionGuard;

//# sourceMappingURL=division.guard.js.map
