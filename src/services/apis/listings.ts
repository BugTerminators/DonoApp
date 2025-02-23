export const fetchListings = async () => {
  try {
    const response = await fetch("./api/listings");
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductById = async (productId: string) => {
  try {
    const response = await fetch(`/api/listings/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};
