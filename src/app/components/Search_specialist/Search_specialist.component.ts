import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectableCategory, Query, Language, Location, QueryResult } from '../../entities/index';
import { ResourcesService, QueryService, LanguageService, UserProfileService } from '../../serivces/index';
import { Dictionary } from "../../entities/category";
import * as $ from 'jquery';
import { Select_cmpComponent } from '../Select_cmp/Select_cmp.component';
import { ToastComponent } from '../Toast/Toast.component';
import { Pop_messageComponent } from '../Pop_message/Pop_message.component';

@Component({
    selector: 'Search_specialist',
    templateUrl: './Search_specialist.component.html',
    styleUrls: ['./Search_specialist.component.css'],
    providers: [ResourcesService, QueryService]
})
export class Search_specialistComponent implements AfterViewInit {
    public id: number;
    public result: QueryResult[] = [];
    public filter: string = "rate";
    public isGuest: boolean;
    @ViewChild(ToastComponent) childcmp!: ToastComponent;
    @ViewChild(Pop_messageComponent) popup!: Pop_messageComponent;



    @ViewChild('filterlist') _filterSelector: Select_cmpComponent;
    @ViewChild('sortlist') _sortSelector: Select_cmpComponent;
    @ViewChild('categotys') _catSelector: Select_cmpComponent;
    @ViewChild('counries') _counriesSelector: Select_cmpComponent;
    @ViewChild('langs') _langsSelector: Select_cmpComponent;


    public cagetories: SelectableCategory[] = [];
    public langs: Language[] = [];
    public locations: Location[] = [];

    public sortOpt: Dictionary[] = [];
    public cagetoriesDic: Dictionary[] = [];
    public counriesDic: Dictionary[] = [];
    public langsDic: Dictionary[] = [];
    public sortPlaceHolder: string = "";
    public filterPlaceHolder: string = "";
    public categoryPlaceHolder: string = "";
    public locationPlaceHolder: string = "";
    public langPlaceHolder: string = "";

    public selectedCategory: string = "";
    public selectedSubCategories: SelectableCategory[] = [];
    public moreOptions: boolean = false;
    public selectAllFlag: boolean = true;
    public _q: Query;

    //#region TextFields
    public __catagory: string = "";
    public __search_specialist_title: string = "";
    public __search_specialist_subtitle: string = "";
    public __sortlist: string = "";
    public __filterlist: string = "";
    public __catagory2buy: string = "";
    public __online: string = "";
    public __change: string = "";
    public __change_lang: string = "";
    public __change_loc: string = "";
    public __find_spec: string = "";
    public __history_btn: string = "";
    public __select_all: string = "";
    public __less_search_options: string = "";
    //#endregion
    interval: any;
    isLoading: boolean = false;

    constructor(
        private resService: ResourcesService,
        private qService: QueryService,
        private router: Router,
        private userService: UserProfileService,
        private nav: Router
    ) {


        this.selectedCategory = '0';
        this.moreOptions = false;
        this._q = new Query();

        this.InitText();
    }

    ngAfterViewInit(): void {
        this.UpdateSort();
        if (!this.cagetories || this.cagetories.length == 0) {
            this.resService.UpdateCategories().then(() => {
                this.cagetories = this.resService.GetCategories();
                this.UpdateCat();
            })
        }
        this.locations = this.resService.GetLocations();
        if (!this.locations || this.locations.length == 0) {
            this.resService.UpdateLocations().then(() => {
                this.locations = this.resService.GetLocations();
            })
        }

        this.langs = this.resService.GetLangs();
        if (!this.langs || this.langs.length == 0) {
            this.resService.UpdateLangs().then(() => {
                this.langs = this.resService.GetLangs();
            })
        }
    }

    UpdateSort() {
        this.sortOpt = [];
        this.sortOpt.push(new Dictionary("rate", "Rating"));
        this.sortOpt.push(new Dictionary("sales", "Sales"));
        this._sortSelector.items = this.sortOpt;
    }

    UpdateCat() {
        this.cagetoriesDic = [];
        for (var i = 0; i < this.cagetories.length; i++) {
            this.cagetoriesDic.push(new Dictionary(this.cagetories[i].id, this.cagetories[i].name));
        }
        if (this.cagetoriesDic.length > 0) {
            setTimeout(() => {
                var selectedCategory = localStorage.getItem('selectedCategory');
                console.log("back" + selectedCategory);
                if (selectedCategory != null) {
                    document.getElementById(selectedCategory).click();
                } else {
                    document.getElementById(this.cagetoriesDic[0].key).click();
                }
            }, 500);
        }
        this._catSelector.items = this.cagetoriesDic;
    }
    UpdateCon() {
        this.counriesDic = [];
        for (var i = 0; i < this.locations.length; i++) {
            this.counriesDic.push(new Dictionary(String(this.locations[i].ID), this.locations[i].Name));
        }
        this._counriesSelector.items = this.counriesDic;

    }
    UpdateLang() {
        for (var i = 0; i < this.langs.length; i++) {
            this.langsDic.push(new Dictionary(String(this.langs[i].ID), this.langs[i].DispalyName));
        }
        this._langsSelector.items = this.langsDic;
    }

    public CalcSubCategories(item: Dictionary) {
        this.toggleFixedCssToMainContainer();
        if (item.key != '-1') {
            if (item.key == 'clear') {
                this.selectedCategory = '0';
                this.categoryPlaceHolder = this.__catagory2buy;
                this.selectedSubCategories = [];
                return;
            }

            localStorage.setItem('selectedCategory', item.key);
            console.log(item.key);

            var lbls = document.getElementsByClassName('lblCategory');

            for (let i = 0; i < lbls.length; i++) {
                (<any>lbls[i]).style.fontWeight = "normal";
            }
            document.getElementById(item.key).style.fontWeight = "700";

            this.selectedCategory = item.key;
            this.categoryPlaceHolder = item.value;
            var _category = this.cagetories.find(x => x.ID == this.selectedCategory || x.id == this.selectedCategory);
            if (_category != null) {
                var result: SelectableCategory[] = [];
                _category.sub_categories.forEach((obj, i, items) => {
                    var newItem = new SelectableCategory();
                    newItem.ID = obj.id;
                    newItem.Name = obj.name;
                    newItem.chacked = false;

                    result.push(newItem);
                });
                this.selectedSubCategories = result;
            }
        }
        this.result = [];
        this.Search(false);
    }

    public ChoosenSpecLang(item: Dictionary) {
        this.toggleFixedCssToMainContainer();
        if (item.key != '-1') {
            if (item.key == 'clear') {
                this._q.langID = -1;
                this.langPlaceHolder = this.__change_lang;
                return;
            }
            this._q.langID = parseInt(item.key);
            this.langPlaceHolder = item.value;
        }
    }

    public ChoosenLocation(item: Dictionary) {
        this.toggleFixedCssToMainContainer();
        if (item.key != '-1') {
            if (item.key == 'clear') {
                this._q.locationID = -1;
                this.locationPlaceHolder = this.__change_loc;
                return;
            }
            this._q.locationID = parseInt(item.key);
            this.locationPlaceHolder = item.value;
        }
    }

    public SelectAllSubCat() {
        this.selectedSubCategories.forEach((obj, i, items) => {
            obj.chacked = this.selectAllFlag;
        })

        this.selectAllFlag = !this.selectAllFlag;
    }

    public MoreOptions() {
        this.moreOptions = !this.moreOptions;
        this.UpdateCon();
        this.UpdateLang();
    }

    public Search(toggle: boolean) {
        if (toggle) {
            $("#filterpopup").slideToggle('slow');
        }

        this._q.categories = [];
        this._q.categories.push(this.selectedCategory);
        this.selectedSubCategories.forEach((obj, i, items) => {
            if (obj.chacked) {
                this._q.categories.push(obj.ID);
            }
        });
        this.isLoading = true;
        this.qService.AddQuery(this._q)
            .then(res => {
                this.isLoading = false;
                if (res) {
                    if (res.isOk) {
                        //this.router.navigate(['Found_specialist', res.Singel]);
                        this.SearchSpecialist(res.Singel);
                    }
                }
            })
            .catch(() => {
                this.isLoading = false;
            });
    }

    public toggleFixedCssToMainContainer() {
        // var pos = $('.main_container').css('position');
        // if (pos == 'fixed') {
        //     $('.main_container').css('position', 'relative');
        // }
        // else {
        //     $('.main_container').css('position', 'fixed');
        // }
    }
    InitText() {
        //initilize text elements:
        this.__catagory = LanguageService.GetValue("catagory");
        this.__search_specialist_title = LanguageService.GetValue("search_specialist_title");
        this.__search_specialist_subtitle = LanguageService.GetValue("search_specialist_subtitle");
        this.__catagory2buy = LanguageService.GetValue("catagory2buy");
        this.__sortlist = "Sort"
        this.__filterlist = "Filter"
        this.__online = LanguageService.GetValue("online");
        this.__change = LanguageService.GetValue("change");
        this.__change_lang = LanguageService.GetValue("change_lang");
        this.__change_loc = LanguageService.GetValue("change_loc");
        this.__find_spec = LanguageService.GetValue("find_spec");
        this.__history_btn = LanguageService.GetValue("history_btn");
        this.__select_all = LanguageService.GetValue("select_all");
        this.__less_search_options = LanguageService.GetValue("less_search_options");

        this.categoryPlaceHolder = this.__catagory2buy;
        this.sortPlaceHolder = this.__sortlist;
        this.filterPlaceHolder = this.__filterlist;
        this.locationPlaceHolder = this.__change_loc;
        this.langPlaceHolder = this.__change_lang;
    }



    SearchSpecialist(id: any): void {
        this.result = [];
        this.isLoading = true;
        this.id = id;
        this.isGuest = UserProfileService.GetUserProfile().isGuest;
        this.qService.GetQuery(this.id)
            .then(res => {
                this.isLoading = false;
                if (res.isOk && res.isList) {
                    this.result = res.List;
                }
            })
            .catch(() => {
                this.isLoading = false;
            });
    }

    Go2Chat(specID: string) {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.popup.LoginPop();
            return;
        }
        else {
            this.nav.navigate(['/Chat_Speciality', specID]);
        }
    }

    Go2Blog(specID: string) {
        this.nav.navigate(['/My_Hi', specID]);
    }

    Sort(val: Dictionary) {
        if (val.key != "-1" && val.key != "clear") {
            this.filter = val.key;
        }
    }

    DefultImage(e: any) {
        e.target.src = "http://www.mjbcorp.com/images/pic-of-mark.jpg";
    }

    SetFavorite(q: QueryResult) {
        this.userService.ToggleFavorite(q.id).then(res => {
            if (res.isOk) {
                if (q.isFavorite == true) {
                    this.UploadMessage("You no longer follow this sepc");
                }
                else {
                    this.UploadMessage("Now you follow this sepc");
                }
                q.isFavorite = !q.isFavorite;
            }
        })
    }

    public UploadMessage(msg: string = "") {
        this.childcmp.ToggleToast(msg);
    }

    scrollSpecialists() {
        // var x = 10; //y-axis pixel displacement
        // var y = 1; //delay in milliseconds

        // this.interval = setInterval(function () {
        //     //window.scroll(0, x);
        //     window.scrollBy(0, x);
        //     // x = x + 15; //if you want to increase speed simply increase increment interval
        // }, y);

        this.interval = setInterval(() => {
            window.scrollBy(0, 10);
            // window.scrollBy({
            //     top: 100,
            //     behavior: 'smooth'
            // });
        }, 1);
    }

    stopscrollSpecialists() {
        clearInterval(this.interval);
    }

    toggelFilter() {
        $("#filterpopup").slideToggle('slow');
    }
}