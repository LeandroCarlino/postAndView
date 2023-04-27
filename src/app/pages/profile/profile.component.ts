import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from 'src/app/components/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profilePhoto: string = '../assets/img/nophoto.jpg';
  name!: string;
  mail!: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: { name: this.name, mail: this.mail },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.name = result.name;
        this.mail = result.mail;
      }
    });
  }
}
