# CRUD on Static data
To achieve **CRUD** functionality on static Data in React using **React Router**, follow these steps:

---

### **Steps to Implement**
1. **Create a FacultyList Component** – Displays faculty details, allows deletion and an "Add/Edit Faculty" button.
2. **Create a FacultyForm Component** – A separate form to **add/edit** faculty members.
3. **Use React Router** – Navigate between `FacultyList` and `FacultyForm` for adding/editing faculty members.

---

### **Updated Implementation**

#### **1️⃣ Install React Router (if not installed)**
```sh
npm install react-router-dom
```

---

#### **2️⃣ Setup Routing in `App.jsx`**
```javascript
// Import necessary modules from React and react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyList from "./FacultyList"; // Component to display faculty list
import FacultyForm from "./FacultyForm"; // Component for adding/editing faculty
import { useState } from "react"; // Hook for managing state

export default function App() {
  // State to manage the list of faculties
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: "Dr. Gopi Sanghani",
      designation: "Dean - School of Computer Science",
      imgUrl:
        "https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/5---29-04-2023-11-00-29.jpg",
    },
    {
      id: 2,
      name: "Dr. Nilesh Gambhava",
      designation: "Professor",
      imgUrl:
        "https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/3---28-04-2023-02-02-42.jpg",
    },
    {
      id: 3,
      name: "Dr. Pradyumansinh Jadeja",
      designation: "Associate Professor",
      imgUrl:
        "https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/6---28-04-2023-02-06-07.jpg",
    },
  ]);

  return (
    // Set up routing for the application
    <BrowserRouter>
      <Routes>
        {/* Route for faculty list page, passing faculties state as props */}
        <Route
          path="/"
          element={<FacultyList faculties={faculties} setFaculties={setFaculties} />}
        />
        
        {/* Route for faculty form page, optional :id parameter for editing a faculty */}
        <Route
          path="/faculty-form/:id?"
          element={<FacultyForm faculties={faculties} setFaculties={setFaculties} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
```

This code sets up a React app with two routes:  
- `/` → Displays the `FacultyList` component with the list of faculties.  
- `/faculty-form/:id?` → Displays the `FacultyForm` component for adding or editing faculty.  

It uses `useState` to manage the faculty list and passes it to both components so that they can modify it when needed.

---

#### **3️⃣ Update `FacultiesList.jsx`**
```javascript
// Import Link from react-router-dom for navigation
import { Link } from "react-router-dom";

export default function FacultiesList({ faculties, setFaculties }) {
    // Function to delete a faculty by filtering out the selected faculty
    const deleteFaculty = (id) => {
        setFaculties(faculties.filter((fac) => fac.id !== id));
    };

    return (
        <div>
            {/* Heading for the faculty list */}
            <h2>Faculties</h2>

            {/* Button to navigate to the Faculty Form for adding a new faculty */}
            <Link to="/faculty-form">
                <button className="btn btn-success mb-3">Add Faculty</button>
            </Link>

            {/* Bootstrap container for styling */}
            <div className="container">
                <div className="row">
                    {/* Mapping through faculties array to display each faculty */}
                    {faculties.map((faculty) => (
                        <div key={faculty.id} className="col-4 card">
                            {/* Faculty image */}
                            <img src={faculty.imgUrl} className="card-img-top" alt="Faculty Image" />

                            <div className="card-body">
                                {/* Faculty name */}
                                <h5 className="card-title">{faculty.name}</h5>
                                
                                {/* Faculty designation */}
                                <p className="card-text">Designation: {faculty.designation}</p>

                                {/* Link to edit the faculty, passing the ID in the URL */}
                                <Link to={`/faculty-form/${faculty.id}`}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>

                                {/* Button to delete the faculty */}
                                <button
                                    className="btn btn-danger mx-2"
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

### Explanation:  
1. **Deleting a Faculty**:  
   - `deleteFaculty` filters out the faculty with the given `id` and updates the state.  

2. **Adding a Faculty**:  
   - Clicking the "Add Faculty" button navigates to `/faculty-form`.  

3. **Editing a Faculty**:  
   - Clicking "Edit" navigates to `/faculty-form/:id`, passing the faculty ID in the URL.  

4. **Displaying Faculties**:  
   - The component maps over the `faculties` array and renders each faculty member inside a Bootstrap card.  

---

#### **4️⃣ Create `FacultyForm.jsx`**
```javascript
// Import necessary hooks from React and react-router-dom
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FacultyForm({ faculties, setFaculties }) {
  // Get the faculty ID from the URL parameters (if available)
  const { id } = useParams();
  const navigate = useNavigate();

  // State for managing faculty details (either new or existing)
  const [newFaculty, setNewFaculty] = useState({
    id: "",
    name: "",
    designation: "",
    imgUrl: "",
  });

  // useEffect to populate the form if editing an existing faculty
  useEffect(() => {
    if (id) {
      // Find the faculty with the given ID
      const facultyToEdit = faculties.find((faculty) => faculty.id === parseInt(id));
      if (facultyToEdit) setNewFaculty(facultyToEdit);
    }
  }, [id, faculties]);

  // Function to handle input field changes and update state
  const inputChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  // Function to add a new faculty or update an existing one
  const addUpdateFaculty = () => {
    if (newFaculty.id) {
      // Update existing faculty
      setFaculties(faculties.map((fac) => (fac.id === newFaculty.id ? newFaculty : fac)));
    } else {
      // Add new faculty with a unique ID
      setFaculties([
        ...faculties,
        { ...newFaculty, id: faculties.length ? faculties[faculties.length - 1].id + 1 : 1 },
      ]);
    }
    // Redirect to the faculty list page
    navigate("/");
  };

  return (
    <div className="card p-3">
      {/* Heading changes dynamically based on whether adding or editing */}
      <h2>{id ? "Edit Faculty" : "Add Faculty"}</h2>

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

      {/* Button to add or update faculty, changing text dynamically */}
      <button className="btn btn-success" onClick={addUpdateFaculty}>
        {id ? "Update Faculty" : "Add Faculty"}
      </button>
    </div>
  );
}
```

### Explanation:
1. **Editing an Existing Faculty**:
   - If an `id` is present in the URL, the form loads the faculty details using `useEffect`.
   - The `find` method searches for the faculty in the list by matching `id`.
   - If found, it updates the `newFaculty` state.

2. **Adding a New Faculty**:
   - If there is no `id`, a new faculty object is created.
   - A unique `id` is assigned by incrementing the last faculty's ID.
   - The new faculty is added to the `faculties` state.

3. **Handling Form Inputs**:
   - The `inputChange` function updates the respective field in `newFaculty`.

4. **Updating or Adding Faculty**:
   - If `newFaculty.id` exists, it updates the existing entry.
   - Otherwise, a new faculty is added.

5. **Redirecting After Submission**:
   - `navigate("/")` redirects to the faculty list page after submission.
---

### **How This Works?**
✅ `FacultiesList.jsx`
- Displays all faculties.
- Allows deleting faculty.
- Has an "Add Faculty" button, which navigates to `/faculty-form`.
- Each faculty has an "Edit" button, which navigates to `/faculty-form/:id`.

✅ `FacultyForm.jsx`
- If `id` is in the URL, it loads the existing faculty details for editing.
- Otherwise, it allows adding a new faculty.
- After submission, it updates the `faculties` state and navigates back to `/`.

✅ `App.jsx`
- Uses **React Router** to manage navigation.
- Passes `faculties` and `setFaculties` to both components.

---
