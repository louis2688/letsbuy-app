import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from "../../serivces/LocalStorage";
import { ShaerdStrings } from "../../serivces/ShaerdStrings";

@Component({
    selector: 'Pop_share',
    templateUrl: './Pop_share.component.html',
    styleUrls: ['./Pop_share.component.css']

})
export class Pop_shareComponent  {

    public _isShow: boolean = false;
    public _msg: string="";
    public mobilemode: boolean = false;

    constructor(private router: Router) {
        this._msg = "Sharing is Caring";
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";
    }

    public exit() {
        this._isShow = false;
    }
    public open() {
        this._isShow = true;
    }
}
