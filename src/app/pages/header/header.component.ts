import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  profilePhoto: string = '../assets/img/nophoto.jpg';
  selectedOption!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onOptionSelected(event: MatSelectChange) {
    this.selectedOption = event.value;
    if (this.selectedOption === '1') {
      this.router.navigate(['/home']);
    } else if (this.selectedOption === '2') {
      this.router.navigate(['/page-not-found']);
    } else if (this.selectedOption === '3') {
      this.router.navigate(['/page-not-found']);
    }
  }
}
