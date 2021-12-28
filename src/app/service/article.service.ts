import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../Entity/article';
import { PhotoArticle } from '../Entity/photoarticle';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  readonly host = environment.baseurl;

  constructor(private httpClient: HttpClient) {}

  public getallarticle(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.host + '/article/getall');
  }

  public addarticle(objet: Article) {
    let parametre = new HttpParams()
      .set('admin_id', objet.admin.toString())
      .set('title', objet.title)
      .set('titlear', objet.titlear)
      .set('date', objet.date)
      .set('autor_id', objet.autor.toString())
      .set('source',objet.source)
      .set('description', objet.description)
      .set('descriptionar', objet.descriptionar);
    return this.httpClient.post<Article>(this.host + '/article/add', parametre);
  }

  public updatearticle(objet: Article) {
    let parametre = new HttpParams()
    .set('admin_id', objet.admin.toString())
    .set('title', objet.title)
    .set('titlear', objet.titlear)
    .set('date', objet.date)
    .set('autor_id', objet.autor.toString())
    .set('source',objet.source)
    .set('description', objet.description)
    .set('descriptionar', objet.descriptionar);
    return this.httpClient.post<Article>(
      this.host + '/article/update/' + objet.id,
      parametre
    );
  }

  public delete(objet: Article) {
    console.log(objet);
    this.httpClient
      .post(this.host + '/article/delete/' + objet.id, objet)
      .subscribe((data) => {
        if ((data = 'success remove')) {
          location.reload();
        }
      });
  }

  public getphoto(object: Article) {
    return this.httpClient.get<PhotoArticle[]>(
      this.host + '/photoarticle/getall/' + object.id
    );
  }

  public addphoto(param: PhotoArticle) {
    let parametre = new HttpParams()
      .set('article_id', param.article.toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoArticle>(
      this.host + '/photoarticle/add',
      parametre
    );
  }

  public updatephoto(param: PhotoArticle) {
    let parametre = new HttpParams()
      .set('article_id', param.article['id'].toString())
      .set('data', param.data);
    return this.httpClient.post<PhotoArticle>(
      this.host + '/photoarticle/update/' + param.id,
      parametre
    );
  }

  public deletephoto(param: PhotoArticle) {
    this.httpClient.post(this.host + '/photoarticle/delete/' + param.id, param);
  }





}
