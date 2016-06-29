import { Component, AfterViewInit, AfterContentInit, ContentChildren, QueryList, HostBinding } from '@angular/core';

import { JpaPanel } from '../index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-group',
    template: '<ng-content></ng-content>',
    styleUrls: ['./panel-group.component.css'],
    directives: [JpaPanel]
})
export class JpaPanelGroup implements AfterViewInit, AfterContentInit {
    @HostBinding('class.child-expanded') get expandedClass() { return this.childExpanded; }

    childExpanded: boolean = false;

    /**
     * Content directives.
     */
    @ContentChildren(JpaPanel) private _panelChildren : QueryList<JpaPanel>;

    /**
     * Implementing AfterContentInit
     */
    ngAfterContentInit() {
        //console.log('Subscribing to ' + this._panelChildren.length + ' panel changes. ');
        // this._panelChildren.changes.subscribe(panel => {
        //     console.log('panel change! ', panel);
        // });
        this._panelChildren.forEach(panel => {
            //console.log('Subscribing to onExpand for this panel', panel);
            panel.onExpand.subscribe(e => {
                //console.log('expand event: ', e);
                this.childExpanded = e;
            });
        })
    }

    /**
     * Implementing AFterViewInit
     */
    ngAfterViewInit() {
        //console.log('JpaPanelGroup#afterViewInit', this);
    }
}