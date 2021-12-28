import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Archivevideo } from '../Entity/archivevideo';
import { ArchiveService } from '../service/archive.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-archivevideo',
  templateUrl: './archivevideo.component.html',
  styleUrls: ['./archivevideo.component.css'],
})
export class ArchivevideoComponent implements OnInit {
  readonly host = environment.baseurl;
  safeURL: string = '';
  // safeIMAGE:string='';

  archivevideos: Archivevideo[] = [];
  archivevideo = new Archivevideo();
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
    private archiveservice: ArchiveService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.affichevideo();
  }

  affichevideo() {
    this.archivevideos = [];
    this.archiveservice.getvideo().subscribe((data) => {
      for (var val of data) {
        this.archivevideos.push(val);
      }
    });
  }

  ajoutvideoarchive() {
    this.archivevideo.titre = this.myForm.value['titre'];
    this.archivevideo.titrear = this.myForm.value['titrear'];
    this.archivevideo.description = this.myForm.value['description'];
    this.archivevideo.descriptionar = this.myForm.value['descriptionar'];
    this.archivevideo.date = this.myForm.value['date'];
    this.archivevideo.path = this.myForm.value['path'];
    this.archivevideo.photo = this.myForm.value['fileSource'][0];
    this.archiveservice.addvideo(this.archivevideo).subscribe((data) => {
      console.log(data);
      if ((data['satus'] = 201)) {
        location.reload();
      }
    });
  }

  delete(objet) {
    this.archiveservice.deletevideo(objet);
  }

  update(objet) {
      this.archivevideo = objet;
      this.archivevideo = objet;
      this.archivevideo.date =
      this.archivevideo.date.substr(6, 4) +
      '-' +
      this.archivevideo.date.substr(3, 2) +
      '-' +
      this.archivevideo.date.substr(0, 2);
      this.httpClient.get(this.host + '/videoarchive/get/'+this.archivevideo.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      });
  }
  update1() {
    if (this.images[0] == undefined) {
      this.archivevideo.photo=this.updateimage;
      console.log(this.archivevideo);
    }else{
      this.archivevideo.photo = this.images[0];
    }
    this.archiveservice
      .updatevideo(this.archivevideo)
      .subscribe((data) => {
        console.log(data);
      });
    setTimeout(function () {
      location.reload();
    }, 1000);
  }


  show(object) {
    this.safeURL = '';
    setTimeout(() => {
      this.archivevideo = object;
      this.safeURL = this.archivevideo.path.substring(
        this.archivevideo.path.indexOf('=') + 1,
        this.archivevideo.path.indexOf('&')
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
