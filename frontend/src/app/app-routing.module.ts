import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artists/:id', component: ArtistDetailsComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
