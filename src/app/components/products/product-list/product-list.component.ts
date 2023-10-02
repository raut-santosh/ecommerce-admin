import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ProductAddeditComponent } from '../product-addedit/product-addedit.component';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  page = {
    count: 0,
    page: 1,
    offset: 0,
    limit: 10
  }

  list: any = [];
  apiUrl: string = environment.apiUrl;

  constructor(private apiService: ApiService, private modalService: NgbModal, private helperService: HelperService) {

  }

  ngOnInit(){
    this.getList();
  }


  getList(i_scroll = false) {
    i_scroll ? this.page.page++ : (this.page.page = this.page.page);
    i_scroll ? this.page.offset++ : (this.page.offset = this.page.offset);
    let params = {...this.page}; 
    console.log(params);
    // Make the API call with the updated parameters
    this.apiService.callapi('PRODUCTS_LIST', params).subscribe(
      (response: any) => {
        console.log(response)
        this.list = response.data;
        this.page.count = response.totalCount;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openModal(itemId?: string) {  
    const modalRef = this.modalService.open(ProductAddeditComponent, {
      size: 'lg',
      centered: true,
      keyboard: true,
      backdrop: 'static'
    });
  
    // Pass the data to the modal component
    if (itemId) {
      const data = {
        id: itemId
      };
      console.log(data);
      modalRef.componentInstance.inputData = data;
    }
  
    modalRef.result.then((result) => {
      // Handle the result when the modal is closed
      this.getList();
    });
  }


  pageCallback(pageInfo:{
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
  }){
    this.page.offset = pageInfo.offset as number;
    this.getList()
  }

  confirmDelete(productId: string | any){
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the confirmed action
        this.apiService.callapi('PRODUCT_DELETE', {}, productId, 'delete').subscribe(
          (response: any) => {
            this.helperService.presentToast('success', 'Product deleted successfully');
            this.getList();
          },
          (error: any) => {
            console.error(error);
          }
        );
        // Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  }
  
}
