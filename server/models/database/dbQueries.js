export const SignUpUser = `
INSERT INTO users (firstName,lastName,email,password,createdOn)
VALUES ($1,$2,$3,$4,$5)
`;

export const signInUserDb = `
SELECT * FROM users WHERE email=$1;
`;
export const changeUserTomentor = `
UPDATE users SET userRole=$1 WHERE id=$2
`;
export const allSameUsers = `
SELECT * FROM users WHERE userRole=$1;
`;
export const specificUser = `
SELECT * FROM users WHERE id=$1;
`;
export const editUserProfileDb = `
UPDATE users SET address=$1,bio=$2,occupation=$3,expertise=$4 WHERE id=$4
`;
export const createSession = `
INSERT INTO sessions (mentor_id,menteeId,questions,menteeEmail,status,createdOn)
VALUES ($1,$2,$3,$4,$6)
`;
export const getUserSessions = `
SELECT * FROM sessions WHERE menteeId=$1
`;
export const getMentorSessions = `
SELECT * FROM sessions WHERE mentorId=$1
`;

export const getAllSessions = `
SELECT * FROM sessions
`;
export const acceptRejectSession = `
UPDATE sessions SET status=$1 WHERE id=$
`;
export const getSpecificSession = `
SELECT * FROM session WHERE id=$1
`;

export const reviewSession = `
INSERT INTO reviews (sessionId,mentorId,menteeId,menteeName,score,remark,createdOn)
VALUES ($1,$2,$3,$4,$5,$6)
`;

export const deleteReview = `
DELETE reviews WHERE sessionId=$1
`;
