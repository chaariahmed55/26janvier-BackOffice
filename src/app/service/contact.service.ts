import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../Entity/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}
  readonly host = environment.baseurl;

  public getallcontact($page): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(
      this.host + '/contact/getall/' + $page
    );
  }

  public getallmovedcontact($page): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(
      this.host + '/contact/getallmoved/' + $page
    );
  }

  public getmaxpage() {
    return this.httpClient.get<any>(this.host + '/contact/maxpage');
  }

  public getmaxmovedpage() {
    return this.httpClient.get<any>(this.host + '/contact/maxpagemoved');
  }

  public getnumnonvue() {
    let hello = this.httpClient.get<any>(this.host + '/contact/numnonvue');
    console.log(hello);
    return hello;
  }

  public delete(param) {
    console.log('param ', param);
    this.httpClient
      .post(this.host + '/contact/moved/' + param.id, param)
      .subscribe((res) => {
        console.log(res);
      });
  }

  public read(param) {
    console.log('param ', param);
    this.httpClient
      .post(this.host + '/contact/vued/' + param.id, param)
      .subscribe((res) => {
        console.log(res);
      });
  }

  public getbyemail(objet): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(
      this.host + '/contact/getbyemail/' + objet
    );
  }
}
