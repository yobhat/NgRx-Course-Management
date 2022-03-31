import * as express from 'express';
import { Application } from 'express';

import bodyParser = require('body-parser');
import { saveCourse } from './app/save-course.route';
import { createCourse } from './app/create-course.route';
import { deleteCourse } from './app/delete-course.route';
import { getAllCourses } from './app/get-courses.route';

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);

app.route('/api/course').post(createCourse);

app.route('/api/course/:id').put(saveCourse);

app.route('/api/course/:id').delete(deleteCourse);

const httpServer: any = app.listen(3333, () => {
  console.log(
    'HTTP REST API Server running at http://localhost:' +
      httpServer.address().port
  );
});
