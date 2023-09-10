import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesAddeditComponent } from '../roles-addedit/roles-addedit.component';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
  page = {
    count: 0,
    page: 1,
    offset: 0,
    limit: 10
  }

  list: any = [];

  constructor(private apiService: ApiService, private modalService: NgbModal) {

  }

  ngOnInit(){
    this.getList()
  }


  getList(i_scroll = false) {
    i_scroll ? this.page.page++ : (this.page.page = this.page.page);
    i_scroll ? this.page.offset++ : (this.page.offset = this.page.offset);
    let params = {...this.page}; 
    
    // Make the API call with the updated parameters
    this.apiService.callapi('ROLES_LIST', params).subscribe(
      (response: any) => {
        console.log(response)
        this.list = response.list;
        this.page.count = response.totalCount;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openModal(itemseq: number) {
    const data = {
      id: this.list[itemseq]._id
    };
    
    console.log(data);
  
    const modalRef = this.modalService.open(RolesAddeditComponent, {
      size: 'lg',
      centered: true,
      keyboard: true,
      backdrop: 'static'
    });
  
    // Pass the data to the modal component
    modalRef.componentInstance.inputData = data;
  }

  pageCallback(pageInfo:{
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
  }){
    this.page.offset = pageInfo.offset as number;
  }

}
