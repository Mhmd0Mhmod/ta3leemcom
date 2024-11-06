import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Services from "./Pages/Services.jsx";
import Instructions from "./Pages/Instructions.jsx";
import Subscriptions from "./Pages/Subscriptions.jsx";
import Opinion from "./Pages/Opinion.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import AuthProvider from "react-auth-kit";
import { store as authStore } from "./Stores/authStore";
import { Toaster } from "react-hot-toast";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard.jsx";
import AddStudent from "./Pages/Teacher/AddStudent.jsx";
import EditStudent from "./Pages/Teacher/EditStudent.jsx";
import DetailsStudent from "./Pages/Teacher/DetailsStudent.jsx";
import AddGroup from "./Pages/Teacher/AddGroup.jsx";
import EditGroup from "./Pages/Teacher/EditGroup.jsx";
import GroupDetails from "./Pages/Teacher/GroupDetails.jsx";
import Level from "./Pages/Teacher/Level.jsx";
import TeacherTests from "./Pages/Teacher/Tests.jsx";
import Test from "./Pages/Test.jsx";
import CreateTest from "./Pages/Teacher/CreateTest.jsx";
import EditTest from "./Pages/Teacher/EditTest.jsx";
import TestResults from "./Pages/Teacher/TestResults.jsx";
import TestAnswers from "./Pages/TestAnswers.jsx";
import Students from "./Pages/Teacher/Students.jsx";
import Months from "./Pages/Teacher/months.jsx";
import Toppers from "./Pages/Toppers.jsx";
import StudentDashboard from "./Pages/Student/StudentDashboard.jsx";
import StudentTests from "./Pages/Student/Tests.jsx";
import Attendance from "./Pages/Student/Attendance.jsx";
import SelectLevel from "./Pages/SelectLevel.jsx";

const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <AuthProvider store={authStore}>
          <BrowserRouter>
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
                  <Route path={"student/edit/:studentId"} element={<EditStudent />} />
                  <Route path={"student/details:studentId"} element={<DetailsStudent />} />
                  <Route path={"group/add"} element={<AddGroup />} />
                  <Route path={"group/edit/:groupId"} element={<EditGroup />} />
                  <Route path={"group/details:groupId"} element={<GroupDetails />} />
                  <Route path={"level"} element={<SelectLevel />} />
                  <Route path={"level/:levelId/:levelYearId"} element={<Level />} />
                  <Route path={"tests/:groupId"} element={<TeacherTests />} />
                  <Route path={"test/:groupId/create"} element={<CreateTest />} />
                  <Route path={"test/:testId"} element={<Test />} />
                  <Route path={"test/:testId/answers"} element={<TestAnswers />} />
                  <Route path={"test/:testId/edit"} element={<EditTest />} />
                  <Route path={"test/results/:testId"} element={<TestResults />} />
                  <Route path={"students/:groupId"} element={<Students />} />
                  <Route path={"months/:groupId"} element={<Months />} />
                  <Route path={"toppers/:groupId"} element={<Toppers />} />
                </Route>
                <Route path={"SDashboard"} element={<StudentDashboard />}>
                  <Route index element={<Navigate replace to="SDashboard/test" />} />
                  <Route path={"tests"} element={<Students />} />
                  <Route path={"test/:testId"} element={<Test />} />
                  <Route path={"test/answers/:testId"} element={<TestAnswers />} />
                  <Route path={"toppers"} element={<Toppers />} />
                  <Route path={"attendance"} element={<Attendance />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster position={"top-center"} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
