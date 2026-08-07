import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import MobileSidebarButton from "@/components/layout/MobileSidebarButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <Header />

      <MobileSidebarButton />

      <div className="flex">

        <Sidebar />

        <main className="
          flex-1
          p-6
        ">
          {children}
        </main>

      </div>

      <Footer />

    </div>
  );
}