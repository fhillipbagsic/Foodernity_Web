import axios from "axios";
import { URL } from "..";

const getUsers = async () => {
  const response = await axios.post(URL + "getusers", {
    token: localStorage.getItem("token"),
  });

  return response;
};

const updateUserStatus = async (_id, newStatus) => {
  const response = await axios.post(URL + "updateuserstatus", {
    _id,
    newStatus,
    token: localStorage.getItem("token"),
  });

  return response;
};
export { getUsers, updateUserStatus };
