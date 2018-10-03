import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {name: "", password: ""};
  colNum = 2;
  show = true;
  error = false;

  constructor(
    private data: DataService,
    public router: Router,
    private share: ShareService
  ) { }

  onResize(event) {
    const element = event.target.innerWidth;

    if (element >= 500) {
      this.colNum = 2;
    }

    if (element < 500) {
      this.colNum = 1;
    }
  }

  onSubmit() {
    this.data.login(this.user)
      .subscribe( (response) => {
        if (response['validated']) {
          localStorage.setItem('token', response['token']);
          this.share.changeName(response['name']);
          this.router.navigate(['dashboard']);
        }
        else {
          this.error = true;
        }
      });
  }

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.colNum = 1;
      this.show = false;
    }
  }

}
