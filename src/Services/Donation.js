import axios from "axios";
import { URL } from "..";

const getDonationsPerStatus = async (status) => {
  const response = await axios.post(URL + "getdonationsperstatus", {
    status,
    token: localStorage.getItem("token"),
  });

  return response;
};

const updateDonationStatus = async (_id, newStatus) => {
  const response = await axios.post(URL + "updatedonationstatus", {
    _id,
    newStatus,
    token: localStorage.getItem("token"),
  });

  return response;
};
export { getDonationsPerStatus, updateDonationStatus };
