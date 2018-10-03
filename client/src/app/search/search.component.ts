import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ShareService } from '../share.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string;
  result: string;

  constructor(
    private data: DataService,
    private share: ShareService,
    private route: Router
  ) { }

  search() {
    this.data.simpleSearchMovie(this.title)
      .subscribe( (response) => {
        if (this.title != undefined) {
          if (response["Response"] == "False") {

            this.result = JSON.stringify({Title: "Movie not found", Poster: ""});
            this.share.changeMessage(this.result);
          }
          else {
            this.result = JSON.stringify(response);
            this.share.changeMessage(this.result);
          }
          this.route.navigate(['results']);
        }
      });
  }

  ngOnInit() {
    this.share.message.subscribe(result => this.result = result);
  }

}
