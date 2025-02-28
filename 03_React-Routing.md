# React Routing with react-router-dom

## Introduction
This guide demonstrates how to set up routing in a React application using `react-router-dom`.

## Installation
Ensure you have `react-router-dom` installed in your project:

```sh
npm install react-router-dom
```

## Code Implementation
Below is an example of how to implement routing in a React app using `BrowserRouter`, `Routes`, and `Route`.

### App Component
Create an `App.js` file and define the routing structure:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

### Layout Component
Create `Layout.js` to provide a navigation structure with Bootstrap:

```jsx
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      {/* Navbar using Bootstrap classes */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Brand Link */}
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          {/* Navbar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Outlet for nested components */}
      <Outlet />
      {/* Footer Section */}
      <div style={{ height: "10vh", backgroundColor: "lightblue" }}>Footer</div>
    </div>
  );
}
```

### Individual Page Components
Create separate components for each page.

#### Home Component (`Home.js`)
```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

#### About Component (`About.js`)
```jsx
export default function About() {
  return <h1>About Us Page</h1>;
}
```

#### Contact Component (`Contact.js`)
```jsx
export default function Contact() {
  return <h1>Contact Page</h1>;
}
```

## Explanation
- `BrowserRouter` enables navigation between different routes.
- `Routes` contains all the `Route` elements.
- `Route path="/" element={<Layout />}` acts as a parent route, wrapping the `Home`, `About`, and `Contact` components.
- `Outlet` in `Layout.js` renders the child routes inside it.
- Bootstrap is used for styling the navigation bar.
- A footer is added for layout completeness.

## Running the Application
Start the development server:

```sh
npm start
```

Now, you can navigate to `/`, `/about`, and `/contact` to see different pages.

## Conclusion
This setup provides a basic routing structure in React. You can further enhance it by adding navigation links and additional routes.

