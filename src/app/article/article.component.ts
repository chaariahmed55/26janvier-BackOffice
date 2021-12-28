import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../Entity/article';
import { PhotoArticle } from '../Entity/photoarticle';
import { Presse } from '../Entity/presse';
import { ArticleService } from '../service/article.service';
import { PresseService } from '../service/presse.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  readonly host = environment.baseurl;
  articles: Article[] = [];
  article = new Article();
  progressivebarvalue = 0;
  save = false;
  photoarticle = new PhotoArticle();
  photoarticles: PhotoArticle[] = [];
  presses: Presse[] = [];
  presses1: Presse[] = [];
  presses2: Presse[] = [];
  presses3: Presse[] = [];
  presse = new Presse();
  newid;
  imagess = [];
  images = [];
  nameofpresse: string;
  typeofpresse: string;
  // defaultpresse=new Presse();
  editable = false;
  photomap: Map<number, string> = new Map<number, string>();
  x: any;
  ids: PhotoArticle[] = [];

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
    titlear: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionar: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private articleservice: ArticleService,
    private presseservice: PresseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.affichetemoignage();
    this.getallpresse();
  }

  getallpresse() {
    this.presseservice.getall().subscribe((data) => {
      for (var val of data) {
        if (val.type == 'Presse Tunisienne') {
          this.presses1.push(val);
        } else if (val.type == 'Presse Internationale') {
          this.presses2.push(val);
        } else {
          this.presses3.push(val);
        }
        this.presses.push(val);
      }
    });

  }

  affichetemoignage() {
    this.articles = [];
    this.articleservice.getallarticle().subscribe((data) => {
      for (var val of data) {
        this.articles.push(val);
      }
    });
    
  }

  ajouttemoignage() {
    if (this.progressivebarvalue == 50) {
      this.article.admin = 1;     
      if (this.presses.find((presse) => presse.name === this.myForm.value['type'])==undefined) {
        this.presse=this.presses1[0];
      }else{
        this.presse = this.presses.find(
          (presse) => presse.name === this.myForm.value['type']
        );
      }
      this.article.source = this.myForm.value['source'];
      this.article.title = this.myForm.value['title'];
      this.article.titlear = this.myForm.value['titlear'];
      this.article.description = this.myForm.value['description'];
      this.article.descriptionar = this.myForm.value['descriptionar'];
      this.article.autor = this.presse.id;
      this.article.date = this.myForm.value['date'];
      this.articleservice.addarticle(this.article).subscribe((data) => {
        console.log('Article add ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      console.log('add photo for temoignage');
      for (let index = 0; index < this.imagess.length; index++) {
        this.photoarticle.data = this.imagess[index];
        var y: number = this.newid;
        this.photoarticle.article = y;
        this.articleservice.addphoto(this.photoarticle).subscribe((data) => {
          if ((data[0] = 'success' && index == this.imagess.length - 1)) {
            location.reload();
          }
          console.log(data);
        });
      }
    }
    console.log('ajouttemoignage ', this.myForm.value);
  }

  
  
  delete(objet) {
    this.article = objet;
    this.articleservice.delete(this.article);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  update(objet: Article) {
    this.photoarticles = [];
    this.article = objet;
    this.nameofpresse = this.article.autor['name'];
    this.typeofpresse = this.article.autor['type'];
    this.article.date =
      this.article.date.substr(6, 4) +
      '-' +
      this.article.date.substr(3, 2) +
      '-' +
      this.article.date.substr(0, 2);
    this.articleservice.getphoto(objet).subscribe((data) => {
      for (var val of data) {
        console.log(data);
        this.photoarticles.push(val);
      }
    });
    console.log(this.photoarticles);
  }

  update1() {
    this.presse = this.presses.find(
      (presse) => presse.name === this.nameofpresse
    );
    this.article.admin = this.article.admin['id'];
    this.article.autor = this.presse['id'];
    this.articleservice.updatearticle(this.article).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
      console.log(data);
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.articleservice.updatephoto(this.ids[index]).subscribe((data) => {
        console.log(data);
      });
    }
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  reload() {
    location.reload();
  }

  show(param) {
    this.article = param;
    this.photoarticles = [];
    this.nameofpresse = this.article.autor['name'];
    this.typeofpresse = this.article.autor['type'];
    this.articleservice.getphoto(param).subscribe((data) => {
      for (var val of data) {
        this.photoarticles.push(val);
      }
    });
  }

  // -------------------------------------------------------------------------------------------------------------

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.imagess.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onFileChange1(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.imagess.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  getselectedid(objet) {
    this.ids.push(objet);
  }



}
