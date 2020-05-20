

export class LetsBuyResponse<T>{
    Singel!: T;
    List: T[]=[];
    Errors: ErrorItem[]=[];
    isOk: boolean = false;
    isList: boolean = false;
}

export class ErrorItem {
    Key: string="";
    Value: string="";
}

export class ForUserError extends Error{
    constructor(msg: string) {
        super(msg);
    }
}

export class UserProfile {

    constructor() {
        this.friendlyName = "Guest";
        this.isGuest = true;
        this.isSpec = false;

        this.categoriesVer = -1;
        this.countriesVer = -1;
        this.languagesVer = -1;
        this.statesVer = -1;

        this.lastUpdate = new Date(2016, 1, 1);

        this.signupStep = 0;
    }

    friendlyName: string;
    imageUrl: string="";
    isGuest: boolean;
    isSpec: boolean;
    blockedAdviser: boolean;
    categoriesVer: number;
    countriesVer: number;
    languagesVer: number;
    statesVer: number;
    lastUpdate: Date;
    signupStep: number;
}
