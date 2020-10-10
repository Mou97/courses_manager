import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responses } from 'src/models/responses.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createCourseForm: FormGroup;

  constructor(private snackBar: MatSnackBar, private coursesService: CoursesService, private formBuilder: FormBuilder, private router: Router) {
    this.createCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      description: ['', Validators.required],
      speciality: ['', Validators.required],
      level: ['', Validators.required],
      tags: ['', Validators.required],
      // lectures: [[], Validators.required],
    });
  }

  ngOnInit(): void {
  }

  createCourse(title, description,level,speciality, year, tags) {
    this.coursesService.addCourse(title, description, level, speciality ,year, tags).subscribe((result: Responses) => {
      if (result.success) {
        this.router.navigate(['/']);
        this.snackBar.open("Course was created successfully.", "OK", {
          duration: 4000
        });
      } else {
        this.snackBar.open(result.message, "OK", {
          duration: 4000
        });
      }
    })
  }

}
