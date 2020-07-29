import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postId: string;

  post: Post;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.route.params.subscribe((params) => {
        this.postId = params.id;

        this.getPost();
      });
   }

  ngOnInit() {
  }

  getPost() {
    this.postsService.getPostById(this.postId)
      .subscribe((res: any) => {

        if (!res.post) {
          this.router.navigate(['/home']);
        }

        this.post = res.post;
        console.log(this.post);
      }, () => this.router.navigate(['/home']) );
  }

}
