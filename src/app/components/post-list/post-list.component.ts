import { Component, OnInit } from '@angular/core';
import { JsonDataService } from 'src/app/services/json-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: any;

  constructor(public jsonDataService: JsonDataService,
              private router: Router) { }

  ngOnInit(): void {
    this.jsonDataService.getPosts().subscribe(data => {
      this.posts = data;
    })
  }

  getPost(id:number) {
    this.router.navigate(["/post-detail/" + id]);
  }
}

  


