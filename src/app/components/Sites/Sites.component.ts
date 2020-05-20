import { Component } from '@angular/core';
import { LanguageService, ResourcesService, UserProfileService } from '../../serivces/index';
import { Site } from "../../entities/site";
import { LocalStorage } from "../../serivces/LocalStorage";
import { ShaerdStrings } from "../../serivces/ShaerdStrings";

@Component({
    selector: 'Sites',
    templateUrl: './Sites.component.html',
    styleUrls: ['./Sites.component.css'],
    providers: [ResourcesService]
})

export class SitesComponent {
    public Items: Site[] = [];

    public filter: string="";
    public mobilemode: boolean = false;
    public sortOption: string = "Alphabetically";
    public alphabeticallyDown: boolean = true;
    public categoryDown: boolean = false;

    public __sites_title: string="";
    public __sites_subtitle: string="";
    public __lookfor_site: string="";
    public __sort_ab: string="";
    public __sort_category: string="";
    public __go2site: string="";

    public isGuest: boolean = false;

    constructor(resService: ResourcesService) {
        this.InitText();
        resService.GetSites().then(x => this.Items = x.List);

        var mobile = LocalStorage.GetString(ShaerdStrings.keys_platform);
        this.mobilemode =  mobile != "";

        this.isGuest = UserProfileService.GetUserProfile().isGuest;
    }
    public GetDynamicLinkData(data: string): string {

        var url = encodeURI(data);

        var hybridUrl = 'hybrid:openlink?url=' + url;

        return hybridUrl;
    }
    InitText() {
        this.__sites_title = LanguageService.GetValue("sites_title");
        this.__sites_subtitle = LanguageService.GetValue("sites_subtitle");
        this.__lookfor_site = LanguageService.GetValue("lookfor_site");
        this.__sort_ab = LanguageService.GetValue("sort_ab");
        this.__sort_category = LanguageService.GetValue("sort_category");
        this.__go2site = LanguageService.GetValue("go2site");
    }

    sort(tab: string) {
        if (tab == "Alphabetically") {
            this.alphabeticallyDown = !this.alphabeticallyDown
        }
        else {
            this.categoryDown = !this.categoryDown;
        }
        this.sortOption = tab;
    }

}


