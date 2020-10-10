import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Courses } from 'src/models/courses.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: String;
  course: any = {};

  constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.coursesService.getCourseById(this.id).subscribe((courseData: Courses) => {
        this.course = courseData;
      });
    });
  }
}
