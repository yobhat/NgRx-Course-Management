import { Router } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Action } from '@ngrx/store';
import { createSpyFromClass, Spy } from 'jest-auto-spies';
import { of, ReplaySubject, throwError } from 'rxjs';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';
import { courseActionTypes } from './course.actions';
import { CourseEffects } from './course.effects';

describe('CourseEffects', () => {
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

  const setup = (
    courseDataError: { code: string; statusText: string } | undefined,
    courseData = mockcoursesData,
    courseTobeUpdated?: Course
  ) => {
    const mockCourseService: Spy<CourseService> =
      createSpyFromClass(CourseService);
    mockCourseService.getAllCourses.mockReturnValue(
      courseDataError ? throwError(() => courseDataError) : of(courseData)
    );
    mockCourseService.updateCourse.mockReturnValue(
      courseDataError
        ? throwError(() => courseDataError)
        : of(courseTobeUpdated)
    );

    const actions = new ReplaySubject<Action>(1);
    const router = createSpyFromClass(Router);

    const effects = new CourseEffects(mockCourseService, actions, router);

    return { effects, actions, mockCourseService };
  };

  it('triggers coursesLoaded action on a successful course data API call', () => {
    const { effects, actions } = setup(undefined);
    actions.next(courseActionTypes.loadCourses());

    const effectSpy = subscribeSpyTo(effects.loadCourses$);
    expect(effectSpy.getLastValue()).toStrictEqual(
      courseActionTypes.coursesLoaded({
        courses: mockcoursesData,
      })
    );
  });
  it('triggers coursesLoadFailure action on a failed course data API call', () => {
    const mockError = {
      code: '404',
      statusText: 'Resource not found',
    };
    const { effects, actions } = setup(mockError);
    actions.next(courseActionTypes.loadCourses());

    const effectSpy = subscribeSpyTo(effects.loadCourses$);
    expect(effectSpy.getLastValue()).toStrictEqual(
      courseActionTypes.coursesLoadFailure({
        error: mockError.statusText,
      })
    );
  });

  it('triggers editCourseSuccess action on a successful update course API call', () => {
    const courseTobeUpdated = {
      id: 'CU40152',
      name: 'Updated Angular PWA Course',
      description: 'Updated Learn Angular Progressive Web Applications',
    };
    const { effects, actions } = setup(undefined, undefined, courseTobeUpdated);
    actions.next(
      courseActionTypes.editCourse({
        course: courseTobeUpdated,
      })
    );

    const effectSpy = subscribeSpyTo(effects.editCourse$);
    expect(effectSpy.getLastValue()).toStrictEqual(
      courseActionTypes.editCourseSuccess({
        course: courseTobeUpdated,
      })
    );
  });
});
