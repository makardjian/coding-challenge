DROP DATABASE IF EXISTS epic_todo_list;

CREATE DATABASE IF NOT EXISTS epic_todo_list;

USE epic_todo_list;

CREATE TABLE tasks (
  task_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task_name VARCHAR (50) NOT NULL,
  completed_at DATE,
  group_name VARCHAR(50) NOT NULL,
  dependencies VARCHAR(255),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
);

CREATE TABLE groups (
  group_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  group_name VARCHAR(50) NOT NULL,
);

-- //Reminder to create a dependcies table