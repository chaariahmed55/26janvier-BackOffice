import { Component, OnInit, ViewChild } from '@angular/core';
import { Temoignage } from '../Entity/temoignage';
import { TemoignageService } from '../service/temoignage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PhotoTemoignage } from '../Entity/phototemoignage';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-temoignage',
  templateUrl: './temoignage.component.html',
  styleUrls: ['./temoignage.component.css'],
})
export class TemoignageComponent implements OnInit {
  
  readonly host = environment.baseurl;
  temoignages: Temoignage[] = [];
  temoignage = new Temoignage();
  progressivebarvalue = 0;
  save = false;
  phototemoignage = new PhotoTemoignage();
  phototemoignages: PhotoTemoignage[] = [];
  editable = false;

  newid;
  imagess = [];
  ids: PhotoTemoignage[] = [];
  images = [];

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    titlear: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionar: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    path: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
  });

  constructor(
    private temoignageservice: TemoignageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.affichetemoignage();
  }

  affichetemoignage() {
    this.temoignages = [];
    this.temoignageservice.getall().subscribe((data) => {
      for (var val of data) {
        this.temoignages.push(val);
        console.log(val);
      }
    });
  }

  ajoutpd() {
    if (this.progressivebarvalue == 50) {
      this.temoignage.admin = 1;
      this.temoignage.titre = this.myForm.value['title'];
      this.temoignage.description = this.myForm.value['description'];
      this.temoignage.date = this.myForm.value['date'];
      this.temoignage.source = this.myForm.value['source'];
      this.temoignageservice.add(this.temoignage).subscribe((data) => {
        console.log('RetombeMediatique ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      for (let index = 0; index < this.imagess.length; index++) {
        this.phototemoignage.data = this.imagess[index];
        var y: number = this.newid;
        this.phototemoignage.temoignage = y;
        this.temoignageservice
          .addphoto(this.phototemoignage)
          .subscribe((data) => {
            if ((data[0] = 'success' && index == this.imagess.length - 1)) {
              location.reload();
            }
            console.log(data);
          });
      }
    }
  }

  delete(objet) {
    this.temoignage = objet;
    this.temoignageservice.delete(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  reload() {
    location.reload();
  }

  update(object: Temoignage) {
    this.phototemoignages = [];
    this.temoignage = object;
    this.temoignage.date =
      this.temoignage.date.substr(6, 4) +
      '-' +
      this.temoignage.date.substr(3, 2) +
      '-' +
      this.temoignage.date.substr(0, 2);
    this.temoignageservice.getallphoto(object).subscribe((data) => {
      for (var val of data) {
        this.phototemoignages.push(val);
      }
    });
  }

  update1() {
    console.log('lollaaaaaaaaa ' + this.temoignage.admin['id']);
    console.log('lollaaaaaaaaa ' + this.temoignage.date);
    console.log('lollaaaaaaaaa ' + this.temoignage.description);
    console.log('lollaaaaaaaaa ' + this.temoignage.id);
    console.log('lollaaaaaaaaa ' + this.temoignage.source);
    console.log('lollaaaaaaaaa ' + this.temoignage.titre);
    console.log(this.temoignage );
    
    this.temoignageservice.update(this.temoignage).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
      console.log(data);
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.temoignageservice.updatephoto(this.ids[index]).subscribe((data) => {
        console.log(data);
      });
    }
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  show(object) {
    this.phototemoignages = [];
    this.temoignage = object;
    this.temoignageservice.getallphoto(object).subscribe((data) => {
      for (var val of data) {
        this.phototemoignages.push(val);
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
