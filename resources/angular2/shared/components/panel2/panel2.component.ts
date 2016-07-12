import {
    Component,
    ContentChild,
    AfterContentInit,
    AfterViewInit,
    HostBinding,
    Output,
    EventEmitter,
    ElementRef
} from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';
import { PanelContentComponent } from './content/index';
import { PanelBarComponent } from './bar/index';

export interface PanelToggle {
    onToggle: EventEmitter<boolean>;
}

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2',
    templateUrl: './panel2.component.html',
    styleUrls: ['./panel2.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        PanelContentComponent,
        // FILE_UPLOAD_DIRECTIVES,
        // MD_GRID_LIST_DIRECTIVES
    ]
})
export class PanelComponent implements AfterViewInit, PanelToggle {
    private _expanded: boolean = false;

    @HostBinding('class.expanded') private get expandedClass() { return this.expanded; }
    @HostBinding('class.jpa-panel') private get jpapanelClass() { return true; }

    @ContentChild(PanelContentComponent) content : PanelContentComponent;
    @ContentChild(PanelBarComponent) bar : PanelBarComponent;

    @Output() onToggle = new EventEmitter<boolean>();

    constructor(public el: ElementRef) { }

    get expanded() { return this._expanded; }
    set expanded(v: boolean) {
        this._expanded = v;
        this.content.hidden = !v;
    }
    ngAfterContentInit() {
        this.bar.onToggle.subscribe(e => {

            console.log('Panel2Component saw its bar toggle', e);

            this.expanded = !this.expanded;
            this.onToggle.emit(this.expanded);
        });
    }
    ngAfterViewInit() {
        console.log('Panel2Component View Initialized', this);
    }
}