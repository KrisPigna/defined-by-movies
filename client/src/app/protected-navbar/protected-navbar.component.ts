import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-protected-navbar',
  templateUrl: './protected-navbar.component.html',
  styleUrls: ['./protected-navbar.component.css']
})
export class ProtectedNavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private share: ShareService
  ) { }

  name: String;

  logOff() {
    localStorage.removeItem("token");
    this.router.navigate([""]);
  }

  ngOnInit() {
    this.share.name.subscribe(result => {
      this.name = result;
    });
  }

}
