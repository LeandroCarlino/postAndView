import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedOption!: string;
  selectControl!: FormControl;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationDetector();
  }

  private navigationDetector() {
    this.selectControl = new FormControl();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/home') {
          this.selectControl.setValue(null);
        }
      });
  }

  onOptionSelected(event: MatSelectChange) {
    this.selectedOption = event.value;
    if (this.selectedOption === '1') {
      this.router.navigate(['/home']);
    } else if (this.selectedOption === '2') {
      this.router.navigate(['/profile']);
    } else if (this.selectedOption === '3') {
      this.router.navigate(['/page-not-found']);
    }
  }
}
