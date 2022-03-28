import { Course } from './../model/course.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export const loadCourses = createAction(
  '[Courses List API] Load Courses',
);

export const coursesLoaded = createAction(
  '[Courses Effect] Courses Loaded Successfully',
  props<{courses: Course[]}>()
);

export const createCourse = createAction(
  '[Create Course Operation] Create Course',
  props<{course: Course}>()
);

export const deleteCourse = createAction(
  '[Courses List Operations] Delete Course',
  props<{courseId: number}>()
);

export const updateCourse = createAction(
  '[Courses List Operations] Update Course',
  props<{update: Update<Course>}>()
);
export const editCourse = createAction(
  '[Courses List Operations] Update Course',
  props<{course: Course}>()
);
export const editCourseSuccess = createAction(
  '[Courses List Operations] Update Course',
  props<{course: Course}>()
);

export const clearCourses = createAction(
  '[Courses Clear UI] Clear Courses',
);

export const courseActionTypes = {
  loadCourses,
  coursesLoaded,
  createCourse,
  deleteCourse,
  updateCourse,
  clearCourses,
  editCourse,
  editCourseSuccess
};
