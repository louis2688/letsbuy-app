import { Component, ViewChild } from '@angular/core';
import { LanguageService, UserProfileService } from '../../serivces/index';
import { userReview, User } from "../../entities";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from "../Toast/Toast.component";
import { Pop_messageComponent } from "../Pop_message/Pop_message.component";

@Component({
    selector: 'Reviews',
    templateUrl: './Reviews.component.html',
    styleUrls: ['./Reviews.component.css'],
    providers: [UserProfileService]
})
export class ReviewsComponent {
    public items: userReview[] = [];
    public currentSpecialistId: string = "";
    public currentSpecialist: User;
    public showPopup: boolean = false;
    public loadMoreReviews: boolean = false;

    public popupRate: number = 0;
    public popupReview: string="";

    public canAddReview: boolean = false;
    public canChat: boolean = false;
    public isGuest: boolean = false;
    @ViewChild(ToastComponent) childcmp!: ToastComponent;
    @ViewChild(Pop_messageComponent) login_pop!: Pop_messageComponent;

    public __reviews_title: string="";
    public __reviews_subtitle: string="";
    public __write_review: string="";
    public __chat: string="";
    public __load_more: string="";
    public __your_review: string="";
    public __post_review: string="";

    constructor(router: ActivatedRoute, private userService: UserProfileService, private nav: Router) {
        this.currentSpecialistId = router.snapshot.params['id'];
        this.InitText();

        this.currentSpecialist = new User('', '', '', '', new Date(), [], 0, 0, 0, 0, []);
        this.currentSpecialist.isLoggedUser = true;
        this.canAddReview = false;
        this.Refarsh(false);
    }

    Refarsh(all: boolean) {
        this.userService.GetUserReviews(this.currentSpecialistId, all).then(x => {
            if (x.isOk) {
                this.canChat = x.Singel.canChat;
                this.canAddReview = x.Singel.canAdd;
                this.items = x.Singel.items;
                this.items.forEach((obj) => {
                    obj.time = new Date(obj.time);
                })
            }
        });
        this.userService.GetShortUSerData(this.currentSpecialistId).then(x => {
            if (x.isOk) {
                this.currentSpecialist = x.Singel;
            }
        });
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
    loadMore() {
        this.loadMoreReviews = true;
    }

    togglePopup() {
        this.showPopup = !this.showPopup;
    }

    CalcStarByRate(item: userReview, i: number) {
        if (i <= item.rating) {
            return "../../../assets/images/static/star.png";
        }
        return "../../../assets/images/static/empty_star.png";
    }

    CalcStarByPopupRate(i: number) {
        if (i <= this.popupRate) {
            return "../../../assets/images/static/star.png";
        }
        return "../../../assets/images/static/empty_star.png";
    }

    setPopupRate(rate: number) {
        this.popupRate = rate;
    }

    PostReview() {
        var item = new userReview();
        item.specID = this.currentSpecialistId;
        item.rating = this.popupRate;
        item.description = this.popupReview;
        this.userService.UpdateReview(item).then(x => {
            if (x.isOk) {
                this.Refarsh(false);
            }
        })
        this.showPopup = false;
    }
    public UploadMessage(msg: string = "") {
        this.childcmp.ToggleToast(msg);
    }

    ToggleIsFollow() {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.login_pop.LoginPop();
            return;
        }
        else {
            this.userService.ToggleFavorite(this.currentSpecialistId).then(res => {
                if (res.isOk) {
                    if (this.currentSpecialist.isFollow == true) {
                        this.UploadMessage("You no longer follow this sepc");
                    }
                    else {
                        this.UploadMessage("Now you follow this sepc");
                    }
                    this.currentSpecialist.isFollow = !this.currentSpecialist.isFollow;
                }
            })

        }
    }

    InitText() {
        this.__reviews_title = LanguageService.GetValue("reviews_title");
        this.__reviews_subtitle = LanguageService.GetValue("reviews_subtitle");
        this.__write_review = LanguageService.GetValue("write_review");
        this.__chat = LanguageService.GetValue("chat");
        this.__load_more = LanguageService.GetValue("load_more");
        this.__your_review = LanguageService.GetValue("your_review");
        this.__post_review = LanguageService.GetValue("post_review");
    }

    DefultImage(e: any) {
        e.target.src = "../../../assets/images/User_NoPhoto.png";
    }
}

