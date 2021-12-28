import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationGuard implements CanActivate {
  constructor(private router: Router, private userservice: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let session = localStorage.getItem('token');
    if (session != '' && session != null && session != undefined) {
      console.log('session : ', session);

      return true;
    } else this.router.navigate(['/forbidden']);
    return false;
  }
}
