import React, { useState } from "react";

const ProfileSetting = () => {
  const [smsPreferences, setSmsPreferences] = useState({
    recommendations: true,
  });

  const [emailPreferences, setEmailPreferences] = useState({
    recommendations: true,
    newsletter: true,
  });

  const [saveAddress, setSaveAddress] = useState(false);

  const handleToggle = (type, preference) => {
    if (type === "sms") {
      setSmsPreferences((prev) => ({
        ...prev,
        [preference]: !prev[preference],
      }));
    } else if (type === "email") {
      setEmailPreferences((prev) => ({
        ...prev,
        [preference]: !prev[preference],
      }));
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-extrabold text-black mb-6">Settings</h2>
      
      {/* SMS Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-extrabold text-black mb-3">SMS Preferences</h3>
        <div className="flex justify-between items-center p-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-semibold text-black">Recommendations & Reminders</p>
            <p className="text-sm text-gray-500 mt-1">
              Keep this on to receive offer recommendations & timely reminders based on your interests
            </p>
          </div>
          <div
          onClick={() => setSaveAddress(!saveAddress)}
          className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${saveAddress ? "bg-[#4BAF50]" : "bg-gray-300"}`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${saveAddress ? "transform translate-x-6" : ""} bg-white`}
          ></span>
        </div>
        </div>
      </div>

      {/* Email Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-extrabold text-black mb-3">Email Preferences</h3>
        
        {/* Email Recommendations */}
        <div className="flex justify-between items-center p-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-semibold text-black">Recommendations & Reminders</p>
            <p className="text-sm text-gray-500 mt-1">
              Keep this on to receive offer recommendations & timely reminders based on your interests
            </p>
          </div>
          <div
          onClick={() => setSaveAddress(!saveAddress)}
          className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${saveAddress ? "bg-[#4BAF50]" : "bg-gray-300"}`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${saveAddress ? "transform translate-x-6" : ""} bg-white`}
          ></span>
        </div>
        </div>

        {/* Email Newsletter */}
        <div className="flex justify-between items-center p-4 mt-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-semibold text-black">Newsletter</p>
            <p className="text-sm text-gray-500 mt-1">
              Subscribe to the newsletter for promotions & offers
            </p>
          </div>
          <div
          onClick={() => setSaveAddress(!saveAddress)}
          className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${saveAddress ? "bg-[#4BAF50]" : "bg-gray-300"}`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${saveAddress ? "transform translate-x-6" : ""} bg-white`}
          ></span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
