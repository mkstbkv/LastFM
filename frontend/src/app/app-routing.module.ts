import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TracksHistoryComponent } from './pages/tracks-history/tracks-history.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artists/:id', component: ArtistDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tracks/:id', component: TracksComponent},
  {path: 'tracksHistory', component: TracksHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
