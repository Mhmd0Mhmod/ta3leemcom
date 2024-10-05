import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './UI-Global/AppLayout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Services from './pages/Services/Services.jsx';
import Instructions from './pages/Instuctions/Instructions.jsx';
import Subscriptions from './pages/Subscriptions/Subscriptions.jsx';
import Opinion from './pages/Opinion/Opinion.jsx';
import ContactWithUs from './pages/ContactWithUs/ContactWithUs.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

import AuthProvider from 'react-auth-kit';
import { store } from './auth/authStore.js';
import AddStudent from './Features/student/AddStudent.jsx';
import AddGroup from './Features/group/AddGroup.jsx';
import Level from './pages/Dashboard/subpages/TeacherDashboard/Components/Level.jsx';
import Test from './pages/Dashboard/subpages/TeacherDashboard/Components/Test.jsx';
import Students from './pages/Dashboard/subpages/TeacherDashboard/Components/Students.jsx';
import Months from './pages/Dashboard/subpages/TeacherDashboard/Components/Months.jsx';
import Toppers from './Features/toppers/Toppers.jsx';
import AddOnlineTest from './Features/test/AddOnlineTest.jsx';
import Tests from './Features/test/Tests.jsx';
import GroupDetails from './Features/group/GroupDetails.jsx';
import StudentDetails from './Features/student/StudentDetails.jsx';

function App() {
  return (
    <>
      <AuthProvider store={store}>
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
              <Route path="dashboard" element={<Dashboard />}>
                {/* Teacher Dashboard Routes */}
                <Route path="addStudent" element={<AddStudent />} />
                <Route path="studentDetails/:id" element={<StudentDetails />} />
                <Route path="addGroup" element={<AddGroup />} />
                <Route path="addGroup/:id" element={<GroupDetails />} />

                <Route path="level" element={<Level />} />
              </Route>
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
