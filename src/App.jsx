import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import "./Styles/pages.css";
import { useState } from "react";
import DeveloperInfoPopup from "./components/DeveloperInfo/DeveloperInfoPopup";
import ChatbotComponents from "./components/Chatbot/ChatbotComponents"
import NotFound from "./mainpage/NotFound";
import Home from "./mainpage/Home";
import Contact from "./mainpage/Contact";
import About from "./mainpage/About";
import Courses from "./mainpage/Courses";
import Admissions from "./mainpage/Admission";

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
          studentPhotoUrl="\image\pranit.jpg" // Path to their photo
          uniqueMessage="Learned so much during this OJT! This app showcases my independent coding and deployment skills"
        />
      
      </div>
    <Router>
      <div className="main-layout">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="*" element={<NotFound />} />
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
