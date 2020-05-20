import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, AuthenticationService, UserProfileService, ResourcesService  } from '../../serivces/index';
import * as $ from 'jquery';
import { User } from "../../entities/user";
import { SelectableCategory, Language } from "../../entities/category";
import { LocalStorage } from "../../serivces/LocalStorage";

@Component({
    selector: 'Hi_info',
    templateUrl: './Hi_info.component.html',
    styleUrls: ['./Hi_info.component.css'],
    providers: [UserProfileService, LocalStorage]
})

export class Hi_infoComponent  {

    @ViewChild('imageProfileUpload') fileInput!: ElementRef;

    public currentUser: User;
    public loadingPicture: boolean = false;
    public state: string = "";

    public EditPersonalInfo: boolean = false;
    public EditAccountInfo: boolean = false;
    public EditSpecialistCategories: boolean = false;

    public moreSpec: boolean = false;
    //#region  Text strings
    public __hi_info_title: string = "";
    public __specialist_in: string = "";
    public __show_more: string = "";
    public __left_tab_title: string = "";
    public __right_tab_title: string = "";
    public __hi_chats: string = "";
    public __buyer_links: string = "";
    public __my_wishes: string = "";
    public __my_buys: string = "";
    public __sys_note: string = "";
    public __new: string = "";
    public __my_sells: string = "";
    public __specialist_links: string = "";
    public __blog_options: string = "";
    public __help_title: string = "";
    public __faq_btn: string = "";
    public __customer_service_btn: string = "";
    public __about_btn: string = "";
    public __terms_btn: string = "";
    public __contact_btn: string = "";
    public __setting_title: string = "";
    public __personal_info_btn_maintxt: string = "";
    public __personal_info_btn_secdtxt: string = "";
    public __specialist_info_btn_maintxt: string = "";
    public __specialist_info_btn_secdtxt: string = "";
    public __accountAndBilling_btn_maintxt: string = "";
    public __accountAndBilling_btn_secdtxt: string = "";
    public __alertsAndNotifications_btn_maintxt: string = "";
    public __alertsAndNotifications_btn_secdtxt: string = "";
    public __log_out_btn_maintxt: string = "";
    public __log_out_btn_secdtxt: string = "";
    //#endregion

    constructor(
        private router: Router,
        inrouter: ActivatedRoute,
        private userService: UserProfileService )
    {
        var _stat = inrouter.snapshot.params['stat'];
        this.state = _stat || "tabs" ;
        
        this.EditAccountInfo = false;
        this.EditPersonalInfo = false;
        this.EditSpecialistCategories = false;

        this.InitText();
        var localProfile = UserProfileService.GetUserProfile();
        this.currentUser = new User("", "", localProfile.friendlyName, localProfile.imageUrl, new Date(), [], 0, 0, 0, 0, []);
        this.userService.GetUserSettings()
            .then(res => {
                if (res.isOk) {
                    this.currentUser = res.Singel;
                }
            })
    }

    Nickname(){
        var fullname = this.currentUser.fname + " " + this.currentUser.lname;
        if(this.currentUser.nickname && fullname != this.currentUser.nickname){ 
            return this.currentUser.nickname;
        }
        return "";
    }
    public openEditPersonalInfo() {
        this.EditPersonalInfo = !this.EditPersonalInfo;
    }
    public openEditAccountInfo() {
        this.EditAccountInfo = !this.EditAccountInfo;
    }
    public openEditSpecialistCategories(data: SelectableCategory[]) {
        this.currentUser.specialitiesList = data;
        this.toggleFixedCssToMainContainer();
        this.EditSpecialistCategories = !this.EditSpecialistCategories;
    }


    Logout() {
        AuthenticationService.ClearToken();
        UserProfileService.ResetProfile();
        LocalStorage.removeAllItems();
        this.router.navigate(['Opening']);
    }

    public toggleFixedCssToMainContainer() {
        var pos = $('.main_container').css('position');
        if (pos == 'fixed') {
            $('.main_container').css('position', 'relative');
        }
        else {
            $('.main_container').css('position', 'fixed');
        }
    }

    public SetState(val: string) {
        if (this.state == val) {
            this.state = "tabs";
        }
        else {
            this.state = val;
        }
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

    GetUserCategories() {
        return this.currentUser.specialitiesList;
    }


    public SelectImageDialog() {
        this.fileInput.nativeElement.click();
    }

    public async SelectImage() {
        this.loadingPicture = true;
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('files', fileBrowser.files[0]);
            var result = await this.userService.UploadProfileImage(formData);
            if (result.isOk) {
                this.currentUser.picture = result.Singel;
            }
        }
        this.loadingPicture = false;
    }

    ToggleSpecialities() {
        if (this.moreSpec) {
            this.__show_more = LanguageService.GetValue("show_more");
        }
        else {
            this.__show_more = LanguageService.GetValue("show_less");
        }
        this.moreSpec = !this.moreSpec;
    }

    InitText() {
        this.__hi_info_title = LanguageService.GetValue("hi_info_title");
        this.__specialist_in = LanguageService.GetValue("specialist_in");
        this.__show_more = LanguageService.GetValue("show_more");
        this.__left_tab_title = LanguageService.GetValue("left_tab_title");
        this.__right_tab_title = LanguageService.GetValue("right_tab_title");
        this.__hi_chats = LanguageService.GetValue("hi_chats");
        this.__buyer_links = LanguageService.GetValue("buyer_links");
        this.__my_wishes = LanguageService.GetValue("my_wishes");
        this.__my_buys = LanguageService.GetValue("my_buys");
        this.__sys_note = LanguageService.GetValue("sys_note");
        this.__new = LanguageService.GetValue("new");
        this.__my_sells = LanguageService.GetValue("my_sells");
        this.__specialist_links = LanguageService.GetValue("specialist_links");
        this.__blog_options = LanguageService.GetValue("blog_options");
        this.__help_title = LanguageService.GetValue("help_title");
        this.__faq_btn = LanguageService.GetValue("faq_btn");
        this.__customer_service_btn = LanguageService.GetValue("customer_service_btn");
        this.__about_btn = LanguageService.GetValue("about_btn");
        this.__terms_btn = LanguageService.GetValue("terms_btn");
        this.__contact_btn = LanguageService.GetValue("contact_btn");
        this.__setting_title = LanguageService.GetValue("setting_title");
        this.__personal_info_btn_maintxt = LanguageService.GetValue("personal_info_btn_maintxt");
        this.__personal_info_btn_secdtxt = LanguageService.GetValue("personal_info_btn_secdtxt");
        this.__specialist_info_btn_maintxt = LanguageService.GetValue("specialist_info_btn_maintxt");
        this.__specialist_info_btn_secdtxt = LanguageService.GetValue("specialist_info_btn_secdtxt");
        this.__accountAndBilling_btn_maintxt = LanguageService.GetValue("accountAndBilling_btn_maintxt");
        this.__accountAndBilling_btn_secdtxt = LanguageService.GetValue("accountAndBilling_btn_secdtxt");
        this.__alertsAndNotifications_btn_maintxt = LanguageService.GetValue("alertsAndNotifications_btn_maintxt");
        this.__alertsAndNotifications_btn_secdtxt = LanguageService.GetValue("alertsAndNotifications_btn_secdtxt");
        this.__log_out_btn_maintxt = LanguageService.GetValue("log_out_btn_maintxt");
        this.__log_out_btn_secdtxt = LanguageService.GetValue("log_out_btn_secdtxt");
    }
}
