"use client"
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const steps = [
  { name: 'Basic Info' },
  { name: 'Speciality' },
  { name: 'Account' },
];

const Controller = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-[20px] relative">
            <div className={` ${index === 2 && "hidden"} w-[40px] right-[-10px] top-[20px] h-[5px] absolute bg-primaryBg`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-green400 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {index < currentStep ? <FaCheck /> : index + 1}
              </div>
              <p className={`text-sm mt-2 ${index <= currentStep ? 'text-green400' : 'text-gray-600'}`}>{step.name}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center flex-auto">
                <div className={`h-1 w-full transition duration-400 ease-in-out ${index < currentStep ? 'bg-green400' : 'bg-gray-300'}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
        {currentStep === 0 && <Step1 handleNext={handleNext} />}
        {currentStep === 1 && <Step2 handleNext={handleNext} handlePrevious={handlePrevious} />}
        {currentStep === 2 && <Step3 handlePrevious={handlePrevious} />}
      </div>

      {/* <div className="flex justify-between">
        <button onClick={handlePrevious} disabled={currentStep === 0} className="bg-gray-300 text-gray-600 py-2 px-4 rounded disabled:opacity-50">Previous</button>
        <button onClick={handleNext} disabled={currentStep === steps.length - 1} className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50">Next</button>
      </div> */}
    </div>
  );
};

export default Controller;
