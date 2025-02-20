import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserForm() {
  const API_URL = "http://localhost:3030/api/users"; // API base URL

  const { id } = useParams(); // Get the user ID from the route parameters
  const navigate = useNavigate(); // Hook for navigation

  // State for user input fields
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    imgUrl: "",
  });

  // Fetch user details if an ID is provided (for editing)
  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => setNewUser(data)) // Populate form with user data
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Function to handle input changes
  const inputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value }); // Update state dynamically
  };

  // Function to add or update a user
  const addUpdateUser = () => {
    if (newUser._id) {
      // Update existing user (PUT request)
      fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then(() => setNewUser({ name: "", age: "", imgUrl: "" })) // Clear form after submission
        .catch((err) => console.error(err));
    } else {
      // Create new user (POST request)
      fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then(() => setNewUser({ name: "", age: "", imgUrl: "" })) // Clear form after submission
        .catch((err) => console.error(err));
    }
    
    navigate("/"); // Redirect to user list after submission
  };

  return (
    <div className="card p-3">
      <h2>{id ? "Edit User" : "Add User"}</h2>
      
      {/* Input fields for user data */}
      <input
        type="text"
        placeholder="Name"
        className="form-control mb-2"
        name="name"
        value={newUser.name}
        onChange={inputChange}
      />
      <input
        type="number"
        placeholder="Age"
        className="form-control mb-2"
        name="age"
        value={newUser.age}
        onChange={inputChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="form-control mb-2"
        name="imgUrl"
        value={newUser.imgUrl}
        onChange={inputChange}
      />
      
      {/* Submit button */}
      <button className="btn btn-success" onClick={addUpdateUser}>
        {id ? "Update User" : "Add User"}
      </button>
    </div>
  );
}
