import { InputValidation } from "../serivces/InputValidation";
import { LanguageService } from "../serivces/LangManager";

export class RegisterViewModel {
    constructor() {};
    public UserName: string="";
    public Password: string="";
    public ConfirmPassword: string="";

    public userNameError: string="";
    public passwordError: string="";
    public confirmPasswordError: string="";

    public Valid(): boolean {
        var flag = true;
        if (this.UserName && !InputValidation.Email(this.UserName)) {
            this.userNameError = LanguageService.GetValue("Invalid_email");
            flag = false;
        }
        else {
            this.userNameError = "";
        }

        if (this.Password && this.Password.length < 6) {
            this.passwordError = LanguageService.GetValue("short_password");
            flag = false;
        }
        else {
            this.passwordError = "";
        }

        if (this.Password && this.ConfirmPassword && !InputValidation.Match(this.Password, this.ConfirmPassword)) {
            this.confirmPasswordError = LanguageService.GetValue("password_not_match");
            flag = false;
        }
        else {
            this.confirmPasswordError = "";
        }

        return flag;
    }
}

export class GetTokenViewModel {
    constructor() {
        this.client_id = "ngApp";
    }

    public InitByPassword(data: LoginViewModel) {
        this.username = data.UserName;
        this.password = data.Password;
        this.grant_type = "password";
    }

    public InitByToken(token: string) {
        this.refresh_token = token;
        this.grant_type = "refresh_token";
    }

    public GetString() {
        return 'grant_type=' + this.grant_type + '&username=' + this.username + '&password=' + this.password + '&refresh_token=' + this.refresh_token + '&client_id=' + this.client_id;
    }

    private grant_type: string="";
    private username: string="";
    private password: string="";
    private refresh_token: string="";
    private client_id: string="";
}

export class LoginViewModel {
    public UserName: string="";
    public Password: string="";
    constructor() { }
}


export class RegisterExternalViewModel {
    public UserName: string="";
    public Provider: string="";
    public ExternalAccessToken: string="";
}

export enum TokenTypes {
    password,
    refresh_token
}

export class RegisterUserData {
    constructor() {
        this.LocationID = 0;
    }

    public FirstName: string="";
    public LastName: string="";
    public Nickname: string="";
    public Email: string="";
    public Bithday: Date=new Date();
    public LocationID: number;

    public NicknameError: string="";
    public FirstNameError: string="";
    public LastNameError: string="";
    public EmailError: string="";
    public BithdayError: string="";
    public LocationIDError: string="";

    public LockMailInput: boolean = false;

    public Valid(): boolean {
        var result = true;
        if (this.FirstName == null) {
            this.FirstNameError = LanguageService.GetValue("required_field");
            result =  false;
        }
        else {
            this.FirstNameError = "";
        }

        if (this.LastName == null) {
            this.LastNameError = LanguageService.GetValue("required_field");
            result = false;
        }
        else {
            this.LastNameError = "";
        }

        if (this.Email == null) {
            this.EmailError = LanguageService.GetValue("required_field");
            result = false;
        }
        else {
            this.EmailError = "";
        }

        if (this.LocationID == 0) {
            this.LocationIDError = LanguageService.GetValue("required_field");
            result = false;
        }
        else {
            this.LocationIDError = "";
        }

        return result;
    }
}