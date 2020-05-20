import { Component } from '@angular/core';
import { LanguageService, UserProfileService } from '../../serivces/index';
import * as $ from 'jquery'
@Component({
    selector: 'Major',
    templateUrl: './Major.component.html',
    styleUrls: ['./Major.component.css'],
})
export class MajorComponent {


    //#region Text fileds
        public __major_title: string ="";
        public __major_subtitle: string ="";
        public __find_specialist_btn_maintxt: string ="";
        public __find_specialist_btn_secdtxt: string ="";
        public __find_product_main_btn_secdtxt: string ="";
        public __find_product_btn_maintxt: string ="";
        public __find_product_btn_secdtxt: string ="";
        public __whosup_btn_maintxt: string ="";
        public __whosup_btn_secdtxt: string ="";
        public __best_blogs_btn_maintxt: string ="";
        public __best_blogs_btn_secdtxt: string ="";
        public __links_btn_maintxt: string ="";
        public __links_btn_secdtxt: string ="";
        public __blogs_btn_maintxt: string ="";
        public __blogs_btn_secdtxt: string ="";
    //#endregion

        moreOptions: boolean=false;
        mainImage: string ="";
        intervalIndex: number;
        intervalIndex2: number;
        isSpec: boolean=false;
        isGuest: boolean = true;
        isBlockedAdviser: boolean = true;
        username: string = "";
        chatTextoptions = [
            "I  would be happy to help you",
            "This will be great for you",
            "Is that what you wanted?",
            "Hi, let's find you a product",
            "I'll gladly help you",
            "I'll send you a link right away",
            "It would look awesome on you",
            "!I specialize in just that",
            "Note this link and respond",
            "Let's find something suitable together"];

    constructor() {
        this.InitText();
        this.intervalIndex = 1;
        this.intervalIndex2 = 0;

        var userProfile = UserProfileService.GetUserProfile();
        this.username = userProfile.isGuest ? "Guest" : userProfile.friendlyName;
        this.isGuest = userProfile ? userProfile.isGuest : true;
        if (!this.isGuest) {
            this.isSpec = userProfile ? (userProfile.isSpec) : false;
            this.isBlockedAdviser = userProfile ? (userProfile.blockedAdviser) : false;
        }
        
        if (this.isBrowser()) {
            setInterval(() => { this.intervalIndex = this.intervalIndex + 1 }, 5000);
            setInterval(() => { this.intervalIndex2 = this.intervalIndex2 + 1 }, 2500);
        }
    }

    InitText() {
        this.__major_title = LanguageService.GetValue("major_title");
        this.__major_subtitle = LanguageService.GetValue("major_subtitle");
        this.__find_specialist_btn_maintxt = LanguageService.GetValue("find_specialist_btn_maintxt");
        this.__find_specialist_btn_secdtxt = LanguageService.GetValue("find_specialist_btn_secdtxt");
        this.__find_product_btn_maintxt = LanguageService.GetValue("find_product_btn_maintxt");
        this.__find_product_btn_secdtxt = LanguageService.GetValue("find_product_btn_secdtxt");
        this.__whosup_btn_maintxt = LanguageService.GetValue("whosup_btn_maintxt");
        this.__whosup_btn_secdtxt = LanguageService.GetValue("whosup_btn_secdtxt");
        this.__best_blogs_btn_maintxt = LanguageService.GetValue("best_blogs_btn_maintxt");
        this.__best_blogs_btn_secdtxt = LanguageService.GetValue("best_blogs_btn_secdtxt");
        this.__links_btn_maintxt = LanguageService.GetValue("links_btn_maintxt");
        this.__links_btn_secdtxt = LanguageService.GetValue("links_btn_secdtxt");
        this.__blogs_btn_maintxt = LanguageService.GetValue("blogs_btn_maintxt");
        this.__blogs_btn_secdtxt = LanguageService.GetValue("blogs_btn_secdtxt");
        this.__find_product_main_btn_secdtxt = LanguageService.GetValue("find_specialist_main_btn_maintxt");
    }


    MainImageClass(): string {
        return "main_image main_image" + ((this.intervalIndex % 10) + 1).toString()
    }


    private isBrowser() {
        try {
            if (localStorage != null) {
                return true;
            }
        } catch (e) {

        }
        return false;
    }
}