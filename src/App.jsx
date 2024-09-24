import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import AppLayout from './UI-Global/AppLayout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Services from './pages/Services/Services.jsx';
import Instructions from './pages/Instuctions/Instructions.jsx';
import Subscriptions from './pages/Subscriptions/Subscriptions.jsx';
import Opinion from './pages/Opinion/Opinion.jsx';
import ContactWithUs from './pages/ContactWithUs/ContactWithUs.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import SingUpForm from './UI-Global/MainRegister/Components/SingUpForm.jsx';
import MainRegister from './UI-Global/MainRegister/MainRegister.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import TeacherLoginForm from '@/UI-Global/MainRegister/Components/TeacherLoginForm.jsx';
import StudentLoginForm from '@/UI-Global/MainRegister/Components/StudentLoginForm.jsx';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route index element={<Navigate replace to="home"/>}/>
                        <Route path="home" element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="services" element={<Services/>}/>
                        <Route path="instructions" element={<Instructions/>}/>
                        <Route path="subscriptions" element={<Subscriptions/>}/>
                        <Route path="opinion" element={<Opinion/>}/>
                        <Route path="contact-with-us" element={<ContactWithUs/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                    </Route>

                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;