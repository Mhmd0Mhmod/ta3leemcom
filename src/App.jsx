import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './UI-Global/AppLayout.jsx';
import AuthProvider from 'react-auth-kit';
import { store } from './auth/authStore.js';
import { Spinner } from './UI-Global/Spinner.jsx';

const Home = React.lazy(() => import('./pages/Home/Home.jsx'));
const About = React.lazy(() => import('./pages/About/About.jsx'));
const Services = React.lazy(() => import('./pages/Services/Services.jsx'));
const Instructions = React.lazy(() => import('./pages/Instuctions/Instructions.jsx'));
const Subscriptions = React.lazy(() => import('./pages/Subscriptions/Subscriptions.jsx'));
const Opinion = React.lazy(() => import('./pages/Opinion/Opinion.jsx'));
const ContactWithUs = React.lazy(() => import('./pages/ContactWithUs/ContactWithUs.jsx'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound/PageNotFound.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard.jsx'));
const AddStudent = React.lazy(() => import('./Features/student/AddStudent.jsx'));
const AddGroup = React.lazy(() => import('./Features/group/AddGroup.jsx'));
const Level = React.lazy(() => import('./pages/Dashboard/subpages/TeacherDashboard/Components/Level.jsx'));
const Test = React.lazy(() => import('./pages/Dashboard/subpages/TeacherDashboard/Components/Test.jsx'));
const Toppers = React.lazy(() => import('./Features/toppers/Toppers.jsx'));
const GroupDetails = React.lazy(() => import('./Features/group/GroupDetails.jsx'));
const StudentTest = React.lazy(() => import('./pages/Dashboard/subpages/StudentDashboard/Components/StudentTest.jsx'));
const StudentMonths = React.lazy(() => import('./pages/Dashboard/subpages/StudentDashboard/Components/StudentMonths.jsx'));
const EditGroupDetails = React.lazy(() => import('./Features/group/EditGroupDetails.jsx'));
const StudentDetails = React.lazy(() => import('./Features/student/StudentDetails.jsx'));

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
