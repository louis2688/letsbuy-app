import { BrowserModule } from '@angular/platform-browser';
import { NgModule,InjectionToken, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRouteSnapshot } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authComplateComponent } from './components/authComplate/authComplate.component';

import { SelectMultiValueComponent } from './components/SelectMultiValue/SelectMultiValue.component';
import { New_linkComponent } from './components/New_link/New_link.component';
import { BagComponent } from './components/Bag/Bag.component';
import { DesktopMenuComponent } from './components/DesktopMenu/DesktopMenu.component';
import { FollowComponent } from './components/Follow/Follow.component';
import { RenewTOUComponent } from './components/RenewTOU/RenewTOU.component';
import { Pop_messageComponent } from './components/Pop_message/Pop_message.component';
import { Pop_shareComponent } from './components/Pop_share/Pop_share.component';
import { Mail_DelayComponent } from './components/Mail_Delay/Mail_Delay.component';
import { Blog_postComponent } from './components/Blog_post/Blog_post.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { OpeningComponent } from './components/Opening/Opening.component';
import { My_buysComponent } from './components/My_buys/My_buys.component';
import { My_sellsComponent } from './components/My_sells/My_sells.component';
import { Hi_infoComponent } from './components/Hi_info/Hi_info.component';
import { Found_productComponent } from './components/Found_product/Found_product.component';
import { Found_specialistComponent, Best_specialistComponent } from './components/SpecialistResults/index';
import { Search_specialistComponent } from './components/Search_specialist/Search_specialist.component';
import { Chat_SpecialityComponent } from './components/Chat_Speciality/Chat_Speciality.component';
import { MajorComponent } from './components/Major/Major.component';
import { Major2Component } from './components/Major2/Major2.component';
import { My_chatsComponent } from './components/My_chats/My_chats.component';
import { Search_productComponent } from './components/Search_product/Search_product.component';
import { DealComponent } from './components/Deal/Deal.component';
import { SigninComponent } from './components/Signin/Signin.component';
import { SignupComponent } from './components/Signup/Signup.component';
import { ResetPasswordComponent } from './components/ResetPassword/ResetPassword.component';
import { LoadingBarComponent } from './components/LoadingBar/LoadingBar.component';
import { Contact_usComponent } from './components/Contact_us/Contact_us.component';
import { Best_blogsComponent } from './components/Best_blogs/Best_blogs.component';
import { My_linksComponent } from './components/My_links/My_links.component';
import { Right_menuComponent } from './components/Right_menu/Right_menu.component';
import { SitesComponent } from './components/Sites/Sites.component';
import { About_usComponent } from './components/About_us/About_us.component';
import { FAQComponent } from './components/FAQ/FAQ.component';
import { EditPersonalInfoComponent } from './components/EditPersonalInfo/EditPersonalInfo.component';
import { EditAccountInfoComponent } from './components/EditAccountInfo/EditAccountInfo.component';
import { ReviewsComponent } from './components/Reviews/Reviews.component';
import { LogoComponent } from './components/Logo/Logo.component';
import { IframeComponent } from './components/Iframe/Iframe.component';
import { TypeingComponent } from './components/Typeing/Typeing.component';
import { WishlistComponent } from './components/Wishlist/Wishlist.component';
import { ToastComponent } from './components/Toast/Toast.component';
import { Edit_linkComponent } from './components/New_link/Edit_link.component';
import { Site_followComponent } from './components/Site_follow/Site_follow.component';
import { Select_cmpComponent } from './components/Select_cmp/Select_cmp.component';
import { Add_postComponent } from './components/Add_post/Add_post.component';
import { Edit_postComponent } from './components/Add_post/Edit_post.component';
import { EditLanguagesListComponent } from './components/EditLanguagesList/EditLanguagesList.component';
import { EditSpecialistCategoriesComponent } from './components/EditSpecialistCategories/EditSpecialistCategories.component';
import { SecureHttp, ShaerdStrings, DefaultCoverImageFilter, ShortPinnedItems, DefaultImagePostFilter, LanguageService, DefaultImageLinkFilter, DefaultImageProfilFilter, FolderLinksFilter, BuysFilter, ReviewFilter, SiteFilter, ChatFilter, AuthenticationService, QuestionFilter, clipSafeFilter, ProductFilter, maxWidthFilter, queryResultOrderFilter, productsResultOrderFilter, EmptyImageFilter, image64SecureFilter, image64SecureFilterToStyle, ReverseListPipe, HybridLinkPipe, postByCategoriesFilter } from './serivces/index'
import { AuthGuard, UserProfileGuard, OnlyMember } from './guards/UserStatus.Guard';
import { Image_FoucsComponent } from './components/Image_Foucs/Image_Foucs.component';
import { MenuComponent } from './components/Menu/menu.component';
import { My_HiComponent } from './components/My_Hi/My_hi.component';
import { GoToLinkComponent } from './components/GoToLink/GoToLink.component';
import { RedirectGuard } from './external-url.directive';
import { ConfigService } from './ConfigService';
import { MetaModule } from 'ng2-meta';
import { EBayService } from './serivces/e-bay.service';


export function configFactory(config: ConfigService) {
  return  () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    Add_postComponent,
    NavMenuComponent,
    authComplateComponent,
    Image_FoucsComponent,
    FollowComponent,
    Edit_postComponent,
    BagComponent,
    Edit_linkComponent,
    SelectMultiValueComponent,
    EditLanguagesListComponent,
    ToastComponent,
    EditSpecialistCategoriesComponent,
    EditPersonalInfoComponent,
    EditAccountInfoComponent,
    OpeningComponent,
    IframeComponent,
    Hi_infoComponent,
    MajorComponent,
    Major2Component,
    New_linkComponent,
    My_chatsComponent,
    SigninComponent,
    SignupComponent,
    Site_followComponent,
    Search_specialistComponent,
    Found_specialistComponent,
    Found_productComponent,
    Search_productComponent,
    My_buysComponent,
    My_sellsComponent,
    My_HiComponent,
    DealComponent,
    MenuComponent,
    Select_cmpComponent,
    Pop_messageComponent,
    RenewTOUComponent,
    Blog_postComponent,
    Chat_SpecialityComponent,
    Best_specialistComponent,
    LoadingBarComponent,
    clipSafeFilter,
    maxWidthFilter,
    queryResultOrderFilter,
    productsResultOrderFilter,
    EmptyImageFilter,
    LoadingBarComponent,
    Contact_usComponent,
    Best_blogsComponent,
    My_linksComponent,
    Right_menuComponent,
    SitesComponent,
    About_usComponent,
    FAQComponent,
    image64SecureFilter,
    image64SecureFilterToStyle,
    ReviewsComponent,
    Mail_DelayComponent,
    ResetPasswordComponent,
    WishlistComponent,
    LogoComponent,
    TypeingComponent,
    Pop_shareComponent,
    DesktopMenuComponent,
    ProductFilter,
    QuestionFilter,
    ChatFilter,
    SiteFilter,
    ReviewFilter,
    BuysFilter,
    FolderLinksFilter,
    DefaultImageProfilFilter,
    ReverseListPipe,
    DefaultImageLinkFilter,
    DefaultCoverImageFilter,
    DefaultImagePostFilter,
    ShortPinnedItems,
    GoToLinkComponent,
    HybridLinkPipe,
    postByCategoriesFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule, 
    FormsModule,
    MetaModule.forRoot()
  ],
  providers: [
    EBayService,
    AuthGuard,
    UserProfileGuard,
    SecureHttp,
    ShaerdStrings,
    LanguageService,
    AuthenticationService,
    OnlyMember,
    RedirectGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
