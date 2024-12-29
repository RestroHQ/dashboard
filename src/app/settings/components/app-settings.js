import { ThemeToggle } from "@/components/dashboard/theme-toggle";

const AppSettings = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">App Settings</h2>

      <p className="text-muted-foreground text-sm mt-4">Toggle Theme</p>
      <ThemeToggle className="mt-2" />
    </section>
  );
};

export default AppSettings;
