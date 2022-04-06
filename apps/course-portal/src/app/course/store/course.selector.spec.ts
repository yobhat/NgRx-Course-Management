import { ViewState } from '../model/call-state';
import { Course } from '../model/course.model';
import { CourseState } from './course.reducers';
import * as courseSelectors from './course.selector';

describe('Course Selectors', () => {
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
  it('selects all courses', () => {
    const result = courseSelectors.getAllCourses.projector(mockCourseState);

    expect(result).toStrictEqual(mockcoursesData);
    expect(result[1].id).toStrictEqual('CU12090');
  });
  it('selects the courses load state', () => {
    const result = courseSelectors.coursesLoadState.projector(mockCourseState);

    expect(result).toStrictEqual(ViewState.LOADED);
  });
});
