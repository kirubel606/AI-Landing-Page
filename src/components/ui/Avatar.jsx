import React from "react";

export const Avatar = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt = "", className = "", ...props }) => {
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} {...props} />;
};

export const AvatarFallback = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-gray-300 text-gray-700 flex items-center justify-center w-full h-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
