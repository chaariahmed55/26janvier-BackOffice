import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationGuard } from '../application.guard';
import { ArchiveComponent } from '../archive/archive.component';
import { ArchivevideoComponent } from '../archivevideo/archivevideo.component';
import { ArticleComponent } from '../article/article.component';
import { BrochureComponent } from '../brochure/brochure.component';
import { ContactComponent } from '../contact/contact.component';
import { VideoPledoyer } from '../Entity/videopledoyer';
import { OtherresourceComponent } from '../otherresource/otherresource.component';
import { PartenaireComponent } from '../partenaire/partenaire.component';
import { PledoyerComponent } from '../pledoyer/pledoyer.component';
import { PresseComponent } from '../presse/presse.component';
import { ProgrammeComponent } from '../programme/programme.component';
import { ProjectionDebatComponent } from '../projection-debat/projection-debat.component';
import { RapportComponent } from '../rapport/rapport.component';
import { RetombemediatiqueComponent } from '../retombemediatique/retombemediatique.component';
import { TemoignageComponent } from '../temoignage/temoignage.component';
import { VideoPledoyerComponent } from '../video-pledoyer/video-pledoyer.component';
import { VideoProjectionDebatComponent } from '../video-projection-debat/video-projection-debat.component';
import { VideoRetombeMediatiqueComponent } from '../video-retombe-mediatique/video-retombe-mediatique.component';
import { VideoTemoignageComponent } from '../video-temoignage/video-temoignage.component';

import { BackComponent } from './back.component';

const routes: Routes = [
  {
    path: 'back',
    component: BackComponent,
    children: [
      {
        path: 'projectiondebat',
        component: ProjectionDebatComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'videoprojectiondebat',
        component: VideoProjectionDebatComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'temoignage',
        component: TemoignageComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'videotemoignage',
        component: VideoTemoignageComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'pledoyer',
        component: PledoyerComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'videopledoyer',
        component: VideoPledoyerComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'presse',
        component: PresseComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'article',
        component: ArticleComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'photoarchive',
        component: ArchiveComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'brochure',
        component: BrochureComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'videoarchive',
        component: ArchivevideoComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'rapport',
        component: RapportComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'otherresource',
        component: OtherresourceComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'programme',
        component: ProgrammeComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'retombemediatique',
        component: RetombemediatiqueComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'videoretombemediatique',
        component: VideoRetombeMediatiqueComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [ApplicationGuard],
      },
      {
        path: 'partenaire',
        component: PartenaireComponent,
        canActivate: [ApplicationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackRoutingModule {}
