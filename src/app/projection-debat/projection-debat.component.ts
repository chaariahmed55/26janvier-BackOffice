import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectionDebat } from '../Entity/ptojectiondebat';
import { PhotoProjectionDebat } from '../Entity/photoprojectiondebat';
import { ProjectiondebatService } from '../service/projectiondebat.service';
import { logger } from '../../logger';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projection-debat',
  templateUrl: './projection-debat.component.html',
  styleUrls: ['./projection-debat.component.css'],
})
export class ProjectionDebatComponent implements OnInit {
  readonly host = environment.baseurl;

  pds: ProjectionDebat[] = [];
  pd = new ProjectionDebat();
  progressivebarvalue = 0;
  save = false;
  photopd = new PhotoProjectionDebat();
  photopds: PhotoProjectionDebat[] = [];
  editable = false;
  photomap: Map<number, string> = new Map<number, string>();
  x: any;

  newid;

  imagess = [];
  ids: PhotoProjectionDebat[] = [];

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
    private pdservice: ProjectiondebatService,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.affichepd();
  }

  affichepd() {
    this.pds = [];
    this.pdservice.getallPD(0, 10).subscribe((data) => {
      for (var val of data) {
        this.pds.push(val);
        console.log(val);
      }
    });
  }

  ajoutpd() {
    if (this.progressivebarvalue == 50) {
      this.pd.admin = 1;
      this.pd.title = this.myForm.value['title'];
      this.pd.titlear = this.myForm.value['titlear'];
      this.pd.description = this.myForm.value['description'];
      this.pd.descriptionar = this.myForm.value['descriptionar'];
      this.pd.date = this.myForm.value['date'];
      this.pd.source = this.myForm.value['source'];
      this.pdservice.addPD(this.pd).subscribe((data) => {
        console.log('RetombeMediatique ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      for (let index = 0; index < this.imagess.length; index++) {
        this.photopd.data = this.imagess[index];
        var y: number = this.newid;
        this.photopd.projectiondebat = y;
        this.pdservice.addphoto(this.photopd).subscribe((data) => {
          if ((data[0] = 'success' && index == this.imagess.length - 1)) {
            location.reload();
          }
          console.log(data);
        });
      }
    }
  }

  delete(objet) {
    this.pd = objet;
    this.pdservice.deletePD(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  update(object: ProjectionDebat) {
    this.photopds = [];
    this.pd = object;
    this.pd.date =
      this.pd.date.substr(6, 4) +
      '-' +
      this.pd.date.substr(3, 2) +
      '-' +
      this.pd.date.substr(0, 2);
    this.pdservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photopds.push(val);
      }
    });
  }

  update1() {
    logger('lollaaaaaaaaa ' + this.pd.admin);
    logger('lollaaaaaaaaa ' + this.pd.date);
    logger('lollaaaaaaaaa ' + this.pd.description);
    logger('lollaaaaaaaaa ' + this.pd.id);
    logger('lollaaaaaaaaa ' + this.pd.source);
    logger('lollaaaaaaaaa ' + this.pd.title);
    this.pdservice.updatePD(this.pd).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
      logger(data);
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.pdservice.updatephoto(this.ids[index]).subscribe((data) => {
        console.log(data);
      });
    }
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  show(object) {
    this.photopds = [];
    this.pd = object;
    this.pdservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photopds.push(val);
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
