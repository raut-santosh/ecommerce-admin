import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {
  @Input() data: any = {};
  @Output() output = new EventEmitter();

  constructor(private apiService: ApiService, private http: HttpClient) { }

  uploadFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // Get the selected file
      const file = event.target.files[0];
      

      // Create a FormData object to send the file to the API
      const formData = new FormData();
      formData.append('file', file);
      this.data.profile ? formData.append('alias','profile') : formData.append('alias','other');
      console.log(file)

      // Replace 'yourApiEndpoint' with the actual API endpoint where you want to upload the file
      let uploadUrl = environment.apiUrl + '/upload/file';

      // Send the file to the API using HttpClient
      this.http.post(uploadUrl, formData)
        .subscribe(
          (response: any) => {
            // Handle the API response here, e.g., emit an event to notify the parent component
            console.log(response);
            this.output.emit({file: response.file});
          },
          (error) => {
            // Handle API error here, e.g., emit an event with an error message
            this.output.emit({ error: 'File upload failed.' });
          }
        );
    }
  }
}
