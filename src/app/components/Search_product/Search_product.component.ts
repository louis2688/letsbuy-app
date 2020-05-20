import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../serivces/index';
import { Router } from '@angular/router';
import { SelectableCategory, Query, Language, Location } from '../../entities/index';
import { ResourcesService, QueryService } from '../../serivces/index';
import { Dictionary } from "../../entities/category";
import * as $ from 'jquery';
import { Select_cmpComponent } from '../Select_cmp/Select_cmp.component';

@Component({
    selector: 'Search_product',
    templateUrl: './Search_product.component.html',
    styleUrls: ['./Search_product.component.css'],
    providers: [ResourcesService, QueryService]
})
export class Search_productComponent implements AfterViewInit{

    @ViewChild('categotys') _catSelector: Select_cmpComponent;
    @ViewChild('counries') _counriesSelector: Select_cmpComponent;
    @ViewChild('langs') _langsSelector: Select_cmpComponent;

    public __search_product_title: string="";
    public __search_product_subtitle: string="";
    public __input_product: string="";
    public __catagory: string="";
    public __input_catagory: string="";
    public __more_search_options: string="";
    public __less_search_options: string="";
    public __history_btn: string="";
    public __find_btn: string="";
    public __select_all: string="";
    public __change_loc: string="";

    public cagetories: SelectableCategory[] = [];
    public locations = [];

    public cagetoriesDic: Dictionary[] = [];
    public locationDic: Dictionary[] = [];
    public categoryPlaceHolder: string="";
    public locationPlaceHolder: string="";
    

    public selectedCategory: string="";
    public selectedSubCategories: SelectableCategory[] = [];
    public moreOptions: boolean = false;

    public _q;

    constructor(private resService: ResourcesService, private qService: QueryService, private router: Router) {
        this.InitText();

        this.selectedCategory = '0';
        this.moreOptions = false;
        this._q = new Query();

       
    }
    ngAfterViewInit(): void {
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
                this.UpdateCon();
            })
        }
    }

    UpdateCat() {
        this.cagetoriesDic = [];
        for (var i = 0; i < this.cagetories.length; i++) {
            this.cagetoriesDic.push(new Dictionary(this.cagetories[i].id, this.cagetories[i].name));
        }
        this._catSelector.items = this.cagetoriesDic;
    }
    UpdateCon() {
        this.locationDic = [];
        for (var i = 0; i < this.locations.length; i++) {
            this.locationDic.push(new Dictionary(String(this.locations[i].ID), this.locations[i].Name));
        }
        this._counriesSelector.items = this.locationDic;

    }


    public CalcSubCategories(item: Dictionary) {
        this.toggleFixedCssToMainContainer();
        if (item.key != '-1') {
            if (item.key == 'clear') {
                this.selectedCategory = '0';
                this.categoryPlaceHolder = this.__input_catagory;
                this.selectedSubCategories = [];
                return;
            }
            this.selectedCategory = item.key;
            this.categoryPlaceHolder = item.value;
            var _category = this.cagetories.find(x => x.ID == this.selectedCategory);
            if (_category != null) {
                var result: SelectableCategory[] = [];
                _category.sub_categories.forEach((obj, i, items) => {
                    var newItem = new SelectableCategory();
                    newItem.ID = obj.ID;
                    newItem.Name = obj.Name;
                    newItem.chacked = false;

                    result.push(newItem);
                })
                this.selectedSubCategories = result;
            }
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

    public toggleFixedCssToMainContainer() {
        var pos = $('.main_container').css('position');
        if (pos == 'fixed') {
            $('.main_container').css('position', 'relative');
        }
        else {
            $('.main_container').css('position', 'fixed');
        }
    }
    public SelectAllSubCat() {
        this.selectedSubCategories.forEach((obj, i, items) => {
            obj.chacked = true;
        })
    }

    public MoreOptions() {
        this.moreOptions = !this.moreOptions;
        this.UpdateCat();
        this.UpdateCon();
    }

    public Search() {
        this._q.categories = [];
        this._q.categories.push(this.selectedCategory);
        this.selectedSubCategories.forEach((obj, i, items) => {
            if (obj.chacked) {
                this._q.categories.push(obj.ID);
            }
        });

        this.qService.AddProductQuery(this._q)
            .then(res => {
                if (res) {
                    if (res.isOk) {
                        this.router.navigate(['Found_product', res.Singel]);
                    }
                }

            });
    }

    InitText() {
        this.__search_product_title = LanguageService.GetValue("search_product_title");
        this.__search_product_subtitle = LanguageService.GetValue("search_product_subtitle");
        this.__input_product = LanguageService.GetValue("input_product");
        this.__catagory = LanguageService.GetValue("catagory");
        this.__input_catagory = LanguageService.GetValue("input_catagory");
        this.__more_search_options = LanguageService.GetValue("more_search_options");
        this.__less_search_options = LanguageService.GetValue("less_search_options");
        this.__history_btn = LanguageService.GetValue("history_btn");
        this.__find_btn = LanguageService.GetValue("find_btn");
        this.__select_all = LanguageService.GetValue("select_all");
        this.__change_loc = LanguageService.GetValue("change_loc");

        this.categoryPlaceHolder = this.__input_catagory
        this.locationPlaceHolder = this.__change_loc;
    }

}
