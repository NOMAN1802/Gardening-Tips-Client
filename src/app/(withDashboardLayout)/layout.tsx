import Container from "@/src/components/Container/Container";
import Sidebar from "@/src/components/modules/Dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row w-full my-6 space-y-6 md:space-y-0 md:space-x-6">
        {/* Sidebar */}
        <div className="md:w-1/5 w-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="md:w-4/5 w-full p-6 ">{children}</div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
