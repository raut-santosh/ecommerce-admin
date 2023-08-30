import { Component } from '@angular/core';
import { HelperService } from './services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-admin';
  constructor(public helperService: HelperService){
    
  }
  isOnline!: boolean;

  ngOnInit() {
    this.checkOnlineStatus();
    window.addEventListener('online', () => this.checkOnlineStatus());
    window.addEventListener('offline', () => this.checkOnlineStatus());
  }

  checkOnlineStatus() {
    this.isOnline = navigator.onLine;
  }
}
