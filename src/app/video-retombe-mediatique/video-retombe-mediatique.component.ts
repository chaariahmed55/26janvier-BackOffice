import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoTemoignage } from '../Entity/videotemoignage';
import { RetombemediatiqueService } from '../service/retombemediatique.service';
import { VideoRM } from '../Entity/videorm';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-retombe-mediatique',
  templateUrl: './video-retombe-mediatique.component.html',
  styleUrls: ['./video-retombe-mediatique.component.css'],
})
export class VideoRetombeMediatiqueComponent implements OnInit {
  safeURL: string = '';
  // safeIMAGE:string='';
  readonly host = environment.baseurl;

  videorms: VideoRM[] = [];
  videorm = new VideoRM();
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
    private videormservice: RetombemediatiqueService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.affichevideo();
  }

  affichevideo() {
    this.videorms = [];
    this.videormservice.getvideo().subscribe((data) => {
      for (var val of data) {
        this.videorms.push(val);
      }
    });
  }

  ajoutvideoarchive() {
    this.videorm.titre = this.myForm.value['titre'];
    this.videorm.titrear = this.myForm.value['titrear'];
    this.videorm.description = this.myForm.value['description'];
    this.videorm.descriptionar = this.myForm.value['descriptionar'];
    this.videorm.date = this.myForm.value['date'];
    this.videorm.path = this.myForm.value['path'];
    this.videorm.photo = this.myForm.value['fileSource'][0];
    this.videormservice.addvideo(this.videorm).subscribe((data) => {
      console.log(data);
      if ((data['satus'] = 201)) {
        location.reload();
      }
    });
  }

  delete(objet) {
    this.videormservice.deletevideo(objet);
  }

  update(objet) {
    this.videorm = objet;
    this.videorm.date =
      this.videorm.date.substr(6, 4) +
      '-' +
      this.videorm.date.substr(3, 2) +
      '-' +
      this.videorm.date.substr(0, 2);
      this.httpClient.get(this.host + '/videorm/get/'+this.videorm.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      });
  }
  update1() {

    if (this.images[0] == undefined) {
      this.videorm.photo=this.updateimage;
      console.log(this.videorm);
    }else{
      this.videorm.photo = this.images[0];
    }

    this.videormservice.updatevideo(this.videorm).subscribe((data) => {
      console.log(data);
    });
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  show(object) {
    this.safeURL = '';
    setTimeout(() => {
      this.videorm = object;
      this.safeURL = this.videorm.path.substring(
        this.videorm.path.indexOf('=') + 1,
        this.videorm.path.indexOf('&')
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
