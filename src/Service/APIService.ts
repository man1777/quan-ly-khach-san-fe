import axios, { AxiosResponse } from "axios";

const BASE_URL =
  "https://hotelmanagementapi20250217124648.azurewebsites.net/api/";

const API_CALL = {
  GET: <T>(url: string, params: object = {}): Promise<AxiosResponse<T>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}${url}`, params)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};

export default API_CALL;
