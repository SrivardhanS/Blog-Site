import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png"; // Import the edit icon
import Delete from "../img/delete.png"; // Import the delete icon
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import necessary hooks from react-router-dom for navigation
import Menu from "../components/Menu"; // Import the Menu component for displaying related content
import axios from "axios"; // Import axios for making HTTP requests
import moment from "moment"; // Import moment.js for date formatting
import { useContext } from "react"; // Import useContext for accessing context
import { AuthContext } from "../context/authContext"; // Import the AuthContext to access user authentication information
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML content

const Single = () => {
  // State to hold the post data
  const [post, setPost] = useState({});

  // Hooks to access location and navigation
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the navigate function for navigation

  // Extract the post ID from the URL
  const postId = location.pathname.split("/")[2];

  // Get the current user from AuthContext
  const { currentUser } = useContext(AuthContext);

  // Fetch post data when the component mounts or when the postId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to fetch the post data based on postId
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data); // Set the fetched post data to state
      } catch (err) {
        console.log(err); // Log any errors that occur during the fetch
      }
    };
    fetchData(); // Call the fetchData function
  }, [postId]); // Dependency array: run effect when postId changes

  // Function to handle post deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`); // Make a DELETE request to remove the post
      navigate("/"); // Navigate back to the homepage after deletion
    } catch (err) {
      console.log(err); // Log any errors that occur during deletion
    }
  };

  // Function to extract plain text from HTML
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent; // Return the plain text content
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" /> {/* Display the post image, using optional chaining to avoid errors if post is not loaded yet */}
        <div className="user">
          {/* Conditionally render the user image if it exists */}
          {post.userImg && (
            <img
              src={post.userImg}
              alt=""
            />
          )}
          <div className="info">
            <span>{post.username}</span> {/* Display the username of the post's author */}
            <p>Posted {moment(post.date).fromNow()}</p> {/* Display how long ago the post was made */}
          </div>
          {/* Check if the current user is the author of the post to show edit/delete options */}
          {currentUser.username === post.username && (
            <div className="edit">
              {/* Link to the edit page, passing the post data through state */}
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              {/* Button to delete the post */}
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1> {/* Display the post title */}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc), // Sanitize and display the post description as HTML
          }}
        ></p>
      </div>
      {/* Render the Menu component, passing the post category as a prop */}
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single; // Export the Single component for use in other parts of the app
