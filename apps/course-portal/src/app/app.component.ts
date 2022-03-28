import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'course-management-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Course-Portal';

  constructor(private readonly store: Store) { }

  clearCourses() {
    // this.store.dispatch(courseActionTypes.clearCourses())
  }
}
