DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  user_id TEXT PRIMARY KEY NOT NULL,
  given_names TEXT,
  last_name TEXT,
  birth_date DATE,
  phone BIGINT,
  photo BYTEA
);

INSERT INTO users (user_id, given_names, last_name, birth_date, phone) VALUES ('xFv5nFhg74HjsolcjDeDDhhbvgcf08G9f4Xf1', 'Nori', 'Denes', '1/1/2000', 07123456789);

SELECT * FROM users;

DROP TABLE IF EXISTS requests cascade;

CREATE TABLE requests (
  request_id SERIAL PRIMARY KEY NOT NULL,
  rental_reference BOOLEAN,
  rental_arrears BOOLEAN,
  rental_history BOOLEAN,
  other_requests TEXT,
  email TEXT,
  street TEXT,
  town TEXT,
  postcode TEXT,
  time_stamp TIMESTAMP WITH TIME ZONE,
  user_id TEXT REFERENCES users (user_id)
);

INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES (TRUE, FALSE, FALSE, 'also some other report', 'hello@gmail.com', NULL, NULL, NULL, current_timestamp, 'xFv5nFhg74HjsolcjDeDDhhbvgcf08G9f4Xf1');

SELECT * FROM requests;

COMMIT;
