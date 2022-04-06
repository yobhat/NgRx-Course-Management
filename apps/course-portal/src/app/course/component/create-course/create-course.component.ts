import { Course } from './../../model/course.model';
import { courseActionTypes } from './../../store/course.actions';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'course-management-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent {
  constructor(private store: Store, private router: Router) {}

  onSubmit(courseFormData: NgForm) {
    if (courseFormData.invalid) {
      return;
    }

    const courseId = Math.floor(Math.random() * 100000);
    const course: Course = {
      id: `CU${courseId.toString()}`,
      name: courseFormData.value.name,
      description: courseFormData.value.description,
    };
    this.store.dispatch(courseActionTypes.createCourse({ course }));
  }

  navigateToCourseList() {
    this.router.navigateByUrl('/courses');
  }
}
