-- SQLite schema
-- Foreign key enforcement must be enabled per connection in SQLite (it is OFF by default).
PRAGMA foreign_keys = ON;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT
);

CREATE TABLE status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE task (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  created DATETIME NOT NULL,
  updated DATETIME NOT NULL,
  due_date DATETIME,
  status_id INTEGER NOT NULL,
  FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_task (
  user_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  PRIMARY KEY(user_id, task_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Statuses
INSERT INTO status (name) VALUES 
('Not started'),
('In progress'),
('Done');

-- Users
INSERT INTO user (name, email, phone) VALUES
('Aarika Ellingworth', 'aellingworth0@harvard.edu', '483-396-8795'),
('Pren Goldsworthy', 'pgoldsworthy1@spotify.com', '635-572-8467'),
('Pablo Kisbee', 'pkisbee2@lulu.com', '790-962-8683'),
('Rodie Duncan', 'rduncan3@quantcast.com', '646-743-6191'),
('Aubry Polak', 'apolak4@indiatimes.com', '302-678-7931'),
('Maryrose Meadows', 'mmeadows5@comcast.net', '251-524-6594'),
('Pavel Brushneen', 'pbrushneen6@techcrunch.com', '316-170-3640'),
('Hedy Gerault', 'hgerault7@nymag.com', '176-177-5579'),
('王秀英', 'wang.xiuying@weebly.com', '891-952-6749'),
('إلياس', 'elias@github.com', '202-517-6983'),
('Donald Duck', 'donald@duck.com', NULL);

-- Tasks
INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES
('Wash clothes', 'Title says it all.', '2017-10-25 06:54:16', '2017-10-15 13:05:09', null, (SELECT id FROM status WHERE name = 'In progress')),
('Become a billionaire', 'This should not take long, just invent a time machine, travel back to 2010 and buy bitcoin', '2017-09-26 03:06:46', '2017-10-08 06:14:31', '2017-12-22 20:58:03', (SELECT id FROM status WHERE name = 'Done')),
('Plan meeting with London office', 'We will probably use skype', '2017-10-04 18:07:37', '2017-10-14 16:01:31', '2017-12-05 19:42:15', (SELECT id FROM status WHERE name = 'In progress')),
('Order groceries online', 'The fridge is almost empty, we need eggs and milk', '2017-09-20 19:34:43', '2017-10-15 23:35:45', '2017-12-24 16:00:46', (SELECT id FROM status WHERE name = 'Not started')),
('Empty the mailbox', NULL, '2017-09-27 15:17:08', '2017-10-08 17:31:16', null, (SELECT id FROM status WHERE name = 'In progress')),
('Fix the flat tire on the bike', 'Tools are in the garage', '2017-09-13 23:16:30', '2017-10-06 04:03:52', '2017-12-07 11:51:11', (SELECT id FROM status WHERE name = 'In progress')),
('Wash the car', NULL, '2017-10-06 19:39:16', '2017-10-03 04:49:05', '2017-12-04 17:43:16', (SELECT id FROM status WHERE name = 'In progress')),
('Walk the dog', NULL, '2017-09-03 02:47:17', '2017-10-12 18:40:08', null, (SELECT id FROM status WHERE name = 'Done')),
('Write a book', 'Maybe something about dragons?', '2017-10-11 06:14:01', '2017-10-17 12:19:08', '2017-12-21 20:18:05', (SELECT id FROM status WHERE name = 'In progress')),
('Do HackYourFuture assignment', NULL, '2017-10-04 13:55:16', '2017-10-10 00:18:05', '2017-12-19 17:01:10', (SELECT id FROM status WHERE name = 'Not started')),
('Iron shirts', NULL, '2017-09-23 03:59:58', '2017-10-19 08:30:48', '2017-12-08 11:00:35', (SELECT id FROM status WHERE name = 'Done')),
('Water the potted plants', 'Maybe they need fertilizer as well', '2017-09-29 23:38:42', '2017-10-08 04:24:53', null, (SELECT id FROM status WHERE name = 'In progress')),
('Buy wine for the birthday party', 'Both red and white wine', '2017-10-10 14:57:22', '2017-10-14 14:03:30', '2017-12-10 23:43:56', (SELECT id FROM status WHERE name = 'In progress')),
('Buy gift for Paul', 'He could use a shirt or a tie and some socks', '2017-09-09 05:22:08', '2017-10-17 15:58:05', '2017-12-04 20:45:18', (SELECT id FROM status WHERE name = 'Done')),
('Change lightbulb in hallway', 'Should be an LED bulb', '2017-10-01 19:07:35', '2017-10-03 10:02:27', '2017-12-08 17:09:03', (SELECT id FROM status WHERE name = 'Done')),
('Wash windows', NULL, '2017-10-02 22:15:17', '2017-10-07 22:31:35', '2017-12-06 03:36:09', (SELECT id FROM status WHERE name = 'In progress')),
('Setup salary databases for accounting', 'Use MySQL', '2017-10-25 05:35:33', '2017-10-10 23:22:33', '2017-12-05 00:19:08', (SELECT id FROM status WHERE name = 'Not started')),
('Learn how databases work', NULL, '2017-09-06 03:16:47', '2017-10-10 16:56:58', '2017-12-18 05:08:05', (SELECT id FROM status WHERE name = 'Done')),
('Make the databases perform better', 'It should be possible to optimize the indexes', '2017-10-03 09:27:20', '2017-10-01 16:27:46', '2017-12-01 13:28:35', (SELECT id FROM status WHERE name = 'In progress')),
('Buy beer for the company party', '2 or 3 cases should be enough', '2017-10-08 01:39:02', '2017-10-13 23:07:41', null, (SELECT id FROM status WHERE name = 'Done')),
('Knit sweater', NULL, '2017-09-22 17:14:55', '2017-10-08 09:01:35', '2017-12-15 20:33:57', (SELECT id FROM status WHERE name = 'In progress')),
('Charge electric bicycle', 'It sucks to ride it without a battery!', '2017-10-10 12:25:07', '2017-10-07 21:45:01', '2017-12-10 19:02:17', (SELECT id FROM status WHERE name = 'Not started')),
('Buy new phone', 'The battery in the current one only lasts 5 hours 😞', '2017-09-17 00:25:34', '2017-10-09 11:48:12', null, (SELECT id FROM status WHERE name = 'Done')),
('Ride bike around Sjælland', 'Remember rainclothes and tire repair kit!', '2017-10-20 19:21:13', '2017-10-07 01:38:06', '2017-12-19 15:08:18', (SELECT id FROM status WHERE name = 'In progress')),
('Look at apartments in Ørestad', '2 or 3 rooms', '2017-10-30 09:47:00', '2017-10-19 06:11:26', null, (SELECT id FROM status WHERE name = 'Not started')),
('Empty Mr Fluffy''s litterbox', NULL, '2017-09-28 03:09:06', '2017-10-13 10:38:34', '2017-12-20 23:37:18', (SELECT id FROM status WHERE name = 'In progress')),
('Buy new dining room table and chairs', 'Ikea has some on sale', '2017-09-21 12:02:34', '2017-10-02 02:05:11', '2017-12-06 00:14:30', (SELECT id FROM status WHERE name = 'Not started')),
('Renew buscard', '3 zones', '2017-10-07 22:47:51', '2017-10-09 15:50:03', '2017-12-01 14:25:40', (SELECT id FROM status WHERE name = 'In progress')),
('Sign up for linkedin', 'Make the CV awesome! 😄', '2017-09-04 00:57:47', '2017-10-18 18:07:48', '2017-12-07 23:04:38', (SELECT id FROM status WHERE name = 'Done')),
('Remove facebook from phone', 'To avoid interruptions when working', '2017-10-26 17:15:07', '2017-10-13 03:36:47', '2017-12-19 11:10:02', (SELECT id FROM status WHERE name = 'Done')),
('Backup databases to external disk', 'Remember to store the disk in another physical location', '2017-09-09 17:32:33', '2017-10-01 21:18:59', '2017-12-23 14:21:01', (SELECT id FROM status WHERE name = 'Not started')),
('Put up the new lamp in the hallway', NULL, '2017-10-15 05:45:54', '2017-10-16 14:05:35', '2017-12-29 02:29:26', (SELECT id FROM status WHERE name = 'Done')),
('Hang up paintings in living room', NULL, '2017-09-10 05:36:11', '2017-10-09 17:40:42', null, (SELECT id FROM status WHERE name = 'Done')),
('Buy plane ticket to Auckland', 'Check prices online first!', '2017-09-05 09:07:22', '2017-10-15 09:36:06', '2017-12-07 11:10:05', (SELECT id FROM status WHERE name = 'Not started')),
('Learn about NoSQL databases', 'MongoDB, CouchDB, etc.', '2017-10-20 01:41:53', '2017-10-04 07:19:56', '2017-12-23 10:13:42', (SELECT id FROM status WHERE name = 'In progress'));

-- Users-tasks
INSERT INTO user_task (user_id, task_id)
VALUES (
  (SELECT id FROM user WHERE email = 'aellingworth0@harvard.edu'),
  (SELECT id FROM task WHERE title = 'Empty the mailbox')
),
VALUES (
  (SELECT id FROM user WHERE email = 'aellingworth0@harvard.edu'),
  (SELECT id FROM task WHERE title = 'Learn about NoSQL databases')
),
VALUES (
  (SELECT id FROM user WHERE email = 'aellingworth0@harvard.edu'),
  (SELECT id FROM task WHERE title = 'Iron shirts')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pgoldsworthy1@spotify.com'),
  (SELECT id FROM task WHERE title = 'Order groceries online')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pgoldsworthy1@spotify.com'),
  (SELECT id FROM task WHERE title = 'Empty Mr Fluffy''s litterbox')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pgoldsworthy1@spotify.com'),
  (SELECT id FROM task WHERE title = 'Sign up for linkedin')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pkisbee2@lulu.com'),
  (SELECT id FROM task WHERE title = 'Charge electric bicycle')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pkisbee2@lulu.com'),
  (SELECT id FROM task WHERE title = 'Buy wine for the birthday party')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pkisbee2@lulu.com'),
  (SELECT id FROM task WHERE title = 'Make the databases perform better')
),
VALUES (
  (SELECT id FROM user WHERE email = 'rduncan3@quantcast.com'),
  (SELECT id FROM task WHERE title = 'Ride bike around Sjælland')
),
VALUES (
  (SELECT id FROM user WHERE email = 'rduncan3@quantcast.com'),
  (SELECT id FROM task WHERE title = 'Buy beer for the company party')
),
VALUES (
  (SELECT id FROM user WHERE email = 'apolak4@indiatimes.com'),
  (SELECT id FROM task WHERE title = 'Buy beer for the company party')
),
VALUES (
  (SELECT id FROM user WHERE email = 'apolak4@indiatimes.com'),
  (SELECT id FROM task WHERE title = 'Learn how databases work')
),
VALUES (
  (SELECT id FROM user WHERE email = 'apolak4@indiatimes.com'),
  (SELECT id FROM task WHERE title = 'Change lightbulb in hallway')
),
VALUES (
  (SELECT id FROM user WHERE email = 'mmeadows5@comcast.net'),
  (SELECT id FROM task WHERE title = 'Do HackYourFuture assignment')
),
VALUES (
  (SELECT id FROM user WHERE email = 'mmeadows5@comcast.net'),
  (SELECT id FROM task WHERE title = 'Wash the car')
),
VALUES (
  (SELECT id FROM user WHERE email = 'mmeadows5@comcast.net'),
  (SELECT id FROM task WHERE title = 'Buy new dining room table and chairs')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pbrushneen6@techcrunch.com'),
  (SELECT id FROM task WHERE title = 'Hang up paintings in living room')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pbrushneen6@techcrunch.com'),
  (SELECT id FROM task WHERE title = 'Learn how databases work')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pbrushneen6@techcrunch.com'),
  (SELECT id FROM task WHERE title = 'Buy new phone')
),
VALUES (
  (SELECT id FROM user WHERE email = 'hgerault7@nymag.com'),
  (SELECT id FROM task WHERE title = 'Empty Mr Fluffy''s litterbox')
),
VALUES (
  (SELECT id FROM user WHERE email = 'hgerault7@nymag.com'),
  (SELECT id FROM task WHERE title = 'Remove facebook from phone')
),
VALUES (
  (SELECT id FROM user WHERE email = 'hgerault7@nymag.com'),
  (SELECT id FROM task WHERE title = 'Iron shirts')
),
VALUES (
  (SELECT id FROM user WHERE email = 'wang.xiuying@weebly.com'),
  (SELECT id FROM task WHERE title = 'Buy plane ticket to Auckland')
),
VALUES (
  (SELECT id FROM user WHERE email = 'wang.xiuying@weebly.com'),
  (SELECT id FROM task WHERE title = 'Change lightbulb in hallway')
),
VALUES (
  (SELECT id FROM user WHERE email = 'wang.xiuying@weebly.com'),
  (SELECT id FROM task WHERE title = 'Wash clothes')
),
VALUES (
  (SELECT id FROM user WHERE email = 'elias@github.com'),
  (SELECT id FROM task WHERE title = 'Sign up for linkedin')
),
VALUES (
  (SELECT id FROM user WHERE email = 'elias@github.com'),
  (SELECT id FROM task WHERE title = 'Wash windows')
),
VALUES (
  (SELECT id FROM user WHERE email = 'elias@github.com'),
  (SELECT id FROM task WHERE title = 'Wash clothes')
),
VALUES (
  (SELECT id FROM user WHERE email = 'donald@duck.com'),
  (SELECT id FROM task WHERE title = 'Empty Mr Fluffy''s litterbox')
),
VALUES (
  (SELECT id FROM user WHERE email = 'donald@duck.com'),
  (SELECT id FROM task WHERE title = 'Buy new dining room table and chairs')
),
VALUES (
  (SELECT id FROM user WHERE email = 'donald@duck.com'),
  (SELECT id FROM task WHERE title = 'Setup salary databases for accounting')
),
VALUES (
  (SELECT id FROM user WHERE email = 'donald@duck.com'),
  (SELECT id FROM task WHERE title = 'Become a billionaire')
),
VALUES (
  (SELECT id FROM user WHERE email = 'aellingworth0@harvard.edu'),
  (SELECT id FROM task WHERE title = 'Plan meeting with London office')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pgoldsworthy1@spotify.com'),
  (SELECT id FROM task WHERE title = 'Fix the flat tire on the bike')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pkisbee2@lulu.com'),
  (SELECT id FROM task WHERE title = 'Walk the dog')
),
VALUES (
  (SELECT id FROM user WHERE email = 'rduncan3@quantcast.com'),
  (SELECT id FROM task WHERE title = 'Write a book')
),
VALUES (
  (SELECT id FROM user WHERE email = 'apolak4@indiatimes.com'),
  (SELECT id FROM task WHERE title = 'Water the potted plants')
),
VALUES (
  (SELECT id FROM user WHERE email = 'mmeadows5@comcast.net'),
  (SELECT id FROM task WHERE title = 'Buy gift for Paul')
),
VALUES (
  (SELECT id FROM user WHERE email = 'pbrushneen6@techcrunch.com'),
  (SELECT id FROM task WHERE title = 'Knit sweater')
),
VALUES (
  (SELECT id FROM user WHERE email = 'hgerault7@nymag.com'),
  (SELECT id FROM task WHERE title = 'Look at apartments in Ørestad')
),
VALUES (
  (SELECT id FROM user WHERE email = 'wang.xiuying@weebly.com'),
  (SELECT id FROM task WHERE title = 'Renew buscard')
),
VALUES (
  (SELECT id FROM user WHERE email = 'elias@github.com'),
  (SELECT id FROM task WHERE title = 'Backup databases to external disk')
),
VALUES (
  (SELECT id FROM user WHERE email = 'donald@duck.com'),
  (SELECT id FROM task WHERE title = 'Put up the new lamp in the hallway')
);
