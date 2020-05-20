import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'Mail_Delay',
    templateUrl: './Mail_Delay.component.html',
    styleUrls: ['./Mail_Delay.component.css'],
})
export class Mail_DelayComponent  {


    @Input() _isShow: boolean = false;

    constructor(private router: Router) {
    }

    public tooglePop() {
        this._isShow = !this._isShow;
    }

}
