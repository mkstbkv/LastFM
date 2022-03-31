import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Track } from '../../models/track.model';
import { deleteTrackRequest, fetchTracksRequest, publishTrackRequest } from '../../store/tracks/tracks.actions';
import { ActivatedRoute } from '@angular/router';
import { createTracksHistoryRequest } from '../../store/tracksHistory/tracksHistory.actions';
import { TracksHistoryData } from '../../models/tracksHistory.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit {
  tracks: Observable<Track[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor
  (private store: Store<AppState>,
   private route: ActivatedRoute,
  ) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.loading = store.select(state => state.tracks.fetchLoading);
    this.error = store.select(state => state.tracks.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTracksRequest({id: this.route.snapshot.params['id']}));
  }

  createTrackHistory(id: string) {
    const trackHistoryData: TracksHistoryData  = {
      track: id
    };
    this.store.dispatch(createTracksHistoryRequest({tracksHistoryData: trackHistoryData}));
  }

  publishTrack(id: string) {
    this.store.dispatch(publishTrackRequest({id}));
  }

  deleteTrack(id: string) {
    this.store.dispatch(deleteTrackRequest({id}));
  }
}
