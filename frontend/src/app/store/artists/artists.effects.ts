import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  deleteArtistFailure,
  deleteArtistRequest,
  deleteArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistFailure,
  publishArtistRequest,
  publishArtistSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ArtistsService } from '../../services/artists.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class ArtistsEffects {
  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistsRequest),
    mergeMap(() => this.artistsService.getArtists().pipe(
      map(artists => fetchArtistsSuccess({artists})),
      catchError(() => of(fetchArtistsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createArtist = createEffect(() => this.actions.pipe(
    ofType(createArtistRequest),
    mergeMap(({artistData}) => this.artistsService.createArtist(artistData).pipe(
      map(() => createArtistSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createArtistFailure({error: 'Wrong data'})))
    ))
  ));

  publishArtist = createEffect(() => this.actions.pipe(
    ofType(publishArtistRequest),
    mergeMap( ({id}) => this.artistsService.publishArtist(id).pipe(
      map(() => publishArtistSuccess()),
      tap(() => {
        this.store.dispatch(fetchArtistsRequest());
      }),
      catchError(() => of(publishArtistFailure({error: 'No access!'})))
    ))
  ));

  deleteArtist = createEffect(() => this.actions.pipe(
    ofType(deleteArtistRequest),
    mergeMap(({id}) => this.artistsService.deleteArtist(id).pipe(
      map(() => deleteArtistSuccess()),
      tap(() => {
        this.store.dispatch(fetchArtistsRequest());
      }),
      catchError(() => of(deleteArtistFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private artistsService: ArtistsService,
    private router: Router
  ) {}
}
