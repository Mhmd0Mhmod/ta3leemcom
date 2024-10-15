import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './UI-Global/AppLayout.jsx';
import AuthProvider from 'react-auth-kit';
import { store } from './auth/authStore.js';
import { Spinner } from './UI-Global/Spinner.jsx';
import AddStudent from './Features/student/AddStudent.jsx';
import AddGroup from './Features/group/AddGroup.jsx';
import Level from './pages/Dashboard/subpages/TeacherDashboard/Components/Level.jsx';
import Test from './pages/Dashboard/subpages/TeacherDashboard/Components/Test.jsx';
import Toppers from './Features/toppers/Toppers.jsx';
import GroupDetails from './Features/group/GroupDetails.jsx';
import StudentTest from './pages/Dashboard/subpages/StudentDashboard/Components/StudentTest.jsx';
import StudentMonths from './pages/Dashboard/subpages/StudentDashboard/Components/StudentMonths.jsx';
import EditGroupDetails from './Features/group/EditGroupDetails.jsx';
import StudentDetails from './Features/student/StudentDetails.jsx';

const Home = React.lazy(() => import('./pages/Home/Home.jsx'));
const About = React.lazy(() => import('./pages/About/About.jsx'));
const Services = React.lazy(() => import('./pages/Services/Services.jsx'));
const Instructions = React.lazy(() => import('./pages/Instuctions/Instructions.jsx'));
const Subscriptions = React.lazy(() => import('./pages/Subscriptions/Subscriptions.jsx'));
const Opinion = React.lazy(() => import('./pages/Opinion/Opinion.jsx'));
const ContactWithUs = React.lazy(() => import('./pages/ContactWithUs/ContactWithUs.jsx'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound/PageNotFound.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard.jsx'));

function App() {
  return (
    <>
      <AuthProvider store={store}>
        <Router>
          <Suspense fallback={<Spinner />}>
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
                  <Route path="editGroup/:id" element={<EditGroupDetails />} />
                  <Route path="level" element={<Level />} />
                  {/* Student Dashboard Routes */}
                  <Route path="tests" element={<StudentTest />} />
                  <Route path="tests/id" element={<Test />} />
                  <Route path="toppers" element={<Toppers backToLevels={false} />} />
                  <Route path="months" element={<StudentMonths />} />
                </Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
