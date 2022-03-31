import { TestBed } from '@angular/core/testing';
import { CreateCourseComponent } from './create-course.component';

describe('CoursesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCourseComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CreateCourseComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
