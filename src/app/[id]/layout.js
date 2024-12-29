import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = async ({ children }) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="m-4 w-full">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
