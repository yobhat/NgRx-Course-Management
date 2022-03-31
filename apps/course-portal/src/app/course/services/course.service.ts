import { Course } from './../model/course.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllCourses(): Observable<Course[]> {
    return this.http
      .get('/api/courses')
      .pipe(map((res: any) => res['payload']));
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>('/api/course', course);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete('/api/course/' + courseId);
  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put('/api/course/' + courseId, changes);
  }
}
