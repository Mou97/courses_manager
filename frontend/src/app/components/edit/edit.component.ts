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
        this.updateCourseForm.get("link").setValue(this.course.link);
        this.updateCourseForm.get("number").setValue(this.course.index);
      });
    });
  }

  loadEditCourseForm() {
    this.updateCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  editCourse(title, description, link, number) {
    this.coursesService.updateCourse(this.id, title, description, link, number).subscribe((result: Responses) => {
      if (result.success) {
        this.router.navigate(['/']);
        this.snackBar.open('Le cours a été mis à jour avec succès.', "OK", {
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
