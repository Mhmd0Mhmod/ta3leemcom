import ModalWithRoutes from "../Context/ModalWithRoutes";
import Button from "./Button";
import { IoArrowBackSharp } from "react-icons/io5";
import ModalRightStyle from "./ModalRightStyle";

function SignupButton({ id }) {
  return (
    <>
      <ModalWithRoutes.OpenModal id={id} to={"signup"}>
        <Button type="primary" className={"flex items-center"}>
          انضم الينا
          <IoArrowBackSharp />
        </Button>
      </ModalWithRoutes.OpenModal>
      <ModalWithRoutes.Content id={id} className={"h-full w-full"}>
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
export default SignupButton;
