import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoRapport } from '../Entity/photorapport';
import { Rapport } from '../Entity/rapport';

@Injectable({
  providedIn: 'root',
})
export class RapportService {
  constructor(private httpClient: HttpClient) {}
  readonly host = environment.baseurl;

  public getall(): Observable<Rapport[]> {
    let parametre =new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<Rapport[]>(this.host + '/rapport/getall',parametre);
  }

  public add(objet: Rapport) {
    let parametre = new HttpParams()
      .set('source', objet.source)
      .set('date', objet.date)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear);
    return this.httpClient.post<Rapport>(this.host + '/rapport/add', parametre);
  }

  public update(objet: Rapport) {
    let parametre = new HttpParams()
      .set('source', objet.source)
      .set('date', objet.date)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear);
    return this.httpClient.post(
      this.host + '/rapport/update/' + objet.id,
      parametre
    );
  }

  public delete(objet: Rapport) {
    this.httpClient
      .post(this.host + '/rapport/delete/' + objet.id, objet)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getphoto(object: Rapport) {
    console.log(object);
    return this.httpClient.get<PhotoRapport[]>(
      this.host + '/photorapport/getall/' + object.id
    );
  }

  public addphoto(param: PhotoRapport) {
    let parametre = new HttpParams()
      .set('rapport_id', param.rapport.toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoRapport>(
      this.host + '/photorapport/add',
      parametre
    );
  }

  public updatephoto(param: PhotoRapport) {
    let parametre = new HttpParams()
      .set('rapport_id', param.rapport['id'].toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoRapport>(
      this.host + '/photorapport/update/' + param.id,
      parametre
    );
  }

  public deletephoto(param: PhotoRapport) {
    this.httpClient
      .post(this.host + '/photorapport/delete/' + param.id, param)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
