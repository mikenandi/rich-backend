CREATE TABLE users (
    id VARCHAR (255) PRIMARY KEY,
    fullname VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);