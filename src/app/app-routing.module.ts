import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationGuard } from './application.guard';
import { BackComponent } from './back/back.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'back', component: BackComponent, canActivate: [ApplicationGuard] },
  { path: '', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
