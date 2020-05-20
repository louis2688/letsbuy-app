import { Component, Output, Input, ElementRef, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery'
import { FolderItem, Dictionary, SelectableCategory, Folder } from '../../entities/index';
import { ResourcesService, LinksService, UserProfileService } from '../../serivces';
import { ToastComponent } from "../Toast/Toast.component";
import { Select_cmpComponent } from '../Select_cmp/Select_cmp.component';

@Component({
    selector: 'New_link',
    templateUrl: './New_link.component.html',
    styleUrls: ['./New_link.component.css'],
    providers: [ResourcesService, LinksService]

})

export class New_linkComponent implements AfterViewInit {

    public link: FolderItem;
    public cagetoriesDic: Dictionary[] = [];
    public folderDic: Dictionary[] = [];
    public linkAdded: boolean = false;
    public isEdit: boolean = false;

    public selectedCat: Dictionary | null;
    public selectedFolder: Dictionary | null;

    public isLoading: boolean = true;

    @Input() url: string = "";

    @ViewChild('imageLink') fileInput!: ElementRef;
    @Output() SavedChanges = new EventEmitter();
    @Output() Finish = new EventEmitter<boolean>();

    @ViewChild(ToastComponent) toast!: ToastComponent;

    @ViewChild('catSelector') _catSelector: Select_cmpComponent;
    @ViewChild('folderSelector') _folderSelector: Select_cmpComponent;

    constructor(router: ActivatedRoute, private nav: Router, private resService: ResourcesService, private linkService: LinksService) {

        this.link = new FolderItem();
        this.resService.GetCategories().forEach(cat => {
            var dic = new Dictionary(cat.id, cat.name);
            this.cagetoriesDic.push(dic);
            cat.sub_categories.forEach((sub_cat) => {
                var _dic = new Dictionary(sub_cat.id, cat.name + " \ " + sub_cat.name);
                this.cagetoriesDic.push(_dic);
            })
        });

        this.linkService.GetAllByFolder().then(x => {
            if (x.isOk) {
                x.List.forEach(folder => {
                    var dic = new Dictionary(folder.id, folder.name);
                    this.folderDic.push(dic);
                })
                this.folderDic.push(new Dictionary('-2', "New folder"));
            }
        });
    }

    ngAfterViewInit(): void {
        this.link.linkUrl = this.url;
        this.linkService.GetLinkMetaData(this.link.linkUrl).then(res => {
            this.isLoading = false;
            this.link = res;
            if (this.link.picture && this.link.picture != null && this.link.picture != "") {
                $('#linkimage').attr('src', this.link.picture);
            }

            setTimeout(() => {
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
            }, 200)
        })
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
            var url = window.URL.createObjectURL(fileBrowser.files[0]);
            $('#linkimage').attr('src', url);
        }
    }

    AddLink() {
        if (!this.linkAdded) {
            if (!this.HasImage()) {
                this.toast.ToggleToast("Please add image to link");
                return;
            }

            this.linkAdded = true;
            this.AddLink_Async();

            var user = UserProfileService.GetUserProfile();
            if (!user.isSpec) {
                user.isSpec = true;
                UserProfileService.UpdateUserProfile(user);
                this.Finish.emit(true);
            }
            else {
                this.Finish.emit(false);
            }

        }
    }
    public async AddLink_Async() {
        this.linkService.Create(this.link).then(res => {
            if (res.isOk) {
                this.link.id = res.Singel;
                this.UpdateImage().then(imageRes => {
                    if (imageRes != null) {
                        if (imageRes.isOk) {
                            this.SavedChanges.emit();
                        }
                    }
                    // this.SavedChanges.emit();
                });
            }
        });
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

    HasImage() {
        const fileBrowser = this.fileInput.nativeElement;
        var inUpload = fileBrowser.files && fileBrowser.files[0];
        var inLink = this.link.picture || this.link.picture == "";
        return (inUpload || inLink);
    }
}
