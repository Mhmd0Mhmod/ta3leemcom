import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../public/Icons/upload_icon.svg";
import { Button } from "./ui/button";

const StyledDropzone = ({ onDrop }) => {
 const onDropHandler = useCallback(
  (acceptedFiles) => {
   onDrop(acceptedFiles);
  },
  [onDrop]
 );

 const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop: onDropHandler,
  accept: {
   "image/*": [".png", ".jpg", ".jpeg"],
   "application/pdf": [],
  },
 });

 return (
  <div
   {...getRootProps()}
   className={`flex-1 bg-white border-[4px] border-secondary-l border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
    isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
   }`}
  >
   <input {...getInputProps()} />
   <div className="flex flex-col items-center justify-center ">
    <Upload />
    <p className="text-gray-400 text-2xl pt-4 pb-2">
     {isDragActive ? "افلت الملفات هنا..." : "اسحب الملفات هنا لتحميلها"}
    </p>
    <p className="text-black text-lg">او</p>
    <Button
     variant="outline"
     className="text-secondary-l border border-secondary-l hover:bg-secondary/80 hover:text-secondary-foreground py-0 px-12 my-6 "
    >
     استعراض الملفات
    </Button>
    <p className="text-sm text-gray-400">
     أنواع الملفات المدعومة :{" "}
     <span className="text-gray-700">PDF,PNG ,JPG ,JPEG</span>
    </p>
   </div>
  </div>
 );
};

export default StyledDropzone;
