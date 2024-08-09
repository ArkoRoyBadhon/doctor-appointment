import Hero from "@/components/home/Hero";
import Services from "@/components/home/Service";
import Testimonials from "@/components/home/Testimonial";
import TopDoctors from "@/components/home/TopDoctor";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Hero />
      <Services />
      {/* <HowItWorks /> */}
      <WhyChooseUs />
      <TopDoctors />
      <Testimonials />
      {/* <WhySection /> */}
    </main>
  );
}
