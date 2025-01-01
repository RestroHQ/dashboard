import Page from "./page";

export const metadata = {
  title: "Team",
};

const Layout = async ({ params }) => {
  const id = (await params).id;

  return <Page id={id} />;
};

export default Layout;
