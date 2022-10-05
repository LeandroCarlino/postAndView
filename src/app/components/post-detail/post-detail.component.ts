import { Component, OnInit } from '@angular/core';
import { JsonDataService } from 'src/app/services/json-data.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { CommentInterface } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  newComments: CommentInterface[] = [];
  post!: Post;
  constructor(
    private jsonDataService: JsonDataService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(({ id }) => this.jsonDataService.getPostId(id)))
      .subscribe((post) => (this.post = post));
  }
}
