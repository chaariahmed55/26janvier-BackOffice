import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoRM } from '../Entity/photorm';
import { RetombeMediatique } from '../Entity/retombemediatique';
import { VideoRM } from '../Entity/videorm';

@Injectable({
  providedIn: 'root',
})
export class RetombemediatiqueService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getallRM() {
    let parametre =new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<RetombeMediatique[]>(
      this.host + '/retombemediatique/getall',parametre
    );
  }

  public addRM(objet: RetombeMediatique) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin.toString())
      .set('author', objet.author)
      .set('date', objet.date)
      .set('legende', objet.legende)
      .set('legendear', objet.legendear)
      .set('title', objet.title)
      .set('titlear', objet.titlear)
      .set('source', objet.source);
    return this.httpClient.post<RetombeMediatique>(
      this.host + '/retombemediatique/add',
      parametre
    );
  }

  public updateRM(objet: RetombeMediatique) {
    let parametre = new HttpParams()
    .set('admin_id', objet.admin['id'].toString())
    .set('author', objet.author)
    .set('date', objet.date)
    .set('legende', objet.legende)
    .set('legendear', objet.legendear)
    .set('title', objet.title)
    .set('titlear', objet.titlear)
    .set('source', objet.source);
    return this.httpClient.post<RetombeMediatique>(
      this.host + '/retombemediatique/update/' + objet.id,
      parametre
    );
  }

  public deleteRM(param: RetombeMediatique) {
    this.httpClient
      .post(this.host + '/retombemediatique/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getphoto(object: RetombeMediatique) {
    return this.httpClient.get<PhotoRM[]>(
      this.host + '/photorm/getall/' + object.id
    );
  }

  public addphoto(param: PhotoRM) {
    let parametre = new HttpParams()
      .set('retombemediatique_id', param.retombemediatique.toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoRM>(this.host + '/photorm/add', parametre);
  }

  public updatephoto(param: PhotoRM) {
    let parametre = new HttpParams()
      .set('retombemediatique_id', param['retombeMediatique']['id'].toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoRM>(
      this.host + '/photorm/update/' + param.id,
      parametre
    );
  }

  public deletephoto(param: PhotoRM) {
    this.httpClient
      .post(this.host + '/photorm/delete/' + param.id, param)
      .subscribe((data) => {
        console.log(data);
      });
  }

  public getvideo() {
    let parametre =new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<VideoRM[]>(this.host + '/videorm/getall',parametre);
  }

  public addvideo(param: VideoRM) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpClient.post<VideoRM>(this.host + '/videorm/add', parametre);
  }

  public updatevideo(param: VideoRM) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpClient.post<VideoRM>(
      this.host + '/videorm/update/' + param.id,
      parametre
    );
  }

  public deletevideo(param: VideoRM) {
    this.httpClient
      .post(this.host + '/videorm/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }
}
