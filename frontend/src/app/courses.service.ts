import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  API_URL = "http://127.0.0.1:3000/api";

  constructor(private httpClient: HttpClient) { }

  getCourseById(id) {
    return this.httpClient.get(`${api_url}/courses/${id}`);
  }

  getCourses() {
    return this.httpClient.get(`${api_url}/courses/mycourses`, {headers: {Authorization : localStorage.getItem('token')}});
  }

  getAllCourses() {
    return this.httpClient.get(`${api_url}/courses/all`);
  }

  addCourse(title, description, level, speciality, year, tags) {
    const newCourse = {
      title,
      description,
      level,
      tags,
      year,
      speciality
    };
    return this.httpClient.post(`${api_url}/courses/`, newCourse, {headers: {Authorization : localStorage.getItem('token')}});

  }

  updateCourse(id, title, description,  level, speciality, year, tags) {
    const updatedCourse = {
      title: title,
      description: description,
      level,
      tags,
      year,
      speciality
    };
    return this.httpClient.post(`${api_url}/courses/edit/${id}`, updatedCourse, {headers: {Authorization : localStorage.getItem('token')}})
  }

  deleteCourseById(id) {
    return this.httpClient.delete(`${api_url}/courses/${id}`, {headers: {Authorization : localStorage.getItem('token')}});
  }

  deleteAllCourses() {
    return this.httpClient.get(`${this.API_URL}/course/deleteall`);
  }



}
