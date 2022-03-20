import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { TracksHistoryService } from '../services/tracks-history.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import {
  createTrackHistoryFailure,
  createTrackHistorySuccess,
  createTracksHistoryRequest,
  fetchTracksHistoryFailure,
  fetchTracksHistoryRequest,
  fetchTracksHistorySuccess
} from './tracksHistory.actions';

@Injectable()
export class TracksHistoryEffects {
  fetchTracksHistory = createEffect(() => this.actions.pipe(
    ofType(fetchTracksHistoryRequest),
    mergeMap(() => {
      return this.tracksHistoryService.getTracksHistory().pipe(
        map(tracksHistory => fetchTracksHistorySuccess({tracksHistory})),
        tap(() => {
          this.helpers.openSnackbar('Successful')
        }),
        this.helpers.catchServerError(fetchTracksHistoryFailure)
      );
    }))
  )

  createTracksHistory = createEffect(() => this.actions.pipe(
    ofType(createTracksHistoryRequest),
    mergeMap(({tracksHistoryData}) => {
      return this.tracksHistoryService.createTrackHistory(tracksHistoryData).pipe(
        map(() => createTrackHistorySuccess()),
        tap(() => {
          this.helpers.openSnackbar('Play')
        }),
        this.helpers.catchServerError(createTrackHistoryFailure)
      );
    }))
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private tracksHistoryService: TracksHistoryService,
  ) {}
}
