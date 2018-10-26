import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  _start;
  _interval;
  _counter = 0;
  data$ = new BehaviorSubject({ counter: 0 });
  notifier$ = new BehaviorSubject(false);
  _cdEnabled = false;
  
  constructor() { }
  
  start() {
    if(!this._start) {
      this._interval = setInterval(() => {
        this.data$.next({ counter: ++this._counter });
      }, 10);
    }
  }
  
  stop() {
    clearInterval(this._interval);
    this._start = undefined;
    this._counter = 0;
  }
  
  /**
   * Detach or not the child component
   */
  toggleCD() {
    this._cdEnabled = !this._cdEnabled;
    this.notifier$.next(this._cdEnabled);
  }
}
