import { createAction, props } from '@ngrx/store';
import { Album, AlbumData } from '../models/album.model';

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request',
  props<{id: string}>()
);

export const fetchAlbumsSuccess = createAction(
  '[Albums] Fetch Success',
  props<{albums: Album[]}>()
);

export const fetchAlbumsFailure = createAction(
  '[Albums] Fetch Failure',
  props<{error: string}>()
);

export const createAlbumRequest = createAction(
  '[Albums] Create Request',
  props<{albumData: AlbumData}>()
);

export const createAlbumSuccess = createAction(
  '[Albums] Create Success'
);

export const createAlbumFailure = createAction(
  '[Albums] Create Failure',
  props<{error: string}>()
);

export const publishAlbumRequest = createAction(
  '[Albums] Publish Request',
  props<{id: string}>()
);
export const publishAlbumSuccess = createAction(
  '[Albums] Publish Success',
  props<{albums: Album[]}>()
);
export const publishAlbumFailure = createAction(
  '[Albums] Publish Failure',
  props<{error: string}>()
);

export const deleteAlbumRequest = createAction(
  '[Albums] Delete Request',
  props<{id: string}>()
);
export const deleteAlbumSuccess = createAction(
  '[Albums] Delete Success',
  props<{albums: Album[]}>()
);
export const deleteAlbumFailure = createAction(
  '[Albums] Delete Failure',
  props<{error: string}>()
);
