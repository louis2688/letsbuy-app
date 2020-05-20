import { Component, Injectable, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterViewModel, LetsBuyResponse, Location, RegisterUserData, Language } from '../../entities/index';
import { AuthenticationService, Languages, LanguageService, InputValidation, SignupService, ResourcesService } from '../../serivces/index';
import * as $ from 'jquery';

@Component({
    selector: 'ResetPassword',
    templateUrl: './ResetPassword.component.html',
    styleUrls: ['./ResetPassword.component.css'],
    providers: [RegisterViewModel, AuthenticationService, SignupService, ResourcesService]
})

@Injectable()
export class ResetPasswordComponent{

    public state: string="";
    public mailDelay: boolean = false;

    public mailAddress: string="";
    public token: string="";

    public isLoading: boolean = false;

    public password: string="";
    public passwordConfirm: string="";

    public error: string="";

    constructor(private auth: AuthenticationService, private aRouter: ActivatedRoute, private router: Router) {
        var _mail = aRouter.snapshot.queryParams["mail"];
        var _token = aRouter.snapshot.queryParams["token"];
        if (_mail && _token) {
            this.mailAddress = _mail;
            this.token = _token;
            this.state = "recive";
        }
        else {

            this.state = "mail";
            this.mailDelay = false;
        }

    }
    MailDelay() {
        this.mailDelay = !this.mailDelay;
    }

    async SendCode() {
        this.isLoading = true;
        var result = await this.auth.SendResetPassword(this.mailAddress);
        this.state = "send";
    }

    async SavePassword() {
        try {
            var tryReset = await this.auth.SaveResetPassword(this.password, this.passwordConfirm, this.token,this.mailAddress);
            if (tryReset) {
                this.router.navigate(['/Signin']);
                return;
            }
        } catch (e) {
            var data = e.json();
            if (data.modelState) {
                var valid = data.modelState;
                if (valid['model.Password']) {
                    this.error = valid['model.Password'];
                    return;
                }
                if (valid['model.ConfirmPassword']) {
                    this.error = valid['model.ConfirmPassword'];
                    return;
                }
            }
        }
    }

}
