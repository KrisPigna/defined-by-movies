import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import { DataService } from '../data.service';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  message: string;
  added: boolean;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  results: Object;
  colNum = 2;

  constructor(
    private share: ShareService,
    private data: DataService,
    public dialog: MatDialog
  ) { }

  addMovie(movie) {
    this.share.changeMessage(movie.Title);
    var token = localStorage.getItem('token');
    var selectedMovie = { title: movie.Title, poster: movie.Poster };
    var payload = [selectedMovie, token];
    this.data.addMovie(payload)
      .subscribe((response) => {
        if (response["added"] === true) {
          this.dialog.open(ResultsDialog, {
            width: '250px',
            data: { message: " has been added to your collection", added: true }
          });
        }
        else {
          this.dialog.open(ResultsDialog, {
            width: '250px',
            data: { message: " is already in your collection", added: false }
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
    this.share.message.subscribe(resultString => {
      this.results = JSON.parse(resultString);
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
  selector: 'dialog-results-dialog',
  templateUrl: './dialog.component.html'
})
export class ResultsDialog {

  title: String;
  message: string;
  added: boolean;

  constructor(
    public dialogRef: MatDialogRef<ResultsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private share: ShareService
  ) {
    this.message = data.message;
    if (data.added == true) {
      this.added = true;
    }
    else {
      this.added = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.share.message.subscribe(title => this.title = title);
  }
}
