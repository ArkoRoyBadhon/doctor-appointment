export const makeUrl = ({
  page = "1",
  limit = "6",
  specialization,
  gender,
  name,
  maxFee,
  minFee,
  view,
}: {
  page?: string;
  limit?: string;
  specialization?: string;
  gender?: string;
  name?: string;
  maxFee?: string;
  minFee?: string;
  view?: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string; // Replace with your base URL
  const url = new URL(`${baseUrl}/doctors`);

  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (specialization) {
    url.searchParams.set("specialization", specialization);
  }
  if (name) {
    url.searchParams.set("name", name);
  }
  if (gender) {
    url.searchParams.set("gender", gender);
  }
  if (minFee) {
    url.searchParams.set("minFee", String(minFee));
  }
  if (maxFee) {
    url.searchParams.set("maxFee", String(maxFee));
  }
  if (view) {
    url.searchParams.set("view", view);
  }

  return url.toString();
};
