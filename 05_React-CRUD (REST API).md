# React CRUD App Implementation Guide

## Introduction
This guide provides a step-by-step implementation of a simple CRUD (Create, Read, Update, Delete) application using React and a backend API (MERN).

## Step 1: Start the Backend(node) Server
```sh
cd server
node server.js
```

## Step 2: Setup React Project
```sh
npm create vite@latest client
cd client
npm install
npm run dev
```

## Step 3: Install Required Dependencies
```sh
npm install react-router-dom
```

## Step 4: Define Project Structure
```
client/
│── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── UserList.jsx
│── package.json
```

## Step 5: Implement `UserList.jsx`
Create `src/UserList.jsx` to display the user list.
```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserList() {
    const API_URL = "http://localhost:3030/api/users"; // API base URL

    const [users, setUsers] = useState([]); // State to store user list

    // Function to fetch all users from the API
    const fetchusers = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setUsers(data)) // Store response data in state
            .catch((err) => console.error(err));
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchusers();
    }, []);

    // Function to delete a user by ID
    const deleteUser = (id) => {
        fetch(`${API_URL}/delete/${id}`, { method: "DELETE" })
            .then(() => fetchusers()) // Refresh user list after deletion
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Users</h2>
            
            {/* Button to navigate to the UserForm page for adding a new user */}
            <Link to="/user-form">
                <button className="btn btn-success mb-3">Add User</button>
            </Link>

            <div className="container">
                <div className="row">
                    {/* Loop through users and display each user's data */}
                    {users.map((user) => (
                        <div key={user._id} className="col-4 card">
                            <img src={user.imgUrl} className="card-img-top" alt="User" />
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">Age: {user.age}</p>
                                <p className="card-text">Created At: {user.createdAt}</p>

                                {/* Button to navigate to the UserForm page for editing */}
                                <Link to={`/user-form/${user._id}`}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>

                                {/* Delete button */}
                                <button className="btn btn-danger mx-2" onClick={() => deleteUser(user._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
```

## Step 6: Implement `UserForm.jsx`
Create `src/UserForm.jsx` for adding/editing users.
```jsx
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
```

## Step 7: Implement `App.jsx`
Create `src/App.jsx` to handle routing.
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./UserList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for listing users */}
        <Route path="/" element={<UserList />} />

        {/* Route for adding/editing users */}
        <Route path="/user-form/:id?" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Conclusion
This guide walked through setting up a basic React CRUD application that interacts with a backend API. You can enhance this by adding form validation, styling, and error handling!

