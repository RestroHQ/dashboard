import DashboardPage from "./components/page";

const Page = async ({ params }) => {
  const id = (await params).id;

  return <DashboardPage id={id} />;
};

export default Page;
