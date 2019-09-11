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
export const isUserExist = `
SELECT * FROM users WHERE email=$1;
`;

export const specificMentor = `
SELECT * FROM users WHERE id=$1 AND userRole=$2;
`;
export const editUserProfileDb = `
UPDATE users SET address=$1,bio=$2,occupation=$3,expertise=$4 WHERE id=$5
`;
export const createSession = `
INSERT INTO sessions (mentorId,menteeEmail,mentorEmail,menteeNames,question,createdOn)
VALUES ($1,$2,$3,$4,$5,$6)
`;
export const getUserSessions = `
SELECT * FROM sessions WHERE menteeEmail=$1
`;
export const getMentorSessions = `
SELECT * FROM sessions WHERE mentorEmail=$1
`;

export const getAllSessions = `
SELECT * FROM sessions
`;
export const acceptRejectSession = `
UPDATE sessions SET status=$1 WHERE id=$2
`;
export const getSpecificSession = `
SELECT * FROM sessions WHERE id=$1
`;

export const reviewSession = `
INSERT INTO reviews (sessionId,mentorId,menteeEmail,score,remark,createdOn)
VALUES ($1,$2,$3,$4,$5,$6)
`;
export const getSpecificReview = `
SELECT * FROM reviews WHERE id=$1
`;
export const updateReview = `
UPDATE reviews SET remark=$1 WHERE id=$2
`;

export const adminDeleteReview = `
DELETE FROM reviews WHERE sessionId=$1
`;