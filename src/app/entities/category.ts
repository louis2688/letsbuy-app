
export class SelectableCategory {
    public ID: string="";
    public Name: string="";
    public sub_categories: SelectableCategory[]=[];

    get id():string {
        return this.ID;
    }

    set id(value: string) {
        this.ID = value;
    }

    get name() {
        return this.Name;
    }

    set name(value: string) {
        this.Name = value;
    }

    public chacked: boolean = false;
    public isOpen: boolean = false;

}


export class Location {
    public ID: number;
    public Name: string;
}

export class Language {
    public ID: number=0;
    public DispalyName: string="";
    public chacked: boolean = false;

    constructor(_DispalyName: string) {
        this.DispalyName = _DispalyName;
    }
}


export class Dictionary
{
    public key: string="";
    public value: string="";

    constructor(_key: string="", _value: string="") {
        this.key = _key;
        this.value = _value;
    }
    
}
export class SelectableDictionary extends Dictionary {
    public selected: boolean = false;
    constructor(_key: string, _value: string) {
        super(_key, _value);
    }

}