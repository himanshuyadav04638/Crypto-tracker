import axios from "axios";
export const BASE_URL = "https://api.coingecko.com/api/v3/coins";
axios.defaults.baseURL = BASE_URL;
export const getCryptoPrice = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/markets`,
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page,
            sparkline: false,
          },
        });
      if (response.status === 200) {
        return { res: response.data};
      } else return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
};

export const getCryptoDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    if (response.status === 200) {
      return { res: response.data};
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getHistoricalChart = async (id, days = 365) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/market_chart?vs_currency=usd&days=${days}`);
    if (response.status === 200) {
      return { res: response.data};
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};