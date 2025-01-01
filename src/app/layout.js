import { Inter } from "next/font/google";

import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s — RestroHQ",
    default: "RestroHQ  — All your restaurant needs, in one place.",
  },
  description: "All your restaurant needs, in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "antialiased max-h-screen overflow-x-hidden bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white",
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
