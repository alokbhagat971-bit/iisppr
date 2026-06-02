import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CourseDifferentPage from "./pages/CourseDifferentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
            </>
          }
        />
        <Route
          path="/course-different"
          element={<CourseDifferentPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}