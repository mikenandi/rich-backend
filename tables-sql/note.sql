CREATE TABLE note (
    id VARCHAR PRIMARY KEY,
    subject VARCHAR,
    content VARCHAR,
    event_id VARCHAR REFERENCES event(id) on update cascade on delete cascade,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);