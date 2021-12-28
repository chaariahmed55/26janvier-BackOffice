import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OtherResource } from '../Entity/otherresource';
import { OtherresourceService } from '../service/otherresource.service';

@Component({
  selector: 'app-otherresource',
  templateUrl: './otherresource.component.html',
  styleUrls: ['./otherresource.component.css'],
})
export class OtherresourceComponent implements OnInit {
  readonly host = environment.baseurl;
  otherressources: OtherResource[] = [];
  otherressource = new OtherResource();
  progressivebarvalue = 0;
  save = false;

  newid;
  imagess: any;
  images = [];
  updateimage;


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
    private otherressourceservice: OtherresourceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.affichepledoyer();
  }

  affichepledoyer() {
    this.otherressources = [];
    this.otherressourceservice.getall().subscribe((data) => {
      for (var val of data) {
        this.otherressources.push(val);
        console.log(val);
      }
    });
  }

  ajoutpd() {
    this.otherressource.admin = 1;
    this.otherressource.titre = this.myForm.value['title'];
    this.otherressource.titrear = this.myForm.value['titlear'];
    this.otherressource.description = this.myForm.value['description'];
    this.otherressource.descriptionar = this.myForm.value['descriptionar'];
    this.otherressource.date = this.myForm.value['date'];
    this.otherressource.link = this.myForm.value['source'];
    this.otherressource.data = this.myForm.value['fileSource'][0];
    this.otherressourceservice.add(this.otherressource).subscribe((data) => {
      console.log('RetombeMediatique ', (this.newid = data));
      console.log(this.newid.toString());
      location.reload();
    });
  }

  delete(objet) {
    this.otherressource = objet;
    this.otherressourceservice.delete(objet);
  }

  next() {
    this.images = [];
    this.progressivebarvalue += 100;
  }

  reload() {
    location.reload();
  }

  show(object) {
    this.otherressource = object;
  }

  update(objet) {
    this.otherressource = objet;
    this.otherressource.date =
      this.otherressource.date.substr(6, 4) +
      '-' +
      this.otherressource.date.substr(3, 2) +
      '-' +
      this.otherressource.date.substr(0, 2);
      this.http.get(this.host + '/or/get/'+this.otherressource.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;console.log(data);
      });
  }

  update1() {

    if (this.images[0] == undefined) {
      this.otherressource.data=this.updateimage;
      console.log(this.otherressource);
    }else{
      this.otherressource.data = this.images[0];
    }


    this.otherressourceservice.update(this.otherressource).subscribe((data) => {
      console.log(data);
    });
    setTimeout(function () {
      location.reload();
    }, 100);
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
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
