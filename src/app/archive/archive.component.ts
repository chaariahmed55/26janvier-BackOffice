import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { PhotoArchive } from '../Entity/photoarchive';
import { ArchiveService } from '../service/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  readonly host = environment.baseurl;

  photoarchives: PhotoArchive[] = [];
  photoarchive = new PhotoArchive();
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  @ViewChild('closebutton') closebutton;
  imagess: any;
  images = [];
  updateimage;

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    titlear: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionar: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private archiveservice: ArchiveService,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getallphotoarchives();
  }

  getallphotoarchives() {
    this.photoarchives = [];
    this.archiveservice.getphoto().subscribe((data) => {
      for (var val of data) {
        this.photoarchives.push(val);
      }
    });
  }

  ajoutpartenaire() {
    this.photoarchive.data = this.myForm.value['fileSource'][0];
    this.photoarchive.date = this.myForm.value['date'];
    this.photoarchive.description = this.myForm.value['description'];
    this.photoarchive.descriptionar = this.myForm.value['descriptionar'];
    this.photoarchive.name = this.myForm.value['title'];
    this.photoarchive.namear = this.myForm.value['titlear'];
    this.photoarchive.source = this.myForm.value['source'];
    this.archiveservice.addphoto(this.photoarchive).subscribe((data) => {
      console.log(data);
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
    this.closebutton.nativeElement.click();
    
  }

  allarchive() {
    this.getallphotoarchives();
  }

  delete(objet) {
    this.archiveservice.deletephoto(objet);
    setTimeout(function () {
      location.reload();
    }, 100);
  }

  update(objet) {
    this.photoarchive = objet;
    this.photoarchive.date =
      this.photoarchive.date.substr(6, 4) +
      '-' +
      this.photoarchive.date.substr(3, 2) +
      '-' +
      this.photoarchive.date.substr(0, 2);
      this.httpClient.get(this.host + '/photoarchive/getall/'+this.photoarchive.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      
      });
  }

  update1() {
    if (this.images[0] == undefined) {
      this.photoarchive.data=this.updateimage;
      console.log(this.photoarchive);
    }else{
      this.photoarchive.data = this.images[0];
    }

    this.archiveservice.updatephoto(this.photoarchive).subscribe((data) => {
      console.log(data);
      setTimeout(function () {
        location.reload();
      }, 100);
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
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
