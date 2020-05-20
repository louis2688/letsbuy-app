import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Dictionary } from "../../entities/category";
import { LanguageService } from "../../serivces/LangManager";


@Component({
    selector: 'Select_cmp',
    templateUrl: './Select_cmp.component.html',
    styleUrls: ['./Select_cmp.component.css']

})

export class Select_cmpComponent implements AfterContentInit {


    @Input() items: Dictionary[] = [];
    @Input() selectedItemstring = "";
    @Input() selectedObject: Dictionary | null;
    @Input() selectedKey:string="";
    @Input() innerPadding:string="";
    @Input() title: string = "Choose Your Option";
    @Input() bg_white: boolean = false;
    @Output() openClosePopupEvent = new EventEmitter<Dictionary>();

    
    public isOpen: boolean = false;
      

    constructor() {
        this.InitText();

    }

    ngAfterContentInit(): void {
        var _key = this.selectedKey;
        var _obj = this.selectedObject;
        this.items.forEach(function (obj, i) {
            if (obj.key == _key) {
                _obj = obj;
            }
        })
        this.selectedObject = _obj;
    }

    Choose(item: Dictionary, exit: boolean) {
        if (exit) {
            this.click();
        }
        else {
            this.click(item);
            this.selectedObject = item;
        }
    }

    public click(item: Dictionary = new Dictionary("-1","")) {
        this.isOpen = !this.isOpen;
        this.openClosePopupEvent.emit(item);
    }

    Clear() {
        var item: Dictionary = new Dictionary("clear", "");
        this.isOpen = !this.isOpen;
        this.selectedObject = null;
        this.openClosePopupEvent.emit(item);
    }

    public __select: string = "";
    InitText() {
        this.__select = LanguageService.GetValue("select");
    }
}
