import { Request, Response } from 'express';
import { COURSES } from './db-data';

export let coursesKeyCounter = 10000;

export function createCourse(req: Request, res: Response) {
  console.log('Creating new course ...');

  const changes = req.body;

  const newCourse = {
    id: coursesKeyCounter,
    ...changes,
  };
  console.log(newCourse);
  console.log(COURSES[newCourse.id]);

  COURSES[newCourse.id] = newCourse;

  coursesKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newCourse);
  }, 500);
}
