import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = async ({ params, children }) => {
  const id = (await params).id;

  return (
    <SidebarProvider>
      <Sidebar id={id} />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
