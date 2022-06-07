import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Post } from '../interfaces/post.interface';
import { CommentInterface } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {

  constructor(private http: HttpClient) { };

  getPostsList(): Observable<Post[]>{
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/users/1/posts");
  }

  getPostId(id: string): Observable <Post> {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
  
  getCommentId (id:string): Observable <any> {
    return this.http.get<CommentInterface>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    
  }


}
