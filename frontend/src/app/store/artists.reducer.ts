import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  deleteArtistFailure,
  deleteArtistRequest,
  deleteArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistFailure,
  publishArtistRequest,
  publishArtistSuccess
} from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
  publishError: null,
  deleteLoading: false,
  deleteError: null,
};

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => ({
    ...state,
    fetchLoading: false,
    artists
  })),
  on(fetchArtistsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createArtistRequest, state => ({...state, createLoading: true})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
  on(publishArtistRequest, state => ({...state, publishLoading: true})),
  on(publishArtistSuccess, (state, {artists}) => ({
    ...state,
    publishLoading: false,
    artists
  })),
  on(publishArtistFailure, (state, {error}) => ({
    ...state,
    publishLoading: false,
    publishError: error,
  })),

  on(deleteArtistRequest, state => ({...state, deleteLoading: true})),
  on(deleteArtistSuccess, (state, {artists}) => ({
    ...state,
    fetchLoading: false,
    artists
  })),
  on(deleteArtistFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),
);
