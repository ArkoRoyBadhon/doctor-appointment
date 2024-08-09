import StripeWrapper from "@/components/stripe/StripeWrapper";

const page = () => {
  return (
    <div className="center my-[80px]">
      <div className="w-[600px]">
        <StripeWrapper />
      </div>
    </div>
  );
};

export default page;
