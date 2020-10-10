import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Router } from '@angular/router';
import { Courses } from 'src/models/courses.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  courses: Courses[];
  tableColumns = ['index', 'title', 'createdAt', 'updatedAt', 'edit'];

  constructor(private snackBar: MatSnackBar, private coursesService: CoursesService, private router: Router) {
    this.loadCourses();
  }

  ngOnInit(): void {
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe((coursesData: Courses[]) => {
      this.courses = coursesData;
    });
  }

  editCourse(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  viewCourse(id) {
    this.router.navigate([`/course/${id}`]);
  }

  deleteCourse(id) {
    this.coursesService.deleteCourseById(id).subscribe(() => {
      this.loadCourses();
      this.snackBar.open("Le cours a été supprimée.", "OK", {
        duration: 4000
      });
    })
  }
}


