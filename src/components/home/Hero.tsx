import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-center w-full text-white h-[400px] lg:h-screen">
      <div className="absolute inset-0 bg-slate-800/50 center">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-lg lg:text-2xl mb-8">
            Book appointments with trusted doctors easily and quickly.
          </p>
          <Link
            className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
            href="/doctors"
          >
            Search Doctor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
