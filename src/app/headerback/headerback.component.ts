import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-headerback',
  templateUrl: './headerback.component.html',
  styleUrls: ['./headerback.component.css'],
})
export class HeaderbackComponent implements OnInit {
  username: String;
  public loggedUser: string;
  public isloggedIn: boolean = false;
  public roles: string;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.username = localStorage.getItem('loggedUser');
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined;
    this.roles = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['']);
  }
}
