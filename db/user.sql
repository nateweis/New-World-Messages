DROP DATABASE IF EXISTS chat_app;
CREATE DATABASE chat_app;

\c chat_app;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(32),
  password VARCHAR(32),
  pic TEXT
);

INSERT INTO users (username, password, pic) VALUES('Nate','1234','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3fMBG8wXUQwn9RaAq_XfkCCl-gdYwiXbghImsfdojEgHOP8RQUg');
INSERT INTO users (username, password, pic) VALUES('guy','1234','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpStVexpA7JHGGkSAitSFCF5_L-ZNoTyzIoFPjQJjZIvnALfbQ3w');
