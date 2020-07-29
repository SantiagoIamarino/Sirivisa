import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../services/files.service';
import { FileUpload } from 'primeng/fileupload/fileupload';

import swal from 'sweetalert';
import { AboutMeService } from '../../../services/about-me.service';

@Component({
  selector: 'app-manage-about',
  templateUrl: './manage-about.component.html',
  styleUrls: ['./manage-about.component.css']
})
export class ManageAboutComponent implements OnInit {

  uploadedFiles = [];

  about = {
    text: '',
    img: {}
  };

  constructor(
    public filesService: FilesService,
    private aboutMeService: AboutMeService
  ) {
    this.getAboutContent();
   }

  ngOnInit() {
  }

  getAboutContent() {
    this.aboutMeService.getAboutContent()
      .subscribe((res: any) => {
        this.about = res.about;
      });
  }

  myUploader(event) {
    this.filesService.uploadFiles(event.files).subscribe((res: any) => {
      this.uploadedFiles = res.uploads;
      this.filesService.uploading = false;
    });
  }

  removeFile(file: File, uploader: FileUpload) {
    const index = uploader.files.indexOf(file);
    uploader.remove(null, index);
  }

  editAbout() {
    if (this.uploadedFiles.length === 0) {
      swal('Error', 'You have to set at least one post image', 'error');
    } else {
      this.about.img = this.uploadedFiles[0];
    }

    if (!this.about.text) {
      swal('Error', 'You have to set about me content', 'error');
      return;
    }

    this.aboutMeService.editAboutMe(this.about)
      .subscribe((res: any) => {
        swal('Success', res.message, 'success');
      });
  }

}
