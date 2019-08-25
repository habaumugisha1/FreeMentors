"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reviews = exports.Sessions = exports.Users = void 0;
var Users = [{
  id: 1,
  firstname: 'munya',
  lastname: 'eugene',
  email: 'eu@gmail.com',
  password: '$2b$09$s3fW6DAEdHFWVqgbZBzaSuC7m9EAHZNhtitbXR74dqRzYyXUu2TUG',
  address: 'kigali,rwanda',
  bio: 'leoum epasum',
  occupation: 'minister',
  expertise: 'leadership',
  user_role: 'admin',
  isAdmin: true
}, {
  id: 2,
  firstname: 'munya',
  lastname: 'eugene',
  email: 'mu@gmail.com',
  password: '$2b$09$s3fW6DAEdHFWVqgbZBzaSuC7m9EAHZNhtitbXR74dqRzYyXUu2TUG',
  address: 'kigali,rwanda',
  bio: 'leoum epasum',
  occupation: 'minister',
  expertise: 'leadership',
  user_role: 'user',
  isAdmin: false
}, {
  id: 3,
  firstname: 'Kasirye',
  lastname: 'james',
  email: 'ksj@gmail.com',
  password: '$2b$09$s3fW6DAEdHFWVqgbZBzaSuC7m9EAHZNhtitbXR74dqRzYyXUu2TUG',
  address: 'kampala,ouganda',
  bio: 'leoum epasum',
  occupation: 'minister',
  expertise: 'team lead',
  user_role: 'mentor',
  isAdmin: false
}];
exports.Users = Users;
var Sessions = [{
  id: 1,
  mentorId: 1,
  menteeId: 2,
  question: 'leardership help is needed',
  menteeEmail: 'mu@gmail.com',
  status: 'pending'
}];
exports.Sessions = Sessions;
var Reviews = [{
  id: 1,
  sessionId: 3,
  menteeId: 2,
  score: 3,
  menteeFullName: 'munya eugene',
  remark: 'Was effective'
}];
exports.Reviews = Reviews;