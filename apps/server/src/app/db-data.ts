
export const COURSES: unknown = {

  58292: {
    id: 58292,
    name: 'NgRx (with NgRx Data) - The Complete Guide',
    description: 'Learn the modern Ngrx Ecosystem, including NgRx Data, Store, Effects, Router Store, Ngrx Entity, and Dev Tools.',
  },

  41093: {
    id: 41093,
    name: 'Angular Core Deep Dive',
    description: 'A detailed walk-through of the most important part of Angular - the Core and Common modules',
  },

  86440: {
    id: 86440,
    name: 'RxJs In Practice Course',
    description: 'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples',
  },

  11176: {
    id: 11176,
    name: 'Serverless Angular with Firebase Course',
    description: 'Serveless Angular with Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire',
  },


  72674: {
    id: 72674,
    name: 'Angular for Beginners',
    description: "Establish a solid layer of fundamentals, learn what's under the hood of Angular",
  },

  38965: {
    id: 38965,
    name: 'Angular Security Course - Web Security Fundamentals',
    description: 'Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.',
  },

  40152: {
    id: 40152,
    name: 'Angular PWA - Progressive Web Apps Course',
    description: 'Learn Angular Progressive Web Applications, build the future of the Web Today.',
  },

  12090: {
    id: 12090,
    name: 'Rxjs and Reactive Patterns Angular Architecture Course',
    description: 'Learn the core RxJs Observable Pattern as well and many other Design Patterns for building Reactive Angular Applications.',
  },

  569400: {
    id: 569400,
    name: 'Angular Material Course',
    description: 'Build Applications with the official Angular Widget Library'
  }

};



export function findCourseById(courseId: number) {
  return COURSES[courseId];
}
