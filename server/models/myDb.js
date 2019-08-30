export const Users = [
  {
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
    isAdmin: true,
  },
  {
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
    isAdmin: false,
  },
  {
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
    isAdmin: false,
  },
];
export const Sessions = [
  {
    id: 1,
    mentorId: 1,
    menteeId: 2,
    question: 'leardership help is needed',
    menteeEmail: 'mu@gmail.com',
    status: 'pending',
  },
];

export const Reviews = [

  {
    id: 1,
    sessionId: 1,
    menteeId: 2,
    mentorId: 1,
    score: 3,
    menteeFullName: 'munya eugene',
    remark: 'Was effective',
  },
];