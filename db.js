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
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    -- names are 40 chars long so that google signin with name "k224257 Mohammad Abdullah Farooqui" and the likes can work
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin TINYINT NOT NULL DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
  );
  
  CREATE TABLE IF NOT EXISTS categories (
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (name)
  );

  CREATE TABLE IF NOT EXISTS events (
    event_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(300) NOT NULL,
    capacity INT NOT NULL,
    venue VARCHAR(100) NOT NULL,
    image_url VARCHAR(1024),
    organized_by INT NULL,
    event_date DATETIME NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    category VARCHAR(30) NULL,
    status VARCHAR(30) NOT NULL,
    verified TINYINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id),
    INDEX organized_by_idx (organized_by),
    INDEX category_idx (category),
    FOREIGN KEY (organized_by) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (category) REFERENCES categories (name) ON UPDATE CASCADE ON DELETE SET NULL
  );
  

  -- trigger tables
CREATE TABLE IF NOT EXISTS deleted_events (
    event_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(300) NOT NULL,
    capacity INT NOT NULL,
    venue VARCHAR(100) NOT NULL,
    image_url VARCHAR(1024),
    organized_by INT NULL,
    event_date DATETIME NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    category VARCHAR(30) NULL,
    status VARCHAR(30) NOT NULL,
    verified TINYINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    deleted_at DATETIME NOT NULL,
    deleted_by VARCHAR(255) NOT NULL,
    PRIMARY KEY (event_id)
);


CREATE TABLE IF NOT EXISTS deleted_users (
    user_id INT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin TINYINT NOT NULL DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    deleted_at DATETIME NOT NULL,
    deleted_by VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);




  CREATE TABLE IF NOT EXISTS reviews (
    review_id INT NOT NULL AUTO_INCREMENT,
    text VARCHAR(300) NOT NULL,
    user_id INT NULL,
    event_id INT NULL,
    rating INT NOT NULL,
    PRIMARY KEY (review_id),
    INDEX user_id_idx (user_id),
    INDEX event_id_idx (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS tags (
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (name)
  );
  
  CREATE TABLE IF NOT EXISTS event_tags (
    event_id INT NOT NULL,
    tag_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (event_id, tag_name),
    INDEX tag_name_idx (tag_name),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tags (name)
        ON UPDATE CASCADE ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    ticket_name VARCHAR(30) UNIQUE NOT NULL,
    event_id INT NULL,
    capacity INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (ticket_id),
    INDEX event_id_idx (event_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS registrations (
    registration_id INT NOT NULL AUTO_INCREMENT,
    event_id INT NULL,
    user_id INT NULL,
    ticket_id INT NULL,
    status VARCHAR(30) NOT NULL,
    amount INT NOT NULL,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (registration_id),
    INDEX event_id_idx (event_id),
    INDEX user_id_idx (user_id),
    INDEX ticket_id_idx (ticket_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets (ticket_id) ON UPDATE CASCADE ON DELETE SET NULL
  );
  
  CREATE TABLE IF NOT EXISTS attendance (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id),
    INDEX event_id_idx (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  -- show: views
  
  CREATE OR REPLACE VIEW get_featured_view AS
  SELECT * 
  FROM events
  WHERE verified = 1 
    AND event_date >= CURDATE()
  ORDER BY capacity DESC, event_date ASC
  LIMIT 10;

  create or replace view get_upcoming_view as
  SELECT * FROM events
  WHERE verified = 1 and event_date >= CURDATE() 
  ORDER BY event_date DESC 
  LIMIT 3;

  create or replace view get_all_events_view as
  SELECT * FROM events;

  create or replace view get_all_users_view as
  SELECT * FROM users;

`;

db.query(create_tables_query, (err) => {
  if (err) console.log(err);
  else {
    console.log("-> table structures are ready");
  }
});

module.exports = db;
