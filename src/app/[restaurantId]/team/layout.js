import Page from "./page";

export const metadata = {
  title: "Team",
};

const Layout = async ({ params }) => {
  const restaurantId = (await params).restaurantId;

  return <Page restaurantId={restaurantId} />;
};

export default Layout;
