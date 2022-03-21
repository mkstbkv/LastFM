import { createReducer, on } from '@ngrx/store';
import { TracksState } from './types';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  deleteTrackFailure,
  deleteTrackRequest,
  deleteTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess,
  publishTrackFailure,
  publishTrackRequest,
  publishTrackSuccess
} from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null,
  publishLoading: false,
  publishError: null,
  deleteLoading: false,
  deleteError: null,
  createLoading: false,
  createError: null,
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
  on(createTrackRequest, state => ({...state, createLoading: true})),
  on(createTrackSuccess, state => ({...state, createLoading: false})),
  on(createTrackFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
  on(publishTrackRequest, state => ({...state, publishLoading: true})),
  on(publishTrackSuccess, (state, {tracks}) => ({
    ...state,
    publishLoading: false,
    tracks
  })),
  on(publishTrackFailure, (state, {error}) => ({
    ...state,
    publishLoading: false,
    publishError: error,
  })),

  on(deleteTrackRequest, state => ({...state, deleteLoading: true})),
  on(deleteTrackSuccess, (state, {tracks}) => ({
    ...state,
    fetchLoading: false,
    tracks
  })),
  on(deleteTrackFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),
);
