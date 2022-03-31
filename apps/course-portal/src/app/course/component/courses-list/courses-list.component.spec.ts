import { TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';

describe('CoursesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CoursesListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
