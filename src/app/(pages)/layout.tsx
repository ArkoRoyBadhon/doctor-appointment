import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[60vh]">{children}</div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
