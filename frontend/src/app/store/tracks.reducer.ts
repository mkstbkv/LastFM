import { createReducer, on } from '@ngrx/store';
import { TracksState } from './types';
import { fetchTracksFailure, fetchTracksRequest, fetchTracksSuccess } from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null,
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTracksSuccess, (state, {tracks}) => ({
    ...state,
    fetchLoading: false,
    tracks
  })),
  on(fetchTracksFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
);
