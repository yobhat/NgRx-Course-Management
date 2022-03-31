export const COURSES: unknown = {
  CU58292: {
    id: 'CU58292',
    name: 'NgRx (with NgRx Data) - The Complete Guide',
    description:
      'Learn the modern Ngrx Ecosystem, including NgRx Data, Store, Effects, Router Store, Ngrx Entity, and Dev Tools.',
  },

  CU41093: {
    id: 'CU41093',
    name: 'Angular Core Deep Dive',
    description:
      'A detailed walk-through of the most important part of Angular - the Core and Common modules',
  },

  CU86440: {
    id: 'CU86440',
    name: 'RxJs In Practice Course',
    description:
      'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples',
  },

  CU11176: {
    id: 'CU11176',
    name: 'Serverless Angular with Firebase Course',
    description:
      'Serveless Angular with Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire',
  },

  CU72674: {
    id: 'CU72674',
    name: 'Angular for Beginners',
    description:
      "Establish a solid layer of fundamentals, learn what's under the hood of Angular",
  },

  CU38965: {
    id: 'CU38965',
    name: 'Angular Security Course - Web Security Fundamentals',
    description:
      'Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.',
  },

  CU40152: {
    id: 'CU40152',
    name: 'Angular PWA - Progressive Web Apps Course',
    description:
      'Learn Angular Progressive Web Applications, build the future of the Web Today.',
  },

  CU12090: {
    id: 'CU12090',
    name: 'Rxjs and Reactive Patterns Angular Architecture Course',
    description:
      'Learn the core RxJs Observable Pattern as well and many other Design Patterns for building Reactive Angular Applications.',
  },

  CU569400: {
    id: 'CU69400',
    name: 'Angular Material Course',
    description: 'Build Applications with the official Angular Widget Library',
  },
};

export function findCourseById(courseId: string) {
  return COURSES[courseId];
}
