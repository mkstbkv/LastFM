import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { TracksHistory, TracksHistoryData } from '../models/tracksHistory.model';

@Injectable({
  providedIn: 'root'
})
export class TracksHistoryService {
  constructor(private http: HttpClient) { }

  getTracksHistory(token: string) {
    return this.http.get<TracksHistory[]>(environment.apiUrl + '/track_history', {
      headers: new HttpHeaders({'Authorization': token})
    }).pipe(
      map(response => {
        return response.map(trackHistoryData => {
          return new TracksHistory(
            trackHistoryData._id,
            trackHistoryData.user,
            trackHistoryData.track,
            trackHistoryData.datetime,
          );
        });
      })
    );
  }

  createTrackHistory(tracksHistoryData: TracksHistoryData, token: string) {
    return this.http.post(environment.apiUrl + '/track_history', tracksHistoryData, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }
}
