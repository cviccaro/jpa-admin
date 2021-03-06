import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import { CalendarPipe, FromUnixPipe } from 'angular2-moment/index';
import { MetadataService, LoggerService } from '../shared/services/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [ MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES ],
    pipes: [ FromUnixPipe, CalendarPipe ]
})
export class HomeComponent {
    blog_data: { [key: string] : any };
    client_data: { [key: string] : any } = {};
    division_data: { [key: string] : any } = {};
    project_data: { [key: string] : any } = {};

    constructor(
        private metaService: MetadataService,
        private log: LoggerService
    ) {
        this.metaService.get('blogs').subscribe(res => this.blog_data = res);
        this.metaService.get('projects').subscribe(res => this.project_data = res);
        this.metaService.get('clients').subscribe(res => this.client_data= res);
        this.metaService.get('divisions').subscribe(res => this.division_data= res);
    }

    ngOnInit() {
        this.log.debug('HomeComponent Initialized', this);
    }
}
