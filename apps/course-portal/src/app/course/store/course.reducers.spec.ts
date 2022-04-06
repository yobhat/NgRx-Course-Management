import { ViewState } from '../model/call-state';
import { Course } from '../model/course.model';
import { courseActionTypes } from './course.actions';
import { courseReducer, CourseState, initialState } from './course.reducers';

describe('CourseReducer', () => {
  describe('Unknown action', () => {
    it('returns the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = courseReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('State update on courses actions', () => {
    const mockcoursesData: Course[] = [
      {
        id: 'CU40152',
        name: 'Angular PWA - Progressive Web Apps Course',
        description: 'Learn Angular Progressive Web Applications',
      },
      {
        id: 'CU12090',
        name: 'Rxjs and Reactive Patterns Angular Architecture Course',
        description: 'Learn the core RxJs Observable Pattern.',
      },
    ];

    const mockCourseState: CourseState = {
      courses: mockcoursesData,
      callState: ViewState.LOADED,
    };

    const newCourse = {
      id: 'CU86394',
      name: 'Eureka session',
      description: 'Session on NgRx',
    };

    it('updates the state in an immutable way when courseLoaded action is dispatched', () => {
      const action = courseActionTypes.coursesLoaded({
        courses: mockcoursesData,
      });
      const state = courseReducer(initialState, action);
      expect(state).toStrictEqual(mockCourseState);
      expect(state).not.toBe(mockCourseState);
    });
    it('updates the state in an immutable way when createCourse action is dispatched', () => {
      const action = courseActionTypes.createCourse({
        course: newCourse,
      });
      const state = courseReducer(mockCourseState, action);
      const expectedCourseStateAfterCreate = {
        ...mockCourseState,
        courses: [...mockCourseState.courses, newCourse],
      };
      expect(state).toStrictEqual(expectedCourseStateAfterCreate);
      expect(state).not.toBe(expectedCourseStateAfterCreate);
    });
    it('updates the state in an immutable way when editCourseSuccess action is dispatched', () => {
      const editedCourse = {
        id: 'CU86394',
        name: 'Updated Eureka session',
        description: 'Updated Session on NgRx',
      };

      const courseStateBeforeUpdate = {
        ...mockCourseState,
        courses: [...mockCourseState.courses, newCourse],
      };

      const action = courseActionTypes.editCourseSuccess({
        course: editedCourse,
      });

      const state = courseReducer(courseStateBeforeUpdate, action);

      const expectedCourseStateAfterUpdate = {
        ...mockCourseState,
        courses: [...mockCourseState.courses, editedCourse],
      };

      expect(state).toStrictEqual(expectedCourseStateAfterUpdate);
      expect(state).not.toBe(expectedCourseStateAfterUpdate);
    });

    it('updates the state in an immutable way when coursesLoadFailure action is dispatched', () => {
      const stateAfterAPIFailure: CourseState = {
        courses: [],
        callState: ViewState.ERROR,
      };
      const action = courseActionTypes.coursesLoadFailure({
        error: {
          code: '404',
          message: 'Resource not found',
        },
      });
      const state = courseReducer(initialState, action);
      expect(state).toStrictEqual(stateAfterAPIFailure);
      expect(state).not.toBe(stateAfterAPIFailure);
    });
  });
});
