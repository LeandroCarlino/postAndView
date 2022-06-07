import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { JsonDataService } from 'src/app/services/json-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: any;

  constructor(private jsonDataService: JsonDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.jsonDataService.getPosts().subscribe(data => {
      this.post = data;
    })
  }
  

}
