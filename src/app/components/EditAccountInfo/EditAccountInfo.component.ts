import { Component } from '@angular/core';
import { LanguageService } from "../../serivces/LangManager";
import { UserProfileService } from 'src/app/serivces';
import { BankAccount } from 'src/app/entities';

@Component({
    selector: 'EditAccountInfo',
    templateUrl: './EditAccountInfo.component.html',
    styleUrls: ['./EditAccountInfo.component.css']
})
export class EditAccountInfoComponent {
    public __credit_card: string = "";
    public __credit_type: string="";
    public __exp: string="";
    public __edit: string="";

    btn_text : string = 'Update';
    bank : BankAccount;
    constructor(private service: UserProfileService) {
        this.InitText();
        this.service.GetBankAccount().then(x=>{
            if(x.isOk){
                this.bank = x.Singel;
            }
        })
    }
    Save(){
        this.service.UpdateBankAccount(this.bank).then(x=>{
            if(x.isOk){
                this.btn_text = "Saved";
            }
        })
    }
    InitText() {
        this.__credit_card = LanguageService.GetValue("credit_card");
        this.__credit_type = LanguageService.GetValue("credit_type");
        this.__exp = LanguageService.GetValue("exp");
        this.__edit = LanguageService.GetValue("edit");
    }
}
