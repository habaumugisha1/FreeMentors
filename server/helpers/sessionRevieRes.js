import { Reviews } from '../models/myDb';

export default (session) => ({
  question: session.question,
  menteeEmail: session.menteeEmail,
  status: session.status,
  review: Reviews.filter((review) => review.sessionId === session.id),
});
