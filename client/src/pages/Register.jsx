import React from "react"; // Importing React library
import { useState } from "react"; // Importing the useState hook for managing state
import { Link, useNavigate } from "react-router-dom"; // Importing Link for navigation and useNavigate to redirect the user
import axios from "axios"; // Importing axios for making HTTP requests

// Defining the Register component
const Register = () => {
  // Initializing state variables for inputs and error
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  // Getting the navigate function to redirect users after registration
  const navigate = useNavigate();

  // Function to handle input changes and update state , 
  //updating the inputs state in the handleChange function, which gets triggered every time a form field changes:
  const handleChange = (e) => {
    // Using the spread operator to retain previous values and update the changed field
    // only the changed field gets updated while keeping the other fields unchanged.
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior, to avoid auto refresh 
    try {
      // Sending a POST request to the backend with the input data
      await axios.post("/auth/register", inputs);
      navigate("/login"); // Redirecting the user to the login page on successful registration
    } catch (err) {
      setError(err.response.data); // Setting the error message received from the server
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      {/* Form for user registration */}
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange} // Calling handleChange on input change
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange} // Calling handleChange on input change
        />
        <button onClick={handleSubmit}>Register</button> {/* Submit button that triggers handleSubmit */}
        {/* Displaying error message if there is an error */}
        {err && <p>{err}</p>}
        <span>
          {/* Link to the login page for existing users */}
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

// Exporting the Register component for use in other parts of the app
export default Register;
