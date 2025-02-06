"use client";

import { Grid2X2, List } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Searching = ({ data, search }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const specialization = data.data;

  const {
    page,
    limit,
    specialization: speciality,
    gender,
    name,
    maxFee,
    minFee,
    view,
  } = search;

  const handleChange = (e: any) => {
    const value = e.target.value;

    const usesSearch = new URLSearchParams(searchParams);
    usesSearch.delete("gender");

    router.push(`/doctors?${usesSearch}&gender=${value}`);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    const value = e.target.name.value;

    // const usesSearch = new URLSearchParams(searchParams);
    // usesSearch.delete("name");

    router.push(`/doctors?name=${value}`);
  };

  return (
    <div className="md:sticky md:top-5">
      <div className="border rounded overflow-hidden">
        <div className="text-xl font-semibold p-2 bg-borderColor w-full justify-between py-3 px-3 flex gap-2 items-center">
          <span className="mr-auto">Change the view</span>
          <Link
            href={{
              pathname: "/doctors",
              query: {
                ...(page && { page }),
                ...(limit && { limit }),
                ...(speciality && { specialization: speciality }),
                ...(gender && { gender }),
                ...(name && { name }),
                ...(maxFee && { maxFee }),
                ...(minFee && { minFee }),
                view: "grid",
              },
            }}
          >
            <Grid2X2 />
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: {
                ...(page && { page }),
                ...(limit && { limit }),
                ...(speciality && { specialization: speciality }),
                ...(gender && { gender }),
                ...(name && { name }),
                ...(maxFee && { maxFee }),
                ...(minFee && { minFee }),
                view: "list",
              },
            }}
          >
            <List />
          </Link>
        </div>
      </div>
      <div className="mt-7 border rounded overflow-hidden">
        <h3 className="text-xl font-semibold p-2 bg-gray-50">Searching</h3>
        <div className="p-3 flex flex-col gap-1">
          <form
            onSubmit={handleSubmitSearch}
            className="flex flex-wrap items-center gap-1"
          >
            <input
              type="text"
              name="name"
              id=""
              className="border py-2 px-1"
              placeholder="Search doctor by name"
            />
            <button
              type="submit"
              className="py-2 bg-primaryBg text-white px-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="mt-7 border rounded overflow-hidden">
        <h3 className="text-xl font-semibold p-2 bg-borderColor">Speciality</h3>
        <div className="p-3 flex flex-col gap-1">
          <Link
            className="border-b py-2 hover:pl-2 duration-150 transition-all font-medium hover:text-slate-600"
            href={{
              pathname: "/doctors",
              query: {
                page,
                limit,
                view,
              },
            }}
          >
            All
          </Link>

          {specialization.map((spec: any, index: Number) => (
            <Link
              key={spec._id}
              className={`py-2 hover:pl-2 duration-150 transition-all font-medium hover:text-slate-600 ${
                index === specialization.length - 1 ? "" : "border-b"
              }`}
              href={{
                pathname: "/doctors",
                query: {
                  page,
                  limit,
                  specialization: spec._id,
                  gender,
                  name,
                  maxFee,
                  minFee,
                  view: "list",
                },
              }}
            >
              {spec.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-7 border rounded overflow-hidden">
        <h3 className="text-xl font-semibold p-2 bg-gray-50">Gender</h3>
        <div className="p-3 flex flex-col gap-1">
          <form onChange={handleChange} className="flex flex-col gap-2">
            <label htmlFor="male">
              <input type="radio" name="gender" id="male" value="male" /> Male
            </label>
            <label htmlFor="female">
              <input type="radio" name="gender" id="female" value="female" />{" "}
              Female
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Searching;
