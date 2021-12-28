import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoPledoyer } from '../Entity/videopledoyer';
import { PledoyerService } from '../service/pledoyer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-pledoyer',
  templateUrl: './video-pledoyer.component.html',
  styleUrls: ['./video-pledoyer.component.css'],
})
export class VideoPledoyerComponent implements OnInit {
  readonly host = environment.baseurl;
  safeURL: string = '';
  // safeIMAGE:string='';

  videopledoyers: VideoPledoyer[] = [];
  videopledoyer = new VideoPledoyer();
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
    private videopledoyerservice: PledoyerService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.affichevideo();
  }

  affichevideo() {
    this.videopledoyers = [];
    this.videopledoyerservice.getvideo().subscribe((data) => {
      for (var val of data) {
        this.videopledoyers.push(val);
      }
    });
  }

  ajoutvideoarchive() {
    this.videopledoyer.titre = this.myForm.value['titre'];
    this.videopledoyer.titrear = this.myForm.value['titrear'];
    this.videopledoyer.description = this.myForm.value['description'];
    this.videopledoyer.descriptionar = this.myForm.value['descriptionar'];
    this.videopledoyer.date = this.myForm.value['date'];
    this.videopledoyer.path = this.myForm.value['path'];
    this.videopledoyer.photo = this.myForm.value['fileSource'][0];
    this.videopledoyerservice.addvideo(this.videopledoyer).subscribe((data) => {
      console.log(data);
      if ((data['satus'] = 201)) {
        location.reload();
      }
    });
  }

  delete(objet) {
    this.videopledoyerservice.deletevideo(objet);
  }

  update(objet) {
    this.videopledoyer = objet;
    this.videopledoyer.date =
      this.videopledoyer.date.substr(6, 4) +
      '-' +
      this.videopledoyer.date.substr(3, 2) +
      '-' +
      this.videopledoyer.date.substr(0, 2);
      this.httpClient.get(this.host + '/videopledoyer/get/'+this.videopledoyer.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      });
  }
  update1() {
    if (this.images[0] == undefined) {
      this.videopledoyer.photo=this.updateimage;
      console.log(this.videopledoyer);
    }else{
      this.videopledoyer.photo = this.images[0];
    }

    this.videopledoyerservice
      .updatevideo(this.videopledoyer)
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
      this.videopledoyer = object;
      this.safeURL = this.videopledoyer.path.substring(
        this.videopledoyer.path.indexOf('=') + 1,
        this.videopledoyer.path.indexOf('&')
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
