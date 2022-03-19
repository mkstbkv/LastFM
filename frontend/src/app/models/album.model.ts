import { Artist } from './artist.model';

export class Album {
  constructor(
    public id: string,
    public title: string,
    public artist: Artist,
    public release: string,
    public image: string,
    public is_published: Boolean
  ) {}
}

export interface AlbumData {
  [key: string]: any;
  title: string;
  artist: Artist;
  release: string;
  image: File | null;
}

export interface ApiAlbumData {
  _id: string,
  title: string,
  artist: Artist,
  release: string,
  image: string,
  is_published: Boolean
}
