"use client";
import PopUpModal from "@/UI/PopUpModal";
import { setAppointment } from "@/redux/features/appointment/appointment.slice";
import { useAppSelector } from "@/redux/hook";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface Availability {
  _id: string;
  day: string;
  startTime: string;
  endTime: string;
}

const AppointmentDetailsSidebar = ({
  availability,
  fee,
}: {
  availability: Availability[];
  fee: string;
}) => {
  const [show, setShow] = useState(false);

  const [selectSchedule, setSelectedSchedule] = useState<Availability>(
    availability[0]
  );

  const [description, setDescription] = useState("");
  const { _id } = useAppSelector((state) => state.user);

  const path = usePathname();
  const pathArr = path.split("/");
  const doctorId = pathArr[pathArr.length - 1];

  const router = useRouter();
  const dispatch = useDispatch();

  const handleProccedTopay = () => {
    if (!_id) {
     return router.push("/login");
    }
    if (!selectSchedule) {
      return toast.error("Please select a shcedule");
    }
    if (!description) {
      return toast.error("Add some description about your problem");
    }
    const data = {
      patient: _id,
      description,
      doctor: doctorId,
      dayOfWeek: selectSchedule.day,
      startTime: selectSchedule.startTime,
      endTime: selectSchedule.endTime,
      fee,
      status: "",
    };

    dispatch(setAppointment(data));
    router.push("/payment");
  };

  return (
    <>
      <div className="md:col-span-1 lg:col-span-1">
        <div className="border rounded bg-white shadow-md overflow-hidden">
          <h2 className="text-2xl font-bold bg-gray-50 p-2">Availability</h2>
          {availability.map((ava: any) => (
            <div key={ava._id} className="p-2 border-b flex items-center gap-[20px] md:gap-[80px]">
              <h4 className="text-lg font-semibold w-[100px]">{ava.day}</h4>
              <p className="text-slate600 bg-primaryBg/20 hover:bg-primaryBg/30 py-[8px] px-[20px] rounded-md ">
                {ava.startTime} - {ava.endTime}
              </p>
            </div>
          ))}
          <div className="p-2 mt-[10px]">
            <button
              onClick={() => setShow(true)}
              className="bg-primaryBg hover:bg-primaryBgHover text-white rounded-md py-2 px-[40px] w-fit font-semibold"
            >
              Book Your Appointment
            </button>
          </div>
        </div>
      </div>

      <PopUpModal state={show} setState={setShow}>
        <div className="w-full px-[15px]">
          <div className="w-full max-w-[820px] mx-auto p-6 bg-card rounded-lg shadow-lg bg-white border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Schedule Availability</h2>
              <button className="text-muted-foreground hover:bg-muted/50">
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Days</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center flex-wrap gap-2 bg-muted rounded-md p-3 cursor-pointer transition-colors hover:bg-muted/50">
                    {availability.map((ava, i) => (
                      <div
                        className="flex-shrink-0 center gap-[5px]"
                        key={i + "available"}
                        onClick={() => setSelectedSchedule(ava)}
                      >
                        <span
                          className={`w-5 h-5 center rounded-full p-[2px] border border-muted-foreground flex-shrink-0 `}
                        >
                          <span
                            className={` w-full h-full rounded-full ${
                              ava.day === selectSchedule.day
                                ? "bg-primaryBg"
                                : ""
                            }`}
                          />
                        </span>
                        <h1 className="text-sm font-medium">{ava.day}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Doctor will available for
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] p-[8px] border-[1.5px] text-white rounded-[5px] bg-primaryBg hover:bg-primaryBgHover">
                        {
                          availability.find(
                            (ava) => ava.day === selectSchedule?.day
                          )?.startTime
                        }
                      </span>
                      <span className="text-muted-foreground">to</span>
                      <span className="text-[16px] p-[8px] border-[1.5px] bg-primaryBg hover:bg-primaryBgHover rounded-[5px] text-white">
                        {
                          availability.find(
                            (ava) => ava.day === selectSchedule?.day
                          )?.endTime
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full">
              <label
                htmlFor="description"
                className="text-sm font-medium mb-2 block"
              >
                Description
              </label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any additional details about your problem"
                className=" w-full border-[1px] border-gray-300 p-[5px] min-h-[150px] bg-muted rounded-md border-muted focus:border-primaryBg focus:outline-primaryBg text-sm"
              />
            </div>
            <button
              className="text-center w-full py-[5px] bg-primaryBg hover:bg-primaryBgHover text-white rounded-[5px]"
              onClick={handleProccedTopay}
            >
              Procceed payment
            </button>
          </div>
        </div>
      </PopUpModal>
    </>
  );
};

export default AppointmentDetailsSidebar;
