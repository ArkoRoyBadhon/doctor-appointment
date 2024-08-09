import { getAllDoctorsData } from "@/utils/fetchingData";
import Image from "next/image"; // Assuming you're using Next.js Image component
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


const TopDoctors: React.FC = async () => {
  const data = await getAllDoctorsData({
    limit: "3"
  });


  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-4xl font-bold mb-10">Meet Our Top Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data?.doctors.map((doctor: { _id: string; picture: string; name: string; location: string }, index: number) => (
            <Link href={`/details/${doctor._id}`} key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <Image
                src={doctor.picture}
                alt={doctor.name}
                width={150}
                height={150}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.location}</p>
            </Link>
          ))}
          <Link href="/doctors" className="border border-borderColor hover:bg-borderColor rounded-md flex flex-col justify-center items-center transition-all ease-in">
            <p className="font-bold">Explore More</p>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
