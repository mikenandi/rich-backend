CREATE TABLE vendor (
    id VARCHAR (255) PRIMARY KEY,
    user_id VARCHAR (255) REFERENCES users(id) On update cascade on delete cascade,
    service VARCHAR (255),
    first_package_price VARCHAR (255),
    first_package_description VARCHAR (255),
    second_package_price VARCHAR (255),
    second_package_description VARCHAR (255),
    phone_number VARCHAR (255),
    bussiness_name VARCHAR (255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);