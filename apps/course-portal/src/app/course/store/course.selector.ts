import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Course } from '../model/course.model';
import { CourseState } from './course.reducers';

const getCourseFeatureState = createFeatureSelector<CourseState>('courses');

export const getAllCourses = createSelector(
  getCourseFeatureState,
  (state: CourseState): Course[] => state.courses
);

export const coursesLoadState = createSelector(
  getCourseFeatureState,
  (state) => state.callState
);

export const getCourseById = (courseId: number) =>
  createSelector(getCourseFeatureState, (state) => state.courses[courseId]);
