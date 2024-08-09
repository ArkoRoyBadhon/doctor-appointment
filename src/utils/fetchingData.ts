interface ParamTypes {
  page?: string;
  limit?: string;
  specialization?: string;
  gender?: string;
  name?: string;
  maxFee?: string;
  minFee?: string;
}
export const getAllDoctorsData = async ({
  page,
  limit,
  specialization,
  gender,
  name,
  maxFee,
  minFee,
}: ParamTypes) => {
  try {
    const url = new URL(`${process.env.API_URL}/doctor/d/get/all`);
    url.searchParams.set("page", page || "1");
    url.searchParams.set("limit", limit || "6");

    if (specialization) {
      url.searchParams.set("specialization", specialization);
    }

    // Add other parameters as needed
    if (name) {
      url.searchParams.set("name", name);
    }
    if (gender) {
      url.searchParams.set("gender", gender);
    }
    if (minFee) {
      url.searchParams.set("minFee", minFee);
    }
    if (maxFee) {
      url.searchParams.set("maxFee", maxFee);
    }

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleDoctorDetails = async (id: String) => {
  try {
    const res = await fetch(`${process.env.API_URL}/doctor/d/get/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSpecialization = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/specialization/get`, {
      cache: "no-store",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
