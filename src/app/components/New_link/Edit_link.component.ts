import { Component, ElementRef, ViewChild, Output, EventEmitter, Input, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery'
import { FolderItem, Dictionary, SelectableCategory, Folder } from '../../entities/index';
import { ResourcesService, LinksService } from '../../serivces';
import { Select_cmpComponent } from '../Select_cmp/Select_cmp.component';

@Component({
    selector: 'Edit_link',
    templateUrl: './New_link.component.html',
    styleUrls: ['./New_link.component.css'],
    providers: [ResourcesService, LinksService]

})

export class Edit_linkComponent implements AfterContentInit{

    public link: FolderItem = new FolderItem();
    public cagetoriesDic: Dictionary[] = [];
    public folderDic: Dictionary[] = [];
    public linkAdded: boolean = false;
    public isEdit: boolean = true;

    public isLoading: boolean=true;

    @Input() linkId: string="";

    @ViewChild('imageLink') fileInput!: ElementRef;
    @Output() SavedChanges = new EventEmitter();
    @Output() Finish = new EventEmitter();


    @ViewChild('catSelector') _catSelector : Select_cmpComponent;
    @ViewChild('folderSelector') _folderSelector : Select_cmpComponent;

    constructor(private nav: Router, private resService: ResourcesService, private linkService: LinksService) {
        

    }

    ngAfterContentInit(): void {

        this.linkService.Get(this.linkId).then(res => {
            if (res && res.isOk) {
                this.link = res.Singel;
                this.isLoading = false;

                setTimeout(()=>{
                    this.cagetoriesDic = [];
                    this.resService.GetCategories().forEach((cat) => {
                        var dic = new Dictionary(cat.id, cat.name);
                        this.cagetoriesDic.push(dic);
                        cat.sub_categories.forEach((sub_cat) => {
                            var _dic = new Dictionary(sub_cat.id, cat.name + " // " + sub_cat.name);
                            this.cagetoriesDic.push(_dic);
                        })
                    });
                    this._catSelector.items = this.cagetoriesDic;
                    this._catSelector.selectedObject = this.cagetoriesDic.find(x => x.key == this.link.categoryID) || null;
    
                    this.linkService.GetAllByFolder().then(x => {
                        if (x.isOk) {
                            this.folderDic = [];
                            x.List.forEach(folder => {
                                var dic = new Dictionary(folder.id, folder.name);
                                this.folderDic.push(dic);
                            })
                            this.folderDic.push(new Dictionary('-2', "New folder"));
                            this._folderSelector.items = this.folderDic;
                            this._folderSelector.selectedObject = this.folderDic.find(x => x.key == this.link.folderID) || null; 
                        }
                    })
                },200)

            }
        });
    }

    SelectCategory(category: Dictionary) {
        this.link.categoryID = category.key;
    }
    SelectFolder(folder: Dictionary) {
        this.link.folderID = folder.key;
        if (folder.key != '-2') {
            this.link.folderName = '';
        }
    }

    OpenSelectDialog() {
        this.fileInput.nativeElement.click();
    }
    public SelectImageFromGallery() {
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            $('#linkimage').attr('src', window.URL.createObjectURL(fileBrowser.files[0]));
            this.UpdateImage();
        }
    }

    DeleteLink(){
        this.linkService.Delete(this.linkId).then(
            x=>{
                this.Finish.emit();
            }
        );
    }
    AddLink() {
        if (!this.linkAdded) {
            this.linkAdded = true;
            this.AddLink_Async();
            this.Finish.emit();
        }
    }
    public async AddLink_Async() {
        this.linkService.Upadte(this.link).then(res => {
            if (res.isOk) {
                this.SavedChanges.emit();
            }
            else {
                // show error msg ? 
            }
        })
    }

    async UpdateImage() {
        var formData: FormData = new FormData();
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            formData.append('files', fileBrowser.files[0]);
            return this.linkService.UpdateImage(formData, this.link.id);
        }

        return null;
    }


}
