const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const sample_trig_proc_query = `
use ems;
SET FOREIGN_KEY_CHECKS = 0;
truncate table users;
truncate table categories;
truncate table events;
truncate table reviews;
truncate table tags;
truncate table event_tags;
truncate table tickets;
truncate table registrations;
truncate table attendance;
truncate table deleted_events;
SET FOREIGN_KEY_CHECKS = 1;

-- Users
INSERT INTO users (first_name, last_name, email, is_admin, password) VALUES
('John', 'Doe', 'john@example.com', 1, '$2b$10$rYtKZE7waf47K32R2tO/H.m7eRQsgVseliYK6PewZz71dVrTobSki'),
('Jane', 'Smith', 'jane@example.com', 0, '$2b$10$Zxg2hhYCbIvsCByfa4QQ1en88uSTQ5f.0XGSdYuZEtUUV1zDRMcpW'),
('Alex', 'Brown', 'alex@example.com', 0, '$2b$10$cwGHtfilnUP1c0sThvscHeZGRG5XKDiV1HG3CUko0HRA9w43OXD7q'),
('Emily', 'White', 'emily@example.com', 0, '$2b$10$CaulXRQAd/I9Vd0BN9wx/uq8sB1h7hJoFrJoosbO1ozZj/.uDSaeW'),
('Michael', 'Green', 'michael@example.com', 0, '$2b$10$Fo63AKZ/nLpaGfkmlSg6u.YIor6GGA9zToYSGy17WOWcpT2lG8xIe'),
('Kevin', 'Johnson', 'kevin@example.com', 0, '$2b$10$zHGLB1DuhFQ1MTbhz4cfUOSQKtWwEXOwvf3C66YF/5yrSQ6UovV12'),
('Sophia', 'Miller', 'sophia@example.com', 0, '$2b$10$rJLvJ4aRXQWEp1THP9OsEu5RO7Br4Z3dSH82kAF93g.Qz9mxxu90W'),
('Liam', 'Davis', 'liam@example.com', 0, '$2b$10$y93MvKgWJk1fH.ho9.yGju07UuGyvY3Jj9syv3XodmZZmGnHfVuKu');

-- Categories
INSERT INTO categories (name) VALUES 
('Music'),
('Art'),
('Technology'),
('Sports'),
('Health & Wellness'),
('Education'),
('Gaming');

-- Events
INSERT INTO events (name, description, capacity, venue, image_url, organized_by, event_date, start_time, end_time, category, status, verified) VALUES 
('Tech Conference', 'The annual tech conference brings together industry leaders, startups, and enthusiasts to discuss emerging technologies and innovations.', 200, 'Tech Hall', 'https://images.unsplash.com/photo-1511578314322-379afb476865?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D', 1, '2024-12-15', '09:00:00', '17:00:00', 'Technology', 'Scheduled', 1),
('Art Exhibition', 'A captivating showcase of modern art featuring innovative works from both renowned and upcoming artists.', 150, 'Art Gallery', 'https://images.unsplash.com/photo-1568304603980-85ff55550db2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVsYXxlbnwwfHwwfHx8MA%3D%3D', 2, '2024-12-20', '10:00:00', '18:00:00', 'Art', 'Scheduled', 0),
('Music Festival', 'An exciting outdoor event filled with live performances by talented musicians across genres.', 300, 'City Park', 'https://images.unsplash.com/photo-1561489396-888724a1543d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVzaW5lc3MlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D', 3, '2025-01-15', '12:00:00', '22:00:00', 'Music', 'Scheduled', 1),
('Sports Meetup', 'A community event promoting sportsmanship through friendly games and activities for all skill levels.', 250, 'Sports Arena', NULL, 4, '2024-09-15', '08:00:00', '14:00:00', 'Sports', 'Completed', 1),
('Business Networking', 'A professional networking event designed to connect individuals and businesses across industries.', 100, 'Conference Hall', NULL, 5, '2024-10-10', '14:00:00', '18:00:00', 'Technology', 'Completed', 1),
('Gaming Expo', 'The ultimate annual gaming event showcasing the latest in games, technology, and industry trends.', 500, 'Gaming Arena', NULL, 6, '2024-08-20', '10:00:00', '20:00:00', 'Gaming', 'Completed', 1),
('Health Workshop', 'An interactive workshop focused on health and wellness, featuring expert advice and practical sessions.', 100, 'Health Center', 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?fm=jpg&q=60&w=3000', 7, '2024-09-10', '09:00:00', '12:00:00', 'Health & Wellness', 'Completed', 1),
('Education Summit', 'A dynamic forum on modern education practices, challenges, and innovations in the learning space.', 300, 'Education Hall', NULL, 8, '2025-03-25', '10:00:00', '17:00:00', 'Education', 'Scheduled', 1);

-- Reviews
INSERT INTO reviews (text, user_id, event_id, rating) VALUES 
('Amazing event!', 1, 1, 4),
('Loved it!', 4, 1, 5),
('Great meetup!', 3, 4, 4),
('Very helpful for networking.', 5, 5, 5),
('Incredible gaming experience!', 6, 6, 5),
('Very informative session.', 7, 7, 4);

-- Tags
INSERT INTO tags (name) VALUES 
('Outdoor'),
('Networking'),
('Workshop'),
('Exhibition'),
('Virtual'),
('Health'),
('Gaming'),
('Education'),
('Social');

-- Event Tags
INSERT INTO event_tags (event_id, tag_name) VALUES 
(1, 'Networking'),
(1, 'Workshop'),
(2, 'Exhibition'),
(3, 'Outdoor'),
(4, 'Outdoor'),
(5, 'Networking'),
(6, 'Gaming'),
(6, 'Social'),
(7, 'Health'),
(7, 'Workshop'),
(8, 'Education'),
(8, 'Virtual');

-- Tickets
INSERT INTO tickets (ticket_name, event_id, capacity, price) VALUES 
('VIP Pass', 1, 50, 100),
('General Admission', 1, 150, 50),
('Standard Ticket', 2, 100, 30),
('Early Bird', 3, 200, 25),
('Sports Entry', 4, 200, 20),
('Networking Premium', 5, 50, 100),
('Gamer Pass', 6, 300, 50),
('Health Workshop Entry', 7, 80, 20),
('Education Forum Pass', 8, 250, 40);

-- Registrations
INSERT INTO registrations (event_id, user_id, ticket_id, status, amount) VALUES 
(1, 1, 1, 'Confirmed', 100),
(2, 2, 3, 'Pending', 30),
(3, 3, 4, 'Confirmed', 25),
(1, 4, 2, 'Confirmed', 50),
(3, 5, 4, 'Confirmed', 25),
(4, 3, 5, 'Confirmed', 20),
(5, 5, 6, 'Confirmed', 100),
(6, 6, 7, 'Confirmed', 50),
(7, 7, 8, 'Confirmed', 20),
(6, 8, 7, 'Confirmed', 50);

-- Attendance
INSERT INTO attendance (user_id, event_id) VALUES 
(1, 1),
(3, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 6);

-- show: procedures

CREATE PROCEDURE GetEventView(IN p_event_id INT)
BEGIN
  SELECT e.*, concat(u.first_name, ' ', u.last_name) as organizer_name
  FROM events e inner join users u
  on e.organized_by = u.user_id
  WHERE e.event_id = p_event_id;
END;

CREATE PROCEDURE GetAnalyticsView(IN p_event_id INT)
BEGIN
  select u.*, r.*, t.*, a.created_at as 'attendance_created_at' from users u
  inner join registrations r on u.user_id = r.user_id
  left join attendance a on a.user_id = r.user_id
  inner join tickets t on r.ticket_id = t.ticket_id
  where r.event_id = p_event_id and t.event_id = p_event_id and r.status = 'Confirmed';
END;

-- show: trigger

create trigger log_deleted_event before delete on events
for each row
begin
  insert into deleted_events select * from events where event_id = old.event_id;
end;
`;

db.query(sample_trig_proc_query, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("-> tables have been truncated");
    console.log("-> sample data has been inserted");
    console.log("-> procedures & triggers have been created");
    process.exit(0);
  }
});
