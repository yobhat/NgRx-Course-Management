import { CourseState } from './course-entity.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './course-entity.reducers';

export const courseFeatureSelector = createFeatureSelector<CourseState>('courses');

export const getAllCourses = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getAllCourseIds = createSelector(
  courseFeatureSelector,
  selectIds
);

export const areCoursesLoaded = createSelector(
  courseFeatureSelector,
  state => state.coursesLoaded
);
