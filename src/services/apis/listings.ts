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
