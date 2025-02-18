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
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyList from "./FacultyList";
import FacultyForm from "./FacultyForm";
import { useState } from "react";

export default function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FacultyList faculties={faculties} setFaculties={setFaculties} />} />
        <Route
          path="/faculty-form/:id?"
          element={<FacultyForm faculties={faculties} setFaculties={setFaculties} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

#### **3️⃣ Update `FacultiesList.jsx`**
```jsx
import { Link } from "react-router-dom";

export default function FacultiesList({ faculties, setFaculties }) {
    const deleteFaculty = (id) => {
        setFaculties((prev) => prev.filter((fac) => fac.id !== id));
    };
    return (
        <div>
            <h2>Faculties</h2>
            <Link to="/faculty-form">
                <button className="btn btn-success mb-3">Add Faculty</button>
            </Link>
            <div className="container">
                <div className="row">
                    {faculties.map((faculty) => (
                        <div key={faculty.id} className="col-4 card">
                            <img src={faculty.imgUrl} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{faculty.name}</h5>
                                <p className="card-text">Designation: {faculty.designation}</p>

                                <Link to={`/faculty-form/${faculty.id}`}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>

                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteFaculty(faculty.id)}
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
```

---

#### **4️⃣ Create `FacultyForm.jsx`**
```jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FacultyForm({ faculties, setFaculties }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newFaculty, setNewFaculty] = useState({
    id: "",
    name: "",
    designation: "",
    imgUrl: "",
  });

  useEffect(() => {
    if (id) {
      const facultyToEdit = faculties.find((faculty) => faculty.id === parseInt(id));
      if (facultyToEdit) setNewFaculty(facultyToEdit);
    }
  }, [id, faculties]);

  const inputChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const addUpdateFaculty = () => {
    if (newFaculty.id) {
      setFaculties((prev) =>
        prev.map((fac) => (fac.id === newFaculty.id ? newFaculty : fac))
      );
    } else {
      setFaculties([
        ...faculties,
        { ...newFaculty, id: faculties.length ? faculties[faculties.length - 1].id + 1 : 1 },
      ]);
    }
    navigate("/");
  };

  return (
    <div className="card p-3">
      <h2>{id ? "Edit Faculty" : "Add Faculty"}</h2>
      <input
        type="text"
        placeholder="Name"
        className="form-control mb-2"
        name="name"
        value={newFaculty.name}
        onChange={inputChange}
      />
      <input
        type="text"
        placeholder="Designation"
        className="form-control mb-2"
        name="designation"
        value={newFaculty.designation}
        onChange={inputChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="form-control mb-2"
        name="imgUrl"
        value={newFaculty.imgUrl}
        onChange={inputChange}
      />
      <button className="btn btn-success" onClick={addUpdateFaculty}>
        {id ? "Update Faculty" : "Add Faculty"}
      </button>
    </div>
  );
}
```

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
