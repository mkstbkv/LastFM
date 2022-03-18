import { createReducer, on } from '@ngrx/store';
import { TracksHistoryState } from './types';
import {
  createTrackHistoryFailure,
  createTrackHistorySuccess,
  createTracksHistoryRequest,
  fetchTracksHistoryFailure,
  fetchTracksHistoryRequest,
  fetchTracksHistorySuccess
} from './tracksHistory.actions';

const initialState: TracksHistoryState = {
  tracksHistory: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const tracksHistoryReducer = createReducer(
  initialState,
  on(fetchTracksHistoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchTracksHistorySuccess, (state, {tracksHistory}) => ({
    ...state,
    fetchLoading: false,
    tracksHistory
  })),
  on(fetchTracksHistoryFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createTracksHistoryRequest, state => ({...state, createLoading: true})),
  on(createTrackHistorySuccess, state => ({...state, createLoading: false})),
  on(createTrackHistoryFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
