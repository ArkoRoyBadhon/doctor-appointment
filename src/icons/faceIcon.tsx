import React from "react";

const FaceIcon = ({size}:{size:number}) => {
    
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 65 65"
      fill="none"
    >
      <path
        d="M56.875 32.5C56.875 45.9619 45.9619 56.875 32.5 56.875C19.0381 56.875 8.125 45.9619 8.125 32.5C8.125 19.0381 19.0381 8.125 32.5 8.125C45.9619 8.125 56.875 19.0381 56.875 32.5Z"
        fill="#D9D9D9"
        fillOpacity="0.5"
      />
      <path
        d="M24.4021 28.4375H24.375M40.6521 28.4375H40.625M40.9573 40.625C38.9719 43.1017 35.9212 44.6875 32.5 44.6875C29.0789 44.6875 26.0281 43.1017 24.0427 40.625M56.875 32.5C56.875 19.0381 45.9619 8.125 32.5 8.125C19.0381 8.125 8.125 19.0381 8.125 32.5C8.125 45.9619 19.0381 56.875 32.5 56.875C45.9619 56.875 56.875 45.9619 56.875 32.5Z"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FaceIcon;
