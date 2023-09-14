import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-addedit',
  templateUrl: './users-addedit.component.html',
  styleUrls: ['./users-addedit.component.scss']
})
export class UsersAddeditComponent {
  model: any = {
    name: '',
    alias: '',
    permissions: []
  };
  inputData: any;
  roles: any = [];
  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService) {

  }
  ngOnInit() {
    if(this.inputData) {
      this.getUser();
    }
    this.getRoles();
  }

  getRoles(){
    this.apiService.callapi('ROLES_LIST', {}, null, 'get').subscribe(
      (response: any) => {
        console.log(response);
        this.roles = response.list
      }
    )
  }


  closeModal() {
    this.ngbActiveModal.close({refresh: true});
  }

  getUser() {  
    // Make the API call with the roleId parameter
    this.apiService.callapi('USER', {}, this.inputData.id).subscribe(
      (response: any) => {
        console.log(response);
        this.model = response.user;
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

  formSubmit(event: any){
    this.apiService.callapi('USER_ADDEDIT', this.model, null, 'post').subscribe(
      (response: any) => {
        console.log(response);
        this.closeModal();
      },
      (error: any) => {
        console.error(error);
      }
    );
    
  }
}
