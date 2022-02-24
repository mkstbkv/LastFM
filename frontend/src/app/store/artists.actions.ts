import { createAction, props } from '@ngrx/store';
import { Artist, ArtistData } from '../models/artist.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction(
  '[Artists] Fetch Success',
  props<{artists: Artist[]}>()
);
export const fetchArtistsFailure = createAction(
  '[Artists] Fetch Failure',
  props<{error: string}>()
);

export const createArtistRequest = createAction(
  '[Artists] Create Request',
  props<{artistData: ArtistData}>()
);
export const createArtistSuccess = createAction(
  '[Artists] Create Success'
);
export const createArtistFailure = createAction(
  '[Artists] Create Failure',
  props<{error: string}>()
);
