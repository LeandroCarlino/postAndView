import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {

  comments!: any;

  constructor(private jsonDataService: JsonDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
    .pipe (
      switchMap( ({id}) => this.jsonDataService.getCommentId(id))
    )
    .subscribe( comment => this.comments = comment);
  }

}
