import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PhotoPledoyer } from '../Entity/photopledoyer';
import { Pledoyer } from '../Entity/pledoyer';
import { VideoPledoyer } from '../Entity/videopledoyer';

@Injectable({
  providedIn: 'root',
})
export class PledoyerService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getall(){
    let parametre = new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0');
    return this.httpClient.post<Pledoyer[]>(this.host + '/pledoyer/getall',parametre);
  }

  public add(objet: Pledoyer) {
    console.log('ahna lennaa fel objet ', objet);
    let parametre = new HttpParams()
      .set('date', objet.date)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('admin_id', objet.admin.toString())
      .set('source', objet.source);
    return this.httpClient.post<Pledoyer>(
      this.host + '/pledoyer/add',
      parametre
    );
  }

  public update(objet: Pledoyer) {
    let parametre = new HttpParams()
      .set('date', objet.date)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('admin_id', objet.admin['id'].toString())
      .set('source', objet.source);
    return this.httpClient.post<Pledoyer>(
      this.host + '/pledoyer/update/' + objet.id,
      parametre
    );
  }

  public delete(param: Pledoyer) {
    this.httpClient
      .post(this.host + '/pledoyer/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getphoto(object: Pledoyer) {
    return this.httpClient.get<PhotoPledoyer[]>(
      this.host + '/photopledoyer/getall/' + object.id
    );
  }

  public addphoto(param: PhotoPledoyer) {
    let parametre = new HttpParams()
      .set('pledoyer_id', param.pledoyer.toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoPledoyer>(
      this.host + '/photopledoyer/add',
      parametre
    );
  }

  public updatephoto(param: PhotoPledoyer) {
    let parametre = new HttpParams()
      .set('pledoyer_id', param.pledoyer['id'].toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoPledoyer>(
      this.host + '/photopledoyer/update/' + param.id,
      parametre
    );
  }

  public deletephoto(param: PhotoPledoyer) {
    this.httpClient
      .post(this.host + '/photopledoyer/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getvideo() {
    let parametre = new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0');
    return this.httpClient.post<VideoPledoyer[]>(
      this.host + '/videopledoyer/getall',parametre
    );
  }

  public addvideo(param: VideoPledoyer) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpClient.post<VideoPledoyer>(
      this.host + '/videopledoyer/add',
      parametre
    );
  }

  public updatevideo(param: VideoPledoyer) {
    let parametre = new HttpParams()
    .set('path', param.path)
    .set('photo', param.photo)
    .set('titre', param.titre)
    .set('titrear', param.titrear)
    .set('date', param.date)
    .set('description', param.description)
    .set('descriptionar', param.descriptionar);
    return this.httpClient.post<VideoPledoyer>(
      this.host + '/videopledoyer/update/' + param.id,
      parametre
    );
  }

  public deletevideo(param: VideoPledoyer) {
    this.httpClient
      .post(this.host + '/videopledoyer/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }
}
