import React from "react";

const Loading = ({ size = "32" }) => {
  const spinnerSize = `${size}px`;
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-spin rounded-full border-b-2 border-t-2 border-gray-900" style={{ width: spinnerSize, height: spinnerSize }}></div>
    </div>
  );
};

export default Loading;
