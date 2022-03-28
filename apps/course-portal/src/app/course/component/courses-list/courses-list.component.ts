import { courseActionTypes } from '../../store/course.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../model/course.model';
import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { areCoursesLoaded, getAllCourses } from '../../store/course-entity.selector';
// import { areCoursesLoaded, getAllCourses } from '../../store/course.selector';

@Component({
  selector: 'course-management-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  courses$: Observable<Course[]> | undefined;
  courseToBeUpdated: Course = {
    id: 0,
    name: '',
    description: ''
  };
  areCoursesLoaded$ = this.store.pipe(select(areCoursesLoaded));
  displayStyle = 'none';

  constructor(private readonly store: Store) { }

  ngOnInit() {
    this.store.dispatch(courseActionTypes.loadCourses())
    this.courses$ = this.store.pipe(select(getAllCourses));
  }

  deleteCourse(courseId: number) {
    this.store.dispatch(courseActionTypes.deleteCourse({courseId}));
  }

  showUpdateCosurseModal(course: Course) {
    this.courseToBeUpdated = {...course};
    this.displayStyle = 'block';
  }

  closeEditCourseModal() {
    this.displayStyle = 'none';
  }

  updateCourse(courseData: any) {
    // this.store.dispatch(courseActionTypes.editCourse({course: this.courseToBeUpdated}))

    const update: Update<Course> = {
      id: this.courseToBeUpdated.id,
      changes: {
        ...this.courseToBeUpdated,
        ...courseData.value
      }
    };

    this.store.dispatch(courseActionTypes.updateCourse({update}));

    this.courseToBeUpdated = {
      id: NaN,
      name: '',
      description: ''
    };
    this.displayStyle = 'none';
  }
}
