import { Component, ViewChild, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { LanguageService, LinksService, UserProfileService } from '../../serivces/index';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Folder, FolderItem, UserProfile } from "../../entities";
import { ToastComponent } from "../Toast/Toast.component";
import { LocalStorage } from "../../serivces/LocalStorage";
import { Edit_linkComponent } from "../New_link/Edit_link.component";
import { New_linkComponent } from '../New_link/New_link.component';
import { Location } from "@angular/common";
import { Subscription } from 'rxjs';

@Component({
    selector: 'My_links',
    templateUrl: './My_links.component.html',
    styleUrls: ['./My_links.component.css'],
    providers: [LinksService]
})
export class My_linksComponent implements OnDestroy {

    @Input() isSelectMode: boolean = false;
    @Input() postMode: boolean = false;
    @Output() selectLinkEvent = new EventEmitter<string>();
    @Output() cancelPopup = new EventEmitter();

    public userProfile: UserProfile = UserProfileService.GetUserProfile();

    public byCategory: boolean = true;

    public chatId: string = "";
    public isFolderOpen: boolean = false;
    public filter: string = "";
    public linkUrl: string = "";
    public items: Folder[] = [];

    public isNewLinkOpen: boolean = false;
    public isEditLinkOpen: boolean = false;
    public editLinkId: string = "";

    showAddLinkNote: boolean;

    @ViewChild(ToastComponent) childcmp!: ToastComponent;
    @ViewChild(Edit_linkComponent) EditLinkCmp!: Edit_linkComponent;
    @ViewChild(New_linkComponent) addLinkComp!: New_linkComponent;
    private storageKey = "page_mylinks";

    public folderItems: FolderItem[] = [];
    public selectedFolderName: string = "";
    public selectedFolderID: string = "";

    public __my_links_title: string = "";
    public __my_links_subtitle: string = "";
    public __add_link: string = "";
    public __add_link_btn: string = "";
    public __search_link: string = "";
    public __folder_tab: string = "";
    public __category_tab: string = "";

    public backSubscribe: Subscription;

    constructor(router: ActivatedRoute, private nav: Router, private linkService: LinksService, private location: Location) {
        this.InitText();
        this.ShowByFolder();

        this.backSubscribe = <Subscription>this.location.subscribe(x => {
            if (this.isEditLinkOpen || this.isNewLinkOpen) {
                window.history.go(1);
            }
        })

        try {
            this.folderItems = LocalStorage.GetItem(this.storageKey);
        } catch (e) {

        }
    }

    ngOnDestroy(): void {
        LocalStorage.SetItem(this.storageKey, this.folderItems);
        this.backSubscribe.unsubscribe();
    }

    ShowByCategory() {
        this.linkService.GetAllByCategory().then(x => {
            this.items = x.List;
            if (x.List.length == 0) {
                this.showAddLinkNote = true;
            }
        });
        this.byCategory = true;
    }

    ShowByFolder() {
        this.ShowByCategory()
        // this.linkService.GetAllByFolder().then(x => this.items = x.List);
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
    public UploadMessage(msg: string = "", time: number = 5000) {
        this.childcmp.ToggleToast(msg, time);
    }

    InitText() {
        this.__my_links_title = LanguageService.GetValue("my_links_title");
        this.__my_links_subtitle = LanguageService.GetValue("my_links_subtitle");
        this.__add_link = LanguageService.GetValue("add_link");
        this.__add_link_btn = LanguageService.GetValue("add_link_btn");
        this.__search_link = LanguageService.GetValue("search_link");
        this.__folder_tab = LanguageService.GetValue("folder_tab");
        this.__category_tab = LanguageService.GetValue("category_tab");
    }
    ToggleFocus(item: FolderItem, event: any) {
        if (!event.target.className.includes("btn")) {
            item.isfocus = !item.isfocus;
        }
    }
    SetClassByItems(amount: number): string {
        var result = "folder ";

        if (amount == 1) {
            result += "one_item";
        }
        else if (amount <= 4) {
            result += "moreThan1items";
        }
        else {
            result += "moreThan4items";
        }
        return result;
    }

    async OpenFolder(folderId: string, folderName: string) {
        this.selectedFolderName = folderName;
        this.selectedFolderID = folderId;
        this.linkService.GetFolderItems(folderId).then(x => {
            this.folderItems = x.List;
            this.isFolderOpen = true;
            this.toggleFixedCssToMainContainer();
        });
    }

    closeFolder() {
        this.isFolderOpen = false;
        this.toggleFixedCssToMainContainer();
    }

    SelectLink(itemId: string) {
        this.toggleFixedCssToMainContainer();
        this.isFolderOpen = false;
        this.selectLinkEvent.emit(itemId);
    }

    CreatePost(itemId: string) {
        this.nav.navigate(['/Add_post', itemId]);
    }

    ToggleNewLink() {
        this.isNewLinkOpen = !this.isNewLinkOpen;
    }

    ToggleEditLink() {
        this.isEditLinkOpen = !this.isEditLinkOpen;
    }


    EditLink(id: string) {
        this.editLinkId = id;
        this.ToggleEditLink();
    }
    Refrash() {
        if (this.byCategory) {
            this.ShowByCategory();
        }
        else {
            this.ShowByFolder();
        }
        this.linkService.GetFolderItems(this.selectedFolderID).then(x => {
            this.folderItems = x.List;
        });
    }
    Close($event) {
        if (this.isNewLinkOpen) {
            this.ToggleNewLink();
        }
        else {
            this.ToggleEditLink();
        }
        this.linkUrl = '';
        this.userProfile = UserProfileService.GetUserProfile();
        if ($event) {
            this.UploadMessage("Now you're hi lets buy adviser good luck!", 5000);
            setTimeout(() => {
                this.UploadMessage("Saving...", 2500);
            }, 2500);
        } else {
            this.UploadMessage("Saving...", 7500);
        }
        setTimeout(() => {
            this.Refrash();
        }, 5000)
        setTimeout(() => {
            this.Refrash();
        }, 20000)
    }

    ClosePopup() {
        this.cancelPopup.emit();
    }

    AddLink() {
        this.UploadMessage("Check link...", 3000);
        if (this.linkUrl != "") {
            // ///check that url is valid

            // var a = document.createElement("a");
            // a.href = this.linkUrl;

            // //hide it from view when it is added
            // a.style.display = "none";

            // //add it
            // document.body.appendChild(a);

            // // //read the links "features"
            // // alert(a.protocol);
            // // alert(a.hostname);
            // // alert(a.pathname);
            // // alert(a.port);
            // // alert(a.hash);
            // // alert(a.origin);

            // if (a.hostname.toLowerCase().includes("ebay")) {
            //     //remove it
            //     document.body.removeChild(a);
            //     this.ToggleNewLink();
            // } else {
            //     this.linkService.TestUrl(this.linkUrl).then(x => {
            //         if (x.isOk) {
            //             if (x.Singel) {
            //                 this.ToggleNewLink();
            //             }
            //             else {
            //                 this.UploadMessage("Site not suppoted!!")
            //                 this.linkUrl = '';
            //             }
            //         }
            //         else {
            //             this.UploadMessage("Server error");
            //         }
            //     });
            // }

            this.linkService.TestUrl(this.linkUrl).then(x => {
                if (x.isOk) {
                    if (x.Singel) {
                        this.ToggleNewLink();
                    }
                    else {
                        this.UploadMessage("Site not suppoted!!")
                        this.linkUrl = '';
                    }
                }
                else {
                    this.UploadMessage("Server error");
                }
            });
        }
        else {
            this.UploadMessage("please insert link..")
        }

    }

    CopyToClipboard(item: any) {
        // console.log(item);
        var linktocopy = location.origin + '/GoToLink/' + item.id;
        // console.log(linktocopy);
        const copyToClipboard = str => {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            const selected =
                document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
            el.select();
            el.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.body.removeChild(el);
            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
        };
        copyToClipboard(linktocopy);
        this.UploadMessage("Link copied");
    }

    DefultImage(e: any) {
        e.target.src = "../../../assets/images/prezent_with_arrow.png";
    }

}

