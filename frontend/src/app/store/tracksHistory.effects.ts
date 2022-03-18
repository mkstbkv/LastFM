import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, NEVER, of, tap, withLatestFrom } from 'rxjs';
import { TracksHistoryService } from '../services/tracks-history.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import {
  createTrackHistoryFailure,
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
      tap(() => this.router.navigate(['/']));
      return NEVER;
    }))
  )

  createTracksHistory = createEffect(() => this.actions.pipe(
    ofType(createTracksHistoryRequest),
    mergeMap(({tracksHistoryData}) => this.tracksHistoryService.createTrackHistory(tracksHistoryData).pipe(
      map(() => createTrackHistorySuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createTrackHistoryFailure({error: 'Wrong data'})))
    ))
  ));


  constructor(
    private actions: Actions,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private tracksHistoryService: TracksHistoryService,
  ) {}
}
