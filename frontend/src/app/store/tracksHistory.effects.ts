import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { TracksHistoryService } from '../services/tracks-history.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import {
  createTrackHistorySuccess,
  createTracksHistoryRequest,
  fetchTracksHistoryRequest,
  fetchTracksHistorySuccess
} from './tracksHistory.actions';

@Injectable()
export class TracksHistoryEffects {
  fetchTracksHistory = createEffect(() => this.actions.pipe(
    ofType(fetchTracksHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.tracksHistoryService.getTracksHistory(user.token).pipe(
          map(tracksHistory => fetchTracksHistorySuccess({tracksHistory})),
          tap(() => this.helpers.openSnackbar('Successful'))
        );
      }
      tap(() => this.router.navigate(['/login']));
      return NEVER;
    }))
  )

  createTracksHistory = createEffect(() => this.actions.pipe(
    ofType(createTracksHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([{tracksHistoryData}, user]) => {
      if (user) {
        return this.tracksHistoryService.createTrackHistory(tracksHistoryData, user.token).pipe(
          map(() => createTrackHistorySuccess()),
          tap(() => this.helpers.openSnackbar('Play'))
        );
      }
      return NEVER;
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
