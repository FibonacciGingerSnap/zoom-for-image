import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';





@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {
  constructor( private http: HttpClient) {
  }
  api = 'AIzaSyDNmMHAcoddFaLqtoxnlLgPrwNQqMYou-Q';
  chanId = 'UCHxEl1YkDIjbWmYuKEm6jow';
  result = 5;
  obser$;
  nextPageToken;
  ytvideolist;
  ngOnInit() {
      const finalURL = "https://www.googleapis.com/youtube/v3/search?key="+this.api+"&channelId="+this.chanId+"&part=snippet,id&order=date&maxResults="+this.result+"";
      console.log(finalURL);

      this.obser$ = this.http.get(finalURL).subscribe(response => {

        console.log('response', response);

        const ytresults = response;
        console.log(ytresults);

        /*console.log(ytresults.nextPageToken);
        this.nextPageToken = ytresults.nextPageToken;

        ytresults.items.forEach(obj => {

          console.log(obj.id.videoId);
          this.ytvideolist.push(obj.id.videoId);

        });
        console.log(this.ytvideolist);*/

      });
    }
  }


