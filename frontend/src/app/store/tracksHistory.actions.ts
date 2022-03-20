import { createAction, props } from '@ngrx/store';
import { TracksHistory, TracksHistoryData } from '../models/tracksHistory.model';

export const fetchTracksHistoryRequest = createAction(
  '[TracksHistory] Fetch Request',
);
export const fetchTracksHistorySuccess = createAction(
  '[TracksHistory] Fetch Success',
  props<{tracksHistory: TracksHistory[]}>()
);
export const fetchTracksHistoryFailure = createAction(
  '[TracksHistory] Fetch Failure',
  props<{error: string}>()
);

export const createTracksHistoryRequest = createAction(
  '[TracksHistory] Create Request',
  props<{tracksHistoryData: TracksHistoryData}>()
);
export const createTrackHistorySuccess = createAction(
  '[TracksHistory] Create Success',
);
export const createTrackHistoryFailure = createAction(
  '[TracksHistory] Create Failure',
  props<{error: string}>()
);
