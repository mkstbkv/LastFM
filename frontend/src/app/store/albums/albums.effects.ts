import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  deleteAlbumFailure,
  deleteAlbumRequest,
  deleteAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  publishAlbumFailure,
  publishAlbumRequest,
  publishAlbumSuccess
} from './albums.actions';
import { AlbumsService } from '../../services/albums.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class AlbumsEffects {
  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap((artistId) => this.albumsService.getAlbums(artistId.id).pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => of(fetchAlbumsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createAlbum = createEffect(() => this.actions.pipe(
    ofType(createAlbumRequest),
    mergeMap(({albumData}) => this.albumsService.createAlbum(albumData).pipe(
      map(() => createAlbumSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createAlbumFailure({error: 'Wrong data'})))
    ))
  ));

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishAlbumRequest),
    mergeMap( ({id}) => this.albumsService.publishAlbum(id).pipe(
      map(() => publishAlbumSuccess()),
      tap(() => {
        // this.store.dispatch(fetchAlbumsRequest({id}));
      }),
      catchError(() => of(publishAlbumFailure({error: 'No access!'})))
    ))
  ));

  deleteAlbum = createEffect(() => this.actions.pipe(
    ofType(deleteAlbumRequest),
    mergeMap(({id}) => this.albumsService.deleteAlbum(id).pipe(
      map(() => deleteAlbumSuccess()),
      tap(() => {
        // this.store.dispatch(fetchAlbumsRequest({id}));
      }),
      catchError(() => of(deleteAlbumFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private albumsService: AlbumsService,
    private router: Router,
  ) {}
}
