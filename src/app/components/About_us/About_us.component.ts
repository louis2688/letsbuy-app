import { Component } from '@angular/core';
import { LanguageService } from '../../serivces/index';

@Component({
    selector: 'About_us',
    templateUrl: './About_us.component.html',
    styleUrls: ['./About_us.component.css']
})
export class About_usComponent {
    public __about_title: string = "";
    public __about_subtitle: string = "";
    public __sites: string = "";
    public __tou: string = "";
    public __contact: string = "";

    constructor() {
        this.InitText();
    }

    InitText() {
        this.__about_title = LanguageService.GetValue("about_title");
        this.__about_subtitle = LanguageService.GetValue("about_subtitle");
        this.__sites = LanguageService.GetValue("sites");
        this.__tou = LanguageService.GetValue("tou");
        this.__contact = LanguageService.GetValue("contact");
    }
}
