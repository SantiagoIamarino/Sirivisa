import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';
import { Post } from '../models/post.model';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getPostById(postId) {
    const url = BACKEND_URL + '/posts/' + postId;

    return this.http.get(url);
  }

  getPosts() {
    const url = BACKEND_URL + '/posts';

    return this.http.get(url);
  }

  getPostsByCategory(categoryId) {
    const url = BACKEND_URL + '/posts/category/' + categoryId;

    return this.http.get(url);
  }

  uploadPost(post: Post) {
    let url = BACKEND_URL + '/posts';
    url += '?token=' + this.loginService.token;

    return this.http.post(url, post);
  }

  editPost(post: Post) {
    let url = BACKEND_URL + '/posts/' + post._id;
    url += '?token=' + this.loginService.token;

    return this.http.put(url, post);
  }

  deletePost(postId: string) {
    let url = BACKEND_URL + '/posts/' + postId;
    url += '?token=' + this.loginService.token;

    return this.http.delete(url);
  }
}
