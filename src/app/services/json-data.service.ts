import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {

  constructor(private http: HttpClient) { };

  getPosts(): Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/users/1/posts");
  }


}
