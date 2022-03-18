import { Album } from './album.model';

export class Track {
  constructor(
    public _id: string,
    public name: string,
    public album: Album,
    public duration: string,
  ) {}
}
