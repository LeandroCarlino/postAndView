import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommentInterface } from 'src/app/interfaces/comment.interface';

import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css'],
})
export class PostCommentsComponent implements OnInit {
  form!: FormGroup;
  comments!: any;
  newComments: CommentInterface[] = [];

  constructor(
    private jsonDataService: JsonDataService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(({ id }) => this.jsonDataService.getCommentId(id)))
      .subscribe((comment) => (this.comments = comment));

    this.jsonDataService.newComment.subscribe((data: CommentInterface[]) => {
      this.newComments = data;
    });
  }

  get invalidName() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  get invalidMail() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get invalidComment() {
    return this.form.get('body')?.invalid && this.form.get('body')?.touched;
  }

  createForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      body: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  save() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    const newComment = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      body: this.form.controls['body'].value,
    };

    this.newComments.unshift(newComment)
    console.log(this.newComments);
  }
}
