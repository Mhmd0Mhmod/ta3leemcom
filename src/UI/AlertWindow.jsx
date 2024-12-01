import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import Warning from "/public/Icons/warining.svg";
import { useCloseModal } from "../Context/Modal.jsx";
function AlertWindow({ title, description, onConfirm, disabled }) {
  const close = useCloseModal();
  return (
    <div className={"flex h-full flex-col items-center justify-center gap-10 p-10 text-center"}>
      <div>
        <Warning className={"m-auto"} />
        <Heading as={"h2"}>{title}</Heading>
      </div>
      <p>{description || "ستؤدي هذه العملية إلى الإزالة  من قاعدة البيانات، بما في ذلك أي معلومات متعلقة به.هل أنت متأكد؟"}</p>
      <div className={"flex justify-center gap-10"}>
        <Button disabled={disabled} className={"px-20 disabled:cursor-not-allowed disabled:bg-gray-600"} onClick={onConfirm}>
          نعم ، حذف !
        </Button>
        <Button disabled={disabled} type={"normal"} className={"bg-gray-500 px-20 disabled:cursor-not-allowed disabled:bg-gray-600"} onClick={close}>
          لا ، الغاء
        </Button>
      </div>
    </div>
  );
}

export default AlertWindow;
