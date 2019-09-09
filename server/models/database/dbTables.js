export const Users = `

CREATE TABLE IF NOT EXISTS users(
id serial PRIMARY KEY,
firstname VARCHAR (50) NOT NULL,
lastname VARCHAR (50) NOT NULL,
email VARCHAR (100) NOT NULL,
password VARCHAR(255) NOT NULL,
address VARCHAR (20)  NULL,
bio VARCHAR(255)  NULL,
occupation VARCHAR(255) NULL,
expertise VARCHAR (255) NULL,
is_admin BOOLEAN NOT NULL DEFAULT false,
user_role VARCHAR (10) NOT NULL DEFAULT 'user',
created_on TIMESTAMP NOT NULL
)
`;
export const Session = `
CREATE TABLE IF NOT EXISTS sessions(
    id serial PRIMARY KEY,
    mentor_id INT NOT NULL,
    mentee_id INT NOT NULL,
    question VARCHAR (255) NOT NULL,
    status VARCHAR (20) NOT NULL DEFAULT 'pending',
    create_on TIMESTAMP NOT NULL,
    FOREIGN KEY (mentee_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)

`;
export const Reviews = `
CREATE TABLE IF NOT EXIST reviews(

    id serial PRIMARY KEY,
    session_id INT NOT NULL,
    mentee_id INT NOT NULL,
    mentor_id INT NOT NULL,
    score INT NOT NULL,
    mentee_name VARCHAR (50) NOT NULL,
    remark VARCHAR (255) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE ON UPDATE CASCADE

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
