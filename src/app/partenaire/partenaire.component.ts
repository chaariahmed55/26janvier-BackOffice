import { Component, OnInit, ViewChild } from '@angular/core';
import { Partenaire } from '../Entity/partenaire';
import { PartenaireService } from '../service/partenaire.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.css'],
})
export class PartenaireComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  partenaires: Partenaire[] = [];
  partenaire = new Partenaire();
  partenaireforupdate = new Partenaire();
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(
    private partenaireservice: PartenaireService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getallpartenaire();
  }

  getallpartenaire() {
    this.partenaires = [];
    this.partenaireservice.getall().subscribe((data) => {
      for (var val of data) {
        // val['logo'] = 'data:image/png;base64,' + val['logo']
        this.partenaires.push(val);
      }
    });
  }

  ajoutpartenaire() {
    this.partenaire.logo = this.cardImageBase64;
    this.partenaire.admin = 1;
    this.partenaireservice.add(this.partenaire).subscribe((data) => {
      console.log(data);
      if ((data['satus'] = 201)) {
        location.reload();
      }
    });
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  allpartenaire() {
    this.getallpartenaire();
  }

  partenairelocal() {
    this.partenaires = [];
    this.partenaireservice
      .getpartenairebytype('Partenaires locaux')
      .subscribe((data) => {
        for (let val of data) {
          this.partenaires.push(val);
        }
      });
  }

  partenairesimple() {
    this.partenaires = [];
    this.partenaireservice
      .getpartenairebytype('Partenaires')
      .subscribe((data) => {
        for (let val of data) {
          this.partenaires.push(val);
        }
      });
  }

  delete(objet) {
    this.partenaireservice.delete(objet);
  }

  update(objet) {
    this.partenaire = objet;
  }

  update1() {
    if (this.cardImageBase64 != null) {
      this.partenaire.logo = this.cardImageBase64;
    }
    this.partenaireservice.update(this.partenaire).subscribe((data) => {
      console.log(data);
    });
    setTimeout(function () {
      location.reload();
    }, 100);
  }
}
