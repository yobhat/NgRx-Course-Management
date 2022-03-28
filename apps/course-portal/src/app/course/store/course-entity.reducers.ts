import { Course } from '../model/course.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { courseActionTypes } from './course.actions';

export interface CourseState extends EntityState<Course> {
  coursesLoaded: boolean;
}


export function sortByCategory(course1: Course, course2: Course): number {
  return course1.name.localeCompare(course2.name);
}

export const courseAdapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  // selectId: (dataset: Course) => dataset.id,
   sortComparer: sortByCategory
});

export const initialState: CourseState = courseAdapter.getInitialState({
  coursesLoaded: false,
});

export const courseReducer = createReducer(
  initialState,

  on(courseActionTypes.coursesLoaded, (state, {courses}) => {
    return courseAdapter.addMany(
      courses,
      {...state, coursesLoaded: true}
    );
  }),

  on(courseActionTypes.createCourse, (state, {course}) => {
    return courseAdapter.addOne(course, {...state});
  }),

  on(courseActionTypes.deleteCourse, (state, action) => (
    courseAdapter.removeOne(action.courseId, {...state})
  )),

  on(courseActionTypes.updateCourse, (state, action) => {
    return courseAdapter.updateOne(action.update, {...state});
  })
);

export const { selectAll, selectIds } = courseAdapter.getSelectors();

