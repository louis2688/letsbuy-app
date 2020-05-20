import { Component, Input } from '@angular/core';

@Component({
    selector: 'Toast',
    templateUrl: './Toast.component.html',
    styleUrls: ['./Toast.component.css']

})

export class ToastComponent  {
    isDisplay: boolean = false;
    timeoutID;

    @Input() content: string="";

    ToggleToast(_content: string, time: number = 5000) {
        clearTimeout(this.timeoutID);
        this.isDisplay = true;
        this.content = _content;
        this.timeoutID = setTimeout(() => { this.isDisplay = false; }, time);
    }
    constructor() {
    }
}
