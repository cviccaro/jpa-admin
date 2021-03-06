/**
 * Aggregate angular2-material into arrays
 * --
 *
 * Created with angular2-material 2.0.0-alpha6
 */
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox/checkbox';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list/grid-list';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar/progress-bar';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle/progress-circle';
import {MD_RADIO_DIRECTIVES, MdUniqueSelectionDispatcher} from '@angular2-material/radio/radio';
import {MD_SLIDE_TOGGLE_DIRECTIVES} from '@angular2-material/slide-toggle/slide-toggle';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav/sidenav';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs/tabs';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar/toolbar';

export const MATERIAL_DIRECTIVES = [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
    MD_SLIDE_TOGGLE_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_TABS_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES
];

export const MATERIAL_PROVIDERS = [
    MdIconRegistry,
    MdUniqueSelectionDispatcher
];
