const mysql = require("mysql2");

// auth error was coming in mysql therefore used mysql2

const db = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

console.log("-> connected to mysql database");

const create_tables_query = `CREATE TABLE IF NOT EXISTS users ( 
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin TINYINT NOT NULL DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
  );
  
  CREATE TABLE IF NOT EXISTS categories (
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (name)
  );

  CREATE TABLE IF NOT EXISTS events (
    event_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(120) NOT NULL,
    capacity INT NOT NULL,
    venue VARCHAR(45) NOT NULL,
    image_url VARCHAR(1024),
    organized_by INT NOT NULL,
    event_date DATETIME NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    category VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    verified TINYINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id),
    INDEX organized_by_idx (organized_by),
    INDEX category_idx (category),
    FOREIGN KEY (organized_by) REFERENCES users (user_id),
    FOREIGN KEY (category) REFERENCES categories (name)
  );

  -- alter table events modify column image_url varchar(1024);
  
  CREATE TABLE IF NOT EXISTS reviews (
    review_id INT NOT NULL AUTO_INCREMENT,
    text VARCHAR(120) NOT NULL,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    rating INT NOT NULL,
    PRIMARY KEY (review_id),
    INDEX user_id_idx (user_id),
    INDEX event_id_idx (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
  );
  
  CREATE TABLE IF NOT EXISTS tags (
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (name)
  );
  
  CREATE TABLE IF NOT EXISTS event_tags (
    event_id INT NOT NULL,
    tag_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (event_id, tag_name),
    INDEX tag_name_idx (tag_name),
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (tag_name) REFERENCES tags (name)
  );
  
  CREATE TABLE IF NOT EXISTS tickets (
    ticket_name VARCHAR(20) NOT NULL,
    event_id INT NOT NULL,
    capacity INT NOT NULL,
    price INT NOT NULL,
    INDEX event_id_idx (event_id),
    PRIMARY KEY (ticket_name, event_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
  );
  
  CREATE TABLE IF NOT EXISTS registrations (
    registration_id INT NOT NULL AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    ticket_name VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount INT NOT NULL,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (registration_id),
    INDEX event_id_idx (event_id),
    INDEX user_id_idx (user_id),
    INDEX ticket_name_idx (ticket_name),
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (ticket_name) REFERENCES tickets (ticket_name)
  );
  
  CREATE TABLE IF NOT EXISTS attendance (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id),
    INDEX event_id_idx (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
  );
  
  -- alter table events modify column event_date datetime;
  `;

db.query(create_tables_query, (err) => {
  if (err) console.log(err);
  else {
    console.log("-> tables are ready");

    const insert_sample = process.env.INSERT_SAMPLE || "no";

    if (insert_sample == "yes") {
      const insert_sample_data_query = `-- Users
INSERT INTO users (first_name, last_name, email, is_admin, password) VALUES
('John', 'Doe', 'john@example.com', 1, '$2b$10$rYtKZE7waf47K32R2tO/H.m7eRQsgVseliYK6PewZz71dVrTobSki'),
('Jane', 'Smith', 'jane@example.com', 0, '$2b$10$Zxg2hhYCbIvsCByfa4QQ1en88uSTQ5f.0XGSdYuZEtUUV1zDRMcpW'),
('Alex', 'Brown', 'alex@example.com', 0, '$2b$10$cwGHtfilnUP1c0sThvscHeZGRG5XKDiV1HG3CUko0HRA9w43OXD7q'),
('Emily', 'White', 'emily@example.com', 0, '$2b$10$CaulXRQAd/I9Vd0BN9wx/uq8sB1h7hJoFrJoosbO1ozZj/.uDSaeW'),
('Michael', 'Green', 'michael@example.com', 0, '$2b$10$Fo63AKZ/nLpaGfkmlSg6u.YIor6GGA9zToYSGy17WOWcpT2lG8xIe');

-- Categories
INSERT INTO categories (name) VALUES 
('Music'),
('Art'),
('Technology'),
('Sports');

-- Events
INSERT INTO events (name, description, capacity, venue, image_url, organized_by, event_date, start_time, end_time, category, status, verified) VALUES 
('Tech Conference', 'Annual tech conference', 200, 'Tech Hall', 'https://images.unsplash.com/photo-1511578314322-379afb476865?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D', 1, '2024-11-12', '09:00:00', '17:00:00', 'Technology', 'Scheduled', 1),
('Art Exhibition', 'Modern art showcase', 150, 'Art Gallery', 'https://images.unsplash.com/photo-1568304603980-85ff55550db2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVsYXxlbnwwfHwwfHx8MA%3D%3D', 2, '2024-12-05', '10:00:00', '18:00:00', 'Art', 'Scheduled', 0),
('Music Festival', 'Outdoor music event', 300, 'City Park', 'https://images.unsplash.com/photo-1561489396-888724a1543d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVzaW5lc3MlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D', 3, '2025-01-15', '12:00:00', '22:00:00', 'Music', 'Scheduled', 1);

-- Reviews
INSERT INTO reviews (text, user_id, event_id, rating) VALUES 
('Amazing event!', 1, 1, 4),
('Great experience.', 2, 2, 3),
('Could have been better.', 3, 3, 2),
('Loved it!', 4, 1, 5),
('Not worth the price.', 5, 3, 1);

-- Tags
INSERT INTO tags (name) VALUES 
('Outdoor'),
('Networking'),
('Workshop'),
('Exhibition');

-- Event Tags
INSERT INTO event_tags (event_id, tag_name) VALUES 
(1, 'Networking'),
(1, 'Workshop'),
(2, 'Exhibition'),
(3, 'Outdoor');

-- Tickets
INSERT INTO tickets (ticket_name, event_id, capacity, price) VALUES 
('VIP Pass', 1, 50, 100),
('General Admission', 1, 150, 50),
('Standard Ticket', 2, 100, 30),
('Early Bird', 3, 200, 25);

-- Registrations
INSERT INTO registrations (event_id, user_id, ticket_name, status, amount) VALUES 
(1, 1, 'VIP Pass', 'Confirmed', 100),
(2, 2, 'Standard Ticket', 'Pending', 30),
(3, 3, 'Early Bird', 'Confirmed', 25),
(1, 4, 'General Admission', 'Confirmed', 50),
(3, 5, 'Early Bird', 'Confirmed', 25);

-- Attendance
INSERT INTO attendance (user_id, event_id) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 3);
`;

      db.query(insert_sample_data_query, (err) => {
        if (err) console.log(err);
        else console.log("-> sample data is ready");
      });
    }
  }
});

module.exports = db;
