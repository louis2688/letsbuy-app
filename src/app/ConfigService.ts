import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ShaerdStrings, SendBirdService } from "./serivces";

@Injectable()
export class ConfigService {

  public message: string;

  constructor(private http : Http) {
  }

  load() {
    return this.http.get('./assets/config.json').toPromise().then((res)=>{
        var config = res.json();
        ShaerdStrings.PRUD_RES_URL = config.prud_server;
        ShaerdStrings.AUTH_RES_URL = config.auth_server;
        SendBirdService.APP_ID = config.sendbird;
    });

  }

}