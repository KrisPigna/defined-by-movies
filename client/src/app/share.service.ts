import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  private messageSource = new BehaviorSubject('');
  private nameSource = new BehaviorSubject('');

  message = this.messageSource.asObservable();
  name = this.nameSource.asObservable();

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message);
  }

  changeName(name) {
    this.nameSource.next(name);
  }
}
