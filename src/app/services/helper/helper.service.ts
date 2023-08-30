import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  showhideheadsidefoot = true; 
  constructor(private toastr: ToastrService) { }

  presentToast(type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) {
    switch (type) {
      case 'success':
        this.toastr.success(message, title);
        break;
      case 'error':
        this.toastr.error(message, title);
        break;
      case 'warning':
        this.toastr.warning(message, title);
        break;
      case 'info':
        this.toastr.info(message, title);
        break;
      default:
        break;
    }
  }
}
