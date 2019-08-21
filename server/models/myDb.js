export const Users = [
  {
    id: 1,
    firstname: 'munya',
    lastname: 'eugene',
    email: 'eu@gmail.com',
    password: 'webapp12',
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
    password: 'webapp12',
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
    mentorI: 2,
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
    score: 3,
    menteeFullName: 'munya eugene',
    remark: 'Was effective',
  },
];
