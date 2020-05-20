import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService, ResourcesService, UserProfileService } from '../../serivces/index';
@Component({
    selector: 'RenewTOU',
    templateUrl: './RenewTOU.component.html',
    styleUrls: ['./RenewTOU.component.css'],
    providers: [ResourcesService]
})

export class RenewTOUComponent {
    error: string="";
    content: string="";
    loading: boolean = false;
    agree: boolean = false;
    contentOK: boolean = false;

    isGuest: boolean = false;

    public haveToAgree: boolean = true;

    public __tou_title: string="";
    public __tou_subtitle: string="";
    public __second_title: string="";
    public __agree: string="";
    public __continue: string="";
    public __command: string="";

    constructor(private resService: ResourcesService, private router: Router, aRouter: ActivatedRoute) {
        this.InitText();
        this.isGuest = UserProfileService.GetUserProfile().isGuest || aRouter.snapshot.params['readonly'];
        this.loading = true;
        this.contentOK = false;
        this.agree = false;
        this.resService.GetLastTosVersion()
            .then(res => {
                if (res.isOk) {
                    this.content = res.Singel;
                    this.contentOK = true;
                }
                else {
                    this.content = LanguageService.GetValue("server_error");
                }
                this.loading = false;
            });
    }

    InitText() {
        this.__tou_title = LanguageService.GetValue("tou_title");
        this.__tou_subtitle = LanguageService.GetValue("tou_subtitle");
        this.__second_title = LanguageService.GetValue("second_title");
        this.__agree = LanguageService.GetValue("agree");
        this.__continue = LanguageService.GetValue("continue");
        this.__command = LanguageService.GetValue("command");

    }

    CanContinue(): boolean {
        return (this.agree && this.contentOK) || !this.haveToAgree ;
    }

    Next() {
        if (this.CanContinue()) {
            this.resService.ApproveTosNewVersion()
                .then(res => {
                    if (res.isOk && res.Singel) {
                        this.router.navigate(['Major']);
                        return;
                    }
                    this.content = LanguageService.GetValue("server_error");
                })
        }
    }
   
}