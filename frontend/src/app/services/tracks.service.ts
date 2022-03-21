import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Track, TrackData } from '../models/track.model';

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
            trackData.is_published
          );
        });
      })
    );
  }

  createTrack(trackData: TrackData) {
    const formData = new FormData();

    Object.keys(trackData).forEach(key => {
      if (trackData[key] !== null) {
        formData.append(key, trackData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/tracks', formData);
  }

  deleteTrack(id: string) {
    return this.http.delete<Track[]>(environment.apiUrl + '/tracks/' + id).pipe(
      map(response => {
        return response.map(trackData => {
          return new Track(
            trackData._id,
            trackData.name,
            trackData.album,
            trackData.duration,
            trackData.is_published
          );
        });
      })
    );
  }

  publishTrack(id: string) {
    return this.http.post<Track[]>(environment.apiUrl + '/tracks/' + id + '/publish', {is_published: true})
      .pipe(
        map(response => {
          return response.map(trackData => {
            return new Track(
              trackData._id,
              trackData.name,
              trackData.album,
              trackData.duration,
              trackData.is_published
            );
          });
        })
      );
  }
}
