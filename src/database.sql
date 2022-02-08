CREATE DATABASE UOL-userspanel-api


CREATE TABLE users_data(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_mail VARCHAR(255),
  user_document NUMBER(11),
  user_phone NUMBER(11),
  user_status VARCHAR(20) 
)
