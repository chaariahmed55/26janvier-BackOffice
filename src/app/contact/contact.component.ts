import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../Entity/contact';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  page: number = 0;
  numbrenonvue = 0;
  contact = new Contact();
  email: string;
  maxpage: number;
  maxpage1: number;

  constructor(
    private contactService: ContactService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getcontact();
    this.contactService.getnumnonvue().subscribe((data) => {
      this.numbrenonvue = data[0]['1'];
    });
    this.contactService.getmaxpage().subscribe((data) => {
      this.maxpage = data[0]['1'];
      this.maxpage1 = Math.floor(data[0]['1'] / 10);
      console.log('maxpage1 ', this.maxpage1);
    });
  }

  getcontact() {
    this.contacts = [];
    this.contactService.getallcontact(this.page).subscribe((data) => {
      for (var val of data) {
        this.contacts.push(val);
      }
    });
    console.log(this.contacts);
  }

  getmovedcontact() {
    this.contacts = [];
    this.contactService.getallmovedcontact(this.page).subscribe((data) => {
      for (var val of data) {
        this.contacts.push(val);
      }
    });
    console.log(this.contacts);
  }

  delete(object) {
    this.contactService.delete(object);
  }

  showcontact(param) {
    this.contactService.read(param);
    this.contact = param;
    console.log('parametre ', param);
    this.contactService.getnumnonvue().subscribe((data) => {
      this.numbrenonvue = data[0]['1'];
    });
  }

  search() {
    if (this.email == '') {
      this.getcontact();
    } else {
      this.contacts = [];
      this.contactService.getbyemail(this.email).subscribe((data) => {
        this.contacts.push(data[0]);
      });
    }
  }

  next() {
    this.page += 1;
    this.contacts = [];
    this.getcontact();
  }
  previous() {
    this.page -= 1;
    this.contacts = [];
    this.getcontact();
  }
}
