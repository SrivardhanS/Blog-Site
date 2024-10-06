// Import necessary modules and libraries
import axios from "axios"; // Axios is used to make HTTP requests to the backend API
import React, { useEffect, useState } from "react"; // React hooks: useState for state management, useEffect for side effects (API calls)

const Menu = ({ cat }) => {
  // Destructure the 'cat' prop to receive the category of the current post

  // State to hold the list of posts that belong to the same category
  const [posts, setPosts] = useState([]);

  // useEffect hook to fetch related posts whenever the category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an HTTP GET request to the backend to fetch posts with the given category
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data); // Set the received posts into state
      } catch (err) {
        console.log(err); // Log any errors that occur during the request
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when 'cat' changes
  }, [cat]); // Dependency array: the effect runs when 'cat' changes

  // Sample post data is commented out since you're fetching posts from an API
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   ...
  // ];

  // Return the JSX to render the component
  return (
    <div className="menu">
      {/* Heading for the related posts section */}
      <h1>Other posts you may like</h1>
      
      {/* Map through the 'posts' array and display each post */}
      {posts.map((post) => (
        <div className="post" key={post.id}> {/* Each post must have a unique 'key' prop */}
          <img src={`../upload/${post?.img}`} alt="" /> {/* Display the post image */}
          <h2>{post.title}</h2> {/* Display the post title */}
          <button>Read More</button> {/* A placeholder 'Read More' button */}
        </div>
      ))}
    </div>
  );
};

// Export the Menu component to be used in other parts of the application
export default Menu;
