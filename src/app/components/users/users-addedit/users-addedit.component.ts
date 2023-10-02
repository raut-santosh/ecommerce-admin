import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/services/helper/helper.service';
@Component({
  selector: 'app-users-addedit',
  templateUrl: './users-addedit.component.html',
  styleUrls: ['./users-addedit.component.scss']
})
export class UsersAddeditComponent {
  model: any = {  };
  inputData: any;
  roles: any = [];
  selectedRole: any = {};
  addresses: any = [{}];
  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService, private helperService: HelperService) {

  }
  ngOnInit() {
    this.getRoles();
    if(this.inputData) {
      this.getUser();
    }
  }

  getRoles(){
    this.apiService.callapi('ROLES_LIST', {}, null, 'get').subscribe(
      (response: any) => {
        console.log(response);
        this.roles = response.list
        if(this.inputData === undefined) {
          this.selectedRole = this.roles.find((role:any) => role.alias === 'customer');
          this.model.role = this.selectedRole._id;
        }
      }
    )
  }


  closeModal() {
    this.ngbActiveModal.close({refresh: true});
  }

  getUser() {  
    this.apiService.callapi('USER', {}, this.inputData.id).subscribe(
      (response: any) => {
        console.log(response);
        this.model = response.user;
        if(this.inputData){
          this.model.role = this.model.role._id;
          this.model.addresses.length > 0 ? this.addresses = this.model.addresses: this.addresses = [{}];
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  formSubmit(event: any){
    this.model.addresses = this.addresses;
    this.apiService.callapi('USER_ADDEDIT', this.model, null, 'post').subscribe(
      (response: any) => {
        console.log(response);
        if(this.model._id){
          this.helperService.presentToast('success', 'User Updated successfully');
        }else{
          this.helperService.presentToast('success', 'User added successfully');
        }
        this.closeModal();
      },
      (error: any) => {
        console.error(error);
      }
    );
    
  }
}
