import axios from "axios";
import { URL } from "..";

const getStatistics = async () => {
  const response = await axios.post(URL + "getstatistics", {
    token: localStorage.getItem("token"),
  });

  return response;
};

export default getStatistics;
