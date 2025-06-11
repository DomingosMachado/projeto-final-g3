import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  );
}
