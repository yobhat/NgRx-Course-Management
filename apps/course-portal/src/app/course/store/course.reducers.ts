import { Course } from '../model/course.model';
import { createReducer, on } from '@ngrx/store';
import { courseActionTypes } from './course.actions';
import { ViewState } from '../model/call-state';

export const COURSES_REDUCER_FEATURE_KEY = 'courses';
export interface CourseState {
  courses: Course[];
  callState?: ViewState;
}

export const initialState: CourseState = {
  courses: [],
  callState: ViewState.INIT,
};

//Reducer function to trigger the state changes
export const courseReducer = createReducer(
  initialState,

  // on() functions handle the actions, and work like a switch statement for dispatched actions
  on(courseActionTypes.coursesLoaded, (state, action) => {
    return {
      ...state,
      courses: action.courses,
      callState: ViewState.LOADED,
    };
  }),

  on(courseActionTypes.loadCourses, (state) => ({
    ...state,
    callState: ViewState.LOADING,
  })),

  on(courseActionTypes.coursesLoadFailure, (state) => ({
    ...state,
    courses: [],
    callState: ViewState.ERROR,
  })),

  on(courseActionTypes.createCourse, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    callState: ViewState.LOADED,
  })),

  on(courseActionTypes.editCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((courseObject) =>
      courseObject.id !== course.id ? courseObject : { ...course }
    ),
  })),

  on(courseActionTypes.deleteCourse, (state, { courseId }) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== courseId),
  }))
);
