import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
