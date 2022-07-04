CREATE TABLE guest (
    id VARCHAR PRIMARY KEY,
    fullname VARCHAR ,
    email VARCHAR ,
    event_id VARCHAR REFERENCES event(id) on update cascade on delete cascade,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);