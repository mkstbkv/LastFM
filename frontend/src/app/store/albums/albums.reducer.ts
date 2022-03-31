import { createReducer, on } from '@ngrx/store';
import { AlbumsState } from '../types';
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

const initialState: AlbumsState = {
  albums: [],
  fetchLoading: false,
  fetchError: null,
  publishLoading: false,
  publishError: null,
  deleteLoading: false,
  deleteError: null,
  createLoading: false,
  createError: null,
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({
    ...state,
    fetchLoading: false,
    albums
  })),
  on(fetchAlbumsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createAlbumRequest, state => ({...state, createLoading: true})),
  on(createAlbumSuccess, state => ({...state, createLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
  on(publishAlbumRequest, state => ({...state, publishLoading: true})),
  on(publishAlbumSuccess, state => ({
    ...state,
    publishLoading: false,
  })),
  on(publishAlbumFailure, (state, {error}) => ({
    ...state,
    publishLoading: false,
    publishError: error,
  })),

  on(deleteAlbumRequest, state => ({...state, deleteLoading: true})),
  on(deleteAlbumSuccess, state => ({
    ...state,
    fetchLoading: false,
  })),
  on(deleteAlbumFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),
);
