import { db } from "../db.js"; // Importing the database connection from the db.js file
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library to handle JWT authentication

// Function to retrieve all posts or filter by category if a category query parameter is provided
export const getPosts = (req, res) => {
  // If a category is provided in the query string, select posts based on the category, otherwise, select all posts
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?" // SQL query to get posts with a specific category
    : "SELECT * FROM posts"; // SQL query to get all posts if no category is provided

  // Executing the query with the category parameter (if present)
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err); // If there's an error, return a 500 status with the error message

    return res.status(200).json(data); // If successful, return the posts in JSON format with a 200 status
  });
};

// Function to retrieve a single post by its ID and also return the author's details
export const getPost = (req, res) => {
  // SQL query to join users and posts tables, fetching post details along with the username and user image
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  // Executing the query to retrieve the post with the given ID from the request parameters
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err); // Return a 500 error status if something goes wrong

    return res.status(200).json(data[0]); // Return the post data (first entry in the result set) with a 200 status
  });
};

// Function to add a new post
export const addPost = (req, res) => {
  // Checking if the user is authenticated by looking for a JWT token in the cookies
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!"); // If no token, return a 401 Unauthorized error

  // Verifying the JWT token
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // If the token is invalid, return a 403 Forbidden error

    // SQL query to insert a new post into the posts table
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    // Collecting the post data from the request body and the user ID from the decoded token
    const values = [
      req.body.title,  // Title of the post
      req.body.desc,   // Description/content of the post
      req.body.img,    // Image URL of the post
      req.body.cat,    // Category of the post (e.g., art, science, etc.)
      req.body.date,   // Date of the post
      userInfo.id,     // The user ID (author) from the JWT token
    ];

    // Executing the query to insert the post
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err); // If there's a server error, return a 500 status

      return res.json("Post has been created."); // If successful, return a success message
    });
  });
};

// Function to delete a post
export const deletePost = (req, res) => {
  // Checking for JWT token to verify the user
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!"); // If no token, return a 401 Unauthorized error

  // Verifying the JWT token
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // If the token is invalid, return a 403 Forbidden error

    const postId = req.params.id; // Getting the post ID from the request parameters
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"; // SQL query to delete the post, checking both post ID and user ID

    // Executing the query to delete the post where the post ID matches and the user ID matches the logged-in user
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!"); // If the user is not the owner, return a 403 error

      return res.json("Post has been deleted!"); // If successful, return a success message
    });
  });
};

// Function to update a post
export const updatePost = (req, res) => {
  // Checking for JWT token to verify the user
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!"); // If no token, return a 401 Unauthorized error

  // Verifying the JWT token
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // If the token is invalid, return a 403 Forbidden error

    const postId = req.params.id; // Getting the post ID from the request parameters
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?"; // SQL query to update the post details

    // Collecting the updated post data from the request body
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    // Executing the query to update the post where both the post ID and user ID match
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err); // If there's a server error, return a 500 status

      return res.json("Post has been updated."); // If successful, return a success message
    });
  });
};
