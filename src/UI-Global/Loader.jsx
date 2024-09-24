import {
 CircleCheck,
 X,
 AlertTriangle,
 Loader2,
 RotateCw,
 Fullscreen,
} from "lucide-react";
import ErrorIcon from "../../public/Icons/error_icon.svg";

const FileUpload = ({
 state,
 progress,
 onCancel,
 onRemove,
 openModel,
 fileName,
 fileSize,
}) => {
 let icon = <Loader2 className="animate-spin text-note-100 " />;

 if (state === "finished") {
  icon = <CircleCheck className="text-note-200" />;
 } else if (state === "failed") {
  icon = <ErrorIcon className="text-note-300" />;
 }

 return (
  // <div className="ltr w-full p-4 border border-gray-300 rounded-md">
  //  <div className="flex justify-between items-center mb-4 ">
  //   {icon}
  //   <div className="flex items-center w-full">
  //    <span className="ml-2 text-lg">
  //     {fileName} {fileSize}
  //    </span>
  //    <span className="ml-auto text-lg">{progress}%</span>
  //   </div>
  //   <button className=" ml-4 ">
  //    {state === "failed" ? <RotateCw /> : <X />}
  //   </button>
  //  </div>

  //  {/* Progress Bar */}
  //  <div className="w-full bg-gray-200 h-4 rounded-lg">
  //   <div
  //    className={`h-full rounded-lg ${
  //     state === "loading"
  //      ? "bg-note-100"
  //      : state === "finished"
  //      ? "bg-note-200"
  //      : "bg-note-300"
  //    }`}
  //    style={{ width: `${progress}%` }}
  //   ></div>
  //  </div>
  //  {/* Status Text */}

  //  {state === "failed" && (
  //   <p className="text-center mt-2 text-red-500">
  //    حدث خطأ أثناء تحميل الملف. يرجى المحاولة مرة أخرى.
  //   </p>
  //  )}
  //  </div>
  <div className="flex gap-4 w-full ltr ">
   <div>{icon}</div>
   <div className="w-full ">
    <div className="mb-2 flex justify-between  ">
     <span className="text-xl">
      {fileName} {fileSize}
     </span>
     <span
      className="text-lg"
      style={{ opacity: state === "failed" ? "0" : "100" }}
     >
      {progress}%
     </span>
    </div>
    <div className="w-full  h-4 rounded-lg flex items-center gap-4 ">
     <div
      className={`h-full rounded-lg ${
       state === "loading"
        ? "bg-note-100"
        : state === "finished"
        ? "bg-note-200"
        : "bg-note-300"
      }`}
      style={{ width: `${progress}%` }}
     ></div>
    </div>
    <div
     className="rtl mt-3 text-note-300 font-almaria"
     style={{ opacity: state === "failed" ? "100" : "0" }}
    >
     {state === "failed"
      ? "حدث خطأ أثناء تحميل الملف. يرجى المحاولة مرة أخرى."
      : "جاري التحميل..."}
    </div>
   </div>
   <button className=" ml-auto self-center  ">
    {state === "failed" ? (
     <RotateCw onClick={onCancel} />
    ) : (
     <X onClick={onRemove} />
    )}
   </button>
   <button>
    <Fullscreen onClick={openModel} />
   </button>
  </div>
 );
};

export default FileUpload;
