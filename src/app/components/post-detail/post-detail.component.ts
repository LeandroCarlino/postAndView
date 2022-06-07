import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { JsonDataService } from 'src/app/services/json-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { CommentInterface } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post!: Post;
  id!: string;
  comments!: any;

  constructor(private jsonDataService: JsonDataService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params
    .pipe (
      switchMap( ({id}) => this.jsonDataService.getPostId(id))
    )
    .subscribe( post => this.post = post);
    
    this.route.params
    .pipe (
      switchMap( ({id}) => this.jsonDataService.getCommentId(id))
    )
    .subscribe( comment => this.comments = comment);

    // this.route.params
    // .pipe (
    //   switchMap( ({id}) => this.jsonDataService.getCommentId(id))
    // )
    // .subscribe( comment => this.comment = comment);
    // console.log(this.post.id)

  };

  
}
