BEGIN;

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  user_id TEXT PRIMARY KEY NOT NULL,
  given_names TEXT,
  family_name TEXT,
  birth_date DATE,
  phone_number TEXT,
  photo BYTEA,
  admin BOOLEAN
);

SELECT * FROM users;

DROP TABLE IF EXISTS requests cascade;

CREATE TABLE requests (
  request_id SERIAL PRIMARY KEY NOT NULL,
  status TEXT DEFAULT 'open',
  rental_reference BOOLEAN,
  rental_arrears BOOLEAN,
  rental_history BOOLEAN,
  other_requests TEXT,
  email TEXT,
  street TEXT,
  town TEXT,
  postcode TEXT,
  time_stamp TIMESTAMP WITH TIME ZONE,
  user_id TEXT  REFERENCES users (user_id),
  assigned_user_id TEXT REFERENCES users (user_id)
);

SELECT * FROM requests;

COMMIT;
