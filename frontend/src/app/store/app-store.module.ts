import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './users.reducer';
import { artistsReducer } from './artists.reducer';
import { albumsReducer } from './albums.reducer';
import { AlbumsEffects } from './albums.effects';
import { UsersEffects } from './users.effects';
import { ArtistsEffects } from './artists.effects';
import { tracksReducer } from './tracks.reducer';
import { TracksEffects } from './tracks.effects';


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
  tracks: tracksReducer
};

const effects = [AlbumsEffects, UsersEffects, ArtistsEffects, TracksEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
