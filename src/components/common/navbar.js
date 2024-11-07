import Link from "next/link";
import LogoWithText from "./logo-with-text";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <section className="bg-white absolute top-0 left-0 right-0 p-4 w-screen z-50">
      <div className="container max-w-7xl flex justify-between items-center">
        <LogoWithText icon="h-8" text="text-xl" />

        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
