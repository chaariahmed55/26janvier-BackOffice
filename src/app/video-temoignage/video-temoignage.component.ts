import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoTemoignage } from '../Entity/videotemoignage';
import { TemoignageService } from '../service/temoignage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-temoignage',
  templateUrl: './video-temoignage.component.html',
  styleUrls: ['./video-temoignage.component.css'],
})
export class VideoTemoignageComponent implements OnInit {
  safeURL: string = '';
  // safeIMAGE:string='';
  readonly host = environment.baseurl;
  videotemoignages: VideoTemoignage[] = [];
  videotemoignage = new VideoTemoignage();
  path: string;
  imagess: any;
  images = [];
  updateimage;

  myForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    titre: new FormControl('', [Validators.required]),
    titrear: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionar: new FormControl('', [Validators.required]),

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
  });

  constructor(
    private videotemoignageservice: TemoignageService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.affichevideo();
  }

  affichevideo() {
    this.videotemoignages = [];
    this.videotemoignageservice.getvideo().subscribe((data) => {
      for (var val of data) {
        this.videotemoignages.push(val);
      }
    });
  }

  ajoutvideoarchive() {
    this.videotemoignage.titre = this.myForm.value['titre'];
    this.videotemoignage.titrear = this.myForm.value['titrear'];
    this.videotemoignage.description = this.myForm.value['description'];
    this.videotemoignage.descriptionar = this.myForm.value['descriptionar'];
    this.videotemoignage.date = this.myForm.value['date'];
    this.videotemoignage.path = this.myForm.value['path'];
    this.videotemoignage.photo = this.myForm.value['fileSource'][0];
    this.videotemoignageservice
      .addvideo(this.videotemoignage)
      .subscribe((data) => {
        console.log(data);
        if ((data['satus'] = 201)) {
          location.reload();
        }
      });
  }

  delete(objet) {
    this.videotemoignageservice.deletevideo(objet);
  }

  update(objet) {
    this.videotemoignage = objet;
    this.videotemoignage.date =
      this.videotemoignage.date.substr(6, 4) +
      '-' +
      this.videotemoignage.date.substr(3, 2) +
      '-' +
      this.videotemoignage.date.substr(0, 2);
      this.httpClient.get(this.host + '/videotemoignage/get/'+this.videotemoignage.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      });
  }
  update1() {

    if (this.images[0] == undefined) {
      this.videotemoignage.photo=this.updateimage;
      console.log(this.videotemoignage);
    }else{
      this.videotemoignage.photo = this.images[0];
    }
    
    this.videotemoignageservice
      .updatevideo(this.videotemoignage)
      .subscribe((data) => {
        console.log(data);
      });
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  show(object) {
    console.log(object);
    this.safeURL = '';
    setTimeout(() => {
      this.videotemoignage = object;
      this.safeURL = this.videotemoignage.path.substring(
        this.videotemoignage.path.indexOf('=') + 1,
        this.videotemoignage.path.indexOf('&')
      );
    }, 50);
  }

  reload() {
    location.reload();
  }

  //------------------------------------------------------------------------------------------------------------------------

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
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
