import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CourseDifferentPage from "../components/CourseDifferentPage";
import LandingSections from "../components/LandingSections";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CourseDifferentPage />
      <LandingSections />
      <div className="dark-zone">
        <Testimonials/>
        <Faq />
      </div>
    </>
  );
}
