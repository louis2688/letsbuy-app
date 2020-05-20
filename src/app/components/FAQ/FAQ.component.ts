import { Component } from '@angular/core';
import { LanguageService, ResourcesService } from '../../serivces/index';
import { Question } from "../../entities/faq";


@Component({
    selector: 'FAQ',
    templateUrl: './FAQ.component.html',
    styleUrls: ['./FAQ.component.css'],
    providers: [ResourcesService]
})
export class FAQComponent {
    public items: Question[];
    public filter: string = ""; //initilize to the value in tab 1.

    public __faq_title: string = "";
    public __faq_subtitle: string = "";
    public __tab1: string = "";
    public __tab2: string = "";
    public __tab3: string = "";
    public __footer_txt: string = "";
    public __footer_btn: string = "";


    constructor(resService: ResourcesService) {
        this.InitText();
        this.items = [];
        resService.GetFaq().then(res => { this.items = res.List })
    }

    ChangeTab(tab: string) {
        this.filter = tab;
    }
    InitText() {
        this.__faq_title = LanguageService.GetValue("faq_title");
        this.__faq_subtitle = LanguageService.GetValue("faq_subtitle");
        this.__tab1 = LanguageService.GetValue("tab1");
        this.__tab2 = LanguageService.GetValue("tab2");
        this.__tab3 = LanguageService.GetValue("tab3");
        this.__footer_txt = LanguageService.GetValue("footer_txt");
        this.__footer_btn = LanguageService.GetValue("footer_btn");

        this.filter = LanguageService.GetValue("tab1");
    }

    click(item: Question) {
        item.isOpen = !item.isOpen;
    }
}



