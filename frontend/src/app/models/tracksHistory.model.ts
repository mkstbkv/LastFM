import { Track } from './track.model';
import { User } from './user.model';

export class TracksHistory {
  constructor(
    public _id: string,
    public user: User,
    public track: Track,
    public datetime: string,
  ) {}
}

export interface TracksHistoryData {
  track: string,
}
