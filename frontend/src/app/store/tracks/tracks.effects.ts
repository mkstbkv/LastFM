import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TracksService } from '../../services/tracks.service';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  deleteTrackFailure,
  deleteTrackRequest,
  deleteTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess,
  publishTrackFailure,
  publishTrackRequest,
  publishTrackSuccess
} from './tracks.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class TracksEffects {
  fetchTracks = createEffect(() => this.actions.pipe(
    ofType(fetchTracksRequest),
    mergeMap(({id}) => this.tracksService.getTracks(id).pipe(
      map(tracks => fetchTracksSuccess({tracks})),
      catchError(() => of(fetchTracksFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createTrack = createEffect(() => this.actions.pipe(
    ofType(createTrackRequest),
    mergeMap(({trackData}) => this.tracksService.createTrack(trackData).pipe(
      map(() => createTrackSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createTrackFailure({error: 'Wrong data'})))
    ))
  ));

  publishTrack = createEffect(() => this.actions.pipe(
    ofType(publishTrackRequest),
    mergeMap( ({id}) => this.tracksService.publishTrack(id).pipe(
      map(() => publishTrackSuccess()),
      tap(() => {
        // this.store.dispatch(fetchTracksRequest({id}));
      }),
      catchError(() => of(publishTrackFailure({error: 'No access!'})))
    ))
  ));

  deleteTrack = createEffect(() => this.actions.pipe(
    ofType(deleteTrackRequest),
    mergeMap(({id}) => this.tracksService.deleteTrack(id).pipe(
      map(() => deleteTrackSuccess()),
      tap(() => {
        // this.store.dispatch(fetchTracksRequest({id}));
      }),
      catchError(() => of(deleteTrackFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private tracksService: TracksService,
    private router: Router
  ) {}
}
