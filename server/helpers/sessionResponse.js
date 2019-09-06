export default (sessionData) => ({
  sessionId: sessionData.id,
  menteeName: sessionData.menteeName,
  question: sessionData.question,
  menteeEmail: sessionData.menteeEmail,
  status: sessionData.status,
  menteeId: sessionData.menteeId,

});
