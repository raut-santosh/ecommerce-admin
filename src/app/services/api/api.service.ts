import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

  APIS: any = {
    PRODUCTS_LIST: { endpoint: 'products/list', method: 'get' },
    PRODUCTS_ADDEDIT: { endpoint: 'products/addedit', method: 'post' },
    ORDERS_LIST: { endpoint: 'products/list', method: 'get' },
    ORDERS_ADDEDIT: { endpoint: 'products/addedit', method: 'post' },

    AUTH_REGISTER: { endpoint: 'auth/register', method: 'post' },
    AUTH_LOGIN: { endpoint: 'auth/login', method: 'post' },
    VERIFY_OTP: { endpoint: 'auth/verifyotp', method: 'post' },
    RESEND_OTP: { endpoint: 'auth/resendotp', method: 'post' },
  }

  constructor(private http: HttpClient) { }

  
  callapi(apiKey: string, payload?: any): Observable<any> {
    // console.log("payload", payload);
    const api = this.APIS[apiKey];
    const url = `${this.apiUrl}/${api.endpoint}`;

    if (api.method === 'get') {
      return this.http.get(url);
    } else if (api.method === 'post') {
      return this.http.post(url, payload);
    } else {
      throw new Error(`Invalid API method for ${apiKey}`);
    }
  }
  
}
