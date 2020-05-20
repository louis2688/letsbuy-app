import { Component, OnDestroy, ViewChild } from '@angular/core';
import { LanguageService, BlogService, LocalStorage, ShaerdStrings } from '../../serivces/index';
import * as $ from 'jquery';
import { FullPost} from "../../entities/blog";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from "../Toast/Toast.component";
import { User } from '../../entities/index';
import { UserProfileService } from "../../serivces/UserProfileService";
import { Pop_messageComponent } from '../Pop_message/Pop_message.component';
import { MetaService } from 'ng2-meta';

@Component({
    selector: 'Blog_post',
    templateUrl: './Blog_post.component.html',
    styleUrls: ['./Blog_post.component.css'],
    providers: [UserProfileService, BlogService]
})
export class Blog_postComponent implements OnDestroy {
    ngOnDestroy(): void {
        if (this.isBrowser()) {
            $(document).ready(function () {
                $("#logo").show();
            })
        }
    }
    @ViewChild(Pop_messageComponent) login_pop: Pop_messageComponent;
    @ViewChild(ToastComponent) toast: ToastComponent;

    public isLoding: boolean;
    public mobilemode: boolean;

    public __go_to_link: string = "";
    public __chat_now:string = "";

    public isOpen: boolean = false;
    public currentPost: FullPost = new FullPost();
    public currentSpecialist: User;
    public currentPostId: string;
    public isGuest: boolean = false;
    constructor(router: ActivatedRoute, private userService: UserProfileService, private nav: Router, private blogServise: BlogService,private metaService: MetaService) {
        this.InitText();
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";

        if (this.isBrowser()) {
            $(document).ready(function () {
                $("#logo").hide();
            })
        }
        this.currentPostId = router.snapshot.params['id'];
        this.isLoding = true; 
        this.isGuest = UserProfileService.GetUserProfile().isGuest;
        this.blogServise.GetPost(this.currentPostId).then(x => {
            if (x.isOk) {
                this.currentPost = x.Singel;
                this.metaService.setTag('og:image',this.currentPost.image);
                this.metaService.setTag('og:title',this.currentPost.title);
                this.metaService.setTag('og:description',this.currentPost.mainText);
                this.userService.GetShortUSerData(this.currentPost.specID).then(y => {
                    if (y.isOk) {
                        this.currentSpecialist = y.Singel;
                        this.isLoding = false;
                    }
                })
            }
        })
    }

    public GetDynamicLinkData(data: string): string {
        var url = encodeURI(data);
        var hybridUrl = 'hybrid:openlink?url=' + url;
        return hybridUrl;
    }

    public UploadMessage(msg: string = "") {
        this.toast.ToggleToast(msg);
    }

    openBlog() {
        this.isOpen = !this.isOpen;
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
    InitText() {
        this.__go_to_link = LanguageService.GetValue("go_to_link");
        this.__chat_now = LanguageService.GetValue("chat_now");
    }

    GusetPopup(){
        this.login_pop.LoginPop();
    }
}
