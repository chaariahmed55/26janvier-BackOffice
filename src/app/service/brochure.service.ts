import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brochure } from '../Entity/brochure';
import { PhotoBrochure } from '../Entity/photobrochure';

@Injectable({
  providedIn: 'root',
})
export class BrochureService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getallbrochure(): Observable<Brochure[]> {
    let parametre =new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<Brochure[]>(this.host + '/brochure/getall',parametre);
  }

  public addbrochure(objet: Brochure) {
    let parametre = new HttpParams()
      .set('source', objet.source)
      .set('date', objet.date)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear);
    return this.httpClient.post<Brochure>(
      this.host + '/brochure/add',
      parametre
    );
  }

  public update(objet) {
    let parametre = new HttpParams()
      .set('source', objet.source)
      .set('date', objet.date)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear);
    return this.httpClient.post<Brochure>(
      this.host + '/brochure/update/' + objet.id,
      parametre
    );
  }

  public delete(objet: Brochure) {
    this.httpClient
      .post(this.host + '/brochure/delete/' + objet.id, objet)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getphoto(object: Brochure) {
    console.log(object);
    return this.httpClient.get<PhotoBrochure[]>(
      this.host + '/photobrochure/getall/' + object.id
    );
  }

  public addphoto(param: PhotoBrochure) {
    let parametre = new HttpParams()
      .set('brochure_id', param.brochure.toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoBrochure>(
      this.host + '/photobrochure/add',
      parametre
    );
  }

  public updatephoto(param: PhotoBrochure) {
    console.log(param);
    let parametre = new HttpParams()
      .set('brochure_id', param.brochure['id'].toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoBrochure>(
      this.host + '/photobrochure/update/' + param.id,
      parametre
    );
  }

  public deletephoto(param: PhotoBrochure) {
    this.httpClient
      .post(this.host + '/photobrochure/delete/' + param.id, param)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
