import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { PhotoRapport } from '../Entity/photorapport';
import { Rapport } from '../Entity/rapport';
import { RapportService } from '../service/rapport.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css'],
})
export class RapportComponent implements OnInit {
  readonly host = environment.baseurl;
  rapports: Rapport[] = [];
  rapport = new Rapport();
  progressivebarvalue = 0;
  save = false;
  photorapport = new PhotoRapport();
  photorapports: PhotoRapport[] = [];
  ids: PhotoRapport[] = [];
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
    private rapportservice: RapportService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.affichepledoyer();
  }

  affichepledoyer() {
    this.rapports = [];
    this.rapportservice.getall().subscribe((data) => {
      for (var val of data) {
        this.rapports.push(val);
        console.log(val);
      }
    });
  }

  ajoutpd() {
    if (this.progressivebarvalue == 50) {
      this.rapport.titre = this.myForm.value['title'];
      this.rapport.titrear = this.myForm.value['titlear'];
      this.rapport.description = this.myForm.value['description'];
      this.rapport.descriptionar = this.myForm.value['descriptionar'];
      this.rapport.date = this.myForm.value['date'];
      this.rapport.source = this.myForm.value['source'];
      this.rapportservice.add(this.rapport).subscribe((data) => {
        console.log('RetombeMediatique ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      for (let index = 0; index < this.imagess.length; index++) {
        this.photorapport.data = this.imagess[index];
        var y: number = this.newid;
        this.photorapport.rapport = y;
        this.rapportservice.addphoto(this.photorapport).subscribe((data) => {
          if ((data[0] = 'success' && index == this.imagess.length - 1)) {
            location.reload();
          }
          console.log(data);
        });
      }
    }
  }

  delete(objet) {
    this.rapport = objet;
    this.rapportservice.delete(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  update(objet: Rapport) {
    this.photorapports = [];
    this.rapport = objet;
    this.rapport.date =
      this.rapport.date.substr(6, 4) +
      '-' +
      this.rapport.date.substr(3, 2) +
      '-' +
      this.rapport.date.substr(0, 2);
    this.rapportservice.getphoto(objet).subscribe((data) => {
      for (var val of data) {
        console.log(data);
        this.photorapports.push(val);
      }
    });
    console.log(this.photorapports);
  }

  update1() {
    this.rapportservice.update(this.rapport).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.rapportservice.updatephoto(this.ids[index]).subscribe((data) => {
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
    this.photorapports = [];
    this.rapport = object;
    this.rapportservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photorapports.push(val);
      }
    });
    console.log('hellooooooooooooooooo', this.photorapports);
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
