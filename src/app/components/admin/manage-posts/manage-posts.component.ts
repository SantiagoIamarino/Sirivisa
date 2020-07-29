import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.getPosts();
    this.loadingService.loading = true;
   }

  ngOnInit() {
  }

  getPosts() {
    this.postsService.getPosts().subscribe((res: any) => {
      this.posts = res.posts;
      this.loadingService.loading = false;
    });
  }

  editPost(postId) {
    this.router.navigate(['admin', 'posts', postId]);
  }

  deletePost(postId) {
    swal('Are you sure that you want to delete this post?', {
      buttons: ['Cancel', 'Delete'],
      icon: 'warning'
    }).then( wantsToDelete => {
      if (wantsToDelete) {
        this.postsService.deletePost(postId)
          .subscribe((res: any) => {
            swal('Success', res.message, 'success');
            this.getPosts();
          });
      }
    });
  }

}
