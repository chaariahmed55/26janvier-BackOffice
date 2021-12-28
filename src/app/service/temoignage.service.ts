import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoTemoignage } from '../Entity/phototemoignage';
import { Temoignage } from '../Entity/temoignage';
import { VideoTemoignage } from '../Entity/videotemoignage';

@Injectable({
  providedIn: 'root',
})
export class TemoignageService {
  readonly host = environment.baseurl;
  constructor(private httpclient: HttpClient) {}

  public getall(): Observable<Temoignage[]> {
    let parametre =new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpclient.post<Temoignage[]>(
      this.host + '/temoignage/getall'
    ,parametre);
  }

  add(objet: Temoignage) {
    let parametre = new HttpParams()
      .set('date', objet.date)
      .set('source', objet.source)
      .set('titre', objet.titre)
      .set('titrear', objet.titrear)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('admin_id', objet.admin.toString());
    return this.httpclient.post<Temoignage>(
      this.host + '/temoignage/add',
      parametre
    );
  }

  public update(objet: Temoignage) {
    let parametre = new HttpParams()
    .set('date', objet.date)
    .set('source', objet.source)
    .set('titre', objet.titre)
    .set('titrear', objet.titrear)
    .set('description', objet.description)
    .set('descriptionar', objet.descriptionar)
    .set('admin_id', objet.admin['id'].toString());
    return this.httpclient.post(
      this.host + '/temoignage/update/'+objet.id,parametre);
  }

  public delete(objet: Temoignage) {
    this.httpclient
      .post(this.host + '/temoignage/delete/' + objet.id, objet)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  addphoto(objet: PhotoTemoignage) {
    console.log('ena ba74A objet ', objet);
    let parametre = new HttpParams()
      .set('temoignage_id', objet.temoignage.toString())
      .set('data', objet.data);
    return this.httpclient.post<PhotoTemoignage>(
      this.host + '/phototemoignage/add',
      parametre
    );
  }

  public getallphoto(objet: Temoignage) {
    return this.httpclient.get<PhotoTemoignage[]>(
      this.host + '/phototemoignage/getall/' + objet.id
    );
  }

  public updatephoto(param: PhotoTemoignage) {
    console.log(param.temoignage);
    let parametre = new HttpParams()
      .set('temoignage_id', param.temoignage['id'].toString())
      .set('data', param.data);
    return this.httpclient.post<PhotoTemoignage>(
      this.host + '/phototemoignage/update/' + param.id,
      parametre
    );
  }

  public deletephoto(objet: PhotoTemoignage) {
    this.httpclient
      .post(this.host + '/phototemoignage/delete/' + objet.id, objet)
      .subscribe((data) => {
        console.log(data);
      });
  }

  public getvideo() {
    let parametre = new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0');
    return this.httpclient.post<VideoTemoignage[]>(
      this.host + '/videotemoignage/getall'
    ,parametre);
  }

  public addvideo(param: VideoTemoignage) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpclient.post<VideoTemoignage>(
      this.host + '/videotemoignage/add',
      parametre
    );
  }

  public updatevideo(param: VideoTemoignage) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpclient.post<VideoTemoignage>(
      this.host + '/videotemoignage/update/' + param.id,
      parametre
    );
  }

  public deletevideo(param: VideoTemoignage) {
    this.httpclient
      .post(this.host + '/videotemoignage/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }
}
