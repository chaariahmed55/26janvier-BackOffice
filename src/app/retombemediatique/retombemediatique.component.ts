import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoRM } from '../Entity/photorm';
import { RetombeMediatique } from '../Entity/retombemediatique';
import { RetombemediatiqueService } from '../service/retombemediatique.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-retombemediatique',
  templateUrl: './retombemediatique.component.html',
  styleUrls: ['./retombemediatique.component.css'],
})
export class RetombemediatiqueComponent implements OnInit {
  
  readonly host = environment.baseurl;
  rms: RetombeMediatique[] = [];
  rm = new RetombeMediatique();
  progressivebarvalue = 0;
  save = false;
  photorm = new PhotoRM();
  photorms: PhotoRM[] = [];
  ids: PhotoRM[] = [];
  newid;
  imagess = [];
  images = [];
  editable = false;

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    titlear: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    legende: new FormControl('', [Validators.required]),
    legendear: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    path: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
  });

  constructor(
    private rmservice: RetombemediatiqueService,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.afficherm();
  }

  afficherm() {
    this.rms = [];
    this.rmservice.getallRM().subscribe((data) => {
      for (var val of data) {
        this.rms.push(val);
        console.log(val);
      }
    });
  }

  ajoutrm() {
    if (this.progressivebarvalue == 50) {
      console.log('add temoignage');
      this.rm.admin = 1;
      this.rm.title = this.myForm.value['title'];
      this.rm.titlear = this.myForm.value['titlear'];
      this.rm.author = this.myForm.value['author'];
      this.rm.date = this.myForm.value['date'];
      this.rm.legende = this.myForm.value['legende'];
      this.rm.legendear = this.myForm.value['legendear'];
      this.rm.source = this.myForm.value['source'];
      this.rmservice.addRM(this.rm).subscribe((data) => {
        console.log('RetombeMediatique ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      console.log('add photo for temoignage');
      for (let index = 0; index < this.imagess.length; index++) {
        this.photorm.data = this.imagess[index];
        var y: number = this.newid;
        this.photorm.retombemediatique = y;
        this.rmservice.addphoto(this.photorm).subscribe((data) => {
          if ((data[0] = 'success' && index == this.imagess.length - 1)) {
            location.reload();
          }
          console.log(data);
        });
      }
    }
    console.log('ajoutRetombeMediatique ', this.myForm.value);
  }

  delete(objet) {
    this.rm = objet;
    this.rmservice.deleteRM(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  update(objet: RetombeMediatique) {
    this.photorms = [];
    this.rm = objet;
    this.rm.date =
      this.rm.date.substr(6, 4) +
      '-' +
      this.rm.date.substr(3, 2) +
      '-' +
      this.rm.date.substr(0, 2);
    this.rmservice.getphoto(objet).subscribe((data) => {
      for (var val of data) {
        console.log(data);
        this.photorms.push(val);
      }
    });
    console.log(this.photorms);
  }

  update1() {
    this.rmservice.updateRM(this.rm).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
      console.log(data);
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.rmservice.updatephoto(this.ids[index]).subscribe((data) => {
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

  show(object) {
    this.photorms = [];
    this.rm = object;
    this.rmservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photorms.push(val);
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
