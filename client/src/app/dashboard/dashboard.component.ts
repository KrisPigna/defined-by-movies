import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private data: DataService,
    private share: ShareService,
    public dialog: MatDialog,
    private route: Router
  ) { }

  movies: Object;
  name: string;
  collectionEmpty = false;
  colNum: any = 4;

  title: string;
  result: string;

  getMovies() {
    var token = localStorage.getItem('token');
    var payload = {token: token};
    this.data.getMovies(payload)
      .subscribe( (response) => {
        this.movies = response;
        if (this.movies[0] === undefined) {
          this.collectionEmpty = true;
        }
      });
  }

  deleteMovie(movie) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        var token = localStorage.getItem('token');
        var selectedMovie = {title: movie.title, poster: movie.poster};
        var payload = [selectedMovie, token];
        this.data.deleteMovie(payload)
          .subscribe( (response) => {
            if( response["deleted"] === true) {
              this.route.navigate([""]);
            }
            else {
              console.log("Not deleted");
            }
        });
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
    this.getMovies();

    this.share.name.subscribe(result => {
      this.name = result;
    });

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

@Component({
  selector: 'dialog-delete-dialog',
  templateUrl: './dialog.component.html'
})
export class DeleteDialog {
  
  results: Object;
  message: string;
  added: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
