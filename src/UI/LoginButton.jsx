import ModalWithRoutes from "../Context/ModalWithRoutes";
import Button from "./Button";
import ForgetPassword from "./ForgetPassword";
import LoginOptions from "./LoginOptions";
import ModalRightStyle from "./ModalRightStyle";
import StudentLogin from "./StudentLogin";
import TeacherLogin from "./TeacherLogin";

function LoginButton() {
  return (
    <>
      <ModalWithRoutes.OpenModal id={"login"} to={"loginOptions"}>
        <Button className={"bg-transparent text-primary"}>تسجيل الدخول</Button>
      </ModalWithRoutes.OpenModal>
      <ModalWithRoutes.Content id={"login"}>
        <div className={"flex h-full w-full"}>
          <div className="w-1/2 space-y-20 p-8">
            <ModalWithRoutes.Outlet />
          </div>
          <ModalRightStyle />
        </div>
      </ModalWithRoutes.Content>
    </>
  );
}

export default LoginButton;
