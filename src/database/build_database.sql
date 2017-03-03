DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE,
  phone BIGINT,
  photo BYTEA
);

INSERT INTO users (first_name, last_name, birth_date, phone) VALUES ('Lucy', 'Monie', '1/1/2000', 07123456789);

SELECT * FROM users;

DROP TABLE IF EXISTS requests cascade;

CREATE TABLE requests (
  request_id SERIAL PRIMARY KEY NOT NULL,
  rental_reference BOOLEAN,
  rental_arrears BOOLEAN,
  rental_history BOOLEAN,
  other_requests TEXT,
  email TEXT UNIQUE,
  address TEXT,
  time_stamp TIMESTAMP WITH TIME ZONE,
  user_id SERIAL REFERENCES users (user_id)
);

INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, address, time_stamp, user_id) VALUES (TRUE, FALSE, FALSE, 'also some other report', 'hello@gmail.com', NULL, current_timestamp, 1);

SELECT * FROM requests;

COMMIT;
