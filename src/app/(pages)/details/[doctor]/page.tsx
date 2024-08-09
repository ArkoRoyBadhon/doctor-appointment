import AppointmentDetailsSidebar from "@/components/appointment/AppointmentDetailsSidebar";
import { getSingleDoctorDetails } from "@/utils/fetchingData";
import {
  Banknote,
  BriefcaseMedical,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";
import { format } from 'date-fns';

interface PropsType {
  params: {
    doctor: String;
  };
}

const DoctorDetails = async ({ params }: PropsType) => {
  const data = await getSingleDoctorDetails(params.doctor);

  if (!data?.success) {
    return (
      <div className="text-center font-bold text-2xl text-slate-800 py-10">
        {data?.message}
      </div>
    );
  }

  const {
    specialization,
    availability,
    name,
    email,
    location,
    phone,
    reviews,
    about,
    rating,
    picture,
    fee,
  } = data.doctor;

  console.log("-------", reviews);
  

  return (
    <>
      {/* <div className="absolute top-0 -z-10 left-0 w-full h-48 lg:h-96 bg-[url('/images/top-bg.jpg')] bg-cover bg-bottom flex justify-center items-center">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-slate-800">
          Details of Doctor {name}
        </h1>
      </div> */}
      <section className=" px-3 xl:px-0 max-w-6xl mx-auto py-10">
        <div className="">
          <div className="lg:col-span-3">
            <div className="border rounded overflow-hidden flex flex-col md:flex-row md:items-start gap-3">
              <div className="w-full md:h-[400px] md:w-[400px] overflow-hidden">
                <Image
                  height={262}
                  width={243}
                  src={picture || "/images/male-doctor.jpg"}
                  alt="Doctor's Photo"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-[28px] font-bold">{name}</h3>
                  <p className="flex gap-2 items-center mt-[10px]">
                    <BriefcaseMedical size={20} color="#333" />
                    {specialization}
                  </p>
                  <p className="flex gap-2 items-center">
                    <Star size={20} color="#333" />
                    {rating}
                  </p>
                  <p className="flex gap-2 items-center">
                    <Banknote size={20} color="#333" />
                    Consultation Fee: ${fee}
                  </p>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <p className="flex gap-2 items-center">
                    <Phone size={20} color="#333" />
                    {phone}
                  </p>
                  <p className="flex gap-2 items-center">
                    <Mail size={20} color="#333" />
                    {email}
                  </p>
                  <p className="flex gap-2 items-center">
                    <MapPin size={20} color="#333" />
                    {location}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-[8px]">About</h2>
              <p className="text-slate600 text-[18px]">{about}</p>
            </div>
            <div className="mt-[20px] md:mt-[40px]">
            <AppointmentDetailsSidebar availability={availability} fee={fee} />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review: any) => (
                  <div
                    key={review?._id}
                    className="flex flex-col md:flex-row gap-5 my-2 border rounded p-5"
                  >
                    <div>
                      <div className="h-[75px] w-[75px] rounded-full overflow-hidden">
                        <Image
                          height={75}
                          width={75}
                          src={review.patient.picture || "/images/profileicon.png"}
                          alt="reviewer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="flex justify-between items-center gap-1 mb-1">
                        <span className="font-semibold text-lg flex items-center gap-2">
                          {review?.patient?.name}
                          <span className="text-slate-500">{review.rating}</span>
                        </span>
                        <span className="text-slate-500">{format(new Date(review.date), 'MMMM dd, yyyy')}</span>
                      </h4>
                      <p className="text-slate-800">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-600 py-2">No reviews found!</div>
              )}
            </div>
          </div>
          {/* <AppointmentDetailsSidebar availability={availability} fee={fee} /> */}
        </div>
      </section>
    </>
  );
};

export default DoctorDetails;
