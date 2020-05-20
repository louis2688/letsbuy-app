import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel, ForUserError } from '../../entities/index'
import { AuthenticationService, SignupService, LanguageService, ShaerdStrings, UserProfileService, SendBirdService } from '../../serivces/index'
import { LocalStorage } from "../../serivces/LocalStorage";

@Component({
    selector: 'Signin',
    templateUrl: './Signin.component.html',
    styleUrls: ['./Signin.component.css'],
    providers: [LoginViewModel, AuthenticationService, SignupService, UserProfileService, LocalStorage, SendBirdService]
})

export class SigninComponent {
    public errorMsg: string = "";
    public show_pop: boolean;
    // Text fileds
    public __username: string = "";
    public __password: string = "";
    public __enter_username: string = "";
    public __enter_password: string = "";
    public __signin_footer_txt: string = "";
    public __forgot_password: string = "";
    public __signin_login_btn: string = "";
    public __signin_new_user_btn: string = "";
    public __login_later: string = "";

    // Flow Controls
    public isLoadLoginAction: boolean = false;

    // Url
    public facebookLogin: string = "";
    public googleLogin: string = "";

    constructor(public login: LoginViewModel,
        private router: Router,
        private auth: AuthenticationService,
        private signup: SignupService,
        private user: UserProfileService,
        private sbService: SendBirdService,
        _strs: ShaerdStrings
    ) {
        AuthenticationService.ClearToken();
        this.InitText();
        this.show_pop = false;

        this.googleLogin = _strs.googleAuthUtl();
        this.facebookLogin = _strs.facebookAuthUtl();
    }

    ShowPop() {
        this.show_pop = !this.show_pop;
    }
    async Login() {
        try {
            this.isLoadLoginAction = true;
            this.errorMsg = "";
            LocalStorage.removeAllItems();
            var loginResult = await this.auth.Login(this.login);
            this.sbService.RegisterUserNotifications();
            if (loginResult) {
                var singupStage = (await this.signup.GetSingupStage());
                if (singupStage.isOk) {
                    if (singupStage.Singel < 6) {
                        this.router.navigate(['Signup']);
                        return;
                    }
                    else {
                        await this.user.LoadProfileFromServer();
                        this.router.navigate(['Opening']);
                        return;
                    }
                }
                this.isLoadLoginAction = false;
                this.errorMsg = LanguageService.GetValue("server_error");
            }
        } catch (e) {
            this.isLoadLoginAction = false;
            this.errorMsg = e.message;
        }
    }

    private InitText() {
        // initilize text elements:
        this.__username = LanguageService.GetValue("username");
        this.__password = LanguageService.GetValue("password");
        this.__login_later = LanguageService.GetValue("login_later");
        this.__enter_username = LanguageService.GetValue("enter_username");
        this.__enter_password = LanguageService.GetValue("enter_password");
        this.__forgot_password = LanguageService.GetValue("forgot_password");
        this.__signin_login_btn = LanguageService.GetValue("signin_login_btn");
        this.__signin_footer_txt = LanguageService.GetValue("signin_footer_txt");
        this.__signin_new_user_btn = LanguageService.GetValue("signin_new_user_btn");
    }
}