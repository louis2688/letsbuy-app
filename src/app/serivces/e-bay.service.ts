import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

const httpOptions = {
  headers: new Headers(
    {
      //'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Methods': '*'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class EBayService {

  constructor(private http: Http) {
    console.log("eBay API");
  }

  getOAuthToken(authCode: string) {
    return this.http.post("http://localhost/letsbuyhybridapp/getEbayToken.php", { "authCode": authCode }, httpOptions).map(res => res.json());
  }

  getTransactions(authToken: string) {
    return this.http.post("http://localhost/letsbuyhybridapp/geteBayTransactions.php", { "authToken": authToken }, httpOptions).map(res => res.json());
  }
}
