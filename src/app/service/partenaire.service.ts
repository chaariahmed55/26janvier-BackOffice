import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partenaire } from '../Entity/partenaire';

@Injectable({
  providedIn: 'root',
})
export class PartenaireService {
  constructor(private httpClient: HttpClient) {}
  readonly host = environment.baseurl;

  public getall(): Observable<Partenaire[]> {
    return this.httpClient.get<Partenaire[]>(this.host + '/partenaire/getall');
  }

  public add(objet: Partenaire) {
    console.log("l'objet partenaire est  ", objet);
    let parametre = new HttpParams()
      .set('admin_id', objet.admin.toString())
      .set('logo', objet.logo)
      .set('type', objet.type);
    return this.httpClient.post<Partenaire>(
      this.host + '/partenaire/add',
      parametre
    );
  }

  public update(objet: Partenaire) {
    console.log(objet);
    let parametre = new HttpParams()
      .set('admin_id', objet.admin['id'].toString())
      .set('logo', objet.logo)
      .set('type', objet.type);
    return this.httpClient.post(
      this.host + '/partenaire/update/' + objet.id,
      parametre
    );
  }

  public delete(objet: Partenaire) {
    console.log(objet.id);
    this.httpClient
      .post(this.host + '/partenaire/delete/' + objet.id, objet)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getpartenairebytype(objet: String) {
    return this.httpClient.get<Partenaire[]>(
      this.host + '/partenaire/getbytype/' + objet
    );
  }
}
