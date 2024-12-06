const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db.js");

const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const query =
    "INSERT INTO users (first_name, email, password, last_name) VALUES (?, ?, ?, ?);";

  try {
    db.query(
      query,
      [first_name, email, hashedPassword, last_name],
      (err, result) => {
        if (err) {
          return res.status(401).json({ success: false, message: err });
        }
        res
          .status(201)
          .json({ success: true, message: "User created successfully!" });
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "User registration failed." });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        return res.status(401).json({ success: false, message: err });
      }

      // Check if a user was found
      if (result.length > 0) {
        const validUser = result[0];

        const validPassword = bcryptjs.compareSync(
          password,
          validUser.password
        );
        if (!validPassword) {
          return res
            .status(401)
            .json({ success: false, message: "Wrong Credentials!" });
        }

        const { password: pass, ...restUserInfo } = validUser;
        const token = jwt.sign(
          { id: validUser.user_id },
          process.env.JWT_SECRET
        );
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ success: true, user: restUserInfo });
      } else {
        res.status(404).json({ success: false, message: "User not found!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const google = async (req, res) => {
  const { email, first_name, last_name } = req.body;

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        return res.status(401).json({ success: false, message: err });
      }

      if (result.length > 0) {
        const validUser = result[0];

        const token = jwt.sign(
          { id: validUser.user_id },
          process.env.JWT_SECRET
        );

        const { password, ...restUserInfo } = validUser;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ success: true, user: restUserInfo });
      } else {
        // If user does not exist, create a new user
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

        db.query(
          "INSERT INTO users (first_name, email, password, last_name) VALUES (?, ?, ?, ?)",
          [first_name, email, hashedPassword, last_name],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ success: false, message: err });
            }

            const newUserId = result.insertId; // Get the new user's ID
            const token = jwt.sign({ id: newUserId }, process.env.JWT_SECRET); // Create JWT token

            res
              .cookie("access_token", token, { httpOnly: true })
              .status(200)
              .json({
                success: true,
                user: { user_id: newUserId, first_name, email, last_name },
              });
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "User has been logged out!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const get_login_data = (req, res) => {
  db.query(
    "select first_name, last_name, user_id, is_admin, email from users where user_id = ?",
    [req.user.id],
    (err, result) => {
      // console.log(result[0]);
      if (err) res.status(403).json({ success: "false", message: err });
      else res.json(result[0]);
    }
  );
};

module.exports = {
  signup,
  signin,
  google,
  signout,
  get_login_data,
};
