import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authComplateComponent } from './components/authComplate/authComplate.component';

import { SelectMultiValueComponent } from './components/SelectMultiValue/SelectMultiValue.component';
import { New_linkComponent } from './components/New_link/New_link.component';
import { BagComponent } from './components/Bag/Bag.component';
import { DesktopMenuComponent } from './components/DesktopMenu/DesktopMenu.component';
import { FollowComponent } from './components/Follow/Follow.component';
import { RenewTOUComponent } from './components/RenewTOU/RenewTOU.component';
import { Pop_messageComponent } from './components/Pop_message/Pop_message.component';
import { Blog_postComponent } from './components/Blog_post/Blog_post.component';
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
import { IframeComponent } from './components/Iframe/Iframe.component';
import { WishlistComponent } from './components/Wishlist/Wishlist.component';
import { ToastComponent } from './components/Toast/Toast.component';
import { Edit_linkComponent } from './components/New_link/Edit_link.component';
import { Site_followComponent } from './components/Site_follow/Site_follow.component';
import { Select_cmpComponent } from './components/Select_cmp/Select_cmp.component';
import { Add_postComponent } from './components/Add_post/Add_post.component';
import { Edit_postComponent } from './components/Add_post/Edit_post.component';
import { EditLanguagesListComponent } from './components/EditLanguagesList/EditLanguagesList.component';
import { EditSpecialistCategoriesComponent } from './components/EditSpecialistCategories/EditSpecialistCategories.component';
import { UserProfileGuard, OnlyMember } from './guards/UserStatus.Guard';
import { Image_FoucsComponent } from './components/Image_Foucs/Image_Foucs.component';
import { My_HiComponent } from './components/My_Hi/My_hi.component';
import { MenuComponent } from './components/Menu/menu.component';
import { GoToLinkComponent } from './components/GoToLink/GoToLink.component';
import { RedirectGuard } from './external-url.directive';

const routes: Routes = [
  { path: 'Opening/:platform', component: OpeningComponent, canActivate: [UserProfileGuard] },
  { path: 'Opening', component: OpeningComponent, canActivate: [UserProfileGuard] },
  { path: 'New_link/:url', component: New_linkComponent },
  { path: 'Site_follow', component: Site_followComponent },
  { path: 'Add_post', component: Add_postComponent },
  { path: 'Add_post/:id', component: Add_postComponent },
  { path: 'Edit_post/:id', component: Edit_postComponent },
  { path: 'New_link/:url/:id', component: New_linkComponent },
  { path: 'Edit_link/:id', component: Edit_linkComponent },
  { path: 'My_Hi/:id', component: My_HiComponent },
  { path: 'GoToLink/:id', component: GoToLinkComponent },
  { path: 'Image_Foucs', component: Image_FoucsComponent },
  { path: 'My_hi', component: My_HiComponent, canActivate: [OnlyMember] },
  { path: 'SelectMultiValue', component: SelectMultiValueComponent },
  { path: 'authComplate/:external_access_token/:provider/:external_user_name/:haslocalaccount', component: authComplateComponent },
  { path: 'Toast', component: ToastComponent }, 
  { path: 'DesktopMenu', component: DesktopMenuComponent },
  { path: 'Select_cmp', component: Select_cmpComponent },
  { path: 'EditLanguagesList', component:EditLanguagesListComponent },
  { path: 'Follow', component: FollowComponent },
  { path: 'Bag', component: BagComponent },
  { path: 'Iframe_win', component: IframeComponent },
  { path: 'RenewTOU', component: RenewTOUComponent },
  { path: 'RenewTOU/:readonly', component: RenewTOUComponent },
  { path: 'EditSpecialistCategories', component: EditSpecialistCategoriesComponent },
  { path: 'EditAccountInfo', component: EditAccountInfoComponent },
  { path: 'EditPersonalInfo', component: EditPersonalInfoComponent },
  { path: 'Reviews/:id', component: ReviewsComponent },
  { path: 'Wishlist', component: WishlistComponent, canActivate: [OnlyMember]},
  { path: 'FAQ', component: FAQComponent },
  { path: 'About_us', component: About_usComponent },
  { path: 'Sites', component: SitesComponent },
  { path: 'Right_menu', component: Right_menuComponent },
  { path: 'My_links', component: My_linksComponent, canActivate: [OnlyMember]},
  { path: 'Best_blogs', component: Best_blogsComponent },
  { path: 'Contact_us', component: Contact_usComponent },
  { path: 'Blog_post/:id', component: Blog_postComponent},
  { path: 'My_buys', component: My_buysComponent, canActivate: [OnlyMember]},
  { path: 'Menu', component: MenuComponent },
  { path: 'Pop_message', component: Pop_messageComponent },
  { path: 'My_sells', component: My_sellsComponent, canActivate: [OnlyMember]},
  { path: 'Deal/:id', component: DealComponent },
  { path: 'Found_specialist/:id', component: Found_specialistComponent },
  { path: 'Hi_info', component: Hi_infoComponent },
  { path: 'Hi_info/:stat', component: Hi_infoComponent },
  { path: 'Major', component: MajorComponent },
  { path: 'Major2', component: Major2Component },
  { path: 'LoadingBar', component: LoadingBarComponent },
  { path: 'Signin', component: SigninComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'My_chats', component: My_chatsComponent, canActivate: [OnlyMember]},
  { path: 'Search_specialist', component: Search_specialistComponent },
  { path: 'Best_specialist', component: Best_specialistComponent },
  { path: 'Chat_Speciality/:userChatId', component: Chat_SpecialityComponent },
  { path: 'Chat_Speciality/:userChatId/:linkId', component: Chat_SpecialityComponent },
  { path: 'Search_product', component: Search_productComponent },
  { path: 'Found_product/:id', component: Found_productComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'ResetPassword/:mail/:token', component: ResetPasswordComponent },
  { path: 'externalLink/:url', component: RedirectGuard,canActivate: [RedirectGuard] },
  { path: '', redirectTo: 'Opening', pathMatch: 'full', canActivate: [UserProfileGuard] },
  { path: '**', redirectTo: 'Opening' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
