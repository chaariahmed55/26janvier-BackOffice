import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Entity/user';
import { Router } from '@angular/router';
import { logger } from 'src/logger';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpclient: HttpClient, private router: Router) {}
  readonly host = environment.baseurl;
  public loggedUser: string;

  public login(username, password) {
    logger(username);
    logger(password);
    return this.httpclient.post<any>(this.host + '/api/login_check', {
      username: username,
      password: password,
    });
  }

  public getall(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.host + '/User/getall');
  }

  public add(objet: User) {
    // let parametre = new HttpParams().set('username',objet.email).set('date',objet.date).set('password',objet.password).set('photo',objet.photo);
    // return this.httpclient.post<User>(this.host+"/user/add",parametre);
  }

  public update(objet: User) {
    // let parametre = new HttpParams().set('username',objet.email).set('date',objet.date).set('password',objet.password).set('photo',objet.photo);
    // this.httpclient.post(this.host+'/user/update/'+ objet.id ,parametre);
  }

  public delete(objet: User) {
    this.httpclient.post(this.host + '/user/delete/' + objet.id, objet);
  }
}
