import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { HttpClientModule } from '@angular/common/http';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArticleComponent } from './article/article.component';
import { ContactComponent } from './contact/contact.component';
import { OtherresourceComponent } from './otherresource/otherresource.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { PresseComponent } from './presse/presse.component';
import { ProgrammeComponent } from './programme/programme.component';
import { RetombemediatiqueComponent } from './retombemediatique/retombemediatique.component';
import { HeaderfrontComponent } from './headerfront/headerfront.component';
import { HeaderbackComponent } from './headerback/headerback.component';
import { FooterfrontComponent } from './footerfront/footerfront.component';
import { FooterbackComponent } from './footerback/footerback.component';
import { MenubackComponent } from './menuback/menuback.component';
import { LoginComponent } from './login/login.component';
import { BackComponent } from './back/back.component';
import { BackModule } from './back/back.module';
import { TemoignageComponent } from './temoignage/temoignage.component';
import { PledoyerComponent } from './pledoyer/pledoyer.component';
import { BrochureComponent } from './brochure/brochure.component';
import { RapportComponent } from './rapport/rapport.component';
import { ArchivevideoComponent } from './archivevideo/archivevideo.component';
import { ProjectionDebatComponent } from './projection-debat/projection-debat.component';
import { VideoProjectionDebatComponent } from './video-projection-debat/video-projection-debat.component';
import { VideoTemoignageComponent } from './video-temoignage/video-temoignage.component';
import { VideoPledoyerComponent } from './video-pledoyer/video-pledoyer.component';
import { VideoRetombeMediatiqueComponent } from './video-retombe-mediatique/video-retombe-mediatique.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  // interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ArchiveComponent,
    ArticleComponent,
    ContactComponent,
    OtherresourceComponent,
    PartenaireComponent,
    PresseComponent,
    ProgrammeComponent,
    RetombemediatiqueComponent,
    HeaderfrontComponent,
    HeaderbackComponent,
    FooterfrontComponent,
    FooterbackComponent,
    MenubackComponent,
    LoginComponent,
    BackComponent,
    TemoignageComponent,
    PledoyerComponent,
    BrochureComponent,
    RapportComponent,
    ArchivevideoComponent,
    ProjectionDebatComponent,
    VideoProjectionDebatComponent,
    VideoTemoignageComponent,
    VideoPledoyerComponent,
    VideoRetombeMediatiqueComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
