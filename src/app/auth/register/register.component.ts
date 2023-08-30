import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  timer!: number; // Timer value in seconds
  countdown!: Observable<number>;
  countdownSubscription!: Subscription;
  isResendDisabled!: boolean;

  model: any = {};
  is_otpgenrated: boolean = false;
  constructor(public helperService: HelperService, public apiService: ApiService, private router: Router, private authService: AuthService){
    this.helperService.showhideheadsidefoot = false;
    this.timer = 60; // Initial timer value in seconds
    this.isResendDisabled = false; // Resend button status
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

  startTimer(): void {
    this.isResendDisabled = true; // Disable the resend button

    // Create an observable that emits a value every second
    this.countdown = interval(1000);

    // Subscribe to the observable and update the timer value
    this.countdownSubscription = this.countdown.subscribe(() => {
      this.timer--;

      if (this.timer <= 0) {
        this.stopTimer();
        this.isResendDisabled = false; // Enable the resend button
      }
    });
  }

  stopTimer(): void {
    // Unsubscribe from the countdown observable and reset the timer
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.timer = 60; // Reset the timer value
  }

  formSubmit($event: any){
    let functionName = 'register';
    if(this.is_otpgenrated){
      functionName = 'verifyOtp';
    }
    (this.authService as any)[functionName](this.model).subscribe(
      (response:any) => {
        if(functionName == 'register'){
          this.is_otpgenrated = true;
          this.startTimer(); // Start the timer
          this.helperService.presentToast('info','OTP is shared to your email address');
        }else{
          this.helperService.showhideheadsidefoot = true;
          this.router.navigate(['dashboard']);
          this.helperService.presentToast('success','OTP verified');
        }
        console.log(response);
      },
      (error:any) => {
        console.log(error);
        this.helperService.presentToast('error',error.error.error.msg)
      }
    )
  }
  resendOtp(){
    this.isResendDisabled = true; // Disable the resend button
    this.authService.resendOtp(this.model).subscribe(
      (response:any) => {
        this.startTimer();
        console.log(response);
        this.helperService.presentToast('info','Resending OTP')
      },
      (error:any) => {
        console.log(error);
        this.helperService.presentToast('error',error.error.error.msg)
      }
    )
  }

}
