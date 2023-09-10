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
    if(this.inputData) {
      this.getRole();
    }
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
    this.ngbActiveModal.close({refresh: true});
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

  onInputChange(event: Event): void {
    // Get the input field value
    const value = (event.target as HTMLInputElement).value;

    // Replace spaces with underscores and update the inputValue
    this.model.alias = value.replace(/ /g, '_');
  }

  formSubmit(event: any){
    this.apiService.callapi('ROLE_ADDEDIT', this.model, null, 'post').subscribe(
      (response: any) => {
        console.log(response);
        this.closeModal();
        // Optionally, you can update the model or currentRole with the response if needed.
        // this.model = response.role;
        // this.currentRole = response.role;
      },
      (error: any) => {
        console.error(error);
      }
    );
    
  }
}
