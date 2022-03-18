import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TracksService } from '../services/tracks.service';
import { fetchTracksFailure, fetchTracksRequest, fetchTracksSuccess } from './tracks.actions';

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

  constructor(
    private actions: Actions,
    private tracksService: TracksService,
  ) {}
}
