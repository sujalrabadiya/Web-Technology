import { useState, useEffect } from "react";

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
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => fetchusers()) // Refresh user list after deletion
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Users</h2>

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
