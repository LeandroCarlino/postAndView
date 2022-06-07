import { Component, OnInit } from '@angular/core';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: any;

  constructor(public jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.jsonDataService.getPostsList().subscribe(data => {
      this.posts = data;
    })
  }
}

  


