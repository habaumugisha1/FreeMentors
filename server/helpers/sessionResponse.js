export default (sessionData) => ({
  sessionId: sessionData.id,
  menteeName: sessionData.menteeName,
  question: sessionData.question,
  menteeEmail: sessionData.menteeEmail,
  menteeId: sessionData.menteeId,
  mentorId: sessionData.mentorId,

});
