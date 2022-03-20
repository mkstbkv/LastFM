import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { TracksHistory, TracksHistoryData } from '../models/tracksHistory.model';

@Injectable({
  providedIn: 'root'
})
export class TracksHistoryService {
  constructor(private http: HttpClient) { }

  getTracksHistory() {
    return this.http.get<TracksHistory[]>(environment.apiUrl + '/track_history').pipe(
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

  createTrackHistory(tracksHistoryData: TracksHistoryData) {
    return this.http.post(environment.apiUrl + '/track_history', tracksHistoryData);
  }
}
