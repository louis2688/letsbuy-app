export class Question {
    public question: string="";
    public answer: string="";
    public isOpen: boolean;
    public classification: string="";

    constructor(q: string, a: string, _classification: string) {
        this.question = q;
        this.answer = a;
        this.isOpen = false;
        this.classification = _classification;
    }
}

export class Contact {
    public id: string="";
    public name: string="";
    public email: string="";
    public msg: string="";
}