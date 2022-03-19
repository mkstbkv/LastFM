import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { TracksHistory } from '../../models/tracksHistory.model';
import { fetchTracksHistoryRequest } from '../../store/tracksHistory.actions';

@Component({
  selector: 'app-tracks-history',
  templateUrl: './tracks-history.component.html',
  styleUrls: ['./tracks-history.component.sass']
})
export class TracksHistoryComponent implements OnInit {
  tracksHistory: Observable<TracksHistory[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.tracksHistory = store.select(state => state.tracksHistory.tracksHistory);
    this.loading = store.select(state => state.tracksHistory.fetchLoading);
    this.error = store.select(state => state.tracksHistory.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTracksHistoryRequest());
  }
}
