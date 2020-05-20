import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { LanguageService } from '../../serivces/index';
import { ToastComponent } from "../Toast/Toast.component";

@Component({
    selector: 'Right_menu',
    templateUrl: './Right_menu.component.html',
    styleUrls: ['./Right_menu.component.css']

})
export class Right_menuComponent {
    public __right_menu_title: string="";
    public __right_menu_btn1: string="";
    public __right_menu_btn2: string="";
    public __right_menu_btn3: string="";

    @Input() NavigateToPostID: string = "-1";

    public isOpen: boolean = false;
    @ViewChild(ToastComponent) childcmp!: ToastComponent;
    public uplode_msg: boolean = false;

    constructor() {
        this.InitText();
    }
    InitText() {
        this.__right_menu_title = LanguageService.GetValue("right_menu_title");
       this.__right_menu_btn1 = LanguageService.GetValue("right_menu_btn1");
       this.__right_menu_btn2 = LanguageService.GetValue("right_menu_btn2");
       this.__right_menu_btn3 = LanguageService.GetValue("right_menu_btn3");
    }

    UplodeToast() {
        this.childcmp.ToggleToast("The post was pinned.");
    }
    UplodeMsg() {
        this.uplode_msg = !this.uplode_msg;
    }
    public toogleMenu() {
        this.isOpen = !this.isOpen;
    }
}
