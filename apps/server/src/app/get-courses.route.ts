import { Request, Response } from 'express';
import { COURSES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data ...');

  setTimeout(() => {
    res.status(200).json({ payload: Object.values(COURSES) });
  }, 1000);
}
