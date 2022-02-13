CREATE DATABASE UOL-userspanel-api

CREATE TABLE users_data(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_mail VARCHAR(255) UNIQUE NOT NULL,
  user_document VARCHAR(11) NOT NULL,
  user_phone VARCHAR(11) NOT NULL,
  user_status VARCHAR(20) NOT NULL 
) 