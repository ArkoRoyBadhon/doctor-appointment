import Image from 'next/image';

const DoctorCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image 
        className="w-full"
        // src={doctor.image}
        src="/"
        alt="doctor"
        width={400}
        height={300}
        objectFit="cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">doctor.name</div>
        <p className="text-gray-700 text-base">
          doctor.specialty
        </p>
        <p className="text-gray-700 text-base">
          doctor.description
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">doctor.contact</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">doctor.email</span>
      </div>
    </div>
  );
};

export default DoctorCard;
