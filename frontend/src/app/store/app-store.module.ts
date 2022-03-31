import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './users/users.reducer';
import { artistsReducer } from './artists/artists.reducer';
import { albumsReducer } from './albums/albums.reducer';
import { AlbumsEffects } from './albums/albums.effects';
import { UsersEffects } from './users/users.effects';
import { ArtistsEffects } from './artists/artists.effects';
import { tracksReducer } from './tracks/tracks.reducer';
import { TracksEffects } from './tracks/tracks.effects';
import { tracksHistoryReducer } from './tracksHistory/tracksHistory.reducer';
import { TracksHistoryEffects } from './tracksHistory/tracksHistory.effects';


const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  albums: albumsReducer,
  users: usersReducer,
  artists: artistsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer
};

const effects = [AlbumsEffects, UsersEffects, ArtistsEffects, TracksEffects, TracksHistoryEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
