import { Artist } from '../models/artist.model';

export type ArtistsState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AppState = {
  artists: ArtistsState
}
