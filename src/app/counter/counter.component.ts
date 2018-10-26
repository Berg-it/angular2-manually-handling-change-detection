import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    Items in cart:
    {{ _data.counter }}
  `
})
export class CounterComponent implements OnInit {
  @Input() data: Observable<any>;
  @Input() notifier: Observable<any>;
  _data;
  
  constructor(private cd:ChangeDetectorRef) {}
  
  ngOnInit() {
    this.data.subscribe((value) => {
      this._data = value;
      this.cd.markForCheck();
      
      console.log(value);
    });
    /**
     * By default detach the component
     */
    this.cd.detach();

    /**
     * Attach/Detach the component, it depend on value of
     * the notifier
     */
    this.notifier.subscribe((value) => {
      if(value) {
        this.cd.reattach();
      } else {
        this.cd.detach();
      }
    })
    
  }
}