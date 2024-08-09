import { FaQuoteLeft } from "react-icons/fa";

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaQuoteLeft className="text-2xl mb-3 text-slate-600" />
            <p className="text-gray-600 mb-4">
              "Excellent service and very professional staff. Highly recommend!"
            </p>
            <h3 className="text-xl font-semibold">John Doe</h3>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <FaQuoteLeft className="text-2xl mb-3 text-slate-600" />
            <p className="text-gray-600 mb-4">
              "Booking an appointment was so easy and the doctor was very
              attentive."
            </p>
            <h3 className="text-xl font-semibold">Jane Smith</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaQuoteLeft className="text-2xl mb-3 text-slate-600" />
            <p className="text-gray-600 mb-4">
              "The emergency services were prompt and handled with utmost care."
            </p>
            <h3 className="text-xl font-semibold">Michael Brown</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
