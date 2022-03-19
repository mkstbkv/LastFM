import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Album } from '../../models/album.model';
import { TrackData } from '../../models/track.model';
import { createTrackRequest } from '../../store/tracks.actions';
import { fetchAlbumsRequest } from '../../store/albums.actions';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.sass']
})
export class NewTrackComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  albumsOb: Observable<Album[]>;
  albums!: Album[];
  albumsSub!: Subscription;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  artistId!: string;

  constructor(private store: Store<AppState>) {
    this.albumsOb = store.select(state => state.albums.albums);
    this.loading = store.select(state => state.tracks.createLoading);
    this.error = store.select(state => state.tracks.createError);
    this.albumsSub = this.albumsOb.subscribe(albums => {
      this.albums = albums;
    });
  }

  onSubmit() {
    const trackData: TrackData = this.form.value;
    this.store.dispatch(createTrackRequest({trackData}));
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAlbumsRequest({id: ''}));
  }

}
