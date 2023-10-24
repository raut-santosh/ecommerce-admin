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
  APILIST: { [key: string]: { endpoint: string; method: 'get' | 'post' | 'put' | 'delete' } } = {
    PRODUCTS_LIST: { endpoint: 'products/list', method: 'get' },
    PRODUCT_ADDEDIT: { endpoint: 'products/addedit', method: 'post' },
    PRODUCT_DELETE: { endpoint: 'product', method: 'delete' },
    PRODUCT: { endpoint: 'product', method: 'get' },
    ORDER: { endpoint: 'orders', method: 'get' },
    ORDERS_LIST: { endpoint: 'orders/list', method: 'get' }, // Change the endpoint to 'orders/list'
    ORDERS_ADDEDIT: { endpoint: 'orders/addedit', method: 'post' }, // Change the endpoint to 'orders/addedit'
    ROLES_LIST: { endpoint: 'roles/list', method: 'get' },
    ROLE:{endpoint: 'role', method: 'get' },
    ROLE_ADDEDIT: { endpoint: 'role/addedit', method: 'post' },
    ROLE_DELETE: {endpoint: 'role', method: 'delete' },
    PERMISSIONS_LIST: { endpoint: 'permissions/list', method: 'get' },
    PERMISSION: { endpoint: 'permissions', method: 'get' },
    PERMISSION_ADDEDIT: { endpoint: 'permissions/addedit', method: 'post'},
    PERMISSION_DELETE: { endpoint: 'permissions', method: 'delete' },
    USERS_LIST: { endpoint: 'users/list', method: 'get' },
    USER_DELETE: { endpoint: 'user', method: 'delete' },
    USER_ADDEDIT: { endpoint: 'user/addedit', method: 'post' },
    USER: { endpoint: 'user', method: 'get' },
    // AUTH_REGISTER: { endpoint: 'auth/register', method: 'post' },
    // AUTH_LOGIN: { endpoint: 'auth/login', method: 'post' },
    // VERIFY_OTP: { endpoint: 'auth/verifyotp', method: 'post' },
    // RESEND_OTP: { endpoint: 'auth/resendotp', method: 'post' },
  };

  constructor(private http: HttpClient) {}

  callapi(apiKey: string, params = {}, id = null, method = 'get'): Observable<any> {
    const api = this.APILIST[apiKey];
    const url = `${this.apiUrl}/${api.endpoint}`;
  
    // Include id in the URL if provided
    const apiUrl = id ? `${url}/${id}` : url;
  
    if (method === 'get') {
      // Append query parameters to the URL
      const queryParams = new HttpParams({ fromObject: params });
      return this.http.get(apiUrl, { params: queryParams });
    } else if (method === 'post') {
      return this.http.post(apiUrl, params);
    } else if (method === 'put') {
      return this.http.put(apiUrl, params);
    } else if (method === 'delete') {
      // Note: DELETE method typically doesn't have a request body, so we omit the 'params' argument
      return this.http.delete(apiUrl);
    } else {
      throw new Error(`Invalid API method for ${apiKey}`);
    }
  }
  
  

  public downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  file_upload(file:any) {
    console.warn('sam', file);
    let uploadUrl = environment.apiUrl + '/upload/file';
    
    let formData: FormData = new FormData();
    formData.append("file", file, file.name);

    return this.http
      .post<any>(uploadUrl, formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((res) => {
          console.log("file result", res);
          return res;
        })
      );
  }
}
