import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  API_URL = "http://127.0.0.1:3000/api";

  constructor(private httpClient: HttpClient) { }

  getCourseById(id) {
    return this.httpClient.get(`${this.API_URL}/course/${id}`);
  }

  getCourses() {
    return this.httpClient.get(`${this.API_URL}/courses`);
  }

  addCourse(title, description, level, speciality, year, tags) {
    const newCourse = {
      title: title,
      description: description,
      level,
      tags,
      year,
      speciality
    };
    return this.httpClient.post(`${this.API_URL}/courses/`, newCourse);

  }

  updateCourse(id, title, description, link, number) {
    const updatedCourse = {
      title: title,
      description: description,
      link: link,
      index: number
    };
    return this.httpClient.post(`${this.API_URL}/course/update/${id}`, updatedCourse)
  }

  deleteCourseById(id) {
    return this.httpClient.get(`${this.API_URL}/course/delete/${id}`);
  }

  deleteAllCourses() {
    return this.httpClient.get(`${this.API_URL}/course/deleteall`);
  }



}
