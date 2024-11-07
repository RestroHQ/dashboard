import Loader from "@/components/common/loader";
import { redirect } from "next/navigation";

const Page = () => {
  redirect("/auth/sign-in");

  return <Loader />;
};

export default Page;
