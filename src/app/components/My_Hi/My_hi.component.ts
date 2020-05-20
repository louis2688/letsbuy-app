import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../serivces/index';
import { Blog, Post, LinkPost } from "../../entities/blog";
import { User } from "../../entities/user";
import { Language, SelectableCategory } from "../../entities/category";
import { ToastComponent } from "../Toast/Toast.component";
import { Pop_messageComponent } from "../Pop_message/Pop_message.component";
import { Location } from "@angular/common";
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from "../../serivces/BlogService";
import { UserProfileService } from "../../serivces/UserProfileService";
import { ShaerdStrings } from "../../serivces/ShaerdStrings";
import { LocalStorage } from "../../serivces/LocalStorage";
import { Edit_postComponent } from "../Add_post/Edit_post.component";

@Component({
    selector: 'My_hi',
    templateUrl: './My_hi.component.html',
    styleUrls: ['./My_hi.component.css'],
    providers: [UserProfileService, BlogService]
})

export class My_HiComponent implements AfterViewInit, OnDestroy {

    //#region Vars
    public _id: string ="";
    public editMode: boolean=false;
    public mobilemode: boolean=false;
    public isGuest: boolean=false;
    public isLoading: boolean=false;
    public showMoreSpec: boolean=false;
    public showEditTitlePopup: boolean=false;
    public showEditBlogDescPopup:boolean=false;
    public loadingPicture: boolean=false;
    public loadingBG: boolean=false;
    public blogNotFound: boolean=false;
    public currentBlog: Blog = new Blog();
    currentblogCat : string[] = [];
    public inputTitlePopup: string ="";
    public inputDescPopup: string ="";

    public isAddPostOpen: boolean=false;
    public isEditPostOpen: boolean=false;
    public editPostId: string ="";
    public displayNoneEdit: boolean=false;
    public displayNoneAdd: boolean = false;
    //#endregion

    //#region text vars
    public __chat_now:string ="";
    public __specialities: string ="";
    public __price: string ="";
    public __sales_info_line1: string ="";
    public __sales_info_line2: string ="";
    public __sales_info_line3_part1: string ="";
    public __sales_info_line3_part2: string ="";
    public __sales_info_line1_default: string ="";
    public __sales_info_line2_default: string ="";
    public __sales_info_line3_default: string ="";
    public __more_spec: string ="";
    public __languages: string ="";
    public __edit: string ="";
    public __specialities_line1_default: string ="";
    public __specialities_line2_default: string ="";
    public __blog_title: string ="";
    public __add_blog_default_line1: string ="";
    public __add_blog_default_line2: string ="";
    public __add_blog_default_btn: string ="";
    public __buy_now: string ="";
    public __full_post: string ="";
    //#endregion

    @ViewChild(ToastComponent) toast: ToastComponent;
    @ViewChild(Pop_messageComponent) login_pop: Pop_messageComponent;
    @ViewChild(Edit_postComponent) EditPostCmp: Edit_postComponent;

    @ViewChild('imageProfileUpload') fileProfileInput!: ElementRef;
    @ViewChild('imageBGUpload') fileBGInput!: ElementRef;


    public backSubscribe: Subscription;


    constructor(router: ActivatedRoute, private nav: Router, private blogService: BlogService, private userService: UserProfileService, private location: Location) {

        this.isLoading = true;
        this._id = router.snapshot.params['id'];
        this.InitText();  
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";
        this.isGuest = UserProfileService.GetUserProfile().isGuest;


        this.backSubscribe = <Subscription>this.location.subscribe(x => {
            if (this.isAddPostOpen || this.isEditPostOpen) {
                window.history.go(1);
            }
        })
    }

    ngOnDestroy(): void {
        this.backSubscribe.unsubscribe();

    }

    ngAfterViewInit() {
        if (this._id == "" || this._id == null) {
            this.blogService.GetBlog("").then(
                res => {
                    if (res.isOk) {
                        this.currentBlog = res.Singel;
                        this.SetCatgories();
                        this.editMode = true;
                        this.isLoading = false;
                    }
                }
            );
        }
        else {
            this.blogService.GetBlog(this._id).then(
                res => {
                    if (res.isOk) {
                        this.currentBlog = res.Singel; 
                        this.SetCatgories();
                        this.isLoading = false; 
                    }
                    else {
                        this.login_pop.BlogPop(this._id);
                    }}
            );
        }
    }

    SetCatgories(){
        this.currentblogCat = []; 
        this.currentBlog.PostList.forEach(element => {
            if(!this.currentblogCat.includes(element.category)){
                this.currentblogCat.push(element.category);
            }
        });
    }

    OpenAddPost() {
        this.isAddPostOpen = true;
        this.displayNoneAdd = false;
    }

    OpenEditPost() {
        this.isEditPostOpen = true;
        this.displayNoneEdit = false;
    }

    RefreshBlog(trigger: string) {
        if (trigger == 'add') {
            this.isAddPostOpen = false;
        }
        else {
            this.isEditPostOpen = false;
        }
       
        this.blogService.GetBlog(this._id).then(
            res => {
                if (res.isOk) {
                    this.currentBlog = res.Singel;
                    this.isLoading = false;
                }
                else {
                    this.login_pop.BlogPop(this._id);
                }
            }
        );
    }

    Close(trigger: string, success: boolean = true) {
        if (trigger == 'add') {
            this.displayNoneAdd = true;
        }
        else {
            this.displayNoneEdit = true;
        }

        if (success) {
            this.UploadMessage("Saving...");
        }
    }
    

    GotoPost(postId: string) {
        if (this.editMode) {
            this.editPostId = postId;
            this.OpenEditPost();
        }
        else {
            this.nav.navigate(['/Blog_post', postId]);
        }
    }

    Go2Chat(specID: string) {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.login_pop.LoginPop();
            return;
        }
        else {
            this.nav.navigate(['/Chat_Speciality', specID]);
        }
    }

    public GetDynamicLinkData(data: string): string {

        var url = encodeURI(data);

        var hybridUrl = 'hybrid:openlink?url=' + url;

        return hybridUrl;
    }

    togglePopup(trigger: string) {
        if (trigger == 'title') {
            if (!this.showEditTitlePopup) {
                this.inputTitlePopup = this.currentBlog.blogTitle;
            }
            this.showEditTitlePopup = !this.showEditTitlePopup;
        }
        else if (trigger == 'desc') {
            if (!this.showEditBlogDescPopup) {
                this.inputDescPopup = this.currentBlog.blogDesc;
            }
            this.showEditBlogDescPopup = !this.showEditBlogDescPopup;
        }
    }

    public focusOnOff(link: LinkPost, event: any, item: any) {
        if (event.target.className.includes("allowed_toggle")) {
            link.isTouched = !link.isTouched;
        }
    }

    toggleMoreSpec() {
        if (this.showMoreSpec) {
            this.__more_spec = LanguageService.GetValue("more_spec");
        }
        else {
            this.__more_spec = LanguageService.GetValue("show_less");
        }
        this.showMoreSpec = !this.showMoreSpec;
    }
    public SelectProfileImageDialog() {
        this.fileProfileInput.nativeElement.click();
    }

    public async SelectProfileImage() {
        this.loadingPicture = true;
        const fileBrowser = this.fileProfileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('files', fileBrowser.files[0]);
            var result = await this.userService.UploadProfileImage(formData);
            if (result.isOk) {
                this.currentBlog.user.picture = result.Singel;
            }
        }
        this.loadingPicture = false;
    }

    public SelectBGImageDialog() {
        this.fileBGInput.nativeElement.click();
    }
    public async SelectBGImage() {
        this.loadingBG = true;
        const fileBrowser = this.fileBGInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('files', fileBrowser.files[0]);
            var result = await this.blogService.UploadCoverImage(formData);
            if (result.isOk) {
                this.currentBlog.coverImg = result.Singel;
            }
        }
        this.loadingBG = false;
    }

    public UploadMessage(msg: string = "") {
        this.toast.ToggleToast(msg);
    } 


    PostBlog(trigger: string) {
        if (trigger == 'title') {
            this.currentBlog.blogTitle = this.inputTitlePopup;
        }
        else if (trigger == 'desc') {
            this.currentBlog.blogDesc = this.inputDescPopup;
        }
        this.blogService.UpdateBlog(this.currentBlog).then(x => {
            if (!x.isOk) {
                this.UploadMessage("faild to Update blog");
            }
            else {
                this.togglePopup(trigger);
            }
        });
        
    }

    GetBackgroundIMage() {
        var img = this.currentBlog.coverImg || "";
        if (!img || img == "" || img == null) {
            img = "./default_bg.png";
        }
        return "url(" + img + ")";
    }

    TogglePin(link: LinkPost ) {
        this.blogService.TogglePin(link.postid).then(x=>{
            if (x.isOk) {
                link.isPin = x.Singel;
            }
        });
    }

    GusetPopup(){
        this.login_pop.LoginPop();
    }

    ToggleIsFollow() {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.login_pop.LoginPop();
            return;
        }
        else {
            this.userService.ToggleFavorite(this.currentBlog.user.id).then(
                x => {
                    if (x.isOk) {
                        this.currentBlog.user.isFollow = !this.currentBlog.user.isFollow;
                        if (this.currentBlog.user.isFollow) {
                            this.UploadMessage("Now you are following this specialist too");
                        }
                        else {
                            this.UploadMessage("Now you are not following this specialist");
                        }
                    }
                }
            )

        }
    }
    InitText() {
        this.__chat_now = LanguageService.GetValue("chat_now");
        this.__specialities = LanguageService.GetValue("specialities");
        this.__price = LanguageService.GetValue("price");
        this.__sales_info_line1 = LanguageService.GetValue("sales_info_line1");
        this.__sales_info_line2 = LanguageService.GetValue("sales_info_line2");
        this.__sales_info_line3_part1 = LanguageService.GetValue("sales_info_line3_part1");
        this.__sales_info_line3_part2 = LanguageService.GetValue("sales_info_line3_part2");
        this.__sales_info_line1_default = LanguageService.GetValue("sales_info_line1_default");
        this.__sales_info_line2_default = LanguageService.GetValue("sales_info_line2_default");
        this.__sales_info_line3_default = LanguageService.GetValue("sales_info_line3_default");
        this.__more_spec = LanguageService.GetValue("more_spec");
        this.__languages = LanguageService.GetValue("languages");
        this.__edit = LanguageService.GetValue("edit");
        this.__specialities_line1_default = LanguageService.GetValue("specialities_line1_default");
        this.__specialities_line2_default = LanguageService.GetValue("specialities_line2_default");
        this.__blog_title = LanguageService.GetValue("blog_title");
        this.__add_blog_default_line1 = LanguageService.GetValue("add_blog_default_line1");
        this.__add_blog_default_line2 = LanguageService.GetValue("add_blog_default_line2");
        this.__add_blog_default_btn = LanguageService.GetValue("add_blog_default_btn");
        this.__buy_now =LanguageService.GetValue("buy_now");
        this.__full_post =LanguageService.GetValue("full_post");
    }
}
