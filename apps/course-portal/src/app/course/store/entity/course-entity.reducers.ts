import { Course } from '../../model/course.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ViewState } from '../../model/call-state';
import { courseActionTypes } from '../course.actions';

export const COURSES_REDUCER_FEATURE_KEY = 'courses';

export interface CourseState extends EntityState<Course> {
  callState?: ViewState;
}

export function sortByCategory(course1: Course, course2: Course): number {
  return course1.name.localeCompare(course2.name);
}

export const courseAdapter: EntityAdapter<Course> = createEntityAdapter<Course>(
  {
    // selectId: (dataset: Course) => dataset.id,
    sortComparer: sortByCategory,
  }
);

export const initialState: CourseState = courseAdapter.getInitialState({
  coursesLoaded: false,
});

export const courseReducer = createReducer(
  initialState,

  on(courseActionTypes.loadCourses, (state) => ({
    ...state,
    callState: ViewState.LOADING,
  })),

  on(courseActionTypes.coursesLoaded, (state, { courses }) => {
    return courseAdapter.addMany(courses, {
      ...state,
      callState: ViewState.LOADED,
    });
  }),

  on(courseActionTypes.coursesLoadFailure, (state) =>
    courseAdapter.removeAll({ ...state })
  ),

  on(courseActionTypes.createCourse, (state, { course }) => {
    return courseAdapter.addOne(course, { ...state });
  }),

  on(courseActionTypes.deleteCourse, (state, action) =>
    courseAdapter.removeOne(action.courseId, { ...state })
  ),

  on(courseActionTypes.updateCourseSuccess, (state, action) => {
    return courseAdapter.updateOne(action.update, { ...state });
  })
);

export const { selectAll, selectIds } = courseAdapter.getSelectors();
