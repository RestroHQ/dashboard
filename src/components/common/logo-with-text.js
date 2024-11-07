import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "./logo";

const LogoWithText = ({ icon, text, asLink, className }) => {
  const Comp = asLink ? Link : "div";
  return (
    <Comp
      className={cn(
        "flex gap-4 items-center",
        className,
        asLink && "cursor-pointer",
      )}
      href="/"
    >
      <>
        <Logo className={icon} />
        <p className={cn("text-2xl font-bold", text)}>RestroHQ</p>
      </>
    </Comp>
  );
};

export default LogoWithText;
