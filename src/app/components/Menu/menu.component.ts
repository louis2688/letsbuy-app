import { Component, Input, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { LanguageService, UserProfileService } from "../../serivces/index";
import { Pop_shareComponent } from "../Pop_share/Pop_share.component";

@Component({
  selector: "Menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent {
  public get isSpecialist() {
    var user = UserProfileService.GetUserProfile();
    if (user != null) {
      return user.isSpec;
    }
    return false;
  }
  public get isGuest() {
    var user = UserProfileService.GetUserProfile();
    if (user != null) {
      return user.isGuest;
    }
    return false;
  }
  public get isBlockedAdviser() {
    var user = UserProfileService.GetUserProfile();
    if (user != null) {
      return user.blockedAdviser;
    }
    return true;
  }
  public is: boolean = false;
  public isOpen: boolean = false;
  @Input() hideMenu: boolean = false;
  @Input() hideBack: boolean = false;
  @Input() menuBg: boolean = false;
  @Input() smallSize: boolean = false;
  @ViewChild(Pop_shareComponent) childcmp: Pop_shareComponent | undefined;

  public __left_menu_title: string = "";
  public __left_menu_btn1: string = "";
  public __left_menu_btn2: string = "";
  public __left_menu_btn3: string = "";
  public __left_menu_btn4: string = "";
  public __left_menu_btn5: string = "";
  public __left_menu_btn6: string = "";
  public __left_menu_btn7: string = "";

  constructor(private _location: Location) {
    this.InitText();
  }

  InitText() {
    this.__left_menu_title = LanguageService.GetValue("left_menu_title");
    this.__left_menu_btn1 = LanguageService.GetValue("left_menu_btn1");
    this.__left_menu_btn2 = LanguageService.GetValue("left_menu_btn2");
    this.__left_menu_btn3 = LanguageService.GetValue("left_menu_btn3");
    this.__left_menu_btn4 = LanguageService.GetValue("left_menu_btn4");
    this.__left_menu_btn5 = LanguageService.GetValue("left_menu_btn5");
    this.__left_menu_btn6 = LanguageService.GetValue("left_menu_btn6");
    this.__left_menu_btn7 = LanguageService.GetValue("left_menu_btn7");
  }
  public toogleMenu() {
    this.isOpen = !this.isOpen;
  }

  public GoBack() {
    this._location.back();
  }

  public OpenShare() {
    if (this.childcmp) {
      this.childcmp.open();
      this.toogleMenu();
    }
  }
}
