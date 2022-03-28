/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { createCourse } from './app/create-course.route';
import { deleteCourse } from './app/delete-course.route';
import { getAllCourses, getCourseByUrl } from './app/get-courses.route';
import { saveCourse } from './app/save-course.route';


const app = express();

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to server!' });
// });

app.route('/api/courses').get(getAllCourses);

app.route('/api/course').post(createCourse);

app.route('/api/course/:id').put(saveCourse);

app.route('/api/course/:id').delete(deleteCourse);

app.route('/api/courses/:courseUrl').get(getCourseByUrl);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
