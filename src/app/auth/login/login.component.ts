import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: any = {};
  constructor(private helperService:HelperService, private authService:AuthService, private router:Router){
    this.helperService.showhideheadsidefoot = false; 
  }
  ngOnInit(){
  }

  login(){
    this.authService.login(this.model).subscribe(
      (response:any) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
        this.helperService.presentToast('success', 'Login Success')
      },
      (error:any) => {
        console.log(error);
        this.helperService.presentToast('error',error.error.error.msg);
      }
    )
  }

}
