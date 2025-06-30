import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import ContactPage from "./pages/ContactPage";
import "./styles/pages.css";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";
import DeveloperInfoPopup from "./components/DeveloperInfo/DeveloperInfoPopup";
import ChatbotComponents from "./components/Chatbot/ChatbotComponents"

const App =()=> {
  const [showPopup, setShowPopup] = useState(true);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
    <div>
        {/* Your main application content */}
        <DeveloperInfoPopup
          show={showPopup}
          onClose={handleClosePopup}
          studentName="Pranit Tukaram Patil"
          studentPhotoUrl="\public\image\pranit.jpg" // Path to their photo
          uniqueMessage="Learned so much during this OJT! This app showcases my independent coding and deployment skills"
        />
      
      </div>
    <Router>
      <div className="main-layout">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      
      </div>
    </Router>
    <ChatbotComponents/>
    </>
  );
}
export default App;
