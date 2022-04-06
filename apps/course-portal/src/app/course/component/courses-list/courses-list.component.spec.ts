// describe('CoursesListComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CoursesListComponent],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(CoursesListComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });

import { CoursesListComponent } from './courses-list.component';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { courseActionTypes } from '../../store/course.actions';
import { ViewState } from '../../model/call-state';
import { coursesLoadState, getAllCourses } from '../../store/course.selector';
import { CourseState } from '../../store/course.reducers';
import { Course } from '../../model/course.model';
import { CourseModule } from '../../course.module';

describe('CoursesListComponent', () => {
  const mockcoursesData = [
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

  async function setup({
    viewState = ViewState.LOADED,
    courses = mockcoursesData,
  } = {}) {
    const initialState = {
      callState: ViewState.INIT,
      courses: [],
    };

    const { fixture } = await render(CoursesListComponent, {
      imports: [FormsModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getAllCourses,
              value: courses,
            },
            {
              selector: coursesLoadState,
              value: viewState,
            },
          ],
        }),
      ],
    });

    const mockStore = TestBed.inject(MockStore);
    mockStore.dispatch = jest.fn();

    return {
      fixture,
      mockStore,
      initialState,
      dispatchSpy: mockStore.dispatch,
    };
  }

  describe('renders the correct pages in success flow', () => {
    it('displays the course table view', async () => {
      await setup();

      const table = screen.getByTestId('courseTableView');
      expect(table).toBeInTheDocument();
    });

    it('displays the modal to edit a course', async () => {
      const { dispatchSpy } = await setup();
      const editCourseButton = screen.getByTestId(
        'courseTableUpdateActionButton-1'
      );
      fireEvent.click(editCourseButton);
      expect(screen.getByTestId('courseUpdateModal')).toBeInTheDocument();

      expect(dispatchSpy).toHaveBeenCalledWith(
        courseActionTypes.openEditCourse()
      );
    });

    it('dipatches the action to delete a course', async () => {
      const { dispatchSpy } = await setup();
      const deleteCourseButton = screen.getByTestId(
        'courseTableDeleteActionButton-1'
      );
      fireEvent.click(deleteCourseButton);

      expect(dispatchSpy).toHaveBeenCalledWith(
        courseActionTypes.deleteCourse({ courseId: mockcoursesData[1].id })
      );
    });
  });

  describe('renders the correct pages in loading flow', () => {
    it('displays the course table view', async () => {
      await setup({ viewState: ViewState.LOADING });

      expect(screen.getByTestId('courseListLoader')).toBeInTheDocument();
      expect(screen.queryByTestId('courseTableView')).not.toBeInTheDocument();
    });
  });
  describe('renders the correct pages in error flow', () => {
    it('displays the course table view', async () => {
      await setup({ viewState: ViewState.ERROR });

      expect(screen.getByTestId('courseListErrorAlert')).toBeInTheDocument();
      expect(screen.queryByTestId('courseTableView')).not.toBeInTheDocument();
    });
  });
});
