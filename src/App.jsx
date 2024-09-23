import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Instructions from "./pages/Instructions";
import Subscriptions from "./pages/Subscriptions";
import Opinion from "./pages/Opinion";
import ContactWithUs from "./pages/ContactWithUs";
import PageNotFound from "./pages/PageNotFound";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import SingUpForm from "./components/SingUpForm.jsx";
import MainRegister from "./components/MainRegister.jsx";
import StudentDashboard from "@/pages/StudentDashboard.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path={"signup"} element={<MainRegister rightHandeSide={<SingUpForm />} />} />
            <Route path="services" element={<Services />} />
            <Route path="instructions" element={<Instructions />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="opinion" element={<Opinion />} />
            <Route path="contact-with-us" element={<ContactWithUs />} />
            <Route path="dashboard" element={<StudentDashboard /> } />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
