import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private helperService: HelperService, private apiService: ApiService) {
    this.helperService.showhideheadsidefoot = true;
  }

  ngOnInit(){
    this.loadBlogList()
  }
  loadBlogList(): void {
    this.apiService.request('BLOG_LIST').subscribe(
      (response: any) => {
        // Handle the response from the API
        console.log(response);
      },
      (error: any) => {
        // Handle the error if the API call fails
        console.error(error);
      }
    );
  }


  

}
