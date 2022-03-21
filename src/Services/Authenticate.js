import axios from "axios";
import { URL } from "..";

const authenticate = async () => {
  const response = await axios.post(URL + "authenticate", {
    token: localStorage.getItem("token"),
  });

  return response;
};

export default authenticate;
