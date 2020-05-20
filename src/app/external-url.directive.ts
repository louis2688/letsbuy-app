import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { Http } from '@angular/http';
import { ShaerdStrings } from './serivces';

@Injectable()
export class RedirectGuard implements CanActivate {

  constructor(private router: Router ,private http: Http,private str : ShaerdStrings) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {
      var url = this.str.hybrid + "?url=" + encodeURI(route.params['url']);
      console.log(url);
      this.http.get(url).toPromise().then(x=>console.log(x));
      return false;
  }
}