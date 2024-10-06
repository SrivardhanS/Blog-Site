import React from "react"; // Import React library
import { useEffect } from "react"; // Import useEffect hook for side effects
import { useState } from "react"; // Import useState hook for state management
import { Link, useLocation } from "react-router-dom"; // Import Link for navigation and useLocation to access the current location
import axios from "axios"; // Import axios for making HTTP requests

const Home = () => {
  // Define state to hold posts data
  const [posts, setPosts] = useState([]);

  // Extract the query string from the current location (e.g., ?cat=art)
  const cat = useLocation().search;

  // useEffect hook to fetch posts when the component mounts or when the 'cat' changes
  useEffect(() => {
    // Async function to fetch data from the server
    const fetchData = async () => {
      try {
        // Make a GET request to fetch posts with the current category
        const res = await axios.get(`/posts${cat}`);
        // Update the posts state with the fetched data
        setPosts(res.data);
      } catch (err) {
        // Log any error that occurs during the request
        console.log(err);
      }
    };
    fetchData(); // Call the fetchData function
  }, [cat]); // Dependency array; the effect runs whenever 'cat' changes

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

  // Function to extract text content from HTML
  const getText = (html) => {
    // Create a new DOMParser instance to parse the HTML string
    const doc = new DOMParser().parseFromString(html, "text/html");
    // Return the text content of the parsed HTML
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {/* Map over the posts array to render each post */}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              {/* Display the post image; image source is relative to the upload directory */}
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                {/* Link to the individual post page using the post ID */}
                <h1>{post.title}</h1>
              </Link>
              {/* Display the post description text, extracted from HTML */}
              <p>{getText(post.desc)}</p>
              {/* Button for reading more; could be linked to a specific function or route */}
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; // Export the Home component for use in other parts of the application
