import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-roles-addedit',
  templateUrl: './roles-addedit.component.html',
  styleUrls: ['./roles-addedit.component.scss']
})
export class RolesAddeditComponent {
  permissions: any = [];
  model: any = {
    name: '',
    alias: '',
    permissions: []
  };
  currentRole: any = {};
  inputData: any;
  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService) {

  }
  ngOnInit() {
    this.getRole();
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

  closeModal() {
    this.ngbActiveModal.close();
  }

  getRole() {  
    // Make the API call with the roleId parameter
    this.apiService.callapi('ROLE', {}, this.inputData.id).subscribe(
      (response: any) => {
        console.log(response);
        this.model = response.role;
        this.currentRole = response.role;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  isChecked(permissionId: string): boolean {
    return this.model.permissions.includes(permissionId);
  }

  togglePermission(permissionId: string): void {
    if (this.model.permissions.includes(permissionId)) {
      // Permission is already selected, so remove it
      this.model.permissions = this.model.permissions.filter((item:any) => item !== permissionId);
    } else {
      // Permission is not selected, so add it
      this.model.permissions.push(permissionId);
    }
  }

  formSubmit(event: any){
    console.log(this.model)
  }
}
