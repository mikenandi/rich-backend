CREATE TABLE task (
    id VARCHAR PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    assigned_to VARCHAR,
    status VARCHAR,
    deadline VARCHAR,
    event_id VARCHAR references event(id) on update cascade on delete cascade,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);