import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public helperService: HelperService, private authService: AuthService){}
  logout(){
    this.authService.logout();
  }
}
