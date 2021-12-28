import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackRoutingModule } from './back-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { MenubackComponent } from '../menuback/menuback.component';

@NgModule({
  declarations: [
    // MenubackComponent,
  ],
  imports: [CommonModule, BackRoutingModule, HttpClientModule, FormsModule],
})
export class BackModule {}
