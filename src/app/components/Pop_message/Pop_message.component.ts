import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'Pop_message',
    templateUrl: './Pop_message.component.html',
    styleUrls: ['./Pop_message.component.css']

})
export class Pop_messageComponent  {

    @Input() _msg: string="";
    @Input() _ok_msg: string = "Continue";
    @Input() _not_ok_msg: string = "Got it!";
    @Input() _isShow: boolean = false;
    @Input() _target: string="";
    @Input() _routeParam: string="";
    @Input() _backOn_not_ok_btn: boolean = false;
    @Input() _LinkOrImage: boolean = false;
    @Output() _LinkOrImageEvent = new EventEmitter<string>();

    constructor(private router: Router, private _location: Location) {
    }

    public tooglePop() {
        this._isShow = !this._isShow;
        if (this._backOn_not_ok_btn) {
            this._location.back();
        }
    }

    public SetAndShow(msg: string, okBtn: string, notOkBtn: string, target: string) {
        this._msg = msg;
        this._ok_msg = okBtn;
        this._not_ok_msg = notOkBtn;
        this._target = target;

        this._isShow = true;
    }

    public LoginPop() {
        this.SetAndShow('This operation is for signed users only. You can choose to Login and be a part of HiLetsBuy community', 'Login', 'Cancel', '/Signin');
    }

    public BlogPop(id:string) {
        this._msg = 'Blog not found';
        this._ok_msg = 'Go To Chat';
        this._target = 'Chat_speciality';
        this._routeParam = id;
        this._not_ok_msg = 'Back';
        this._backOn_not_ok_btn = true;

        this._isShow = true;
    }

    public Action() {
        if (this._target && this._target.length > 0) {
            if (this._routeParam && this._routeParam.length > 0) {
                this.router.navigate([this._target, this._routeParam])
            }
            else {
                this.router.navigate([this._target])
            }
        }
    }

    BtnClick(action: string) {
        this._LinkOrImageEvent.emit(action);
    }
    Exit()
    {
        this._isShow = false;
    }
   
}
