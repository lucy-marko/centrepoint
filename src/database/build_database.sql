DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL,
  given_names TEXT,
  family_name TEXT,
  birth_date DATE,
  phone_number BIGINT,
  photo BYTEA,
  admin BOOLEAN
);

INSERT INTO users (id, given_names, family_name, birth_date, phone_number, admin) VALUES ('lcvRLw3ApxSJ4JbDJ7WRVQ/k1sMMy1vQlZJ/wBFAyJd5Ipii2mUNb3iPniBkB6YF', 'LUCY EMILY', 'MONIE', '1974-07-11', 447814560628, true);
INSERT INTO users (id, given_names, family_name, birth_date, phone_number, admin) VALUES ('Re5xYlrYsu8ctaxPN2g7zZYGHSKOHotA6UYABPmadPvMaPs3ssziv0iEBd75zfi2', 'MARKO', 'SUSTARSIC', '1988-02-21', 447811110722, true);
INSERT INTO users (id, given_names, family_name, birth_date, phone_number, admin) VALUES ('Ve3xGlcu1u4ctazP02g8zZwGHM4ObotSfIYAXZzat4vBak2cfvz2m0iEBbrng79s', 'AIDAN', 'HUSSAIN', '1992-06-26', 447731154914, false);
INSERT INTO users (id, given_names, family_name, birth_date, phone_number, admin) VALUES ('Tggcgrfj6jb883btbgjdkdmhJH7Tr3Dcv6mMhgmadPvMaPs3ssbdgTTh75330Mdc', 'CAITLIN', 'JONES', '1996-11-29', 4407081725208, false);
INSERT INTO users (id, given_names, family_name, birth_date, phone_number, admin) VALUES ('f6gxYlrktg9h4h3f6uc7zZYGHSKOHotA6PB887hRRft6NGmMt45c67G8iv0df5n6', 'SEAN', 'WEBB', '1994-10-10', 447839215014, false);


SELECT * FROM users;

DROP TABLE IF EXISTS requests cascade;

CREATE TABLE requests (
  id SERIAL PRIMARY KEY NOT NULL,
  rental_reference BOOLEAN,
  rental_arrears BOOLEAN,
  rental_history BOOLEAN,
  other_requests TEXT,
  email TEXT,
  street TEXT,
  town TEXT,
  postcode TEXT,
  time_stamp TIMESTAMP WITH TIME ZONE,
  user_id TEXT REFERENCES users (id)
);

INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES (FALSE, TRUE, TRUE, '', 'AidanHussain@rhyta.com', NULL, NULL, NULL, current_timestamp, 'Ve3xGlcu1u4ctazP02g8zZwGHM4ObotSfIYAXZzat4vBak2cfvz2m0iEBbrng79s');

INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES (TRUE, TRUE, FALSE, '', 'hello@gmail.com', '45 Canterbury Road', 'Uton', 'BB3 6AD', current_timestamp, 'Tggcgrfj6jb883btbgjdkdmhJH7Tr3Dcv6mMhgmadPvMaPs3ssbdgTTh75330Mdc');

INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES (FALSE, FALSE, FALSE, 'I want to join the point but the form isnt working', 'seanwev94@rhyta.com', NULL, NULL, NULL, current_timestamp, 'f6gxYlrktg9h4h3f6uc7zZYGHSKOHotA6PB887hRRft6NGmMt45c67G8iv0df5n6');


SELECT * FROM requests;

COMMIT;
