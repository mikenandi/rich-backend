CREATE TABLE message (
    id VARCHAR (255) PRIMARY KEY,
    message VARCHAR,
    from_user_id VARCHAR (255) NOT NULL,
    to_user_id VARCHAR (255) NOT NULL,
    status VARCHAR (40),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);