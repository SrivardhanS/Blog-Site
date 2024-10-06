import { db } from "../db.js";  // Importing the database connection from an external file.
import bcrypt from "bcryptjs";  // Importing bcryptjs for hashing passwords.
import jwt from "jsonwebtoken";  // Importing jsonwebtoken for generating and verifying JWT tokens.

export const register = (req, res) => {
  // CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"; 
  // Query to check if a user with the provided email or username already exists in the database.
  //The ? placeholders are used to securely insert values into the query, preventing SQL injection attacks.
  
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);  
    // If there's an error with the query, send a 500 (Internal Server Error) response.

    if (data.length) return res.status(409).json("User already exists!");
    // If the query returns any results (i.e., a user already exists), send a 409 (Conflict) response.

    // Hash the password and create a new user
    const salt = bcrypt.genSaltSync(10);  
    // Generate a salt with a cost factor of 10. A salt is added to the password to make it harder to crack.
    const hash = bcrypt.hashSync(req.body.password, salt);  
    // Hash the user's password using bcrypt with the generated salt.

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";  
    // Query to insert a new user into the users table, with their username, email, and hashed password.
    const values = [req.body.username, req.body.email, hash];  
    // The values to be inserted into the database for the new user.

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);  
      // If there's an error with the insert query, send a 500 (Internal Server Error) response.
      return res.status(200).json("User has been created.");
      // If the user is successfully created, send a 200 (OK) response with a success message.
    });
  });
};

export const login = (req, res) => {
  // CHECK USER
  const q = "SELECT * FROM users WHERE username = ?";  
  // Query to find a user with the provided username in the database.

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);  
    // If there's an error with the query, send a 500 (Internal Server Error) response.
    if (data.length === 0) return res.status(404).json("User not found!");
    // If no user is found, send a 404 (Not Found) response.

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    // Compare the provided password with the hashed password stored in the database.
    // bcrypt.compareSync returns true if the password matches, false otherwise.

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");
    // If the password is incorrect, send a 400 (Bad Request) response with an error message.

    const token = jwt.sign({ id: data[0].id }, "jwtkey");  
    // Generate a JWT token with the user's id as payload and "jwtkey" as the secret key.
    const { password, ...other } = data[0];  
    // Destructure the user object to exclude the password and store the rest in 'other'.

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      // Set an HTTP-only cookie with the JWT token. This prevents JavaScript from accessing the token, increasing security.
      .status(200)
      .json(other);
      // Send a 200 (OK) response with the user's data (excluding the password).
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  })
  // Clear the "access_token" cookie. The options sameSite and secure ensure the cookie is only sent in secure environments.
    .status(200)
    .json("User has been logged out.");
  // Send a 200 (OK) response to indicate that the user has been logged out.
};
