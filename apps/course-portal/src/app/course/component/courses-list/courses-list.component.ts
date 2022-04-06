import { courseActionTypes } from '../../store/course.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../model/course.model';
import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
// import {
//   coursesLoadState,
//   getAllCourses,
// } from '../../store/entity/course-entity.selector';
import { coursesLoadState, getAllCourses } from '../../store/course.selector';
import { ViewState } from '../../model/call-state';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'course-management-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]> | undefined;
  courseToBeUpdated: Course = {
    id: '',
    name: '',
    description: '',
  };
  coursesLoadState$ = this.store.pipe(select(coursesLoadState));
  displayStyle = 'none';
  courseListViews = ViewState;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(courseActionTypes.loadCourses());
    this.courses$ = this.store.pipe(select(getAllCourses));
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(courseActionTypes.deleteCourse({ courseId }));
  }

  showUpdateCosurseModal(course: Course) {
    this.store.dispatch(courseActionTypes.openEditCourse());
    this.courseToBeUpdated = { ...course };
    this.displayStyle = 'block';
  }

  closeEditCourseModal() {
    this.displayStyle = 'none';
  }

  updateCourse(courseData: NgForm) {
    const course: Course = {
      id: this.courseToBeUpdated.id,
      name: courseData.value.name,
      description: courseData.value.description,
    };
    this.store.dispatch(courseActionTypes.editCourse({ course: course }));

    // const update: Update<Course> = {
    //   id: this.courseToBeUpdated.id,
    //   changes: {
    //     ...this.courseToBeUpdated,
    //     ...courseData.value,
    //   },
    // };

    // this.store.dispatch(courseActionTypes.updateCourse({ update }));

    this.displayStyle = 'none';
  }
}
