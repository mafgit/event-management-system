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
    is_admin TINYINT NOT NULL DEFAULT 0,
    password VARCHAR(45) NOT NULL,
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
  else console.log("-> tables are ready");
});

module.exports = db;
