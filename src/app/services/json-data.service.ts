import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { CommentInterface } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  urlBase: string = 'https://jsonplaceholder.typicode.com';
  newComment: Subject<CommentInterface[]>;
  pageStart: BehaviorSubject<number>;
  pageLimit: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.newComment = new Subject<CommentInterface[]>();
    this.pageStart = new BehaviorSubject<number>(0);
    this.pageLimit = new BehaviorSubject<number>(10);
  }

  ngOnInit() {}

  getPostsList(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.urlBase}/posts`);
  }

  getPostId(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.urlBase}/posts/${id}`);
  }

  getCommentId(id: string): Observable<CommentInterface> {
    return this.http.get<CommentInterface>(
      `${this.urlBase}/posts/${id}/comments`
    );
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.urlBase}/posts/${id}`);
  }
}
