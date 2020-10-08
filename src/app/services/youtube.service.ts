import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YouTuveResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBnLy79EAYw6ljMIgW-ssFJ5_NPK39TpVY';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient) { }

  getVideos(){

    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
        .set('part', 'snippet')
        .set('maxResults', '20')
        .set('playlistId', this.playlist)
        .set('key', this.apiKey)
        .set('pageToken', this.nextPageToken)

    return this.http.get<YouTuveResponse>(url, { params })
        .pipe(
          
          map(resp => {
            this.nextPageToken = resp.nextPageToken;
            return resp.items
          }),

          map(items => 
            items.map( video => video.snippet )
          )
        )
  }
}
