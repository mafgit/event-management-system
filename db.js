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
    event_date DATE NOT NULL,
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
    tag_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (event_id, tag_id),
    INDEX tag_id_idx (tag_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (tag_id) REFERENCES tags (name)
  );
  
  CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    ticket_name VARCHAR(20) NOT NULL,
    event_id INT NOT NULL,
    capacity INT NOT NULL,
    price INT NOT NULL,
    INDEX event_id_idx (event_id),
    PRIMARY KEY (ticket_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
  );
  
  CREATE TABLE IF NOT EXISTS registrations (
    registration_id INT NOT NULL AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    ticket_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount INT NOT NULL,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (registration_id),
    INDEX event_id_idx (event_id),
    INDEX user_id_idx (user_id),
    INDEX ticket_id_idx (ticket_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (ticket_id) REFERENCES tickets (ticket_id)
  );
  
  CREATE TABLE IF NOT EXISTS attendance (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id),
    INDEX event_id_idx (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
  );`;

db.query(create_tables_query, (err) => {
  if (err) console.log(err);
  else {
    console.log("-> tables are ready");

    const insert_sample = process.env.INSERT_SAMPLE || "no";

    if (insert_sample == "yes") {
      const insert_sample_data_query = `INSERT INTO users (first_name, last_name, email, is_admin, password) VALUES 
('John', 'Doe', 'john@example.com', 1, 'hashedpassword1'),
('Jane', 'Smith', 'jane@example.com', 0, 'hashedpassword2'),
('Alex', 'Brown', 'alex@example.com', 0, 'hashedpassword3');

INSERT INTO categories (name) VALUES 
('Music'),
('Art'),
('Technology'),
('Sports');

INSERT INTO events (name, description, capacity, venue, image_url, organized_by, event_date, start_time, end_time, category, status, verified) VALUES 
('Tech Conference', 'Annual tech conference', 200, 'Tech Hall', 'http://example.com/image1.jpg', 1, '2024-11-12', '09:00:00', '17:00:00', 'Technology', 'Scheduled', 1),
('Art Exhibition', 'Modern art showcase', 150, 'Art Gallery', 'http://example.com/image2.jpg', 2, '2024-12-05', '10:00:00', '18:00:00', 'Art', 'Scheduled', 0),
('Music Festival', 'Outdoor music event', 300, 'City Park', 'http://example.com/image3.jpg', 3, '2025-01-15', '12:00:00', '22:00:00', 'Music', 'Scheduled', 1);

INSERT INTO reviews (text, user_id, event_id, rating) VALUES 
('Amazing event!', 1, 1, 9),
('Great experience.', 2, 2, 8),
('Could have been better.', 3, 3, 6);

INSERT INTO tags (name) VALUES 
('Outdoor'),
('Networking'),
('Workshop'),
('Exhibition');

INSERT INTO event_tags (event_id, tag_id) VALUES 
(1, 'Networking'),
(1, 'Workshop'),
(2, 'Exhibition'),
(3, 'Outdoor');

INSERT INTO tickets (ticket_name, event_id, capacity, price) VALUES 
('VIP Pass', 1, 50, 100),
('General Admission', 1, 150, 50),
('Standard Ticket', 2, 100, 30),
('Early Bird', 3, 200, 25);

INSERT INTO registrations (event_id, user_id, ticket_id, status, amount) VALUES 
(1, 1, 1, 'Confirmed', 100),
(2, 2, 3, 'Pending', 30),
(3, 3, 4, 'Confirmed', 25);

INSERT INTO attendance (user_id, event_id) VALUES 
(1, 1),
(2, 2),
(3, 3);
`;

      db.query(insert_sample_data_query, (err) => {
        if (err) console.log(err);
        else console.log("-> sample data is ready");
      });
    }
  }
});

module.exports = db;
