import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesListComponent } from './course/component/courses-list/courses-list.component';
import { CreateCourseComponent } from './course/component/create-course/create-course.component';

const routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
  },
  {path: 'create-course', component: CreateCourseComponent},
  {path: '**', redirectTo: 'courses'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
