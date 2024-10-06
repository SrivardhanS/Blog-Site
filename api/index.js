import express from "express";          // Import the Express.js framework
import authRoutes from "./routes/auth.js"; // Import the authentication-related routes
import userRoutes from "./routes/users.js"; // Import the user-related routes
import postRoutes from "./routes/posts.js"; // Import the post-related routes
import cookieParser from "cookie-parser";  // Import the cookie-parser middleware for parsing cookies
import multer from "multer";               // Import multer, a middleware for handling multipart/form-data (file uploads)

const app = express();                    // Initialize the Express application

app.use(express.json());                   // Middleware to parse incoming JSON request bodies
app.use(cookieParser());                   // Middleware to parse cookies from incoming requests

// Configure storage for file uploads using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {  // Define the destination for uploaded files
    cb(null, "../client/public/upload");   // Save the files in the specified folder path
  },
  filename: function (req, file, cb) {     // Define the naming convention for uploaded files
    cb(null, Date.now() + file.originalname); // Prefix the filename with the current timestamp to avoid conflicts
  },
});

// Create the multer instance with the defined storage configuration
const upload = multer({ storage });

// Define a route for handling file uploads
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;                    // Retrieve the uploaded file
  res.status(200).json(file.filename);      // Send a JSON response with the filename of the uploaded file
});

// Set up different routes for the application
app.use("/api/auth", authRoutes);           // Route for authentication-related actions (login, signup, etc.)
app.use("/api/users", userRoutes);          // Route for user-related actions (profile, user management)
app.use("/api/posts", postRoutes);          // Route for post-related actions (creating, deleting posts)

// Start the server on port 8800
app.listen(8800, () => {
  console.log("Connected!");               // Log a message to indicate the server is running
});
