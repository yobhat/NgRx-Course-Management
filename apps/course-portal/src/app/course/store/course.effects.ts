import { courseActionTypes } from './course.actions';
import { CourseService } from './../services/course.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course.model';
import { Update } from '@ngrx/entity';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  /**
   * loadCourses$ observable listens to courseActionTypes.loadCourses,
   * and if the action is dispatched, it calls the courseService as a side effect
   * and dispatches the action courseActionTypes.coursesLoaded
   */
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.loadCourses),
      concatMap(() => {
        return this.courseService.getAllCourses().pipe(
          map((courses: Course[]) => {
            return courseActionTypes.coursesLoaded({
              courses,
            });
          }),
          catchError((error: any) => {
            return of(
              courseActionTypes.coursesLoadFailure({
                error: error?.statusText,
              })
            );
          })
        );
      })
    )
  );

  createCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(courseActionTypes.createCourse),
        concatMap((action) => this.courseService.createCourse(action.course)),
        tap(() => this.router.navigateByUrl('/courses'))
      ),
    { dispatch: false }
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.editCourse),
      concatMap(({ course }) => {
        return this.courseService.updateCourse(course.id, course).pipe(
          map((course: Course) => {
            return courseActionTypes.editCourseSuccess({
              course,
            });
          })
        );
      })
    )
  );

  deleteCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(courseActionTypes.deleteCourse),
        concatMap((action) => this.courseService.deleteCourse(action.courseId))
      ),
    { dispatch: false }
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap((action) => {
        return this.courseService
          .updateCourse(action.update.id as string, action.update.changes)
          .pipe(
            map((course) => {
              const update: Update<Course> = {
                id: course.id,
                changes: {
                  ...course,
                },
              };
              return courseActionTypes.updateCourseSuccess({
                update,
              });
            })
          );
      })
    )
  );

  constructor(
    private courseService: CourseService,
    private actions$: Actions,
    private router: Router
  ) {}
}
