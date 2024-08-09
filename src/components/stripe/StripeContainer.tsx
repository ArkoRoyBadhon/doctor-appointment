import { useCreateAppointmentMutation } from "@/redux/features/appointment/apoointmentApi";
import { clearAppointment } from "@/redux/features/appointment/appointment.slice";
import { useCreateBillingMutation } from "@/redux/features/medicalHistory/medicalHistoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const StripeContainer = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const { email } = useAppSelector((state) => state.user);
  const appointmentData = useAppSelector((state) => state.appointment);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [createAppointment] = useCreateAppointmentMutation();
  const [createBilling] = useCreateBillingMutation();

  useEffect(() => {
    if (
      !appointmentData.fee ||
      !appointmentData.patient ||
      !appointmentData.doctor
    ) {
      return router.push("/");
    }
  });

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again later.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setError(
        "Card element not found. Please refresh the page and try again."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Calculate total amount based on selected products

      // Create Payment Intent on the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: appointmentData.fee }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent.");
      }

      const { data: clientSecret } = await response.json();
      if (clientSecret) {
        // Confirm the Payment
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: email || "test@user.com",
            },
          },
        });

        const errMessage = result.error?.message || "";
        const displayErr = [
          "Your card number is incomplete.",
          "Your card's expiration date is incomplete.",
          "Your card's security code is incomplete.",
        ];

        if (displayErr.includes(errMessage)) {
          return setError(`Payment failed: ${errMessage}`);
        }
        if (result.error) {
          toast.error("Something went wrong, try again later");
          console.log(result.error);
        } else if (result.paymentIntent.status === "succeeded") {
          const res = await createAppointment(appointmentData);
          // console.log({ res });

          const billingData = {
            appointment: res?.data?._id || "",
            patient: appointmentData.patient,
            doctor: appointmentData.doctor,
            amount: appointmentData.fee,
            status: "paid",
          };

          await createBilling(billingData);
          dispatch(clearAppointment(undefined));
          toast.success("Payment Success");
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong while processing this payment");
    } finally {
      setLoading(false);
    }
  };

  const loader = (
    <span className="flex items-center justify-center gap-[5px]">
      Payment Processing
      <span className="rounded-md h-[25px] w-[25px] border-4 border-t-4 border-blue-500 animate-spin" />
    </span>
  );

  return (
    <>
      <form
        onSubmit={handlePayment}
        className="bg-white p-[20px] rounded-[8px] shadow-lg"
      >
        <h6 className="text-[24px] mb-[20px] font-semibold">Proceed Payment</h6>
        <h6 className="text-[18px] mb-[20px] font-semibold">
          Total Ammount: ${appointmentData.fee}
        </h6>
        <div className="flex flex-col gap-[8px] w-full">
          <label htmlFor="card-nr" className="label">
            Card number
          </label>
          <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
            <CardNumberElement
              id="card-nr"
              className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
            />
          </div>
        </div>

        <div className="flex items-start justify-start gap-[22px] w-full mt-[20px]">
          <div className="flex flex-col gap-[8px] w-full">
            <label htmlFor="card-ex" className="label">
              Card expiry
            </label>
            <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
              <CardExpiryElement
                id="card-ex"
                className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <label htmlFor="card-cv" className="label">
              CVC
            </label>
            <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
              <CardCvcElement
                id="card-cv"
                className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
              />
            </div>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <button className="w-full mt-[40px] bg-slate-600 hover:bg-slate-700 py-[10px] text-white rounded-md" type="submit" disabled={loading}>
          {loading ? loader : "Pay by card"}
        </button>

        <Toaster richColors={true} position="top-center" />
      </form>
    </>
  );
};

export default StripeContainer;
