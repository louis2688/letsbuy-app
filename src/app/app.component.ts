import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ShaerdStrings, UserProfileService } from './serivces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserProfileService]
})
export class AppComponent {
  
  /**
   *
   */
  constructor( userService: UserProfileService) {
    userService.LoadProfileFromServer();
  }
  onActivate(e: any, scrollContainer: any) {
    setTimeout(() => {
      scrollContainer.scrollTop = 0;
    }, 500)
  }
}
