"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeContainer from "./StripeContainer";
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeContainer />
    </Elements>
  );
};

export default StripeWrapper;
