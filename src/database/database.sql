CREATE TABLE users_data(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_mail VARCHAR(255),
  user_document VARCHAR(11),
  user_phone VARCHAR(11),
  user_status VARCHAR(20),
  is_deleted  BOOLEAN  DEFAULT NULL
)