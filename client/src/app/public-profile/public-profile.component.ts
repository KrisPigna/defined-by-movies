import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  movies: Object;
  name: string;
  collectionEmpty = false;
  colNum: any = 4;

  title: string;

  getPublicMovies() {
    var payload = this.route.snapshot.queryParams['name'];
    this.data.getPublicMovies(payload)
      .subscribe( (response) => {
        this.movies = response;
        if (this.movies[0] === undefined) {
          this.collectionEmpty = true;
        }
      });
  }

  onResize(event) {
    const element = event.target.innerWidth;

    if (element >= 1000) {
      this.colNum = 4;
    }

    if (element >= 900 && element < 1100) {
      this.colNum = 3;
    }

    if (element >= 500 && element < 900) {
      this.colNum = 2;
    }

    if (element < 500) {
      this.colNum = 1;
    }
  }

  ngOnInit() {
    this.name = this.route.snapshot.queryParams['name'];
    this.getPublicMovies();

    if (window.innerWidth >= 1000) {
      this.colNum = 4;
    }

    if (window.innerWidth >= 900 && window.innerWidth < 1100) {
      this.colNum = 3;
    }

    if (window.innerWidth >= 500 && window.innerWidth < 900) {
      this.colNum = 2;
    }

    if (window.innerWidth < 500) {
      this.colNum = 1;
    }
  }

}
