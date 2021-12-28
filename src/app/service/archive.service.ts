import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Archive } from '../Entity/archive';
import { Archivevideo } from '../Entity/archivevideo';
import { PhotoArchive } from '../Entity/photoarchive';
import { VideoArchive } from '../Entity/videoarchive';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getphoto() {
    let parametre = new HttpParams()
      .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<PhotoArchive[]>(
      this.host + '/photoarchive/getall',parametre
    );
  }
  

  public addphoto(param: PhotoArchive) {
    let parametre = new HttpParams()
      .set('data', param.data)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar)
      .set('name', param.name)
      .set('namear', param.namear)
      .set('source', param.source)
      .set('date', param.date);
    return this.httpClient.post<PhotoArchive>(
      this.host + '/photoarchive/add',
      parametre
    );
  }

  public updatephoto(param: PhotoArchive) {
    let parametre = new HttpParams()
      .set('data', param.data)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar)
      .set('name', param.name)
      .set('namear', param.namear)
      .set('source', param.source)
      .set('date', param.date);
    return this.httpClient.post<PhotoArchive>(
      this.host + '/photoarchive/update/' + param.id,
      parametre
    );
  }

  public deletephoto(param: PhotoArchive) {
    this.httpClient
      .post(this.host + '/photoarchive/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getvideo() {
    let parametre = new HttpParams()
      .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<Archivevideo[]>(
      this.host + '/videoarchive/getall',parametre
    );
  }

  public addvideo(param: Archivevideo) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titre)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.description);
    return this.httpClient.post<Archivevideo>(
      this.host + '/videoarchive/add',
      parametre
    );
  }

  public updatevideo(param: Archivevideo) {
    let parametre = new HttpParams()
    .set('path', param.path)
    .set('photo', param.photo)
    .set('titre', param.titre)
    .set('titrear', param.titre)
    .set('date', param.date)
    .set('description', param.description)
    .set('descriptionar', param.description);
    return this.httpClient.post<Archivevideo>(
      this.host + '/videoarchive/update/' + param.id,
      parametre
    );
  }

  public deletevideo(param: Archivevideo) {
    this.httpClient
      .post(this.host + '/videoarchive/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }
}
