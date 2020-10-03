export const baseUrl = "https://dw17vhiy-dewe-tour-api.herokuapp.com/";
export const config = {
  headers: {
    Authorization: localStorage.token,
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
  },
};
