import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/interfaces/post.interface';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  postList!: Post[];
  dataSource!: MatTableDataSource<Post>;
  columnsToDisplay = ['Numero', 'Titulo', 'Mensaje', 'Acciones'];
  loading: boolean = true;

  constructor(public jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.getList();
  }

  private getList() {
    this.jsonDataService.getPostsList().subscribe((posts) => {
      this.postList = posts;
      this.dataSource = new MatTableDataSource(this.postList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  deletePost(id: number) {
    this.postList = this.postList.filter((post) => post.id !== id);
    this.dataSource.data = this.postList;
  }
}
