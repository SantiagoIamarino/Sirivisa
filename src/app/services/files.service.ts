import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  uploading = false;
  uploadingMobile = false;

  constructor(
    private http: HttpClient
  ) { }

  uploadFiles(filesToUpload) {
    const formData = new FormData();

    filesToUpload.forEach((file, index) => {
      formData.append('file_' + index , file);
    });

    let url = BACKEND_URL + '/upload';

    this.uploading = true;

    return this.http.post(url, formData );
  }

  uploadMobileFiles(filesToUpload) {
    const formData = new FormData();

    filesToUpload.forEach((file, index) => {
      formData.append('file_' + index , file);
    });

    let url = BACKEND_URL + '/upload';

    this.uploadingMobile = true;

    return this.http.post(url, formData );
  }
}
