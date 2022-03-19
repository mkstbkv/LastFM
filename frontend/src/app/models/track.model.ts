import { Album } from './album.model';

export class Track {
  constructor(
    public _id: string,
    public name: string,
    public album: Album,
    public duration: string,
    public is_published: Boolean,
  ) {}
}

export interface TrackData {
  [key: string]: any;
  name: string;
  album: Album;
  duration: string;
}
