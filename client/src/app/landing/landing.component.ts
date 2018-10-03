import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["dashboard"]);
    }
  }
}
