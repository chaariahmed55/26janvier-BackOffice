import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PhotoProjectionDebat } from '../Entity/photoprojectiondebat';
import { ProjectionDebat } from '../Entity/ptojectiondebat';
import { VideoProjectionDebat } from '../Entity/videoprojectiondebat';

@Injectable({
  providedIn: 'root',
})
export class ProjectiondebatService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getallPD($page, $nbpage) {
    let parametre = new HttpParams()
      .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<ProjectionDebat[]>(
      this.host + '/projectiondebat/getall'
    ,parametre);
  }

  public addPD(objet: ProjectionDebat) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin.toString())
      .set('title', objet.title)
      .set('titlear', objet.titlear)
      .set('date', objet.date)
      .set('source', objet.source)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar);
    return this.httpClient.post<ProjectionDebat>(
      this.host + '/projectiondebat/add',
      parametre
    );
  }

  public updatePD(objet) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin['id'].toString())
      .set('title', objet.title)
      .set('titlear', objet.titlear)
      .set('date', objet.date)
      .set('source', objet.source)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar);
    return this.httpClient.post<ProjectionDebat>(
      this.host + '/projectiondebat/update/' + objet.id,
      parametre
    );
  }

  public deletePD(param: ProjectionDebat) {
    this.httpClient
      .post(this.host + '/projectiondebat/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getphoto(object: ProjectionDebat) {
    return this.httpClient.get<PhotoProjectionDebat[]>(
      this.host + '/photoprojectiondebat/getall/' + object.id
    );
  }

  public addphoto(param: PhotoProjectionDebat) {
    let parametre = new HttpParams()
      .set('projectiondebat_id', param.projectiondebat.toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoProjectionDebat>(
      this.host + '/photoprojectiondebat/add',
      parametre
    );
  }

  public updatephoto(param: PhotoProjectionDebat) {
    console.log(param);
    console.log(param.projectiondebat);
    let parametre = new HttpParams()
      .set('projectiondebat_id', param.projectiondebat['id'].toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoProjectionDebat>(
      this.host + '/photoprojectiondebat/update/' + param.id,
      parametre
    );
  }

  // public deletephoto(param:PhotoProjectionDebat){
  //   this.httpClient.post(this.host+'/photorm/delete/'+param.id,param).subscribe((data)=>{console.log(data);
  //   });
  // }

  public getvideo() {
    let parametre = new HttpParams()
      .set('type', 'ASC').set('nbparpage','10000').set('page','0')
    return this.httpClient.post<VideoProjectionDebat[]>(
      this.host + '/videoprojectiondebat/getall'
    ,parametre);
  }

  public addvideo(param: VideoProjectionDebat) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpClient.post<VideoProjectionDebat>(
      this.host + '/videoprojectiondebat/add',
      parametre
    );
  }

  public updatevideo(param: VideoProjectionDebat) {
    let parametre = new HttpParams()
      .set('path', param.path)
      .set('photo', param.photo)
      .set('titre', param.titre)
      .set('titrear', param.titrear)
      .set('date', param.date)
      .set('description', param.description)
      .set('descriptionar', param.descriptionar);
    return this.httpClient.post<VideoProjectionDebat>(
      this.host + '/videoprojectiondebat/update/' + param.id,
      parametre
    );
  }

  public deletevideo(param: VideoProjectionDebat) {
    this.httpClient
      .post(this.host + '/videoprojectiondebat/delete/' + param.id, param)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }
}
