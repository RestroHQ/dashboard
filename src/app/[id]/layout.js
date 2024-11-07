import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "App",
};

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="m-4 w-full">{children}</main>
    </SidebarProvider>
  );
}
