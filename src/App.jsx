import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Instructions from "./pages/Instructions";
import Subscriptions from "./pages/Subscriptions";
import Opinion from "./pages/Opinion";
import ContactWithUs from "./pages/ContactWithUs";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";

function App() {
 return (
  <>
   <Router>
    <Routes>
     <Route element={<AppLayout />}>
      <Route index element={<Navigate replace to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="instructions" element={<Instructions />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="opinion" element={<Opinion />} />
      <Route path="contact-with-us" element={<ContactWithUs />} />
      <Route path="dashboard" element={<Dashboard />} />
     </Route>

     <Route path="*" element={<PageNotFound />} />
    </Routes>
   </Router>
  </>
 );
}

export default App;
