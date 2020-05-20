import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, SignupService, ResourcesService, LanguageService, SecureHttp, LocalStorage, ShaerdStrings, UserProfileService } from '../../serivces/index';
import { SendBirdService } from '../../serivces/SendBiredService';
import { EBayService } from 'src/app/serivces/e-bay.service';

@Component({
    selector: 'Opening',
    templateUrl: './Opening.component.html',
    styleUrls: ['./Opening.component.css'],
    providers: [SignupService, ResourcesService, SecureHttp, SendBirdService]
})

@Injectable()
export class OpeningComponent {
    public __line1: string = "";
    public __line2: string = "";

    constructor(private router: Router,
        private activeRouter: ActivatedRoute,
        private service: ResourcesService,
        private lang: LanguageService,
        private signup: SignupService,
        private sbService: SendBirdService,
        private ebay: EBayService) {
        var platform = this.activeRouter.snapshot.queryParamMap.get('platform');
        if (platform != null) {
            LocalStorage.SetString(ShaerdStrings.keys_platform, platform);
        }

        this.initText();
    }
    initText() {
        this.__line1 = LanguageService.GetValue("line1");
        this.__line2 = LanguageService.GetValue("line2");
    }

    ngAfterViewInit() {
        this.CheckLogin();
        // let href: string = this.router.url;
        // if (href.toLowerCase().includes("?code=")) {
        //     let eBayCode: string = href.split('?')[1].replace("code=", "");
        //     this.ebay.getOAuthToken(eBayCode).subscribe(data => {
        //         console.log("from eBay A", data);
        //         this.ebay.getTransactions(data.access_token).subscribe(data => {
        //             console.log("from eBay T", data);
        //         });
        //     });

        //     setTimeout(() => {
        //         this.CheckLogin();
        //     }, 5000);
        // }
        // else {
        //     window.location.href = "https://auth.ebay.com/oauth2/authorize?client_id=InbalMen-hiletsbu-PRD-8dfe517a4-de8ac24d&response_type=code&redirect_uri=Inbal_Mendel_Ha-InbalMen-hilets-ircntvg&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly";
        // }
    }

    private async CheckLogin() {
        if (this.isBrowser()) {
            try {
                try {
                    await this.service.UpdateCategories();
                    await this.service.UpdateLocations();
                    await this.service.UpdateLangs();
                } catch (e) {
                    // this.GoToPage('Major');
                    this.GoToPage('Search_specialist');
                    return;
                }


                // If new user go to signin / signup
                if (!AuthenticationService.isAuthenticated()) {
                    this.GoToPage('Signin');
                    return;
                }

                this.sbService.Online();

                if (!navigator.onLine) {
                    // this.GoToPage('Major');
                    this.GoToPage('Search_specialist');
                    return;
                }

                //If stop in middel of signup
                var localProfile = UserProfileService.GetUserProfile();
                if (!localProfile || localProfile.signupStep < 7) {
                    var needToCompliteSingup = (await this.signup.GetSingupStage());
                    if (needToCompliteSingup.Singel == 1) {
                        this.GoToPage('Signin');
                        return;
                    }
                    else if (needToCompliteSingup.isOk && needToCompliteSingup.Singel < 6) {
                        this.GoToPage('Signup');
                        return;
                    }
                }


                //If there is new tos to approve
                var needToApproveTos = await this.service.HasNewTosVersion();
                if (needToApproveTos.Singel) {
                    this.router.navigate(['RenewTOU']);
                    return;
                }

                this.sbService.RegisterUserNotifications();

                // this.GoToPage('Major');
                this.GoToPage('Search_specialist');
                return;
            } catch (e) {
                console.log(e);
            }
        }
    }

    private GoToPage(name: string) {
        this.router.navigate([name]);
        return;
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
}