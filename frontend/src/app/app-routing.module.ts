import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TracksHistoryComponent } from './pages/tracks-history/tracks-history.component';
import { NewArtistComponent } from './pages/new-artist/new-artist.component';
import { NewAlbumComponent } from './pages/new-album/new-album.component';
import { NewTrackComponent } from './pages/new-track/new-track.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'artists/:id', component: AlbumsComponent},
  {path: 'new-artist', component: NewArtistComponent},
  {path: 'new-album', component: NewAlbumComponent},
  {path: 'tracks/:id', component: TracksComponent},
  {path: 'new-track', component: NewTrackComponent},
  {path: 'tracksHistory', component: TracksHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
