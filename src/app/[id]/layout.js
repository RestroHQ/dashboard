import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "App",
};

const Layout = async ({ params, children }) => {
  const id = (await params).id;

  return (
    <SidebarProvider>
      <Sidebar id={id} />
      <main className="m-4 w-full">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
