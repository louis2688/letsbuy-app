import { } from './index'
import { Language, SelectableCategory, Location } from "./category";

export class User {

    constructor(
        _id: string="",
        _fname: string="",
        _lname: string="",
        _picture: string = "",
        _birthday: Date = new Date(),
        _specialitiesList: SelectableCategory[]=[],
        _newUserChats: number=0,
        _newSpecialistChats: number=0,
        _newWishes: number=0,
        _newSells: number=0,
        _languagesList: Language[]=[]
    ) {
        this.id = _id;
        this.fname = _fname;
        this.lname = _lname;
        this.picture = _picture;
        this.birthday = _birthday;
        this.specialitiesList = [];
        this.newUserChats = _newUserChats;
        this.newSpecialistChats = _newSpecialistChats;
        this.newWishes = _newWishes;
        this.newSells = _newSells;
        this.languagesList = _languagesList;
    }

    public id: string;
    public fname: string;
    public lname: string;
    public nickname: string;
    public email: string = "";
    public location: number = -1;
    public picture: string;
    public cover_picture: string;
    public birthday: Date;
    public specialitiesList: SelectableCategory[];
    public newUserChats: number;
    public newSpecialistChats: number;
    public blockedAdviser: boolean = true;
    
    public newWishes: number;
    public newSells: number;
    public newBuys: number = 0;
    public languagesList: Language[];

    public isAvailable: boolean = false;
    public isFollow: boolean = false;
    public rate: number = 0;
    public totalSells: number = 0;
    public numDaysFromLastSale: number=0;
    public sumSalesInLastMonth: number = 0;

    public isLoggedUser: boolean = false;
}

export class BankAccount{
    public Bank: string;
    public Branch: string;
    public Account: string;
    public Phone: string;
    public Address: string;

}

export class Chat {
    public id: string = "";
    public name: string;
    public picture: string;
    public isSpecialist: boolean;
    public isAvailable: boolean;
    public lastMassage: string;
    public isFavor: boolean;
    public time: string;
    public notification: number;

    get timeString(): string{
        try {
            var timestep = Number(this.time);
            var date = new Date(timestep);
            console.log(date);
            console.log(this.time);
            console.log(timestep);
            if (date != null) {
                return date.toDateString();
            }
        } catch (e) {
            
        }
        return "";
    }

    constructor
        (
        _name: string,
        _picture: string,
        _isSpecialist: boolean,
        _isAvailable: boolean,
        _lastMassage: string,
        _isFavor: boolean,
        _time: string,
        _notification: number
        ) {
        this.name = _name;
        this.picture = _picture;
        this.isSpecialist = _isSpecialist;
        this.isAvailable = _isAvailable;
        this.lastMassage = _lastMassage;
        this.isFavor = _isFavor;
        this.time = _time;
        this.notification = _notification;
    }


}
export class userReviewPage {
    public canChat: boolean;
    public canAdd: boolean;
    public items: userReview[];
}

export class userReview {
    public int: number = -1;
    public name: string = "";
    public picture: string = "";
    public rating: number=0;
    public description: string = "";
    public time: Date = new Date();

    public specID: string = "";

    
}