import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  page = {
    limit: 10, // Number of items per page
    page: 1,  // Current page
    count: 0,
    offset: 0
  };
  items: any[] = [];


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getList();
  }

  getList(i_scroll = false) {
    i_scroll ? this.page.page++ : (this.page.page = this.page.page);
    i_scroll ? this.page.offset++ : (this.page.offset = this.page.offset);
    let params = {...this.page}; 
    
    // Make the API call with the updated parameters
    this.apiService.callapi('PRODUCTS_LIST', params).subscribe(
      (response: any) => {
        console.log(response)
        this.items = response.data;
        this.page.count = response.totalCount;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  

  pageCallback(pageInfo: {
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
  }) {
    console.log(pageInfo)
    // this.page.offset = pageInfo.offset as number;
    this.page.offset = pageInfo.offset as number;
    // this.page.page + 1;
    this.getList()
  }
  
}
