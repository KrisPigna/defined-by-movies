import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ShareService } from '../share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private data: DataService,
    private share: ShareService,
    private route: Router
  ) { }

  user = { name: "", email: "", password: "", confirmPassword: "", duplicate: false };
  error = false;
  errorMessage = "";
  validName = false;
  showInvalidName = false;
  validEmail = false;
  showInvalidEmail = false;
  validPassword = false;
  showInvalidPassword = false;
  validMatch = false;
  showInvalidPasswordMatch = false;
  validated = false;

  checkNameLength(newValue) {
    if (newValue.length >= 4) {
      this.validName = true;
      this.showInvalidName = false;
    }
    else {
      this.validName = false;
      this.showInvalidName = true;
    }
    this.checkValidated();
  }

  checkPasswordLength(newValue) {
    if (newValue.length >= 6) {
      this.validPassword = true;
      this.showInvalidPassword = false;
      if (newValue == this.user.confirmPassword) {
        this.validMatch = true;
        this.showInvalidPasswordMatch = false;
      } else {
        this.validMatch = false;
        this.showInvalidPasswordMatch = true;
      }
    }
    else {
      this.validPassword = false;
      this.showInvalidPassword = true;
      if (newValue == this.user.confirmPassword) {
        this.validMatch = true;
        this.showInvalidPasswordMatch = false;
      } else {
        this.validMatch = false;
        this.showInvalidPasswordMatch = true;
      }
    }
    this.checkValidated();
  }

  checkEmail(newValue) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(newValue) == true) {
      this.validEmail = true;
      this.showInvalidEmail = false;
    }
    else {
      this.validEmail = false;
      this.showInvalidEmail = true;
    }
    this.checkValidated();
  }

  checkPasswordMatch(newValue) {
    if (newValue == this.user.password) {
      this.validMatch = true;
      this.showInvalidPasswordMatch = false;
    } else {
      this.validMatch = false;
      this.showInvalidPasswordMatch = true;
    }
    this.checkValidated();
  }

  checkValidated() {
    if(this.validName == true &&
      this.validPassword == true &&
      this.validEmail == true &&
      this.validMatch == true) {
        this.validated = true;
      }
      else {
        this.validated = false;
      }
  }

  onSubmit() {
    if (this.error == false) {
      this.data.saveUser(this.user)
        .subscribe((response) => {
          if (response["Message"] == "Error") {
            this.errorMessage = "An account with this username or email already exists";
            this.error = true;
          }
          else {
            this.data.login(this.user)
              .subscribe((response) => {
                if (response['validated']) {
                  localStorage.setItem('token', response['token']);
                  this.share.changeName(response['name']);
                  this.route.navigate(['dashboard']);
                }
                else {
                  console.log(response['message']);
                }
              });
          }
        });
    }
  }

  ngOnInit() {
  }

}
