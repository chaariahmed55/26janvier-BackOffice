import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pledoyer } from '../Entity/pledoyer';
import { PhotoPledoyer } from '../Entity/photopledoyer';
import { VideoPledoyer } from '../Entity/videopledoyer';
import { PledoyerService } from '../service/pledoyer.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pledoyer',
  templateUrl: './pledoyer.component.html',
  styleUrls: ['./pledoyer.component.css'],
})
export class PledoyerComponent implements OnInit {
  
  readonly host = environment.baseurl;
  pledoyers: Pledoyer[] = [];
  pledoyer = new Pledoyer();
  progressivebarvalue = 0;
  save = false;
  photopledoyer = new PhotoPledoyer();
  photopledoyers: PhotoPledoyer[] = [];
  editable = false;
  x: any;
  ids: PhotoPledoyer[] = [];

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
    private pledoyerservice: PledoyerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.affichepledoyer();
  }

  affichepledoyer() {
    this.pledoyers = [];
    this.pledoyerservice.getall().subscribe((data) => {
      for (var val of data) {
        this.pledoyers.push(val);
        console.log(val);
      }
    });
  }

  ajoutpd() {
    if (this.progressivebarvalue == 50) {
      this.pledoyer.admin = 1;
      this.pledoyer.titre = this.myForm.value['title'];
      this.pledoyer.titrear = this.myForm.value['titlear'];
      this.pledoyer.description = this.myForm.value['description'];
      this.pledoyer.descriptionar = this.myForm.value['descriptionar'];
      this.pledoyer.date = this.myForm.value['date'];
      this.pledoyer.source = this.myForm.value['source'];
      this.pledoyerservice.add(this.pledoyer).subscribe((data) => {
        console.log('RetombeMediatique ', (this.newid = data));
        console.log(this.newid.toString());
      });
    } else if (this.progressivebarvalue == 100) {
      for (let index = 0; index < this.imagess.length; index++) {
        this.photopledoyer.data = this.imagess[index];
        var y: number = this.newid;
        this.photopledoyer.pledoyer = y;
        this.pledoyerservice.addphoto(this.photopledoyer).subscribe((data) => {
          if ((data[0] = 'success' && index == this.imagess.length - 1)) {
            location.reload();
          }
          console.log(data);
        });
      }
    }
  }

  delete(objet) {
    this.pledoyer = objet;
    this.pledoyerservice.delete(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 50;
  }

  reload() {
    location.reload();
  }

  update(object: Pledoyer) {
    this.photopledoyers = [];
    this.pledoyer = object;
    this.pledoyer.date =
      this.pledoyer.date.substr(6, 4) +
      '-' +
      this.pledoyer.date.substr(3, 2) +
      '-' +
      this.pledoyer.date.substr(0, 2);
    this.pledoyerservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photopledoyers.push(val);
      }
    });
  }

  update1() {
    console.log('lollaaaaaaaaa ' + this.pledoyer.admin);
    console.log('lollaaaaaaaaa ' + this.pledoyer.date);
    console.log('lollaaaaaaaaa ' + this.pledoyer.description);
    console.log('lollaaaaaaaaa ' + this.pledoyer.id);
    console.log('lollaaaaaaaaa ' + this.pledoyer.source);
    console.log('lollaaaaaaaaa ' + this.pledoyer.titre);
    this.pledoyerservice.update(this.pledoyer).subscribe((data) => {
      if ((data[0] = 'success')) {
        location.reload();
      }
      console.log(data);
    });
  }

  update2() {
    for (let index = 0; index < this.imagess.length; index++) {
      this.ids[index].data = this.imagess[index];
      this.pledoyerservice.updatephoto(this.ids[index]).subscribe((data) => {
        console.log(data);
      });
    }
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  show(object) {
    this.photopledoyers = [];
    this.pledoyer = object;
    this.pledoyerservice.getphoto(object).subscribe((data) => {
      for (var val of data) {
        this.photopledoyers.push(val);
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
