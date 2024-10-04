import axios from "axios";

export const getRandomUser = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "https://random-data-api.com/api/v2/users"
    );
    if (
      JSON.stringify(response) !== "{}" ||
      response !== undefined ||
      response !== null
    ) {
      return response;
    } else {
      return undefined;
    }
  } catch (err: any) {
    const errorMessage = err.message || err.toString();
    throw new Error(`API Error: "${errorMessage}"`);
  }
};
