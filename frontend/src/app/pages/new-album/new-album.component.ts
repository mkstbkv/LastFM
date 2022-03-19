import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Artist } from '../../models/artist.model';
import { NgForm } from '@angular/forms';
import { AlbumData } from '../../models/album.model';
import { createAlbumRequest } from '../../store/albums.actions';
import { fetchArtistsRequest } from '../../store/artists.actions';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.sass']
})
export class NewAlbumComponent implements OnInit{
  @ViewChild('f') form!: NgForm;
  artists: Observable<Artist[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
  }

  onSubmit() {
    const albumData: AlbumData = this.form.value;
    this.store.dispatch(createAlbumRequest({albumData}));
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }
}
