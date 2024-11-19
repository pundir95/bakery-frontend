import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="login-container">
        <div className="section1 w-3/6 h-screen">
          <Image
            src={"/images/authImage.png"}
            alt="auth image"
            className="w-full h-full object-cover"
            width={500}
            height={20}
            priority={false}
          />
        </div>
        <div className="section2 w-3/6 h-screen flex items-center justify-center flex-col">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
