import { Component, OnInit } from '@angular/core';
import { Presse } from '../Entity/presse';
import { PresseService } from '../service/presse.service';

@Component({
  selector: 'app-presse',
  templateUrl: './presse.component.html',
  styleUrls: ['./presse.component.css'],
})
export class PresseComponent implements OnInit {
  presses: Presse[] = [];
  presse = new Presse();

  constructor(private presseservice: PresseService) {}

  ngOnInit(): void {
    this.affichepresse();
  }

  affichepresse() {
    this.presses = [];
    this.presseservice.getall().subscribe((data) => {
      for (var val of data) {
        this.presses.push(val);
        console.log(val);
      }
    });
  }

  ajoutpresse() {
    this.presseservice.add(this.presse).subscribe((data) => {
      console.log('successfully added');
    });
    location.reload();
  }

  delete(objet) {
    this.presseservice.delete(objet);
    location.reload();
  }

  update(param) {
    this.presse = param;
  }
  update1() {
    this.presseservice.update(this.presse);
    setTimeout(function () {
      location.reload();
    }, 100);
  }
}
