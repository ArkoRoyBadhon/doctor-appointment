import Searching from "@/components/client/Searching";
import { getAllDoctorsData, getAllSpecialization } from "@/utils/fetchingData";
import { BriefcaseMedical, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface SearchParamsType {
  searchParams: {
    page?: string;
    limit?: string;
    specialization?: string;
    gender?: string;
    name?: string;
    maxFee?: string;
    minFee?: string;
    view?: string;
  };
}

const DoctorsPage = async ({
  searchParams: {
    page,
    limit,
    specialization,
    gender,
    name,
    maxFee,
    minFee,
    view,
  },
}: SearchParamsType) => {
  const data = await getAllDoctorsData({
    page,
    limit,
    specialization,
    gender,
    name,
    maxFee,
    minFee,
  });
  const specialData = await getAllSpecialization();

  const search = {
    page,
    limit,
    specialization,
    gender,
    name,
    maxFee,
    minFee,
    view,
  };

  if (!data) {
    return (
      <div className="text-2xl font-bold text-center py-10 text-slate-800">
        Check your internet connection!
      </div>
    );
  }

  if (!data.doctors) {
    return (
      <div className="text-2xl font-bold text-center py-10 text-slate-800">
        {data?.msg}
      </div>
    );
  }

  const doctors = data.doctors;

  return (
    <>
      {/* <div className="absolute top-0 -z-10 left-0 w-full h-96 bg-[url('/images/top-bg.jpg')] bg-cover bg-bottom flex justify-center items-center">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold uppercase text-slate-800">
          Our Doctors
        </h1>
      </div> */}
      <section className="mt-[10px] w-full py-[20px] px-[10px] md:px-[40px] lg:px-[120px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="col-span-1">
          <Searching data={specialData} search={search} />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          {view === "list" ? (
            <div className="flex flex-col gap-4">
              {doctors.length > 0
                ? doctors.map((doctor: any) => (
                    <div
                      key={doctor._id}
                      className="border overflow-hidden rounded-md group flex gap-2"
                    >
                      <div className="overflow-hidden">
                        <Image
                          height={200}
                          width={180}
                          src={doctor.picture || "/images/male-doctor.jpg"}
                          alt="Male Doctor"
                          className="w-[180px] h-[200px] group-hover:scale-105 duration-150 transition-all object-cover"
                        />
                      </div>
                      <div className="p-3 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold tracking-normal">
                          {doctor.name}
                        </h3>
                        <p className="flex gap-2 items-center">
                          <Star size={16} color="#333" />
                          {doctor?.rating}
                        </p>
                        <p className="flex gap-2 items-center">
                          <BriefcaseMedical size={16} color="#333" />
                          {doctor.specialization}
                        </p>
                        <p className="mb-2 flex gap-2 items-center">
                          <MapPin size={16} color="#333" />
                          {doctor?.location}
                        </p>
                        <Link href={`/details/${doctor._id}`}>
                          <button className="bg-violet-600 hover:bg-violet-500 text-white w-full rounded-md py-3">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                : "No doctors found!"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {doctors.length > 0
                ? doctors.map((doctor: any) => (
                    <div
                      key={doctor._id}
                      className="border overflow-hidden rounded-md group"
                    >
                      <div className="w-full overflow-hidden">
                        <Image
                          height={500}
                          width={500}
                          src={doctor.picture || "/images/male-doctor.jpg"}
                          alt="Male Doctor"
                          className="w-full h-[280px] group-hover:scale-105 duration-150 transition-all"
                        />
                      </div>
                      <div className="p-3 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold tracking-normal">
                          {doctor.name}
                        </h3>
                        <p className="flex gap-2 items-center">
                          <Star size={16} color="#333" />
                          {doctor?.rating}
                        </p>
                        <p className="flex gap-2 items-center">
                          <BriefcaseMedical size={16} color="#333" />
                          {doctor.specialization}
                        </p>
                        <p className="mb-2 flex gap-2 items-center">
                          <MapPin size={16} color="#333" />
                          {doctor?.location}
                        </p>
                        <Link href={`/details/${doctor._id}`}>
                          <button className="bg-primaryBg hover:bg-primaryBgHover text-white w-full rounded-md py-3">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                : "No doctors found!"}
            </div>
          )}
        </div>
      </section>
      <div className="py-10 flex justify-center items-center gap-3">
        {Array.from({ length: Math.ceil(data.total / data.limit) }).map(
          (_, i) => (
            <Link
              href={{
                pathname: "/doctors",
                query: {
                  page: i + 1,
                  limit,
                  specialization,
                  gender,
                  name,
                  maxFee,
                  minFee,
                  view,
                },
              }}
              key={i}
              className={`${
                page === `${i + 1}` ? "bg-primaryBg text-white" : "bg-gray-200"
              } px-3 py-1 rounded-full ${
                !page && `${i + 1}` === "1" && "bg-primaryBg text-white"
              }`}
            >
              {i + 1}
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default DoctorsPage;
