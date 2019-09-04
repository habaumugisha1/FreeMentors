import { Reviews } from '../models/myDb';
import reviewResponse from './reviewResponse';

export default (session) => ({
  question: session.question,
  status: session.status,
  menteeEmail: session.menteeEmail,
  review: reviewResponse(Reviews.find((review) => review.sessionId === session.id)),
});
