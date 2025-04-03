import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = async ({ params, children }) => {
  const restaurantId = (await params).restaurantId;

  return (
    <SidebarProvider>
      <Sidebar restaurantId={restaurantId} />
      <main className="w-full ml-64">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
