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
    firstname: 'rugaba',
    lastname: 'fibe',
    email: 'rugaf@gmail.com',
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
  {
    id: 4,
    firstname: 'remera',
    lastname: 'kaka',
    email: 'remerak@gmail.com',
    password: '$2b$09$s3fW6DAEdHFWVqgbZBzaSuC7m9EAHZNhtitbXR74dqRzYyXUu2TUG',
    address: 'kigali,rwanda',
    bio: 'leoum epasum',
    occupation: 'minister',
    expertise: 'leadership',
    user_role: 'mentor',
    isAdmin: false,
  },
];
export const Sessions = [
  {
    id: 1,
    category: 'Leadership',
    mentorId: 3,
    menteeId: 2,
    mentorName: 'rujugiro Gilbert',
    enteeName: 'kayiranga Tony',
    question: 'leardership help is needed',
    menteeEmail: 'mu@gmail.com',
    status: 'pending',
  },
  {
    id: 2,
    type: 'management',
    mentorId: 3,
    menteeId: 3,
    mentorName: ' Peter kayinerugaba',
    enteeName: 'paul baguma',
    question: 'Time management help is needed',
    menteeEmail: 'furahac@gmail.com',
    status: 'accepted',
  },
  {
    id: 3,
    type: 'sport',
    mentorId: 3,
    menteeId: 2,
    mentorName: ' Peter kayinerugaba',
    enteeName: 'paul baguma',
    question: 'Time management help is needed',
    menteeEmail: 'furahac@gmail.com',
    status: 'rejected',
  },
  {
    id: 4,
    type: 'relationship',
    mentorId: 4,
    menteeId: 2,
    mentorName: ' Peter kayinerugaba',
    enteeName: 'paul baguma',
    question: 'relationship build help is needed',
    menteeEmail: 'furahac@gmail.com',
    status: 'accepted',
  },
];

export const Reviews = [

  {
    id: 1,
    sessionId: 1,
    mentorId: 1,
    menteeId: 2,
    score: 3,
    menteeFullName: 'munya eugene',
    remark: 'Was effective and awesome',
  },
];
