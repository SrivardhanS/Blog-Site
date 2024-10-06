import React, { useContext } from "react"; // Importing React and useContext hook for accessing context
import { Link } from "react-router-dom"; // Importing Link for navigation
import { AuthContext } from "../context/authContext"; // Importing AuthContext to access authentication-related functions
import Logo from "../img/logo.png"; // Importing logo image

// Defining the Navbar component
const Navbar = () => {
  // Using useContext to access currentUser and logout function from AuthContext
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          {/* Link to the home page with the logo image */}
          <Link to="/">
            <img src={Logo} alt="Logo" /> {/* Displaying the logo */}
          </Link>
        </div>
        <div className="links">
          {/* Navigation links for different categories */}
          <Link className="link" to="/?cat=business">
            <h6>BUSINESS</h6>  {/* Navigates to homepage with cat=business */}
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>HEALTH & WELLNESS</h6>  {/* Navigates to homepage with cat=health */}
          </Link>
          <Link className="link" to="/?cat=innovation">
            <h6>INNOVATION</h6>  {/* Navigates to homepage with cat=innovation */}
          </Link>
          <Link className="link" to="/?cat=lifestyle">
            <h6>LIFESTYLE</h6>  {/* Navigates to homepage with cat=lifestyle */}
          </Link>
          <Link className="link" to="/?cat=finance">
            <h6>FINANCE</h6>  {/* Navigates to homepage with cat=finance */}
          </Link>
          <Link className="link" to="/?cat=sustainability">
            <h6>SUSTAINABILITY</h6>  {/* Navigates to homepage with cat=sustainability */}
          </Link>
          <Link className="link" to="/?cat=culture">
            <h6>CULTURE</h6>  {/* Navigates to homepage with cat=culture */}
          </Link>

          <span>{currentUser?.username}</span> {/* Displaying the username of the current user if logged in */}
          {currentUser ? (
            // If a user is logged in, show the Logout option
            <span onClick={logout}>Logout</span>
          ) : (
            // If no user is logged in, show the Login link
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {/* Link to write a new post */}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

// Exporting the Navbar component for use in other parts of the app
export default Navbar;
