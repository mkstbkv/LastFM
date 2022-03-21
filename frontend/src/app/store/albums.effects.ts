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
import { AlbumsService } from '../services/albums.service';

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
      map(albums => publishAlbumSuccess({albums})),
      catchError(() => of(publishAlbumFailure({error: 'No access!'})))
    ))
  ));

  deleteAlbum = createEffect(() => this.actions.pipe(
    ofType(deleteAlbumRequest),
    mergeMap(({id}) => this.albumsService.deleteAlbum(id).pipe(
      map(albums => deleteAlbumSuccess({albums})),
      catchError(() => of(deleteAlbumFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private albumsService: AlbumsService,
    private router: Router,
  ) {}
}
