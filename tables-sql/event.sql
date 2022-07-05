CREATE TABLE event (
    id VARCHAR PRIMARY KEY,
    title VARCHAR ,
    location VARCHAR ,
    date_of_event VARCHAR ,
    user_id  VARCHAR REFERENCES users(id) on update cascade on delete cascade,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);