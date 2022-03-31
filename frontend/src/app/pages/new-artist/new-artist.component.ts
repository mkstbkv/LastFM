import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createArtistRequest } from '../../store/artists/artists.actions';
import { ArtistData } from '../../models/artist.model';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.sass']
})
export class NewArtistComponent {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.artists.createLoading);
    this.error = store.select(state => state.artists.createError);
  }

  onSubmit() {
    const artistData: ArtistData = this.form.value;
    this.store.dispatch(createArtistRequest({artistData}));
  }
}
