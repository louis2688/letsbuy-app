import { Injectable } from '@angular/core';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
@Injectable()
export class SignupService {
    constructor(private _http: SecureHttp, private _strings: ShaerdStrings) { }

    public async GetSingupStage() {
        var url = this._strings.user_signupstep;
        return this._http._get<number>(url,false);
    }
    public async GetMailValidation() {
        return this._http._get<boolean>(this._strings.user_mailValid);
    }
    public async PostMailValidation(code: string) {
        return this._http._post<boolean>(this._strings.user_mailValid, { "Code": code });
    }

    public async CompleteSignup() {
        return this._http._get<string>(this._strings.user_completeSignup);
    }

    public async GetUserMail() {
        return this._http._get<string>(this._strings.user_getMail);
    }

}