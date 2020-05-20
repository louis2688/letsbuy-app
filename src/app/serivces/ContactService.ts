import { Injectable } from '@angular/core';
import { Contact } from "../entities/faq";
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';

@Injectable()
export class ContactService {

    constructor(private http: SecureHttp, private _strings: ShaerdStrings) { }

    SendMsg(msg: Contact) {
        var url = this._strings.contactUs_post;
        return this.http._post<boolean>(url, msg);
    }
}