import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../serivces/index';
import { UserProfileService } from "../../serivces/UserProfileService";
import { ContactService } from "../../serivces/ContactService";
import { Contact } from "../../entities/faq";

@Component({
    selector: 'Contact_us',
    templateUrl: './Contact_us.component.html',
    styleUrls: ['./Contact_us.component.css'],
    providers: [UserProfileService, ContactService]
})

export class Contact_usComponent {
    public __contact_us_title: string = "";
    public __contact_us_subtitle: string = "";
    public __static_txt_line1: string = "";
    public __static_txt_line2: string = "";
    public __static_txt_line3: string = "";
    public __static_txt_line4: string = "";
    public __static_txt_line5: string = "";
    public __write_message: string = "";
    public __aboutUs_btn: string = "";
    public __faq_btn: string = "";
    public __send_btn: string = "";

    public isGuest: boolean;
    public msg: Contact;
    public errorMsgName: string="";
    public errorMsgEmail: string="";
    public errorMsgMsg: string="";
    public successMsg: string="";
    public errorMsg: string = "";

    public isLoading: boolean = false;
    public isSent: boolean = false;

    constructor(private contactService: ContactService) {
        this.msg = new Contact();
        this.isGuest = UserProfileService.GetUserProfile().isGuest;
        this.InitText();
    }

    async SendMsg() {

        if (this.ValidForm()) {
            this.isLoading = true;
            var res = await this.contactService.SendMsg(this.msg);
            this.isLoading = false;
            this.isSent = true;
            if (res.isOk) {
                this.successMsg = "The message sent successfully";
                this.msg = new Contact();
                setTimeout(() => {
                    this.isSent = false;
                    this.successMsg = "";
                }, 3000)
            }
            else {
                this.errorMsg = "Server error please try again later";
                this.msg = new Contact();
                setTimeout(() => {
                    this.isSent = false;
                    this.errorMsg = "";
                }, 3000)
            }
        }
    }

    ValidForm() {
        if (this.msg.msg == "" || !this.msg.msg) {
            this.errorMsgMsg = "Please enter message content!";
        }
        else {
            this.errorMsgMsg = "";
        }

        if (this.isGuest) {
            if (!this.msg.name || this.msg.name == "") {
                this.errorMsgName = "Please enter your name!";
            }
            else {
                this.errorMsgName = "";
            }

            if (!this.ValidateEmail(this.msg.email)) {
                this.errorMsgEmail = "Please enter valid email!";
            }
            else {
                this.errorMsgEmail = "";
            }
        }

        return this.errorMsgMsg == "" && this.errorMsgName == "" && this.errorMsgEmail == "";
    }

    InitText() {
        this.__contact_us_title = LanguageService.GetValue("contact_us_title");
        this.__contact_us_subtitle = LanguageService.GetValue("contact_us_subtitle");
        this.__static_txt_line1 = LanguageService.GetValue("static_txt_line1");
        this.__static_txt_line2 = LanguageService.GetValue("static_txt_line2");
        this.__static_txt_line3 = LanguageService.GetValue("static_txt_line3");
        this.__static_txt_line4 = LanguageService.GetValue("static_txt_line4");
        this.__static_txt_line5 = LanguageService.GetValue("static_txt_line5");
        this.__write_message = LanguageService.GetValue("write_message");
        this.__aboutUs_btn = LanguageService.GetValue("aboutUs_btn");
        this.__faq_btn = LanguageService.GetValue("faq_btn");
        this.__send_btn = LanguageService.GetValue("send_btn");
    }

    ValidateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

}