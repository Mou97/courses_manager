import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/courses.service';
import { Responses } from 'src/models/responses.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  id: String;
  course: any = {};
  updateCourseForm: FormGroup;

  constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.loadEditCourseForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.coursesService.getCourseById(this.id).subscribe(res => {
        this.course = res;
        this.updateCourseForm.get("title").setValue(this.course.title);
        this.updateCourseForm.get("description").setValue(this.course.description);
        this.updateCourseForm.get("speciality").setValue(this.course.speciality);
        this.updateCourseForm.get("level").setValue(this.course.level);
        this.updateCourseForm.get("tags").setValue(this.course.tags);
        this.updateCourseForm.get("year").setValue(this.course.year);
      });
    });
  }

  loadEditCourseForm() {
    this.updateCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      speciality: ['', Validators.required],
      tags: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  editCourse(title, description, level, speciality, year, tags) {
    this.coursesService.updateCourse(this.id, title, description, level, speciality, year, tags).subscribe((result: Responses) => {
      if (result.success) {
        this.router.navigate(['/']);
        this.snackBar.open('The course has been updated with success.', "OK", {
          duration: 4000
        });
      } else {
        this.snackBar.open(result.message, "OK", {
          duration: 4000
        });
      }
    });
  }
}
