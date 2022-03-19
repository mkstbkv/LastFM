export class Artist {
  constructor(
    public id: string,
    public name: string,
    public info: string,
    public image: string,
    public is_published: Boolean
  ) {}
}

export interface ArtistData {
  [key: string]: any;
  name: string;
  info: string;
  image: File | null;
}

export interface ApiArtistData {
  _id: string,
  name: string,
  info: string,
  image: string,
  is_published: Boolean
}
