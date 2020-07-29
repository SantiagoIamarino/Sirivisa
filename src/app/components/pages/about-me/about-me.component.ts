import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { AboutMeService } from '../../../services/about-me.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  content;

  constructor(
    private loadingService: LoadingService,
    private aboutMeService: AboutMeService
  ) {
    this.loadingService.loading = true;
    this.getAboutContent();
   }

  ngOnInit() {
  }

  getAboutContent() {
    this.aboutMeService.getAboutContent()
      .subscribe((res: any) => {
        this.content = res.about;
      });
  }

  onImageLoad() {
    this.loadingService.loading = false;
  }

}
