import React from "react";

export const Badge = ({ children, variant = "default", className = "" }) => {
  let base = "inline-block px-2 py-1 rounded-full text-xs font-medium ";
  let colors = "";

  switch (variant) {
    case "outline":
      colors = "border border-gray-300 text-gray-700 bg-transparent";
      break;
    case "secondary":
      colors = "bg-gray-200 text-gray-800";
      break;
    default:
      colors = "bg-blue-500 text-white";
  }

  return <span className={`${base} ${colors} ${className}`}>{children}</span>;
};
