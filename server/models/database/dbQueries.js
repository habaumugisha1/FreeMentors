export const SignUpUser = `
INSERT INTO users (firstName,lastName,email,password,createdOn)
VALUES ($1,$2,$3,$4,$5)
`;

export const signIn = `
SELECT * FROM users WHERE email=$1;
`;
export const changeUserTomentor = `
UPDATE users SET user_role=$1 WHERE id=$2
`;
export const allSameUsers = `
SELECT * FROM users WHERE user_role=$1;
`;
export const specificUser = `
SELECT * FROM users WHERE id=$1 AND user_role=$2;
`;
export const createSession = `
INSERT INTO sessions (mentor_id,mentee_id,questions,mentee_email,status,created_on)
VALUES ($1,$2,$3,$4,$6)
`;
export const getUserSessions = `
SELECT * FROM sessions WHERE mentee_id=$1
`;
export const getMentorSessions = `
SELECT * FROM sessions WHERE mentor_id=$1
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
INSERT INTO reviews (session_id,mentor_id,mentee_id,mentee_name,score,remark,created_on)
VALUES ($1,$2,$3,$4,$5,$6)
`;

export const deleteReview = `
DELETE reviews WHERE session_id=$1
`;
