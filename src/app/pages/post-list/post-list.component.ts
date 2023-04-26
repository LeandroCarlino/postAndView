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
  dataSource!: MatTableDataSource<Post>;
  columnsToDisplay = ['Numero', 'Titulo', 'Mensaje', 'Acciones'];

  constructor(public jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    this.jsonDataService.getPostsList().subscribe((posts) => {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
