import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducers';

const getCourseFeatureState = createFeatureSelector<CourseState>('courses');

export const getAllCourses = createSelector(
  getCourseFeatureState,
  (state: CourseState) => state.courses
);

export const coursesLoadState = createSelector(
  getCourseFeatureState,
  (state) => state.callState
);

export const getCourseById = (courseId: number) =>
  createSelector(getCourseFeatureState, (state) => state.courses[courseId]);
