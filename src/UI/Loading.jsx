import React from "react";

const Loading = ({ size = "64" }) => {
  const spinnerSize = `${size}px`;
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-gray-200 border-t-white" style={{ width: spinnerSize, height: spinnerSize }}></div>
    </div>
  );
};

export default Loading;
