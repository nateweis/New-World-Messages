DROP DATABASE IF EXISTS chat_app;
CREATE DATABASE chat_app;

\c chat_app;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(32),
  password TEXT,
  current_room INT,
  email VARCHAR(50),
  pic TEXT
);

CREATE TABLE contacts (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(32),
  user_id INT,
  contact_id INT,
  pic TEXT
);

CREATE TABLE chats(
  id SERIAL PRIMARY KEY,
  chat VARCHAR (32)
);

CREATE TABLE chat_users(
  user_id INT,
  admin BOOL,
  chat_id INT
);

CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  chat_id INT,
  user_id INT,
  sender VARCHAR(32),
  message TEXT
);

INSERT INTO users (username, password, pic) VALUES('Nate','1234','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3fMBG8wXUQwn9RaAq_XfkCCl-gdYwiXbghImsfdojEgHOP8RQUg');
INSERT INTO users (username, password, pic) VALUES('guy','1234','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpStVexpA7JHGGkSAitSFCF5_L-ZNoTyzIoFPjQJjZIvnALfbQ3w');
