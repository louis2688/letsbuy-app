import { Component,Output,Input,EventEmitter, AfterContentInit } from '@angular/core';
import { SelectableCategory } from "../../entities/category";
import { LanguageService, ResourcesService, UserProfileService } from "../../serivces/index";

@Component({
    selector: 'EditSpecialistCategories',
    templateUrl: './EditSpecialistCategories.component.html',
    styleUrls: ['./EditSpecialistCategories.component.css'],
    providers: [ResourcesService, UserProfileService]
})
export class EditSpecialistCategoriesComponent implements AfterContentInit {
    public selectedSubCategories: SelectableCategory[] = [];

    public __select_all: string = "";
    public __EditSpecialistCategories_title: string = "";
    public __update_btn: string = "";



    @Output() exit = new EventEmitter<SelectableCategory[]>();
    @Input() user_categories: SelectableCategory[]=[];

    constructor(private resService: ResourcesService, private userService: UserProfileService ) {
        this.InitText();
    }

    async ngAfterContentInit() {
        var allCat = this.resService.GetCategories();
        if (allCat.length == 0) {
            await this.resService.UpdateCategories();
            var allCat = this.resService.GetCategories();
        }
        var userCat = this.user_categories;
        var Items: SelectableCategory[] = [];
        allCat.forEach(function (obj, index) {
            if (userCat) {
                var isExist = userCat.find(x => x.id == obj.id || x.ID == obj.id);
                if (isExist != null) {
                    obj.chacked = true;
                }
            }
            obj.sub_categories.forEach(function (obj, index) {
                if (userCat) {
                    var isExist = userCat.find(x => x.id == obj.id || x.ID == obj.id);
                    if (isExist != null) {
                        obj.chacked = true;
                    }
                }
            })
            Items.push(obj);
        })
        this.selectedSubCategories = Items;

    }

    click(i: SelectableCategory) {
        i.isOpen = !i.isOpen;
    }  

    public getSrcByState(i: SelectableCategory) {
        if (i.isOpen) {
            return "./assets/images/open_question.png";
        }
        else {
            return "./assets/images/close_question.png";
        }
    }

    SelectUnSelctAll(cat: SelectableCategory) {
        cat.sub_categories.forEach((obj, i, items) => {
            obj.chacked = cat.chacked;
        })
    }

    closePopup() {
        this.exit.emit(this.selectedSubCategories);
    }

    update() {
        var items: string[] = [];
        var userCat : SelectableCategory[] = [];
        this.selectedSubCategories.forEach(function (obj, i) {
            if (obj.chacked) {
                items.push(obj.id)
                userCat.push(obj);
            }
            obj.sub_categories.forEach(function (obj, i) {
                if (obj.chacked) {
                    items.push(obj.id)
                    userCat.push(obj);
                }
            })
        })

        this.userService.UpdateUserCategories(items)
            .then(res => {
                if (res.isOk) {
                    this.exit.emit(userCat);
                }
            })
    }

    InitText() {
        this.__select_all = LanguageService.GetValue("select_all");
        this.__EditSpecialistCategories_title = LanguageService.GetValue("EditSpecialistCategories_title");
        this.__update_btn = LanguageService.GetValue("update_btn");
    }
}

