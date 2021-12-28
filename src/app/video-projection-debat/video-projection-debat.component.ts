import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoProjectionDebat } from '../Entity/videoprojectiondebat';
import { ProjectiondebatService } from '../service/projectiondebat.service';
import { environment } from 'src/environments/environment';
import { logger } from 'src/logger';

@Component({
  selector: 'app-video-projection-debat',
  templateUrl: './video-projection-debat.component.html',
  styleUrls: ['./video-projection-debat.component.css'],
})
export class VideoProjectionDebatComponent implements OnInit {
  safeURL: string = '';
  // safeIMAGE:string='';
  readonly host = environment.baseurl;

    videoprojectiondebats: VideoProjectionDebat[] = [];
    videoprojectiondebat = new VideoProjectionDebat();
    path: string;
    imagess: any;
    images = [];
    updateimage;

    myForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    titre: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionar: new FormControl('', [Validators.required]),
    titrear: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
  });

  constructor(
    private videoprojectiondebatservice: ProjectiondebatService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.affichevideo();
  }

  affichevideo() {
    this.videoprojectiondebats = [];
    this.videoprojectiondebatservice.getvideo().subscribe((data) => {
      for (var val of data) {
        this.videoprojectiondebats.push(val);
      }
    });
  }

  ajoutvideoarchive() {
    this.videoprojectiondebat.titre = this.myForm.value['titre'];
    this.videoprojectiondebat.titrear = this.myForm.value['titrear'];
    this.videoprojectiondebat.description = this.myForm.value['description'];
    this.videoprojectiondebat.descriptionar = this.myForm.value['descriptionar'];
    this.videoprojectiondebat.date = this.myForm.value['date'];
    this.videoprojectiondebat.path = this.myForm.value['path'];
    this.videoprojectiondebat.photo = this.myForm.value['fileSource'][0];
    logger(this.videoprojectiondebat);
    this.videoprojectiondebatservice
      .addvideo(this.videoprojectiondebat)
      .subscribe((data) => {
        console.log(data);
        if ((data['satus'] = 201)) {
          location.reload();
        }
      });
  }

  delete(objet) {
    this.videoprojectiondebatservice.deletevideo(objet);
  }

  update(objet:VideoProjectionDebat) {
    this.videoprojectiondebat = objet;
    this.videoprojectiondebat.date =
      this.videoprojectiondebat.date.substr(6, 4) +
      '-' +
      this.videoprojectiondebat.date.substr(3, 2) +
      '-' +
      this.videoprojectiondebat.date.substr(0, 2);
      this.httpClient.get(this.host + '/videoprojectiondebat/get/'+this.videoprojectiondebat.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      });
  }

  update1() {
    if (this.images[0] == undefined) {
      this.videoprojectiondebat.photo=this.updateimage;
      console.log(this.videoprojectiondebat);
    }else{
      this.videoprojectiondebat.photo = this.images[0];
    }

    this.videoprojectiondebatservice
      .updatevideo(this.videoprojectiondebat)
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
      this.videoprojectiondebat = object;
      this.safeURL = this.videoprojectiondebat.path.substring(
        this.videoprojectiondebat.path.indexOf('=') + 1,
        this.videoprojectiondebat.path.indexOf('&')
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
