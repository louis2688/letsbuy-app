import { Component, Injectable, AfterContentInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterViewModel, Location, RegisterUserData, Language } from '../../entities/index';
import { AuthenticationService, LanguageService, InputValidation, SendBirdService, SignupService, ResourcesService, UserProfileService } from '../../serivces/index';
import * as $ from 'jquery';
import { Dictionary } from "../../entities/category";

@Component({
    selector: 'Signup',
    templateUrl: './Signup.component.html',
    styleUrls: ['./Signup.component.css'],
    providers: [RegisterViewModel, AuthenticationService, SignupService, ResourcesService, UserProfileService, SendBirdService]
})

@Injectable()
export class SignupComponent implements AfterContentInit {

    public step: number;
    public register: RegisterViewModel;
    public mailValidationCode: MailValidationRepo;
    public registerUserData: RegisterUserData;
    public errorMsg: string="";
    public locations = [];
    public langs: Language[] = [];
    public selectedLangs: number[] = [];
    public tosText: string="";
    public tosAgree: boolean = false;
    public username: string="";

    public locationDic: Dictionary[] = [];
    public locationPlaceHolder: string="";

    public profileImage: string="";
    public loadingPicture: boolean = false;
    //#region Text Fields
    public __username: string="";
    public __password: string="";
    public __enter_username: string="";
    public __enter_password: string="";
    public __signin_footer_txt: string="";
    public __signup_title: string="";
    public __step: string="";
    public __subtitle_step0: string="";
    public __subtitle_step1: string="";
    public __password_again: string="";
    public __step1_next: string="";
    public __subtitle_step3: string="";
    public __name_lable: string="";
    public __fname: string="";
    public __lname: string="";
    public __more_lable: string="";
    public __email: string="";
    public __birthday: string="";
    public __location: string="";
    public __step2_next: string="";
    public __subtitle_step4: string="";
    public __language: string="";
    public __step4_next: string="";
    public __subtitle_step5: string="";
    public __otu: string="";
    public __agree: string="";
    public __step5_next: string="";
    public __subtitle_step6: string="";
    public __welcome: string="";
    public __congrats: string="";
    public __partof_line1: string="";
    public __partof_line2: string="";
    public __btn1: string="";
    public __btn2: string="";
    public __btn3: string="";
    public __btn4: string="";
    //#endregion

    @ViewChild('imageProfileUpload') fileInput!: ElementRef;

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private langService: LanguageService,
        private service: SignupService,
        private resService: ResourcesService,
        private user: UserProfileService,
        private sbService: SendBirdService) {

        this.InitText();

        this.register = new RegisterViewModel();
        this.mailValidationCode = new MailValidationRepo();
        this.registerUserData = new RegisterUserData();
        this.step = 0;

    }

    ngAfterContentInit() {
        this.service.GetSingupStage()
            .then(x => {
                if (x.isOk) {
                    if (x.Singel > 6) {
                        // this.router.navigate(['/Major']);
                        this.router.navigate(['/Search_specialist']);
                    }
                    if (x.Singel == 1 && AuthenticationService.isAuthenticated()) {
                        this.step = 2;
                    }
                    else {
                        this.step = x.Singel;
                    }
                    this.InitStep();
                }
                else {
                    this.errorMsg = x.Errors[0].Value;
                }
            },
            err => this.step = -1);

        $(document).on('focus', '.validationInput', function (event) {
            var elem = $(event.target);
            elem.val('');
        })

        $(document).on('keyup', '.validationInput', function (event) {
            var elem = $(event.target);
            var value = elem.val();
            if (!value) {
                value = "";
            }
            if (value.toString().length === 1 && !elem.hasClass('final')) {
                elem.next('.validationInput').focus();
            }
        })
    }

    private async InitStep() {
        this.errorMsg = "";

        switch (this.step) {
            case 2:
                var result = await this.service.GetMailValidation();
                if (!result.isOk) {
                    this.errorMsg = "server_error";
                }
                break;
            case 3:
                await this.resService.UpdateLocations().then(x => {
                    this.locations = this.resService.GetLocations()
                    for (var i = 0; i < this.locations.length; i++) {
                        this.locationDic.push(new Dictionary(String(this.locations[i].ID), this.locations[i].Name));
                    }
                });

                this.service.GetUserMail().then(x => {
                    if (x.isOk) {
                        this.registerUserData.Email = x.Singel;
                        this.registerUserData.LockMailInput = true;
                    }
                })
                break;
            case 4:
                this.langs = this.resService.GetLangs();
                this.resService.UpdateLangs().then(x => { this.langs = this.resService.GetLangs() });
                break;
            case 5:
                var tos_result = await this.resService.GetLastTosVersion();
                if (tos_result) {
                    if (tos_result.isOk) {
                        this.tosText = tos_result.Singel;
                    }
                }
                break;
            case 6:
                var complete_result = await this.service.CompleteSignup();
                if (complete_result && complete_result.isOk) {
                    // this.router.navigate(['/Major']);
                    this.router.navigate(['/Search_specialist']);
                    // this.username = complete_result.Singel;
                    // await this.user.LoadProfileFromServer();
                    // this.profileImage = "../../../assets/images/BG-finish.png";
                }
                break;
        }
    }
    public Next() {
        if (this.step >= 6) {
            return;
        }
        this.step++;
        this.InitStep();
    }
    public Prev() {
        if (this.step <= 1) {
            return;
        }
        this.step--;
        this.InitStep();
    }



    //#region Step 1
    public async Register() {
        try {
            if (!this.FormValid()) {
                return;
            }
            var tryRegister = await this.auth.Register(this.register);
            if (tryRegister) {
                this.sbService.RegisterUserNotifications();
                this.Next();
            }
        } catch (e) {
            this.errorMsg = e.message;
        }
    }

    public FormValid(): boolean {
        return InputValidation.Email(this.register.UserName) && InputValidation.Match(this.register.Password, this.register.ConfirmPassword);
    }
    //#endregion

    //#region Step2
    public async ValidMail() {
        if (this.mailValidationCode.IsOk()) {
            var result = await this.service.PostMailValidation(this.mailValidationCode.Value());
            if (result.isOk) {
                this.Next();
            }
            else {
                this.errorMsg = LanguageService.GetValue(result.Errors[0].Value);
            }
        }
    }

    public ResendCode() {
        this.service.GetMailValidation()
    }
    //#endregion

    public SetBitdayValue(value: string) {
        try {
            var day = Number(value.substring(8, 10));
            var month = Number(value.substring(5, 7)) - 1;
            var year = Number(value.substring(0, 4));

            var newDate = new Date();
            newDate.setFullYear(year);
            newDate.setMonth(month);
            newDate.setDate(day);

            this.registerUserData.Bithday = newDate;
        }
        catch (ex) {
        }
    }

    public async SaveRegisterData() {
        try {
            if (!this.registerUserData.Valid()) {
                return;
            }
            var result = await this.user.PostUserData(this.registerUserData);
            if (result) {
                if (result.isOk) {
                    this.Next();
                }
                else {
                    this.errorMsg = result.Errors[0].Value;
                }
            }
            else {
                this.errorMsg = LanguageService.GetValue("server_error");
            }
        } catch (e) {
            console.log(e);
        }
    }

    public AddRemoveLang(_checked: boolean, _id: number) {
        var index = this.selectedLangs.indexOf(_id);
        if (_checked) {
            if (index == -1) {
                this.selectedLangs.push(_id);
            }
        }
        else {
            if (index > -1) {
                this.selectedLangs.splice(index, 1);
            }
        }
    }

    public async UpdateLangs() {
        if (this.selectedLangs.length > 0) {
            var result = await this.user.PostUserLangs(this.selectedLangs);
            if (result) {
                if (result.isOk) {
                    this.Next();
                }
                else {
                    this.errorMsg = result.Errors[0].Value;
                }
            }
        }
        else {
            this.errorMsg = LanguageService.GetValue("under_min_items");
        }
    }

    public async tosAgreeBtn() {
        if (this.tosAgree) {
            var result = await this.resService.ApproveTosNewVersion();
            if (result && result.isOk) {
                this.Next();
                return;
            }
        }

        this.errorMsg = "Agree first";
    }

    public toggleFixedCssToMainContainer() {
        var pos = $('.main_container').css('position');
        if (pos == 'fixed') {
            $('.main_container').css('position', 'relative');
        }
        else {
            $('.main_container').css('position', 'fixed');
        }
    }

    public ChoosenUserLocation(item: Dictionary) {
        this.toggleFixedCssToMainContainer();
        if (item.key != '-1') {
            this.registerUserData.LocationID = parseInt(item.key);
            this.locationPlaceHolder = item.value;
        }
    }

    public SelectImageDialog() {
        this.fileInput.nativeElement.click();
    }

    public async SelectImage() {
        this.loadingPicture = true;
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('files', fileBrowser.files[0]);
            var result = await this.user.UploadProfileImage(formData);
            if (result.isOk) {
                this.profileImage = "background-image: url(" + result.Singel + ")";
            }
        }
        this.loadingPicture = false;
    }

    public GetBgImage() {
        return this.profileImage;
    }

    public InitText() {
        //initilize text elements:
        this.__username = LanguageService.GetValue("username");
        this.__password = LanguageService.GetValue("password");
        this.__enter_username = LanguageService.GetValue("enter_username");
        this.__enter_password = LanguageService.GetValue("enter_password");
        this.__signin_footer_txt = LanguageService.GetValue("signin_footer_txt");
        this.__signup_title = LanguageService.GetValue("signup_title");
        this.__step = LanguageService.GetValue("step");
        this.__subtitle_step0 = LanguageService.GetValue("subtitle_step0");
        this.__subtitle_step1 = LanguageService.GetValue("subtitle_step1");
        this.__password_again = LanguageService.GetValue("password_again");
        this.__step1_next = LanguageService.GetValue("step1_next");
        this.__subtitle_step3 = LanguageService.GetValue("subtitle_step3");
        this.__name_lable = LanguageService.GetValue("name_lable");
        this.__fname = LanguageService.GetValue("fname");
        this.__lname = LanguageService.GetValue("lname");
        this.__more_lable = LanguageService.GetValue("more_lable");
        this.__email = LanguageService.GetValue("email");
        this.__birthday = LanguageService.GetValue("birthday");
        this.__location = LanguageService.GetValue("location");
        this.__step2_next = LanguageService.GetValue("step2_next");
        this.__subtitle_step4 = LanguageService.GetValue("subtitle_step4");
        this.__language = LanguageService.GetValue("language");
        this.__step4_next = LanguageService.GetValue("step4_next");
        this.__subtitle_step5 = LanguageService.GetValue("subtitle_step5");
        this.__otu = LanguageService.GetValue("otu");
        this.__agree = LanguageService.GetValue("agree");
        this.__step5_next = LanguageService.GetValue("step5_next");
        this.__subtitle_step6 = LanguageService.GetValue("subtitle_step6");
        this.__welcome = LanguageService.GetValue("welcome");
        this.__congrats = LanguageService.GetValue("congrats");
        this.__partof_line1 = LanguageService.GetValue("partof_line1");
        this.__partof_line2 = LanguageService.GetValue("partof_line2");
        this.__btn1 = LanguageService.GetValue("btn1");
        this.__btn2 = LanguageService.GetValue("btn2");
        this.__btn3 = LanguageService.GetValue("btn3");
        this.__btn4 = LanguageService.GetValue("btn4");

        this.locationPlaceHolder = this.__location;
    }
}

export class MailValidationRepo {
    public one: number;
    public two: number;
    public three: number;
    public four: number;
    public five: number;
    public six: number;

    constructor() {
    }

    IsOk() {
        return this.one >= 0 && this.two >= 0 && this.three >= 0 && this.four >= 0 && this.five >= 0 && this.six >= 0;
    }

    Value(): string {
        return this.one.toString() + this.two.toString() + this.three.toString() + this.four.toString() + this.five.toString() + this.six.toString();
    }
}