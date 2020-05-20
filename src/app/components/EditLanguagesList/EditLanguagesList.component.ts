import { Component, Output, EventEmitter } from '@angular/core';
import { Language } from "../../entities/category";
import { LanguageService, ResourcesService } from "../../serivces/index";

@Component({
    selector: 'EditLanguagesList',
    templateUrl: './EditLanguagesList.component.html',
    styleUrls: ['./EditLanguagesList.component.css']
})
export class EditLanguagesListComponent {
    
    public SelectableLanguages: Language[] = [];
    public __EditLanguagesList_title: string="";
    public __EditLanguagesList_btn: string = "";
    public __select: string = "";

    @Output() updateLanguages = new EventEmitter<Language[]>();

    constructor(resService: ResourcesService) {
        this.InitText();
        this.SelectableLanguages = resService.GetLangs()
    }
    update(exit: boolean) {
        var languages: Language[] = [];
        if (!exit) {
            for (var i = 0; i < this.SelectableLanguages.length; i++) {
                if (this.SelectableLanguages[i].chacked) {
                    languages.push(this.SelectableLanguages[i]);
                }
            }
        }
        this.updateLanguages.emit(languages);
    }

    InitText() {
        this.__EditLanguagesList_title = LanguageService.GetValue("EditLanguagesList_title");
        this.__EditLanguagesList_btn = LanguageService.GetValue("EditLanguagesList_btn");
        this.__select = LanguageService.GetValue("select");
    }
}

