import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

  // Define your API routes here
  APILIST: { [key: string]: { endpoint: string; method: 'get' | 'post' } } = {
    PRODUCTS_LIST: { endpoint: 'products/list', method: 'get' },
    PRODUCTS_ADDEDIT: { endpoint: 'products/addedit', method: 'post' },
    ORDERS_LIST: { endpoint: 'orders/list', method: 'get' }, // Change the endpoint to 'orders/list'
    ORDERS_ADDEDIT: { endpoint: 'orders/addedit', method: 'post' }, // Change the endpoint to 'orders/addedit'
    ROLES_LIST: { endpoint: 'roles/list', method: 'get' },
    ROLE:{endpoint: 'role', method: 'get' },
    PERMISSIONS_LIST: { endpoint: 'permissions/list', method: 'get' },
    AUTH_REGISTER: { endpoint: 'auth/register', method: 'post' },
    AUTH_LOGIN: { endpoint: 'auth/login', method: 'post' },
    VERIFY_OTP: { endpoint: 'auth/verifyotp', method: 'post' },
    RESEND_OTP: { endpoint: 'auth/resendotp', method: 'post' },
  };

  constructor(private http: HttpClient) {}

  callapi(apiKey: string, params = {}, id = null): Observable<any> {
    const api = this.APILIST[apiKey];
    const url = `${this.apiUrl}/${api.endpoint}`;
  
    if (api.method === 'get') {
      // Append query parameters to the URL
      const queryParams = new HttpParams({ fromObject: params });
  
      // Include id in the URL if provided
      if (id) {
        return this.http.get(`${url}/${id}`, { params: queryParams });
      } else {
        return this.http.get(url, { params: queryParams });
      }
    } else if (api.method === 'post') {
      return this.http.post(url, params);
    } else {
      throw new Error(`Invalid API method for ${apiKey}`);
    }
  }
  

  public downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
