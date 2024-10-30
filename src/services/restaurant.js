export const getRestaurant = async () => {
  const response = localStorage.getItem("restaurant");

  if (response) {
    return JSON.parse(response);
  }

  return {};
};
