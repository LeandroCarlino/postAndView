import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {

  form!: FormGroup;
  comments!: any;

  constructor(private jsonDataService: JsonDataService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params
    .pipe (
      switchMap( ({id}) => this.jsonDataService.getCommentId(id))
    )
    .subscribe( comment => this.comments = comment);
  }

  get invalidName () {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched
  }
  
  get invalidMail () {
    return this.form.get('mail')?.invalid && this.form.get('mail')?.touched
  }

  get invalidComment () {
    return this.form.get('comment')?.invalid && this.form.get('comment')?.touched
  }

  createForm () {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    })
  }

  save () {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach (control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach (control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
