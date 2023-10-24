import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/services/helper/helper.service';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-orders-addedit',
  templateUrl: './orders-addedit.component.html',
  styleUrls: ['./orders-addedit.component.scss']
})
export class OrdersAddeditComponent {
  model: any = {};
  inputData: any;
  productsList: any = [];
  params: any = {};
  search:any;
  page = {
    count: 0,
    page: 1,
    offset: 0,
    limit: 10
  }
  nomore: boolean = false; 
  loading: boolean = false;
  apiUrl = environment.apiUrl;
  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService, private helperService: HelperService) {

  }
  ngOnInit() {
    this.getProducts();
    if (this.inputData) {
      this.getOrder();
    }
  }


  closeModal() {
    this.ngbActiveModal.close({ refresh: true });
  }

  getOrder() {
    // Make the API call with the roleId parameter
    this.apiService.callapi('ORDER', {}, this.inputData.id).subscribe(
      (response: any) => {
        console.log(response);
        this.model = response.order;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  onInputChange(event: Event): void {
    // Get the input field value
    const value = (event.target as HTMLInputElement).value;

    // Replace spaces with underscores and update the inputValue
    this.model.alias = value.replace(/ /g, '_');
  }

  formSubmit(event: any) {
    this.apiService.callapi('ORDER_ADDEDIT', this.model, null, 'post').subscribe(
      (response: any) => {
        console.log(response);
        this.closeModal();
        this.model._id ? this.helperService.presentToast('success', 'Successfully Updated Orders') : this.helperService.presentToast('success', 'Successfully Added Permission');
      },
      (error: any) => {
        console.error(error);
      }
    );

  }

  onLoadMore() {
    if (!this.nomore) {
      this.getProducts(true);
    }
  }


  getProducts(i_scroll=false){
    // this.params 
    i_scroll ? this.page.page++ : (this.page.page = this.page.page);
    i_scroll ? this.page.offset++ : (this.page.offset = this.page.offset);
    this.params = {...this.page, search: this.search}; 
    this.loading = true;
    this.apiService.callapi('PRODUCTS_LIST', this.params, null, 'get').subscribe(
      (response: any) => {
        // this.productsList = response.data;
        console.log(this.productsList);
        i_scroll
          ? response.data.length > 0
            ? this.productsList.push(...response.data)
            : (this.nomore = true)
          : (this.productsList = response.data);
          this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.helperService.presentToast('error', 'Error while loading product list');
        this.loading = false;
      }
    );
  }
}
