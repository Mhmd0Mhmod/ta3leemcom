import React, { useState } from "react";
import StyledDropzone from "../../components/StyledDropzone.jsx";
import { Fullscreen, X } from "lucide-react";
import { AlertDialog, AlertDialogContent } from "../../components/ui/alert-dialog.jsx";
import FileUpload from "../../UI-Global/Loader.jsx"; // Import the FileUpload component

const UploadBox = () => {
 const [files, setFiles] = useState([]);
 const [model, setModel] = useState({
  open: false,
  content: null,
 });

 const handleDrop = (acceptedFiles) => {
  // Add new files to the list with default state
  const newFiles = acceptedFiles.map((file) => ({
   file,
   state: "loading",
   progress: 0,
  }));
  setFiles([...files, ...newFiles]);
  newFiles.forEach(uploadFile);
 };

 const uploadFile = (fileObject) => {
  const { file } = fileObject;
  const fileIndex = files.length; // Index of the new file in state

  // Mock file upload logic
  const upload = new XMLHttpRequest();
  upload.upload.onprogress = (event) => {
   const percentCompleted = Math.round((event.loaded * 100) / event.total);
   updateFileProgress(fileIndex, percentCompleted);
  };

  upload.onload = () => {
   updateFileState(fileIndex, "finished");
  };

  upload.onerror = () => {
   updateFileState(fileIndex, "failed");
  };

  upload.open("POST", "your-upload-endpoint"); // Replace with your actual upload endpoint
  const formData = new FormData();
  formData.append("file", file);
  upload.send(formData);
 };

 const updateFileProgress = (index, progress) => {
  setFiles((prevFiles) =>
   prevFiles.map((f, i) => (i === index ? { ...f, progress } : f))
  );
 };

 const updateFileState = (index, state) => {
  setFiles((prevFiles) =>
   prevFiles.map((f, i) => (i === index ? { ...f, state } : f))
  );
 };

 const cancelUpload = (index) => {
  // Handle cancellation logic if needed
  updateFileState(index, "failed");
 };

 const removeFile = (fileToRemove) => {
  setFiles((prevFiles) => prevFiles.filter((f) => f !== fileToRemove));
 };

 return (
  <div className=" mx-auto mt-10 space-y-6 ">
   <div className="flex  items-center gap-20  ">
    <StyledDropzone onDrop={handleDrop} />

    <div className="space-y-4 flex-1">
     {files.map((fileObject, index) => (
      <FileUpload
       key={index}
       state={fileObject.state}
       progress={fileObject.progress}
       onCancel={() => {
        cancelUpload(index);
       }}
       onRemove={() => {
        removeFile(fileObject);
       }}
       openModel={() => {
        console.log(fileObject);

        if (fileObject.file.type.split("/")[0] === "image") {
         setModel({
          open: true,
          content: (
           <div className="flex flex-col items-center">
            <img
             src={URL.createObjectURL(fileObject.file)} // Use fileObject.file to get the file
             alt={fileObject.file.name} // Use fileObject.file.name for the name
             className="h-[80vh] object-cover"
            />
            <span className="text-lg text-gray-800">
             {fileObject.file.name} {/* Display the correct file name */}
            </span>
           </div>
          ),
         });
        } else if (fileObject.file.type === "application/pdf") {
         setModel({
          open: true,
          content: (
           <div className="flex flex-col items-center">
            <embed
             src={URL.createObjectURL(fileObject.file)} // Use fileObject.file for the source
             type="application/pdf"
             className="h-[80vh] w-full"
             style={{ overflow: "hidden", scrollbarWidth: "none" }}
            />
            <span className="text-lg text-gray-800">
             {fileObject.file.name} {/* Display the correct file name */}
            </span>
           </div>
          ),
         });
        } else {
         setModel({
          open: true,
          content: (
           <div className="flex flex-col items-center">
            <span className="text-lg text-gray-800">
             Cannot preview this file type: {fileObject.file.name}{" "}
             {/* Display the correct file name */}
            </span>
           </div>
          ),
         });
        }
       }}
       fileName={fileObject.file.name}
       fileSize={`${(fileObject.file.size / 1024).toFixed(2)} KB`}
      />
     ))}
    </div>
   </div>

   <AlertDialog
    open={model.open}
    className={"w-screen h-screen max-h-screen max-w-screen"}
   >
    <AlertDialogContent>
     {model.content}
     <div className="flex justify-center gap-4">
      <button onClick={() => setModel((prev) => ({ ...prev, open: false }))}>
       <X className="h-10 w-10" />
      </button>
     </div>
    </AlertDialogContent>
   </AlertDialog>
  </div>
 );
};

export default UploadBox;
