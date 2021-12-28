import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Brochure } from '../Entity/brochure';
import { PhotoBrochure } from '../Entity/photobrochure';
import { BrochureService } from '../service/brochure.service';

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.css'],
})
export class BrochureComponent implements OnInit {

  readonly host = environment.baseurl;
  brochures: Brochure[] = [];
  brochure = new Brochure();
  progressivebarvalue = 0;
  save = false;
  photobrochure = new PhotoBrochure();
  photobrochures: PhotoBrochure[] = [];
  ids: PhotoBrochure[] = [];

  newid;
  imagess = [];
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
    private brochureservice: BrochureService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.affichepledoyer();
  }

  affichepledoyer() {
    this.brochures = [];
    this.brochureservice.getallbrochure().subscribe((data) => {
      for (var val of data) {
        this.brochures.push(val);
        console.log(val);
      }
    });
  }

  ajoutpd() {
    if (this.progressivebarvalue == 50) {
      this.brochure.titre = this.myForm.value['title'];
      this.brochure.titrear = this.myForm.value['titlear'];
      this.brochure.description = this.myForm.value['description'];
      this.brochure.descriptionar = this.myForm.value['descriptionar'];
      this.brochure.date = this.myForm.value['date'];
      this.brochure.source = this.myForm.value['source'];
      this.brochureservice.addbrochure(this.brochure).subscribe((data) => {
        console.log('RetombeMediatique ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      for (let index = 0; index < this.imagess.length; index++) {
        this.photobrochure.data = this.imagess[index];
        var y: number = this.newid;
        this.photobrochure.brochure = y;
        this.brochureservice.addphoto(this.photobrochure).subscribe((data) => {
          if ((data[0] = 'success' && index == this.imagess.length - 1)) {
            location.reload();
          }
          console.log(data);
        });
      }
    }
  }

  delete(objet) {
    this.brochure = objet;
    this.brochureservice.delete(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  update(objet: Brochure) {
    this.photobrochures = [];
    this.brochure = objet;
    this.brochure.date =
      this.brochure.date.substr(6, 4) +
      '-' +
      this.brochure.date.substr(3, 2) +
      '-' +
      this.brochure.date.substr(0, 2);
    this.brochureservice.getphoto(objet).subscribe((data) => {
      for (var val of data) {
        console.log(data);
        this.photobrochures.push(val);
      }
    });
  }

  update1() {
    this.brochureservice.update(this.brochure).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
      console.log(data);
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.brochureservice.updatephoto(this.ids[index]).subscribe((data) => {
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
    this.photobrochures = [];
    this.brochure = object;
    this.brochureservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photobrochures.push(val);
      }
    });
    console.log('hellooooooooooooooooo', this.photobrochures);
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
