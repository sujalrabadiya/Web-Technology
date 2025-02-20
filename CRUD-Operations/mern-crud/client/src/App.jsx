import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./UserList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for listing users */}
        <Route path="/" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}
