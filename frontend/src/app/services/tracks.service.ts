import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  constructor(private http: HttpClient) { }

  getTracks(id: string) {
    return this.http.get<Track[]>(environment.apiUrl + '/tracks?album=' + id).pipe(
      map(response => {
        return response.map(trackData => {
          return new Track(
            trackData._id,
            trackData.name,
            trackData.album,
            trackData.duration,
          );
        });
      })
    );
  }
}
