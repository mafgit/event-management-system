const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../db.js"); 

const signup = async (req, res) => {
    
    const { name, email, password } = req.body;
 
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const query = "INSERT INTO users (first_name, email, password, last_name) VALUES (?, ?, ?, ?)";
    
    try{
        db.query(query, [name, email, hashedPassword, "kuch_bhi"]);     
        res.status(201).json({ message: "User created successfully!" }); 
    }
    catch (error) {
        console.error(error); 
        res.status(500).json({ message: "User registration failed." });
    }
}


const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
          if (err) {
              return res.status(401).json({ message: err });
          }

          // Check if a user was found
          if (result.length > 0) { // Use result.length to check if a user exists
              const validUser = result[0]; // Get the first user found

              // Compare the provided password with the hashed password
              const validPassword = bcryptjs.compareSync(password, validUser.password);
              if (!validPassword) {
                  return res.status(401).json({ message: "Wrong Credentials!" });
              }

              // Prepare the user info for the response
              const { password: pass, ...restUserInfo } = validUser; 
              const token = jwt.sign({ id: validUser.user_id }, process.env.JWT_SECRET); // Change 'id' to 'user_id' as per your schema
              res.cookie('access_token', token, { httpOnly: true })
                  .status(200)
                  .json(restUserInfo);
          } else {
              // No user found with the provided email
              res.status(401).json({ message: "User not found!" });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


const google = async (req, res) => {
  const { email, name } = req.body;

  try {
    // Check if the user exists
    const [rows] = db.execute("SELECT * FROM users WHERE email = ?", [email]);

    // If user exists
    if (rows.length > 0) {
      const validUser = rows[0];
      const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);

      // Send cookie and user info without password
      const { password, ...restUserInfo } = validUser;
      res.cookie('access_token', token, { 
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour
      })
      .status(200)
      .json(restUserInfo);

    } else {
      // If user does not exist, create a new user
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Insert the new user into the database
      const [result] = db.execute(
        "INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)", 
        [firstName, email, hashedPassword]
      );

      const newUserId = result.insertId; // Get the new user's ID
      const token = jwt.sign({ id: newUserId }, process.env.JWT_SECRET);

      // Send cookie and user info without password
      res.cookie('access_token', token, { 
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour
      })
      .status(200)
      .json({ id: newUserId, first_name: firstName, email });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signout = async (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {
    signup,
    signin,
    google,
    signout
}