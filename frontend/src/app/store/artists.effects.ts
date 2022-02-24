import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess
} from './artists.actions';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ArtistsService } from '../services/artists.service';

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

  constructor(
    private actions: Actions,
    private artistsService: ArtistsService,
    private router: Router
  ) {}
}
