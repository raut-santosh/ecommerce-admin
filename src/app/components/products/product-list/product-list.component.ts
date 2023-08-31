import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  page = {
    limit: 7,
    page: 1,
    count: 0,
    offset :0
 };
 items: any = [];
 constructor(private apiService: ApiService) {}
  ngOnInit(){
    this.getProductsList();
    console.log(this.items)
  }

  getProductsList(){
    this.apiService.callapi('PRODUCTS_LIST').subscribe(
      (response: any) => {
        // Handle the response from the API
        this.items = response.products;
        this.page.count = response.products.length;
        console.log(this.items);
      },
      (error: any) => {
        // Handle the error if the API call fails
        console.error(error);
      }
    );
  }
}
