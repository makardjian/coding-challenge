DROP DATABASE IF EXISTS epic_todo_list;

CREATE DATABASE IF NOT EXISTS epic_todo_list;

USE epic_todo_list;

CREATE TABLE groups (
  group_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  group_name VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  task_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  task_name VARCHAR(255) NOT NULL,
  completed_at DATE,
  dependency_count INT NOT NULL,
  group_id INT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE dependencies (
  dependency_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  pre_req_id INT NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks(task_id),
  FOREIGN KEY (pre_req_id) REFERENCES tasks(task_id)
);
