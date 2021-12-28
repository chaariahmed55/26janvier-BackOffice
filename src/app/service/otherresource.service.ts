import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OtherResource } from '../Entity/otherresource';

@Injectable({
  providedIn: 'root',
})
export class OtherresourceService {
  constructor(private httpClient: HttpClient) {}
  readonly host = environment.baseurl;

  public getall(): Observable<OtherResource[]> {
    let parametre = new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0');
    return this.httpClient.post<OtherResource[]>(this.host + '/or/getall',parametre);
  }

  public add(objet: OtherResource) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin.toString())
      .set('link', objet.link)
      .set('data', objet.data)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('date', objet.date);
    return this.httpClient.post<OtherResource>(
      this.host + '/or/add',
      parametre
    );
  }

  public update(objet: OtherResource) {
    console.log(objet);
    let parametre = new HttpParams()
      .set('admin_id', objet.admin['id'].toString())
      .set('link', objet.link)
      .set('data', objet.data)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('date', objet.date);
    return this.httpClient.post(
      this.host + '/or/update/' + objet.id,
      parametre
    );
  }

  public delete(objet: OtherResource) {
    this.httpClient
      .post(this.host + '/or/delete/' + objet.id, objet)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }
}
