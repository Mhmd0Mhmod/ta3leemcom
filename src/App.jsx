import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import { Toaster } from "react-hot-toast";
import AddStudent from "./Pages/Teacher/AddStudent.jsx";
import EditStudent from "./Pages/Teacher/EditStudent.jsx";
import StudentDetails from "./Pages/Teacher/StudentDetails.jsx";
import AddGroup from "./Pages/Teacher/AddGroup.jsx";
import EditGroup from "./Pages/Teacher/EditGroup.jsx";
import GroupDetails from "./Pages/Teacher/GroupDetails.jsx";
import Level from "./Pages/Teacher/Level.jsx";
import TeacherTests from "./Pages/Teacher/Tests.jsx";
import Test from "./Pages/Test.jsx";
import EditTest from "./Pages/Teacher/EditTest.jsx";
import TestResults from "./Pages/Teacher/TestResults.jsx";
import TestAnswers from "./Pages/TestAnswers.jsx";
import Students from "./Pages/Teacher/Students.jsx";
import Months from "./Pages/Teacher/Months.jsx";
import Toppers from "./Pages/Toppers.jsx";
import StudentTests from "./Pages/Student/Tests.jsx";
import Attendance from "./Pages/Student/Attendance.jsx";
import SelectLevel from "./Pages/SelectLevel.jsx";
import { lazy, Suspense } from "react";
import Loading from "./UI/Loading.jsx";
import CreateTestOnline from "./Pages/Teacher/CreateTestOnline.jsx";
import CreateTestOffline from "./Pages/Teacher/CreateTestOffline.jsx";
import AuthProvider from "react-auth-kit";
import { reactAuthStore } from "./Stores/reactAuthStore.js";
import CreateTest from "./Pages/Teacher/CreateTest.jsx";

const Home = lazy(() => import("./Pages/Home.jsx"));
const About = lazy(() => import("./Pages/About.jsx"));
const Contact = lazy(() => import("./Pages/Contact.jsx"));
const Services = lazy(() => import("./Pages/Services.jsx"));
const Instructions = lazy(() => import("./Pages/Instructions.jsx"));
const Subscriptions = lazy(() => import("./Pages/Subscriptions.jsx"));
const Opinion = lazy(() => import("./Pages/Opinion.jsx"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound.jsx"));
const TeacherDashboard = lazy(() => import("./Pages/Teacher/TeacherDashboard.jsx"));
const StudentDashboard = lazy(() => import("./Pages/Student/StudentDashboard.jsx"));
const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <AuthProvider store={reactAuthStore}>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to="home" />} />
                  <Route index path="home" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="services" element={<Services />} />
                  <Route path="instructions" element={<Instructions />} />
                  <Route path="subscriptions" element={<Subscriptions />} />
                  <Route path="opinion" element={<Opinion />} />
                  <Route path={"TDashboard"} element={<TeacherDashboard />}>
                    <Route index element={<Navigate replace to="student/add" />} />
                    <Route index path={"student/add"} element={<AddStudent />} />
                    <Route path={"student/:studentId/edit"} element={<EditStudent />} />
                    <Route path={"student/:studentId"} element={<StudentDetails />} />

                    <Route path={"group/add"} element={<AddGroup />} />
                    <Route path={"group/:groupId/edit"} element={<EditGroup />} />
                    <Route path={"group/:groupId"} element={<GroupDetails />} />

                    <Route path={"level"} element={<SelectLevel />} />
                    <Route path={"level/:levelId/:levelYearId"} element={<Level />} />

                    <Route path={"tests/:groupsId"} element={<TeacherTests />} />
                    <Route path={"test/:groupsId/create"} element={<CreateTest />}>
                      <Route path={"online"} element={<CreateTestOnline />} />
                      <Route path={"offline"} element={<CreateTestOffline />} />
                    </Route>
                    <Route path={"test/:testId"} element={<Test />} />
                    <Route path={"test/:testId/answers"} element={<TestAnswers />} />
                    <Route path={"test/:testId/edit"} element={<EditTest />} />
                    <Route path={"test/results/:testId"} element={<TestResults />} />

                    <Route path={"students/:groupsId"} element={<Students />} />
                    <Route path={"months/:level/:groupsId"} element={<Months />} />
                    <Route path={"toppers/:groupsId"} element={<Toppers />} />
                  </Route>
                  <Route path={"SDashboard"} element={<StudentDashboard />}>
                    <Route index element={<Navigate replace to="SDashboard/test" />} />
                    <Route path={"tests"} element={<StudentTests />} />
                    <Route path={"test/:testId"} element={<Test />} />
                    <Route path={"test/answers/:testId"} element={<TestAnswers />} />
                    <Route path={"toppers"} element={<Toppers />} />
                    <Route path={"attendance"} element={<Attendance />} />
                  </Route>

                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </Suspense>
        <Toaster position={"top-center"} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
