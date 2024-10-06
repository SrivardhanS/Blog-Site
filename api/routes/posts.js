import express from "express"; // Importing the express module to use Express for routing
import {
  addPost,     // Import function to handle adding a new post
  deletePost,  // Import function to handle deleting a specific post
  getPost,     // Import function to fetch a single post by ID
  getPosts,    // Import function to fetch all posts
  updatePost,  // Import function to update a specific post by ID
} from "../controllers/post.js"; // Importing post-related controller functions

const router = express.Router(); // Creating an instance of the Express Router to define routes

// Route to fetch all posts
// This sends a GET request to the root URL "/" and triggers the `getPosts` function
router.get("/", getPosts);

// Route to fetch a specific post by ID
// Sends a GET request to "/:id", where ":id" is a dynamic parameter for the post's ID
// This triggers the `getPost` function to retrieve the post with the specified ID
router.get("/:id", getPost);

// Route to add a new post
// Sends a POST request to the root URL "/" and triggers the `addPost` function to add a new post
router.post("/", addPost);

// Route to delete a specific post by ID
// Sends a DELETE request to "/:id", where ":id" is the post's ID to be deleted
// This triggers the `deletePost` function, which deletes the post with the specified ID
router.delete("/:id", deletePost);

// Route to update a specific post by ID
// Sends a PUT request to "/:id", where ":id" is the post's ID to be updated
// This triggers the `updatePost` function, which updates the post's information
router.put("/:id", updatePost);

export default router; // Exporting the router so it can be used in other parts of the application
