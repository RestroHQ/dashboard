import Page from "./page";

export const metadata = {
  title: "Settings",
};

const Layout = async ({ params }) => {
  const id = (await params).id;

  return <Page id={id} />;
};

export default Layout;
