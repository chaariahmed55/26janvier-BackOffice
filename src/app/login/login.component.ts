import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Entity/user';
import { UserService } from '../service/user.service';
import { catchError } from 'rxjs/operators';
import { logger } from 'src/logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  user = new User();
  users: User[] = [];
  veriflogin = true;
  token: string;
  public loggedUser: string;
  public isloggedIn: boolean = false;
  public roles: string;

  ngOnInit(): void {}

  login() {
    this.userservice.login(this.user.username, this.user.password).subscribe(
      (data) => {
        logger(this.user.username);
        logger(this.user.password);
        this.token = data['token'];
        console.log(this.token);
        if (data != null) {
          this.loggedUser = this.user.username;
          this.isloggedIn = true;
          localStorage.setItem('loggedUser', this.loggedUser);
          localStorage.setItem('isloggedIn', String(this.isloggedIn));
          localStorage.setItem('token', String(this.token));
          this.router.navigate(['/back/projectiondebat']);
        }
      },
      (catchError) => {
        this.veriflogin = false;
      }
    );
  }
}
