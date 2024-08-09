import Image from 'next/image';

const WhySection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-20 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">WHY US?</h3>
          <h2 className="text-4xl font-bold mb-6">Healthcare Anytime, Anywhere</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We use technology to make healthcare accessible to you no matter where you are. You can access your health data, book appointments, review your prescriptions, and view your medical records, anywhere at your convenience.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src="/images/Healthcare_Anytime.2e16d0ba.fill-844x557-c0.format-webp.webp"
            alt="Healthcare"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhySection;
