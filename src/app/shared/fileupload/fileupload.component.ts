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
  @Input() multiple: boolean = false;

  constructor(private apiService: ApiService, private http: HttpClient) { }

  uploadFiles(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // Get the selected files
      const files: FileList = event.target.files;
      const formData = new FormData();
      
      // Loop through the selected files and append them to the FormData
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      // Set the alias based on your logic (profile or other)
      const alias = this.data.profile ? 'profile' : 'other';
      formData.append('alias', alias);

      // Replace 'yourApiEndpoint' with the actual API endpoint where you want to upload the files
      const uploadUrl = environment.apiUrl + '/upload/files';

      // Send the files to the API using HttpClient
      this.http.post(uploadUrl, formData)
        .subscribe(
          (response: any) => {
            // Handle the API response here, e.g., emit an event to notify the parent component
            console.log(response);
            this.output.emit({ files: response.files });
          },
          (error) => {
            // Handle API error here, e.g., emit an event with an error message
            this.output.emit({ error: 'File upload failed.' });
          }
        );
    }
  }

}
