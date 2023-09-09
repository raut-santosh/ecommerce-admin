import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-roles-addedit',
  templateUrl: './roles-addedit.component.html',
  styleUrls: ['./roles-addedit.component.scss']
})
export class RolesAddeditComponent {
  permissions: any = [];
  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService){

  }
  ngOnInit() {
    this.getList();
  }
  getList() {
    // Make the API call with the updated parameters
    this.apiService.callapi('PERMISSIONS_LIST').subscribe(
      (response: any) => {
        console.log(response)
        this.permissions = response.list;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  closeModal(){
    this.ngbActiveModal.close();
  }
}
