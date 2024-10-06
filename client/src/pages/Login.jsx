import axios from "axios"; // Importing axios for making HTTP requests
import React, { useState } from "react"; // Importing React and useState hook for state management
import { useContext } from "react"; // Importing useContext hook for accessing context
import { Link, useNavigate } from "react-router-dom"; // Importing Link for navigation and useNavigate to redirect the user
import { AuthContext } from "../context/authContext"; // Importing AuthContext to access authentication-related functions

// Defining the Login component
const Login = () => {
  // Initializing state variables for inputs and error
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null); // State to handle error messages

  // Getting the navigate function to redirect users after login
  const navigate = useNavigate();

  // Destructuring the login function from AuthContext
  const { login } = useContext(AuthContext);

  // Function to handle input changes and update state
  const handleChange = (e) => {
    // Using the spread operator to retain previous values and update the changed field
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    try {
      // Calling the login function from the AuthContext with the input data
      await login(inputs);
      navigate("/"); // Redirecting the user to the home page on successful login
    } catch (err) {
      setError(err.response.data); // Setting the error message received from the server
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      {/* Form for user login */}
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange} // Calling handleChange on input change
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange} // Calling handleChange on input change
        />
        <button onClick={handleSubmit}>Login</button> {/* Submit button that triggers handleSubmit */}
        {/* Displaying error message if there is an error */}
        {err && <p>{err}</p>}
        <span>
          {/* Link to the register page for users who don't have an account */}
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

// Exporting the Login component for use in other parts of the app
export default Login;
