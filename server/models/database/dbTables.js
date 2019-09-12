export const Users = `

CREATE TABLE IF NOT EXISTS users(
id serial PRIMARY KEY,
firstName VARCHAR (50) NOT NULL,
lastName VARCHAR (50) NOT NULL,
email VARCHAR (100) NOT NULL,
password VARCHAR(255) NOT NULL,
address VARCHAR (20)  NULL,
bio VARCHAR(255)  NULL,
occupation VARCHAR(255) NULL,
expertise VARCHAR (255) NULL,
isAdmin BOOLEAN NOT NULL DEFAULT false,
userRole VARCHAR (10) NOT NULL DEFAULT 'user',
createdOn TIMESTAMP NOT NULL
)
`;
export const Session = `
CREATE TABLE IF NOT EXISTS sessions(
    id serial PRIMARY KEY,
    mentorId INT NOT NULL,
    menteeId INT NULL,
    mentorEmail VARCHAR(100) NOT NULL,
    menteeEmail VARCHAR(100) NOT NULL,
    menteeNames VARCHAR (100) NOT NULL,
    question VARCHAR (255) NOT NULL,
    status VARCHAR (20) NOT NULL DEFAULT 'pending',
    createdOn TIMESTAMP NOT NULL,
    FOREIGN KEY (menteeId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)

`;
export const Reviews = `
CREATE TABLE IF NOT EXISTS reviews(

    id serial PRIMARY KEY,
    sessionId INT NOT NULL,
    mentorId INT NOT NULL,
    menteeEmail VARCHAR (100) NOT NULL,
    score INT NOT NULL,
    remark VARCHAR (255) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE ON UPDATE CASCADE

)

`;

export const dropUserTable = `
DROP TABLE users
`;
export const dropSessionTable = `
DROP TABLE sessions
`;
export const dropReviewTable = `
DROP TABLE reviews
`;

export const deleteUserTable = `
DELETE FROM users
`;
export const deleteSessionTable = `
DELETE FROM sessions
`;
export const deleteReviewTable = `
DELETE FROM reviews
`;