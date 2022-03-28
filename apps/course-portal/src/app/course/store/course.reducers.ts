import { Course } from '../model/course.model';
import { createReducer, on } from '@ngrx/store';
import { courseActionTypes } from './course.actions';

export interface CourseState {
  courses: Course[];
  coursesLoaded: boolean;
}

export const initialState: CourseState = {
  courses: [],
  coursesLoaded: false,
};

export const courseReducer = createReducer(
  initialState,

  on(courseActionTypes.coursesLoaded, (state, action) => {
      return {...state, courses: action.courses, coursesLoaded: true}
  }),

  on(courseActionTypes.createCourse, (state, {course}) => (
    {...state, courses: [...state.courses, course]}
  )),

  on(courseActionTypes.deleteCourse, (state, {courseId}) => (
    {...state, courses: state.courses.filter(course => course.id !== courseId)}
  )),

  on(courseActionTypes.editCourseSuccess, (state, {course}) => (
    {...state, courses: [...state.courses, course]}
  ))
);

