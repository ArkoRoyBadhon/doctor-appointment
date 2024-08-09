const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="center bg-blue-600 text-white p-6 rounded-full w-16 h-16 mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">Search for Doctors</h3>
            <p className="text-gray-600">
              Find doctors by specialty, name, or location.
            </p>
          </div>
          <div>
            <div className="center bg-blue-600 text-white p-6 rounded-full w-16 h-16 mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>
            <p className="text-gray-600">
              Choose a convenient time and book your appointment online.
            </p>
          </div>
          <div>
            <div className="center bg-blue-600 text-white p-6 rounded-full w-16 h-16 mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">Visit the Doctor</h3>
            <p className="text-gray-600">
              Visit the doctor at the scheduled time and get the best care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
