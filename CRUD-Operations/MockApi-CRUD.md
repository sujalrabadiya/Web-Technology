# Mock API CRUD

This React component, `MockApiCRUD`, demonstrates basic CRUD (Create, Read, Update, Delete) operations using a mock API. It fetches faculty data from `MockAPI.io`, allows adding new faculty, updating existing records, and deleting faculty members.

## Steps to Set Up MockAPI.io

### Step 1: Create an Account
1. Visit [MockAPI.io](https://mockapi.io/).
2. Sign up or log in using your email or GitHub account.

### Step 2: Create a New Project
1. Click on **"Create New Project"**.
2. Enter a name for your project (e.g., `FacultyManagement`).
3. Click **Create**.

### Step 3: Create a New Resource (Endpoint)
1. Inside your project, click **"Create a new resource"**.
2. Name the resource **`faculties`**.
3. Define fields:
   - `id` (Auto-generated)
   - `name` (Faker.js => name.fullName)
   - `designation` (Faker.js => image.imageUrl)
   - `imgUrl` (Faker.js => name.jobTitle)
4. Click **Save**.
5. Copy the generated API endpoint URL (e.g., `https://your-mockapi-url.com/faculties`).
6. Replace `API_URL` in the code with your MockAPI.io endpoint.

## Code Implementation

```javascript
// Import necessary hooks from React
import { useEffect, useState } from "react";

export default function MockApiCRUD() {
  // API endpoint for mock faculties
  const API_URL = "your-mockapi-url";

  // State for storing faculty data
  const [faculties, setFaculties] = useState([]);

  // State for storing the new or edited faculty details
  const [newFaculty, setNewFaculty] = useState({
    id: "",
    name: "",
    designation: "",
    imgUrl: "",
  });

  // Function to fetch faculty data from API
  const fetchFaculties = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFaculties(data);
    } catch (err) {
      console.log("Failed to fetch faculties");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFaculties();
  }, []);

  // Handle input changes and update state
  const inputChange = (e) => {
    setNewFaculty({
      ...newFaculty,
      [e.target.name]: e.target.value,
    });
  };

  // Function to set faculty details for editing
  const editFacultyDetails = (faculty) => {
    setNewFaculty(faculty);
  };

  // Function to add or update faculty
  const addUpdateFaculty = async () => {
    if (newFaculty.name === "") {
      alert("Name is Required!");
      return;
    }
    if (newFaculty.id) {
      // Update faculty data
      await fetch(`${API_URL}/${newFaculty.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFaculty),
      });
      fetchFaculties();
    } else {
      // Add new faculty
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFaculty),
      });
      fetchFaculties();
    }
    // Reset form after operation
    setNewFaculty({
      id: "",
      name: "",
      designation: "",
      imgUrl: "",
    });
  };

  // Function to delete faculty
  const deleteFaculty = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchFaculties();
  };

  return (
    <div>
      <h2>Faculties</h2>
      <div className="card p-3 mb-3">
        <h1>Add or Update Faculty</h1>
        {/* Input field for faculty name */}
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          name="name"
          value={newFaculty.name}
          onChange={inputChange}
        />

        {/* Input field for faculty designation */}
        <input
          type="text"
          placeholder="Designation"
          className="form-control mb-2"
          name="designation"
          value={newFaculty.designation}
          onChange={inputChange}
        />


        {/* Input field for faculty image URL */}
        <input
          type="text"
          placeholder="Image URL"
          className="form-control mb-2"
          name="imgUrl"
          value={newFaculty.imgUrl}
          onChange={inputChange}
        />

        {/* Button to add or update faculty */}
        <button className="btn btn-success" onClick={addUpdateFaculty}>
          {newFaculty.id ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>
      <div className="container">
        <div className="row">
          {/* Mapping through faculties array to display each faculty */}
          {faculties.map((faculty) => (
            <div className="col-4 card" key={faculty.id}>
              {/* Faculty image */}
              <img src={faculty.imgUrl} className="card-img-top" alt="Faculty" />

              <div className="card-body">
                {/* Faculty name */}
                <h5 className="card-title">{faculty.name}</h5>

                {/* Faculty designation */}
                <p className="card-text">
                  Designation: {faculty.designation}
                </p>

                {/* Button to edit the faculty, passing the faculty object in the parameter */}
                <button
                  className="btn btn-warning"
                  onClick={() => editFacultyDetails(faculty)}
                >
                  Edit
                </button>

                {/* Button to delete the faculty, passing the faculty id in the parameter */}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteFaculty(faculty.id)}
                >
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

## How It Works
1. **Fetching Data**:
   - The `useEffect` hook calls `fetchFaculties()` when the component loads.
   - The function fetches faculty data from the mock API and updates the `faculties` state.

2. **Handling Input Changes**:
   - `inputChange` updates `newFaculty` state whenever a form field changes.

3. **Adding or Updating Faculty**:
   - If `newFaculty.id` exists, a `PUT` request updates an existing faculty.
   - Otherwise, a `POST` request adds a new faculty.
   - After adding or updating, the form resets.

4. **Editing Faculty**:
   - Clicking "Edit" sets the selected faculty’s details into the form.

5. **Deleting Faculty**:
   - Clicking "Delete" sends a `DELETE` request to remove the faculty.
   - After deletion, `fetchFaculties()` updates the displayed list.
