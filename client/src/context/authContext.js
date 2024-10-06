// Importing necessary modules
import axios from "axios"; // Axios is used for making HTTP requests
import { createContext, useEffect, useState } from "react"; // React hooks and createContext to manage state and context

// Creating the AuthContext using React's createContext to handle user authentication globally
export const AuthContext = createContext();

// AuthContexProvider is a component that will wrap other components to provide authentication state and functionality
export const AuthContexProvider = ({ children }) => {
  // State to store the current user's information
  // When the component is initialized, it checks if a user is stored in localStorage and sets the user if found
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function to handle user login
  const login = async (inputs) => {
    // Sending a POST request to the "/auth/login" endpoint with the login inputs (credentials)
    const res = await axios.post("/auth/login", inputs);

    // After successfully logging in, the response (user data) is stored in the state as the current user
    setCurrentUser(res.data);
  };

  // Function to handle user logout
  const logout = async () => {
    // Sending a POST request to the "/auth/logout" endpoint to log the user out
    await axios.post("/auth/logout");

    // After logging out, set the current user to null
    setCurrentUser(null);
  };

  // useEffect hook to store the current user in localStorage whenever the user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]); // The effect will run every time currentUser changes

  // Returning the AuthContext.Provider with the currentUser, login, and logout functions as context values
  // This will make them accessible to any component wrapped by AuthContexProvider
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
