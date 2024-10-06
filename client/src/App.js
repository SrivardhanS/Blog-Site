// Import necessary components from react-router-dom for routing functionality
import {
  createBrowserRouter, // Used to create a router instance
  RouterProvider,      // Provides the created router to the application
  Route,               // Represents a route path in the application
  Outlet               // Acts as a placeholder for nested routes
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";       
import Write from "./pages/Write";       
import Home from "./pages/Home";         
import Single from "./pages/Single";     
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"                    

// Layout component that acts as a wrapper for pages, rendering Navbar at the top and Footer at the bottom
const Layout = () => {
  return (
    <>
      <Navbar />   {/* Navbar component displayed at the top of every page */}
      <Outlet />   {/* Outlet is a placeholder for nested child routes */}
      <Footer />   {/* Footer component displayed at the bottom of every page */}
    </>
  );
};

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",          // Base path of the application
    element: <Layout />, // Wrapping the base path with the Layout component
    children: [         // Defining nested routes , these pages alone will have navbar and footer
      {
        path: "/",      // Route for the Home page
        element: <Home /> // Render the Home component
      },
      {
        path: "/post/:id", // Route for viewing a single post with a dynamic ID
        element: <Single /> // Render the Single component
      },
      {
        path: "/write",  // Route for the Write page
        element: <Write /> // Render the Write component
      },
    ],
  },
  {                      // these pages wont have navbar and footer
    path: "/register",  // Route for the Register page
    element: <Register /> // Render the Register component
  },
  {
    path: "/login",     // Route for the Login page
    element: <Login />  // Render the Login component
  },
]);

// Main App component that wraps the entire application
function App() {
  return (
    <div className="app">           {/* Main app container */}
      <div className="container">   {/* Inner container for the app's content */}
        <RouterProvider router={router} /> {/* Provide the router configuration to the application */}
      </div>
    </div>
  );
}

export default App; // Export the App component as the default export
