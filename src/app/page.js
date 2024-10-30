import LogoWithText from "@/components/common/LogoWithText";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <LogoWithText icon="h-8" text="text-2xl" />
      <h1 className="text-5xl font-bold max-w-2xl text-center">
        All your restaurant needs, in one place.
      </h1>

      <div className="flex items-center justify-center mt-8 gap-4">
        <Button asChild>
          <Link href="/auth/sign-up">Get Started</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
      </div>
    </section>
  );
}
