import React, { useState } from "react"; // Import necessary libraries from React
import ReactQuill from "react-quill"; // Import the ReactQuill component for rich text editing
import "react-quill/dist/quill.snow.css"; // Import the styles for ReactQuill
import axios from "axios"; // Import axios for making HTTP requests
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks for routing
import moment from "moment"; // Import moment for date formatting

const Write = () => {
  // Retrieve the state passed through the location (if any, e.g., for editing a post)
  const state = useLocation().state;

  // Initialize state variables for the title, content, image file, and category
  const [value, setValue] = useState(state?.title || ""); // Initialize editor content
  const [title, setTitle] = useState(state?.desc || ""); // Initialize title
  const [file, setFile] = useState(null); // Initialize file state for image upload
  const [cat, setCat] = useState(state?.cat || ""); // Initialize category

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle file upload to the server
  const upload = async () => {
    try {
      const formData = new FormData(); // Create a new FormData object
      formData.append("file", file); // Append the file to the FormData
      const res = await axios.post("/upload", formData); // Make a POST request to upload the file
      return res.data; // Return the uploaded file URL
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  // Function to handle form submission (save or publish the post)
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const imgUrl = await upload(); // Upload the image and get the URL

    try {
      // Check if editing an existing post (state exists)
      state
        ? await axios.put(`/posts/${state.id}`, { // Update the existing post
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "", // Use the uploaded image URL if a file is provided
          })
        : await axios.post(`/posts/`, { // Otherwise, create a new post
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "", // Use the uploaded image URL if a file is provided
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // Set the current date
          });
      navigate("/"); // Redirect to the home page after saving the post
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  return (
    <div className="add"> {/* Main container for the Write component */}
      <div className="content">
        <input
          type="text"
          placeholder="Title" // Placeholder for the title input
          onChange={(e) => setTitle(e.target.value)} // Update title state on change
        />
        <div className="editorContainer">
          <ReactQuill // Render the ReactQuill editor for rich text editing
            className="editor"
            theme="snow"
            value={value} // Set the value of the editor
            onChange={setValue} // Update state on editor change
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1> {/* Publish section header */}
          <span>
            <b>Status: </b> Draft {/* Current status */}
          </span>
          <span>
            <b>Visibility: </b> Public {/* Visibility status */}
          </span>
          <input
            style={{ display: "none" }} // Hidden input for file selection
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])} // Update file state on file selection
          />
          <label className="file" htmlFor="file"> {/* Label to trigger file input */}
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button> {/* Button to save as draft */}
            <button onClick={handleClick}>Publish</button> {/* Button to publish post */}
          </div>
        </div>
        <div className="item">
          <h1>Category</h1> {/* Category section header */}
          <div className="cat">
            <input
              type="radio"
              checked={cat === "business"} // Check if "business" category is selected
              name="cat"
              value="business"
              id="business"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="business">Business</label> {/* Label for "business" category */}
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"} // Check if "health" category is selected
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="health">Health & Wellness</label> {/* Label for "health" category */}
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "innovation"} // Check if "innovation" category is selected
              name="cat"
              value="innovation"
              id="innovation"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="innovation">Innovation</label> {/* Label for "innovation" category */}
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "lifestyle"} // Check if "lifestyle" category is selected
              name="cat"
              value="lifestyle"
              id="lifestyle"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="lifestyle">Lifestyle</label> {/* Label for "lifestyle" category */}
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "finance"} // Check if "finance" category is selected
              name="cat"
              value="finance"
              id="finance"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="finance">Finance</label> {/* Label for "finance" category */}
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "sustainability"} // Check if "sustainability" category is selected
              name="cat"
              value="sustainability"
              id="sustainability"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="sustainability">Sustainability</label> {/* Label for "sustainability" category */}
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "culture"} // Check if "culture" category is selected
              name="cat"
              value="culture"
              id="culture"
              onChange={(e) => setCat(e.target.value)} // Update category state on selection
            />
            <label htmlFor="culture">Culture</label> {/* Label for "culture" category */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write; // Export the Write component for use in other parts of the application
