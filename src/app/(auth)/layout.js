import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="login-container">
        <div className="section1">
          <Image
            src={"/images/authImage.png"}
            alt="auth image"
            width={500}
            height={20}
            priority={false}
          />
        </div>
        <div className="section2">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
