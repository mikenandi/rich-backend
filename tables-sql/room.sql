CREATE TABLE room (
    id VARCHAR(255),
    member_1 VARCHAR references users(id),
    member_2 VARCHAR references users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);