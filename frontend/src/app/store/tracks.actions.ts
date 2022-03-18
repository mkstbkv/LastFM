import { createAction, props } from '@ngrx/store';
import { Track } from '../models/track.model';

export const fetchTracksRequest = createAction(
  '[Tracks] Fetch Request',
  props<{id: string}>()
);
export const fetchTracksSuccess = createAction(
  '[Tracks] Fetch Success',
  props<{tracks: Track[]}>()
);
export const fetchTracksFailure = createAction(
  '[Tracks] Fetch Failure',
  props<{error: string}>()
);
