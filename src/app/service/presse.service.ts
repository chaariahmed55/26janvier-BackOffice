import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Presse } from '../Entity/presse';

@Injectable({
  providedIn: 'root',
})
export class PresseService {
  constructor(private httpClient: HttpClient) {}
  readonly host = environment.baseurl;

  public getall(): Observable<Presse[]> {
    return this.httpClient.get<Presse[]>(this.host + '/presse/getall');
  }

  public add(objet: Presse) {
    let parametre = new HttpParams()
      .set('name', objet.name)
      .set('type', objet.type);
    return this.httpClient.post<Presse>(this.host + '/presse/add', parametre);
  }

  public update(objet: Presse) {
    let parametre = new HttpParams()
      .set('name', objet.name)
      .set('type', objet.type);
    return this.httpClient
      .post(this.host + '/presse/update/' + objet.id, parametre)
      .subscribe((data) => {
        console.log(data);
      });
  }

  public delete(objet: Presse) {
    this.httpClient
      .post(this.host + '/presse/delete/' + objet.id, objet)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
