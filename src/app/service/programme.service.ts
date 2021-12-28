import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Programme } from '../Entity/programme';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getallprogramme(): Observable<Programme[]> {
    let parametre = new HttpParams()
    .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<Programme[]>(this.host + '/programme/getall',parametre);
  }

  public getonebyid(param): Observable<Programme> {
    return this.httpClient.get<Programme>(this.host + '/programme/getone/'+param);
  }


  public addprogramme(objet: Programme) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin.toString())
      .set('data', objet.data)
      .set('adresse', objet.adresse)
      .set('adressear', objet.adressear)
      .set('date', objet.date)
      .set('categorie', objet.categorie)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('titlear', objet.titlear)
      .set('title', objet.title);
    return this.httpClient
      .post<Programme>(this.host + '/programme/add', parametre)
      .subscribe((res) => {
        console.log(res);
      });
  }

  public updateprogramme(objet: Programme) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin['id'].toString())
      .set('data', objet.data)
      .set('adresse', objet.adresse)
      .set('adressear', objet.adressear)
      .set('date', objet.date)
      .set('categorie', objet.categorie)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar)
      .set('titlear', objet.titlear)
      .set('title', objet.title);
    return this.httpClient
      .post<Programme>(this.host + '/programme/update/' + objet.id, parametre);
  }

  public deleteprogramme(param) {
    this.httpClient
      .post(this.host + '/programme/delete/' + param, param)
      .subscribe((res) => {
        console.log(res);
      });
  }

  // public getphoto(object: Programme) {
  //   return this.httpClient.get<PhotoP[]>(
  //     this.host + '/programme/getall/' + object.id
  //   );
  // }

  // public addphoto(param: PhotoP) {
  //   let parametre = new HttpParams()
  //     .set('programme_id', param.programme.toString())
  //     .set('data', param.data)
  //     .set('description', param.description)
  //     .set('name', param.name)
  //     .set('date', param.date);
  //   return this.httpClient.post<PhotoP>(this.host + '/photop/add', parametre);
  // }

  // public updatephoto(param: PhotoP) {
  //   let parametre = new HttpParams()
  //     .set('programme_id', param.programme.toString())
  //     .set('data', param.data)
  //     .set('description', param.description)
  //     .set('name', param.name)
  //     .set('date', param.date);
  //   return this.httpClient.post<PhotoP>(
  //     this.host + '/photop/update/' + param.id,
  //     parametre
  //   );
  // }

  // public deletephoto(param: PhotoP) {
  //   this.httpClient.post(this.host + '/photop/delete/' + param.id, param);
  // }

  // public getvideo(object: Programme) {
  //   return this.httpClient.get<VideoP[]>(
  //     this.host + '/videop/getall/' + object.id
  //   );
  // }

  // public addvideo(param: VideoP) {
  //   let parametre = new HttpParams()
  //     .set('programme_id', param.programme.toString())
  //     .set('path', param.path)
  //     .set('description', param.description)
  //     .set('date', param.date);
  //   return this.httpClient.post<VideoP>(this.host + '/videop/add', parametre);
  // }

  // public updatevideo(param: VideoP) {
  //   let parametre = new HttpParams()
  //     .set('programme_id', param.programme.toString())
  //     .set('path', param.path)
  //     .set('description', param.description)
  //     .set('date', param.date);
  //   return this.httpClient.post<VideoP>(
  //     this.host + '/videop/update/' + param.id,
  //     parametre
  //   );
  // }

  // public deletevideo(param: VideoP) {
  //   this.httpClient.post(this.host + '/videorm/delete/' + param.id, param);
  // }
}
