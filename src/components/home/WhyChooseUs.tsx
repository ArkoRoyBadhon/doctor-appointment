import Image from "next/image";
import { FaHeartPulse } from "react-icons/fa6";
import { GiDna2 } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const WhyChooseUs = () => {
  return (
    <div className="relative h-[400px] w-full lg:h-screen bg-cover bg-center mb-[122px]">
      {/* <div className="relative h-[400px] w-full lg:h-screen bg-blue-200 bg-[url('/images/dna-img.jpg')] bg-cover bg-center mb-[122px]"> */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-28 z-20">
        <div className="bg-white shadow-md w-[90vw] lg:w-[75vw] lg:h-[160px] rounded-md grid grid-cols-2 lg:grid-cols-4 px-6 py-8">
          <div className="flex flex-col items-center">
            <h4 className="text-4xl lg:text-5xl font-bold text-[#009198]">
              3.2K+
            </h4>
            <p className="text-sm text-slate-600 font-medium">Happy clients</p>
          </div>
          <div className="flex flex-col items-center lg:mt-0">
            <h4 className="text-4xl lg:text-5xl font-bold text-[#009198]">
              500+
            </h4>
            <p className="text-sm text-slate-600 font-medium">Doctors</p>
          </div>
          <div className="flex flex-col items-center mt-4 lg:mt-0">
            <h4 className="text-4xl lg:text-5xl font-bold text-[#009198]">
              41+
            </h4>
            <p className="text-sm text-slate-600 font-medium">Award wins</p>
          </div>
          <div className="flex flex-col items-center mt-4 lg:mt-0">
            <h4 className="text-4xl lg:text-5xl font-bold text-[#009198]">
              600+
            </h4>
            <p className="text-sm text-slate-600 font-medium">Clients work</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[#009198] py-14 lg:py-28">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4 lg:px-8">
          <div className="flex-1">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-10 lg:mb-20">
              Why Choose Us
            </h3>
            <div className="flex gap-3 mt-8">
              <FaHeartPulse className="text-6xl lg:text-7xl text-white" />
              <div>
                <h4 className="text-base lg:text-lg font-semibold text-slate-50">
                  Quality Control System
                </h4>
                <p className="text-sm lg:text-base text-slate-300">
                  It is a long established fact that a reader will be distracted
                  by the readable content.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <IoIosPeople className="text-6xl lg:text-7xl text-white" />
              <div>
                <h4 className="text-base lg:text-lg font-semibold text-slate-50">
                  Highly Professional Staff
                </h4>
                <p className="text-sm lg:text-base text-slate-300">
                  It is a long established fact that a reader will be distracted
                  by the readable content.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0 hidden md:block">
            <div className="relative">
              <Image
                src="/images/doctor-1.jpg"
                alt="Doctor one"
                height={360}
                width={640}
                className="w-full h-auto"
              />
              <Image
                src="/images/doctor-2.jpg"
                alt="Doctor two"
                height={180}
                width={320}
                className="hidden lg:block absolute -right-10 -bottom-10 z-10 shadow border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
