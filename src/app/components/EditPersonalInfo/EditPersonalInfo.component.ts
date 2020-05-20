import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from "../../entities/user";
import { ResourcesService } from "../../serivces/ResourcesService";
import { Location, Language, Dictionary,RegisterUserData } from "../../entities/index";
import { LanguageService, UserProfileService } from "../../serivces";

@Component({
    selector: 'EditPersonalInfo',
    templateUrl: './EditPersonalInfo.component.html',
    styleUrls: ['./EditPersonalInfo.component.css'],
    providers: [ResourcesService, UserProfileService]
})
export class EditPersonalInfoComponent {
    @Input() currentUser: User = new User();
    @Output() openClosePopupEvent = new EventEmitter();

    public EditLanguagesList: boolean=false;
    public locations: Location[] = [];
    public locationsDic: Dictionary[] = [];

    public popResetPass: boolean =false;

    public __edit: string="";
    public __f_name: string = "";
    public __l_name: string = "";
    public __birth_day: string = "";
    public __save: string = "";
    public __cancel: string = "";
    public __remove: string = "";
    public __add_lang: string = "";
    public __state_: string = "";
    public __reset_pass: string = "";


    constructor(private resService: ResourcesService, private userService: UserProfileService) {
        this.locations = resService.GetLocations();
        var dicItems: Dictionary[] = [];
        this.locations.forEach(function (obj, i) {
            var dic = new Dictionary(obj.ID.toString(), obj.Name);
            dicItems.push(dic);
        })
        this.locationsDic = dicItems;
        this.InitText();
    }

    public personalInfo_EditMode: boolean = false;

    TogglePersonalInfo_EditMode() {
        this.personalInfo_EditMode = !this.personalInfo_EditMode;
    }

    public updateBaseData() {
        var model = new RegisterUserData();
        model.Bithday = this.currentUser.birthday;
        model.Email = this.currentUser.email;
        model.Nickname = this.currentUser.nickname;
        model.FirstName = this.currentUser.fname;
        model.LastName = this.currentUser.lname;
        model.LocationID = this.currentUser.location;

        this.userService.PostUserData(model)
            .then(res => {
                if (res.isOk) {
                    this.TogglePersonalInfo_EditMode();
                }
            })
    }


    AddLang() {
        this.EditLanguagesList = true;
        this.openClosePopupEvent.emit();
    }

    RemoveLang(i: number) {
        this.currentUser.languagesList.splice(i, 1);
        this.updateLangOnServer();
    }
    updateLanguages(langs: Language[]) {
        this.openClosePopupEvent.emit();
        this.EditLanguagesList = false;
        if (langs.length != 0) {
            var newItems = this.currentUser.languagesList;
            this.currentUser.languagesList.concat(langs).forEach(function (obj) {
                if (newItems.find(x => x.ID == obj.ID) == null) {
                    newItems.push(obj);
                }
            })
            this.currentUser.languagesList = newItems;
            
            this.updateLangOnServer();
        }
        
    }

    updateLangOnServer() {
        var items: number[] = [];
        this.currentUser.languagesList.forEach(function (obj, i) {
            items.push(obj.ID);
        })

        this.userService.PostUserLangs(items);
    }

    ResetPassword() {
        this.popResetPass = true;
    }

    ChooseLocation(item: Dictionary) {
        if (item.key != '-1') {
            this.currentUser.location = Number(item.key);
        }
        this.openClosePopupEvent.emit();
    }

    public SetBitdayValue(value: string) {
        try {
            var day = Number(value.substring(8, 10));
            var month = Number(value.substring(5, 7)) - 1;
            var year = Number(value.substring(0, 4));

            var newDate = new Date();
            newDate.setFullYear(year);
            newDate.setMonth(month);
            newDate.setDate(day);

            this.currentUser.birthday = newDate;
        }
        catch (ex) {
        }
    }

    InitText() {
        this.__edit = LanguageService.GetValue("edit");
        this.__f_name = LanguageService.GetValue("f_name");
        this.__l_name = LanguageService.GetValue("l_name");
        this.__birth_day = LanguageService.GetValue("birth_day");
        this.__save = LanguageService.GetValue("save");
        this.__cancel = LanguageService.GetValue("cancel");
        this.__remove = LanguageService.GetValue("remove");
        this.__add_lang = LanguageService.GetValue("add_lang");
        this.__state_ = LanguageService.GetValue("state_");
        this.__reset_pass = LanguageService.GetValue("reset_pass");
    }
}
