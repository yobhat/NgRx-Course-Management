import { Course } from './../model/course.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

const loadCourses = createAction('[Courses List API] Load Courses');

const coursesLoaded = createAction(
  '[Courses Effect] Courses Loaded Successfully',
  props<{ courses: Course[] }>()
);

const coursesLoadFailure = createAction(
  '[Courses Effect] Courses Load Failed',
  props<{ error: any }>()
);

const createCourse = createAction(
  '[Create Course Operation] Create Course',
  props<{ course: Course }>()
);

const deleteCourse = createAction(
  '[Courses List Operations] Delete Course',
  props<{ courseId: string }>()
);

const openEditCourse = createAction(
  '[Courses List Operations] Edit Course Modal Opened'
);

const editCourse = createAction(
  '[Courses List Operations] Edit Course',
  props<{ course: Course }>()
);

const editCourseSuccess = createAction(
  '[Courses List Operations] Course Edited Successfully',
  props<{ course: Course }>()
);

//Update action is for Entity method updateOne() which makes use of Update<T>
const updateCourse = createAction(
  '[Courses List Operations] Update Course',
  props<{ update: Update<Course> }>()
);

//Update action is for Entity method updateOne() which makes use of Update<T>
const updateCourseSuccess = createAction(
  '[Courses List Operations] Course Updated Successfully',
  props<{ update: Update<Course> }>()
);

export const courseActionTypes = {
  loadCourses,
  coursesLoaded,
  createCourse,
  deleteCourse,
  updateCourse,
  openEditCourse,
  editCourse,
  editCourseSuccess,
  updateCourseSuccess,
  coursesLoadFailure,
};
