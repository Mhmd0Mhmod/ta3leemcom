import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import ModalWithRoutes from "../Context/ModalWithRoutes.jsx";
import LoginOptions from "./LoginOptions.jsx";
import TeacherLogin from "./TeacherLogin.jsx";
import StudentLogin from "./StudentLogin.jsx";
import ForgetPassword from "./ForgetPassword.jsx";
import SignupForm from "./SignupForm.jsx";
import VerifyAccount from "./VerifyAccount.jsx";
import { Provider } from "react-redux";
import { store } from "../Stores/ReduxStore.js";
import Profile from "../Pages/Profile.jsx";
const RoutesOfModal = [
  {
    to: "loginOptions",
    component: <LoginOptions />,
  },
  {
    to: "teacherLogin",
    component: <TeacherLogin />,
  },
  {
    to: "studentLogin",
    component: <StudentLogin />,
  },
  {
    to: "forgetPassword",
    component: <ForgetPassword />,
  },
  {
    to: "signup",
    component: <SignupForm />,
  },
  {
    to: "verifyAccount",
    component: <VerifyAccount />,
  },
  {
    to: "profile",
    component: <Profile />,
  },
];

function AppLayout() {
  return (
    <Provider store={store}>
      <ModalWithRoutes routes={RoutesOfModal}>
        <div className={"container flex flex-col"}>
          <Header />
          <main className={"my-2 max-w-full flex-grow overflow-y-auto overflow-x-hidden"}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ModalWithRoutes>
    </Provider>
  );
}

export default AppLayout;
