import { FaUserDoctor } from "react-icons/fa6";
import { MdEmergencyShare } from "react-icons/md";
import { RiPsychotherapyFill } from "react-icons/ri";
import { TbCheckupList } from "react-icons/tb";

const services = [
  {
    icon: <TbCheckupList color="#00acb1" className="text-5xl" />,
    title: "General Check-up",
    description: "Regular health exams and tests can help find problems before they start."
  },
  {
    icon: <FaUserDoctor color="#00acb1" className="text-5xl" />,
    title: "Specialist Consultation",
    description: "Get consultation from experienced specialists in various fields."
  },
  {
    icon: <MdEmergencyShare color="#00acb1" className="text-5xl" />,
    title: "Emergency Services",
    description: "We provide 24/7 emergency services for urgent medical needs."
  },
  {
    icon: <RiPsychotherapyFill color="#00acb1" className="text-5xl" />,
    title: "Eco Therapy",
    description: "We provide 24/7 emergency services for urgent medical needs."
  }
];

const Services: React.FC = () => (
  <section className="py-20">
    <div className="container mx-auto px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-24">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {services.map((service, index) => (
          <div key={index} className="relative bg-white border p-6 py-14 rounded-lg shadow-md">
            <div className="absolute h-20 w-20 rounded p-3 bg-white border left-6 -top-10 center">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
