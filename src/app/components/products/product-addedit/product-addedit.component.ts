import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/services/helper/helper.service';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-product-addedit',
  templateUrl: './product-addedit.component.html',
  styleUrls: ['./product-addedit.component.scss']
})
export class ProductAddeditComponent {
  list: any = [];
  model: any = { };
  inputData: any;
  tags: string[] = [];
  newTag: string = '';
  images: any = [];
  apiUrl= environment.apiUrl;
  checkedProfile: boolean = true;

  constructor(private ngbActiveModal: NgbActiveModal, private apiService: ApiService, private helperService: HelperService) {

  }
  ngOnInit() {
    if (this.inputData) {
      this.getProduct();
      this.checkProfile();
    }
    this.getList();
  }

  getList() {
    // Make the API call with the updated parameters
    this.apiService.callapi('PRODUCTS_LIST').subscribe(
      (response: any) => {
        console.log(response)
        this.list = response.list;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  closeModal() {
    this.ngbActiveModal.close({ refresh: true });
  }

  getProduct() {
    // Make the API call with the roleId parameter
    this.apiService.callapi('PRODUCT', {}, this.inputData.id).subscribe(
      (response: any) => {
        console.log(response);
        this.model = response.product;
        this.tags = this.model.tags;
        this.images = this.model.images;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addTag(event:any) {
    if (!this.tags.includes(this.newTag)) {      
      this.tags.push(this.newTag);      
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  formSubmit(event: any) {
    this.model.tags = this.tags;
    this.model.images = this.images;
    this.apiService.callapi('PRODUCT_ADDEDIT', this.model, null, 'post').subscribe(
      (response: any) => {
        console.log(response);
        this.closeModal();
        this.getList();
        this.model._id ? this.helperService.presentToast('success', 'Successfully Updated Role') : this.helperService.presentToast('success', 'Successfully Added Role');
        // Optionally, you can update the model or currentRole with the response if needed.
        // this.model = response.role;
        // this.currentRole = response.role;
      },
      (error: any) => {
        console.error(error);
      }
    );

  }

  updateImages($event: any) {
  if (this.images.length > 0) {
    // If there are existing images, append the new files
  } else {
    // If there are no existing images, simply assign the new files
    // this.images = $event.files;
  }
  this.images.push(...$event.files);
  console.log(this.images);
  }

  checkProfile(){
    this.checkProfile = this.images.find((img: any) => img.alias === 'profile');
  }

  deleteImage(index:number){
    this.images.splice(index, 1);
  }
}
