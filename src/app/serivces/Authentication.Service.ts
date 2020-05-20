import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { LocalStorage } from './LocalStorage';
import { ShaerdStrings } from './ShaerdStrings';
// import { UserProfileService } from './UserProfileService';
import { LanguageService } from './LangManager';
import { GetTokenViewModel, RegisterViewModel, LoginViewModel, RegisterExternalViewModel } from '../entities/auth';
import { ForUserError } from '../entities/base';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private nav :Router) { }

    public static isAuthenticated(): boolean {

        var token = LocalStorage.GetString(ShaerdStrings.keys_token);
        if (token && token.length > 0) {
            return true;
        }
        return false;
    }
    public static ClearToken() {
        LocalStorage.removeItem(ShaerdStrings.keys_token);
        LocalStorage.removeItem(ShaerdStrings.keys_rtoken);
        LocalStorage.removeItem(ShaerdStrings.keys_tokenExp);
    }
    public static Token(): string {
        if (AuthenticationService.isAuthenticated()) {
            var value = LocalStorage.GetString(ShaerdStrings.keys_token);
            if (value != null) {
                return value;
            }
        }

        return "";
    }
    private async RefreshToken(http: Http,redirectOnFail: boolean = true): Promise<boolean> {
        var refreshToken = LocalStorage.GetString(ShaerdStrings.keys_rtoken);
        var model = new GetTokenViewModel();
        model.InitByToken(refreshToken);
        return await this.GetToken(model,redirectOnFail);
    }

    public async ValidToken(redirectOnFail: boolean = true) {
        if (AuthenticationService.isAuthenticated()) {
            var tokenExpString = LocalStorage.GetString(ShaerdStrings.keys_tokenExp);
            var tokenExpDate = new Date(tokenExpString);
            var currentDate = new Date();
            var errorDate = tokenExpString == "Invalid Date" || tokenExpString == "" || tokenExpDate.toString() == "Invalid Date";
            if (errorDate || currentDate > tokenExpDate) {
                var refrashResult = await this.RefreshToken(this.http,redirectOnFail);
                return true;
            } 
            return false;
        }

    }
    public async Register(model: RegisterViewModel): Promise<boolean> {
        var _string = new ShaerdStrings();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var data = JSON.stringify(model);
        return this.http.post(_string.auth_register, data , options).toPromise() //Register
            .then(async res => {
                if (res.status == 200) { // Register ok
                    return await this.LoginWithParameters(model.UserName, model.Password);
                }
                return false;
            },
            async err => {
                if (err.status == 400) {
                    var data = err.json();
                    if (data['modelState'][""][0].indexOf("is already taken") > 0) {
                        throw new ForUserError(LanguageService.GetValue("username_exist"));
                    }
                }
                this.handleError(err);
                return false;
            }
        );
    }
    public async LoginWithParameters(username: string, password: string): Promise<boolean> {
        var model = new LoginViewModel();
        model.UserName = username;
        model.Password = password;
        return await this.Login(model);
    }
    public async Login(model: LoginViewModel): Promise<boolean> {

        var _data = new GetTokenViewModel();
        _data.InitByPassword(model);

        var resilt = await this.GetToken(_data);
        return resilt;

    }
    public async SendResetPassword(mail: string) {
        var _string = new ShaerdStrings();
        var url = _string.auth_get_reset_password + "?mail=" + mail;
        return this.http.get(url).toPromise();
    }
    public async SaveResetPassword(password: string,passwordConfirm:string, token: string, mail:string) {
        var _string = new ShaerdStrings();
        var url = _string.auth_get_reset_password;
        var data = {
            'Token': token,
            'Mail': mail,
            'Password': password,
            'ConfirmPassword': passwordConfirm
        }
        return this.http.post(url,data).toPromise();
    }

    public async RegisterExternal(model: RegisterExternalViewModel): Promise<boolean> {
        var _string = new ShaerdStrings();
        var url = _string.auth_external_register;

        var getToken: boolean = await this.http.post(url, model)
            .toPromise()
            .then(res => {
                var data = res.json();
                if (data && data.access_token) {
                    LocalStorage.SetString(ShaerdStrings.keys_token, data.access_token);
                    LocalStorage.SetString(ShaerdStrings.keys_rtoken, data.refresh_token);
                    var exp = new Date(data['.expires']);
                    LocalStorage.SetString(ShaerdStrings.keys_tokenExp, exp.toString());
                    return true;
                }
                return false;
            })
            .catch(res => { console.log(res); return false; })

        if (getToken) {
            url = _string.user_registerExternal;
            var headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AuthenticationService.Token() });
            var register = await this.http.post(url, {}, new RequestOptions({ headers: headers }))
                .toPromise()
                .then(x => { return x.json().isOk })
                .catch(res => { console.log(res); return false; })

            return register;
        }

        return false;
    }
    public async LoginExternal(provider: string, externalAccessToken: string): Promise<boolean> {

        var _string = new ShaerdStrings();
        var url = _string.auth_external_login;
        var data = { "Provider": provider, "ExternalAccessToken": externalAccessToken };
        var options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        var login: boolean = await this.http.post(url, data, options)
            .toPromise()
            .then(res => {
                var data = res.json();
                if (data && data.access_token) {
                    LocalStorage.SetString(ShaerdStrings.keys_token, data.access_token);
                    LocalStorage.SetString(ShaerdStrings.keys_rtoken, data.refresh_token);
                    var exp = new Date(data['.expires']);
                    LocalStorage.SetString(ShaerdStrings.keys_tokenExp, exp.toString());
                    return true;
                }
                return false
            })
            .catch(res => { console.log(res); return false; })

        return login;

    }

    private async GetToken(model: GetTokenViewModel, redirect: boolean = true): Promise<boolean> {
        var _string = new ShaerdStrings();
        var url = _string.auth_token;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        var data = model.GetString();

        var result = await this.http.post(url, data, options).toPromise()
            .then(res => {
                if (res.status == 200) {
                    var data = res.json();
                    if (data && data.access_token) {
                        LocalStorage.SetString(ShaerdStrings.keys_token, data.access_token);
                        LocalStorage.SetString(ShaerdStrings.keys_rtoken, data.refresh_token);
                        var exp = new Date(data['.expires']) || new Date().setMinutes(new Date().getMinutes() + 25);
                        LocalStorage.SetString(ShaerdStrings.keys_tokenExp, exp.toString());
                        return true;
                    }
                }
                return false;
            }, (err: Response) => {
                if (err.status == 400) {
                    var data = err.json();
                    if (data.error_description) {
                        if (data.error_description === "The user name or password is incorrect.") {
                            var errorMsg = LanguageService.GetValue("invaild_login");
                            throw new ForUserError(errorMsg);
                        }  
                    }
                    else if (data.error && data.error == "invalid_grant") {
                        if(redirect){
                            this.nav.navigate(["/Signin"]);
                        }
                        return false;
                    }
                }
                else if (err.status == 0) {
                    var errorMsg = LanguageService.GetValue("server_error");
                    throw new ForUserError(errorMsg);
                }

                return false;
            });

        return result;
    }
    private handleError(error: Response) {
        if (error.status == 401) {
            console.log('Auth not valid - reset token data');
            AuthenticationService.ClearToken();
        }
        throw new Error(error.json().message);
    } 
}
