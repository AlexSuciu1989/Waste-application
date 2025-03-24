import axios from "axios";

const URL = "https://app.wewantwaste.co.uk/api/";

export const getLocation = async (postcode, area) => {
  try {
    const response = await axios.get(`${URL}skips/by-location`, {
      params: { postcode, area },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data by location:", error);
    throw error;
  }
};
