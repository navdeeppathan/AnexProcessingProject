import React from "react";
import SimpleHeader from "../utils/SimpleHeader";

const ThankyouPage = () => {
  return (
    <div className="bg-white">
      <SimpleHeader />
      <div className="flex flex-col items-center mt-10 justify-center">
        {/* Header */}

        {/* Content Box */}

        {/* Thank You Image */}
        <img
          src="/thankyou.jpg" // Make sure the image is in the 'public' folder
          alt="Thank You"
          className="w-[46rem]  h-[25rem]"
        />

        {/* Success Message */}
        <p className="mt-4 font-bold text-lg">
          You have successfully submitted your signature
        </p>
      </div>
    </div>
  );
};

export default ThankyouPage;
