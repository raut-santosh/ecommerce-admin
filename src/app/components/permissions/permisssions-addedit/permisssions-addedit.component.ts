import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/services/helper/helper.service';
@Component({
  selector: 'app-permisssions-addedit',
  templateUrl: './permisssions-addedit.component.html',
  styleUrls: ['./permisssions-addedit.component.scss']
})
export class PermisssionsAddeditComponent {
  model: any = {
    name: '',
    alias: '',
    permissions: []
  };
  inputData: any;
  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService, private helperService: HelperService) {

  }
  ngOnInit() {
    if (this.inputData) {
      this.getPermission();
    }
  }


  closeModal() {
    this.ngbActiveModal.close({ refresh: true });
  }

  getPermission() {
    // Make the API call with the roleId parameter
    this.apiService.callapi('PERMISSION', {}, this.inputData.id).subscribe(
      (response: any) => {
        console.log(response);
        this.model = response.permission;
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
    this.apiService.callapi('PERMISSION_ADDEDIT', this.model, null, 'post').subscribe(
      (response: any) => {
        console.log(response);
        this.closeModal();
        this.model._id ? this.helperService.presentToast('success', 'Successfully Updated Permissions') : this.helperService.presentToast('success', 'Successfully Added Permission');
      },
      (error: any) => {
        console.error(error);
      }
    );

  }
}
