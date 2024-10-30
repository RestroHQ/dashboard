import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";
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
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "antialiased dark:bg-neutral-950 dark:text-white",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
