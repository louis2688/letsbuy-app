import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Language, SelectableDictionary, Dictionary } from "../../entities/category";
import { LanguageService } from "../../serivces/LangManager";

@Component({
    selector: 'SelectMultiValue',
    templateUrl: './SelectMultiValue.component.html',
    styleUrls: ['./SelectMultiValue.component.css']
})
export class SelectMultiValueComponent {
    
    public itemList: Dictionary[]=[];
    public selectableList: SelectableDictionary[] = [];
    public __EditLanguagesList_title: string="";
    public __EditLanguagesList_btn: string = "";
    public __select: string = "";

    @Output() exit = new EventEmitter<Dictionary[]>();

    constructor() {
        this.InitText();
        this.selectableList.push(new SelectableDictionary("1", "Folder 1 "));
        this.selectableList.push(new SelectableDictionary("2", "Folder 2 "));
        this.selectableList.push(new SelectableDictionary("3", "Folder 3 "));
        this.selectableList.push(new SelectableDictionary("4", "Folder 4 "));
        this.selectableList.push(new SelectableDictionary("5", "Folder 5 "));
        this.selectableList.push(new SelectableDictionary("6", "Folder 6 "));
        this.selectableList.push(new SelectableDictionary("7", "Folder 7 "));
        this.selectableList.push(new SelectableDictionary("8", "Folder 8 "));
    }

    update(exit: boolean) {
        if (!exit) {
            for (var i = 0; i < this.selectableList.length; i++) {
                if (this.selectableList[i].selected) {
                    this.itemList.push(this.selectableList[i]);
                }
            }
        }
        this.exit.emit(this.itemList);
    }

    InitText() {
        this.__EditLanguagesList_title = LanguageService.GetValue("EditLanguagesList_title");
        this.__EditLanguagesList_btn = LanguageService.GetValue("EditLanguagesList_btn");
        this.__select = LanguageService.GetValue("select");
    }
}

